import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { PlaylistsComponent } from "../playlists/playlists.component";
import { FormControl } from "@angular/forms";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

import "./spotify-player.js";
import "./spotify.js";

@Component({
  selector: "app-play",
  templateUrl: "./play.component.html",
  styleUrls: ["./play.component.scss"]
})
export class PlayComponent implements OnInit {
  token: string;
  headers;
  userData;
  apiUrl = "https://api.spotify.com/v1/me";
  baseApiUrl = "https://api.spotify.com/v1";
  currentTrack;
  currentUrl;
  currentId;
  playlist = [];
  hasSavedTrack: boolean;
  isPlaying: boolean;
  lyrics;
  playlists = [];
  nextLibrary;
  device;

  searchBox = new FormControl();
  searchResults = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private bottomSheet: MatBottomSheet
  ) {
    this.token = localStorage.getItem("token");
    this.headers = {
      Authorization: `Bearer ${this.token}`
    };
  }

  updateDeviceID() {
    this.device = localStorage.getItem("device");
  }

  ngOnInit() {
    this.http
      .get(this.apiUrl, { headers: this.headers })
      .pipe()
      .subscribe(data => {
        this.userData = data;
        this.loadPlaylist();
        this.getPlaylists();
        this.updateCurrent();
      }, this.err.bind(this));

    this.searchBox.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(this.search.bind(this));
  }

  err(error) {
    console.error(error);
    this.router.navigate(["/"]);
  }

  logout() {
    this.http
      .put(this.apiUrl + "/player/pause", {}, { headers: this.headers })
      .pipe()
      .subscribe(_ => {}, this.err.bind(this));
    this.router.navigate(["/"]);
  }

  search(value) {
    this.searchResults.splice(0);
    if (value) {
      this.http
        .get(this.baseApiUrl + "/search?type=track&limit=5&q=" + value, {
          headers: this.headers
        })
        .pipe()
        .subscribe(data => {
          console.log(data);
          for (const track of data["tracks"].items) {
            this.searchResults.push({
              title: track.name,
              artists: track.artists.map(e => e.name).join(", "),
              uri: track.uri
            });
          }
        }, this.err.bind(this));
    }
  }

  refresh() {
    this.loadPlaylist();
    this.updateCurrent();
  }

  getPlaylists() {
    this.http
      .get(this.apiUrl + "/playlists?limit=50", { headers: this.headers })
      .pipe()
      .subscribe(data => {
        for (const list in data["items"]) {
          this.playlists[list] = {
            name: data["items"][list].name,
            length: data["items"][list].tracks.total,
            owner: data["items"][list].owner.display_name,
            uri: data["items"][list].uri
          };
        }
      }, this.err.bind(this));
  }

  playTrack(track) {
    console.log(this.apiUrl + "/player/play?device_id=" + this.device);
    this.http
      .put(
        this.apiUrl + "/player/play?device_id=" + this.device,
        { uris: [track.uri] },
        { headers: this.headers }
      )
      .pipe()
      .subscribe(_ => {
        this.updateCurrent();
        this.searchResults.splice(0);
        this.searchBox.setValue("");
      }, this.err.bind(this));
  }

  playPlaylist(list) {
    this.http
      .put(
        this.apiUrl + "/player/play?device_id=" + this.device,
        { context_uri: list.uri },
        { headers: this.headers }
      )
      .pipe()
      .subscribe(_ => {
        this.updateCurrent();
      }, this.err.bind(this));
  }

  openPlaylists() {
    const sheetRef = this.bottomSheet.open(PlaylistsComponent, {
      data: this.playlists
    });

    sheetRef.afterDismissed().subscribe(data => {
      if (data) {
        this.playPlaylist(data);
      }
    });
  }

  loadPlaylist() {
    this.http
      .get(this.apiUrl + "/tracks?limit=50", { headers: this.headers })
      .pipe()
      .subscribe(data => {
        this.playlist.splice(0);
        for (const track in data["items"]) {
          this.playlist[track] = {
            title: data["items"][track].track.name,
            artist: data["items"][track].track.artists
              .map(e => e.name)
              .join(", "),
            uri: data["items"][track].track.uri
          };
        }
        this.nextLibrary = data["next"];
      }, this.err.bind(this));
  }

  loadMore() {
    this.http
      .get(this.nextLibrary, { headers: this.headers })
      .pipe()
      .subscribe(data => {
        for (const track in data["items"]) {
          this.playlist.push({
            title: data["items"][track].track.name,
            artist: data["items"][track].track.artists
              .map(e => e.name)
              .join(", "),
            uri: data["items"][track].track.uri
          });
        }
        this.nextLibrary = data["next"];
      }, this.err.bind(this));
  }

  skipNext() {
    this.http
      .post(this.apiUrl + "/player/next", {}, { headers: this.headers })
      .pipe()
      .subscribe(_ => {
        this.updateCurrent();
      }, this.err.bind(this));
  }

  skipPrevious() {
    this.http
      .post(this.apiUrl + "/player/previous", {}, { headers: this.headers })
      .pipe()
      .subscribe(_ => {
        this.updateCurrent();
      }, this.err.bind(this));
  }

  playPause() {
    this.http
      .put(
        this.apiUrl + "/player/" + (this.isPlaying ? "pause" : "play"),
        {},
        { headers: this.headers }
      )
      .pipe()
      .subscribe(_ => {
        this.updateCurrent();
      }, this.err.bind(this));
  }

  toggleSave() {
    if (this.hasSavedTrack) {
      this.http
        .delete(this.apiUrl + "/tracks?ids=" + this.currentId, {
          headers: this.headers
        })
        .pipe()
        .subscribe(_ => {
          this.loadPlaylist();
          this.updateCurrent();
        }, this.err.bind(this));
    } else {
      this.http
        .put(
          this.apiUrl + "/tracks?ids=" + this.currentId,
          {},
          { headers: this.headers }
        )
        .pipe()
        .subscribe(_ => {
          this.loadPlaylist();
          this.updateCurrent();
        }, this.err.bind(this));
    }
  }

  updateCurrent() {
    setTimeout(() => {
      this.http
        .get(this.apiUrl + "/player/currently-playing", {
          headers: this.headers
        })
        .pipe()
        .subscribe(data => {
          console.log(data);
          if (data) {
            const currentTitle = data["item"].name;
            const currentArtists = data["item"].artists
              .map(e => e.name)
              .join(", ");

            if (this.currentTrack !== currentTitle + " - " + currentArtists) {
              this.loadLyrics(currentTitle, currentArtists);
            }

            this.currentTrack = currentTitle + " - " + currentArtists;
            this.currentUrl = data["item"].external_urls.spotify;
            this.isPlaying = data["is_playing"];
            this.currentId = data["item"].id;

            this.http
              .get(this.apiUrl + "/tracks/contains?ids=" + this.currentId, {
                headers: this.headers
              })
              .pipe()
              .subscribe(hasTrack => {
                this.hasSavedTrack = hasTrack[0];
              }, this.err.bind(this));
          }
        }, this.err.bind(this));
    }, 1000);
  }

  loadLyrics(title: string, artists: string) {
    this.lyrics = "Loading lyrics...";
    const query = encodeURI(
      title
        .toLowerCase()
        .replace(/,|-|\d{4}|remaster(ed)?|(single)?\s*version|\(.+?\)/g, "") +
        " " +
        artists
          .toLowerCase()
          .substring(
            0,
            artists.indexOf(",") < 0 ? artists.length : artists.indexOf(",")
          )
    );
    console.log(query);
    this.http
      .get(
        "https://api.genius.com/search?q=" +
          query +
          "&access_token=RaUVaQw8OvMgRq6b2nYB92liz1Rmhz9El3rWxI1N8EnQDuZ3SRMHduLtGsHZjZQe"
      )
      .pipe()
      .subscribe(data => {
        if (data["response"].hits.length > 0) {
          const url = data["response"].hits[0].result.url;
          console.log(url);

          fetch("https://cors-anywhere.herokuapp.com/" + url)
            .then(res => res.text())
            .then(data => {
              const start = data.lastIndexOf("<!--sse-->") + 10;
              const end = data.lastIndexOf("<!--/sse-->");

              let almostLyrics = data.slice(start, end);
              almostLyrics = almostLyrics.replace(/\r?\n/gm, "");
              almostLyrics = almostLyrics.replace(/<p>|<a.+?>|<\/a>/gm, "");

              this.lyrics = almostLyrics;
            })
            .catch(err => {
              this.lyrics = "Error loading lyrics.";
              console.error(err);
            });
        } else {
          this.lyrics = "No lyrics found :(";
        }
      }, console.error);
  }
}
