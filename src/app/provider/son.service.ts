import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SonService {
  constructor(private http:HttpClient) { }

  getSons(){
    return this.http.get("assets/TP2_JSON_NAHSANG_MERCY/song.json");
  }
  getAlbums(){
    return this.http.get("assets/TP2_JSON_NAHSANG_MERCY/album.json");
  }
}
