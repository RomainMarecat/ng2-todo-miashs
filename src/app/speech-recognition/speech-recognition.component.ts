import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-speech-recognition',
  templateUrl: './speech-recognition.component.html',
  styleUrls: ['./speech-recognition.component.scss']
})
export class SpeechRecognitionComponent implements OnInit {
  @Input() iconRecord: string;
  @Output() activateSpeech: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

  emitSpeech() {
    this.activateSpeech.emit(true);
  }

}
