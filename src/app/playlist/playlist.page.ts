import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RangeCustomEvent } from '@ionic/angular';
import { DataService } from '../provider/data.service';
import { SonService } from '../provider/son.service';
@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss'],
})
export class PlaylistPage implements OnInit {
  constructor(private route:Router, private sonsService: SonService,private musicService: DataService) { }
  son: any;
  enCours = false;
  dureeM = 2;
  dureeS = 50;
  totalDuration: number = 0;
  elapsedTime: number = 0;
  list: any[] = [];
  currentTime: any;
  jouer = false;
  isPlaying = true;
  enCour:any;
  pending = false;
  pauseS = false;
  durree = 60;
  idAlbum = '';
  cat:any;
  Listchanson: any[] = [];
  sonsAlbum: any[] = [];
  sonsList: any[] = [];
  source! : string | null;
  titre = '';
  public buffer = 0;
  progress = 0;
  Tsongs: any[] = [];
  private sonsListRecherche: any[] = [];
  ngOnInit() {
    this.sonsService.getSons().subscribe((rep: any) => {
      this.Tsongs = rep;
      console.log(this.Tsongs);
    }, (err) => {
      console.log(err);
    });

    let son = localStorage.getItem("sonL");
    console.log(son)
    localStorage.removeItem("sonL");
    if (son){
      this.son = JSON.parse(son);
      this.pending = true;
    }

    let list = localStorage.getItem("list");
    localStorage.removeItem("sonL");
    localStorage.removeItem("list");
    if (list){
      this.list = JSON.parse(list);
    }
    let deux = localStorage.getItem("deux");
    localStorage.removeItem("deux");
  }

  onIonKnobMoveStart(ev: Event) {
    console.log('ionKnobMoveStart:', (ev as RangeCustomEvent).detail.value);
  }

  onIonKnobMoveEnd(ev: Event) {
    console.log('ionKnobMoveEnd:', (ev as RangeCustomEvent).detail.value);
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
  isModalOpen = false;

  setOpen(isOpen: boolean,son: any) {
    this.isModalOpen = isOpen;
    localStorage.setItem("sonL",JSON.stringify(son));
    localStorage.setItem("list",JSON.stringify(this.sonsAlbum));
    let sonA = localStorage.getItem("sonL");
    console.log(sonA)
  }
  close(isOpen:boolean){
    this.isModalOpen = isOpen;
    localStorage.removeItem("sonL");
  }

  getProgress() {
    return (this.currentTime / this.totalDuration) * 100 + "%";
 }
 seek(event:any) {
  const progressBarWidth = event.target.offsetWidth;
  const clickedOffsetX = event.offsetX;
  const clickedProgress = (clickedOffsetX / progressBarWidth) * this.totalDuration;
  // Mettre à jour le temps actuel de lecture de la chanson
  this.currentTime = clickedProgress;
}


async play(son:any){

if(!this.pauseS){
this.pauseS = false;
console.log("le progres est a:", this.progress)
this.enCour = son;

await this.musicService.loadAudioB(son);
this.totalDuration = this.dureeM;
await this.musicService.playAudioB(son);
await this.resetProgress;
this.isPlaying = true;
this.enCours = true;
if(this.progress != 0)
    this.progress = 0;
this.durree = await this.musicService.dureeB(son);

this.buffer += 0;

await setInterval(() => {
  
  if (this.isPlaying && this.progress < 1) {
    // console.log("la duree est donc:",durree);
    this.progress += 1 / this.durree;
    if (this.progress == 1){
      this.next(son);
    }
  }
}, 1000);
}{
// await this.musicService.loadAudioB(son);
await this.musicService.resumeB(son);
this.enCours = true;
this.pauseS = false;
}

}

async pause(son:any){
this.pauseS = true;
await this.musicService.pauseB(son);
this.isPlaying = false;
this.ngOnInit();
this.enCours = false;
}

async stop(son:any){
await this.musicService.stopAudioB(son);
this.progress = 0;
this.enCours = false;
this.ngOnInit();
}

async next(son: any){
let next: any;
for(let i=0; i<this.list.length ; i++){
if(i<this.list.length){
  if(this.son.idChanson == this.list[i].idChanson){
    if(i == ((this.list.length)-1)){
      next = this.list[0];
      break;
    }else{
      next = this.list[i+1];
      break;
    }
  }
}else{
  i = 0;
}
}
this.stop(son);

this.son = next;
this.durree = await this.musicService.dureeB(son);
this.play(next);

}

async last(son:any){

let last: any;
for(let i=0; i<this.list.length; i++){
if(this.son.idChanson == this.list[i].idChanson){
  if(i>0 && this.list.length > 1){
    last = this.list[i-1];
    break;
  }else{
    last = this.list[this.list.length - 1];
    break;
  }
}
if(i == this.list.length){
  i=0;
}
}
this.stop(son);
// this.ngOnInit();
this.son = last;
this.play(last);
}
updateElapsedTime() {
  this.elapsedTime = 1;
  // this.son.currentTime;
  let percentage = (this.elapsedTime / this.totalDuration) * 100;
  // if(document)
  // document.querySelector('.progress').setAttribute('style', 'width:' + percentage + '%');
}

convM(d:number):number{
  return Math.floor(d);
}

convS(d:number):number{
  return Math.round((d - Math.floor(d))*100);
}

onQuit(){
  // if(!this.isPlaying){
    if(this.enCour){
      this.stop(this.enCour);
    }
  // }
}
async resetProgress(son: any){
  // let durree = await this.musicService.dureeB(son);
  this.progress = 0;
}
async canDismiss(data?: any, role?: string) {
  return role !== 'gesture';
}
}

