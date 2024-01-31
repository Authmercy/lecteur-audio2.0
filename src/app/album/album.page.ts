import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
})
export class AlbumPage implements OnInit {

  constructor(private route:Router) { }

  ngOnInit() {
  }
  album(){
  this.route.navigate(['album'])  

  }
  artist(){
    this.route.navigate(['artist'])  
  }

  chanson(){ this.route.navigate(['song'])  }
  playlist(){
    this.route.navigate(['playlist'])  
  }
  favoris(){ this.route.navigate(['favoris'])  }

}
