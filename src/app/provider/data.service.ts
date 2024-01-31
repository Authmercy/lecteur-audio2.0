import { Injectable,Inject, PLATFORM_ID } from '@angular/core';
import { NativeAudio } from '@capacitor-community/native-audio';
import {HttpClient} from '@angular/common/http'
import { isPlatformBrowser } from '@angular/common';
import { Filesystem, Directory,ReaddirResult } from '@capacitor/filesystem';
import { SonService } from './son.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private sonsService: SonService) { }
  categorie = '';
  chemin = '';
  enCours = '';
  sons: any[] = [];
  v = 1.0;

  loadAudio(){
    return NativeAudio.preload({
      assetId: "locko",
      assetPath: "locko.mp3",
      audioChannelNum:1,
      isUrl: false
    });
  }

  async getFiles(son: any) {
    if(son.idCategorie == "cat1"){
     this.categorie = "Benskin";
   }else{
     if(son.idCategorie == "cat2"){
       this.categorie = "Bitkusi";
     }else{
       if(son.idCategorie == "cat3"){
         this.categorie = "Makossa";
       }else{
         this.categorie = "AfroUrban";
       }
     }
   }
 try {
   const result = await Filesystem.readdir({
     path: '/TP2/zik_l3/'+this.categorie,
     directory: Directory.ExternalStorage,
   });

   const files = result.files;
   files.forEach((file)=>{
     if(file.name == son.fichier){
       this.chemin = file.uri;
       console.log("le chemin est bel et bien: ",file.uri);
     }
   })
   console.log('la liste des dossier est :', files);
 } catch (error) {
   console.error('Erreur lors de la récupération des fichiers :', error);
 }
}

  async loadAudioB(son: any){
   await this.getFiles(son);
   // console.log("le chemin charger est bel et bien: ",this.chemin);
   return NativeAudio.preload({
     assetId: son.idChanson,
     assetPath: this.chemin,
     audioChannelNum:1,
     isUrl: true
   });
 }

 async playAudioB(son: any){

   this.enCours = son.idChanson;
   await NativeAudio.play({
     assetId: son.idChanson,
     time: 0
   })
 }

 playAudio(){
   NativeAudio.play({
     assetId: "locko",
     time: 0
   })
 }

 async stopAudioB(son: any){
   await NativeAudio.stop({
     assetId:son.idChanson
   });
   await NativeAudio.unload({
     assetId: son.idChanson,
   });
 }

 getCurrentTime(son:any){
   return NativeAudio.getCurrentTime({
     assetId: son.idChanson,
   })
 }

 async stopAudio(){
   NativeAudio.stop({assetId:"locko"});
 }

 setVolume(){
   NativeAudio.setVolume({
     assetId: 'locko',
     volume: 0.4,
   });
 }

 async setVolumeB(son: any, n = 0.1){
   try {
     await NativeAudio.setVolume({
       assetId: son.idChanson,
       volume: this.v+n
     });
     if(this.v<1.0)
       this.v += n;
     console.log('Volume de l\'audio augmenté.');
   } catch (error) {
     console.error('Erreur lors de l\'augmentation du volume de l\'audio :', error);
   }
 }

 async diminuerVolume(son: any, n = 0.1) {
   try {
     await NativeAudio.setVolume({
       assetId: son.idChanson,
       volume: this.v-n
     });
     if(this.v>0.0)
       this.v -= n;
     console.log('Volume de l\'audio diminué.');
   } catch (error) {
     console.error('Erreur lors de la diminution du volume de l\'audio :', error);
   }
 }

 duree():number{
   NativeAudio.getDuration({
     assetId: 'locko'
   })
     .then(result => {
     console.log(result.duration);
     return result.duration;
   }) 
   return 0;
 }

 async dureeB(son:any):Promise<number>{
   let d = 0;
   await NativeAudio.getDuration({
     assetId: son.idChanson,
   })
   .then(result => {
     d = result.duration;
     console.log("la duree initiale est:", d);
   })
   console.log("la duree apres l'initiale est:", d);
   return d;
 }


 async pauseB(son: any) {
   try {
     await NativeAudio.pause({
       assetId: son.idChanson
     });
     console.log('Audio en pause.');
   } catch (error) {
     console.error('Erreur lors de la mise en pause de l\'audio :', error);
   }
 }

 async resumeB(son: any){
   try{
     NativeAudio.resume({
         assetId: son.idChanson,
       });
   }catch (error){
     console.error('Erreur lors du resume de l\'audio :', error);
   }
 }
 
 async next(son: any) {
   try {
     await NativeAudio.stop({
       assetId: this.enCours,
     });
     await this.playAudioB(son);
     console.log('Piste suivante jouée avec succès.');
   } catch (error) {
     console.error('Erreur lors de la lecture de la piste suivante :', error);
   }
 }

 async last(son: any) {
 try {
   await NativeAudio.stop({
     assetId: son.idChanson,
   });

   await this.playAudioB(son);
   console.log('Piste précédente jouée avec succès.');
 } catch (error) {
   console.error('Erreur lors de la lecture de la piste précédente :', error);
 }
}


getSons():any[]{
 this.sonsService.getSons().subscribe((sons: any) =>{
   this.sons = sons;    
 })
 return this.sons;
}

enCour(son:any):boolean{
 let val = false;
 NativeAudio.isPlaying({
   assetId: son.idChanson
 })
 .then(result => {
   val = result.isPlaying;
   console.log(result.isPlaying);
 })
 return val;
}
}
