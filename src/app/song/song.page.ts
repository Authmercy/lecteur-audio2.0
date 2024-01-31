import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-song',
  templateUrl: './song.page.html',
  styleUrls: ['./song.page.scss'],
})
export class SongPage implements OnInit {

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
