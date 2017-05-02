import { Injectable } from '@angular/core';

@Injectable()
export class SpeechSynthesisService {

  constructor() { }

  speech(vocal :string){
    let synth = window.speechSynthesis;
    let utterance = new SpeechSynthesisUtterance(vocal);
    synth.speak(utterance);
    console.log("SpeechSynthesisService : " + vocal);
  }
}
