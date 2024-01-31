import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.page.html',
  styleUrls: ['./favoris.page.scss'],
})
export class FavorisPage implements OnInit {


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
