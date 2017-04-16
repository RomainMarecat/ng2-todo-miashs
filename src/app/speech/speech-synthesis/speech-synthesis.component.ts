import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-speech-synthesis',
  templateUrl: './speech-synthesis.component.html',
  styleUrls: ['./speech-synthesis.component.css']
})
export class SpeechSynthesisComponent implements OnInit {
  @Input ('choseTexte') choseTexte: String;

  constructor() { }

  ngOnInit() {
  }

  speechSynthesis(){
    var str: string = String(this.choseTexte);
    var synth = window.speechSynthesis;
    var utterance1 = new SpeechSynthesisUtterance(str);
    synth.speak(utterance1);
  }

}
