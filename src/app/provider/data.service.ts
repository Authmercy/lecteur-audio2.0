import { Injectable,Inject, PLATFORM_ID } from '@angular/core';
import { NativeAudio } from '@capacitor-community/native-audio';
import {HttpClient} from '@angular/common/http'
import { isPlatformBrowser } from '@angular/common';
import { Filesystem, ReaddirResult } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient,@Inject(PLATFORM_ID) private platformId:Object) { }

 async getMP3Files() {
    try {
      const folderPath = '/Documents/zik_l3/'; // Change this to the actual path
      const result: ReaddirResult = await Filesystem.readdir({
        path: folderPath,
      });
  
      // Filter only MP3 files
      const mp3Files = result.files.filter(file => {
        // Manually cast the file name to a string
        const fileName = file as unknown as string;
        return fileName.endsWith('.mp3');
      });
  
      // Do something with the list of MP3 files (e.g., display, process, etc.)
      console.log(mp3Files);
    } catch (error) {
      console.error('Error reading MP3 files', error);
    }
  }
  isPlaying = false
 
 
  sessionSet(variable:string,val:string): void{
   if(isPlatformBrowser(this.platformId)){
     sessionStorage.setItem(variable,val);
   }
 }
 sessionget(variable: string) : string| any{
   if(isPlatformBrowser(this.platformId)){
     return sessionStorage.getItem(variable);
   }
 }
}
