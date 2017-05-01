import {Component, OnInit, Input} from '@angular/core';
import {SpeechSynthesisService} from '../speech-synthesis.service';

@Component({
  selector: 'app-speech-synthesis',
  templateUrl: './speech-synthesis.component.html',
  styleUrls: ['./speech-synthesis.component.css'],
  providers: [SpeechSynthesisService]
})
export class SpeechSynthesisComponent implements OnInit {
  @Input ('choseTexte') choseTexte: String;

  constructor(private speechSynthesisService :SpeechSynthesisService) { }

  ngOnInit() {
  }

  speechSynthesis(){
    let str: string = String(this.choseTexte);
    this.speechSynthesisService.speech(str);
  }
}
