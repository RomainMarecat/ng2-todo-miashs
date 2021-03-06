import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Rx';

interface IWindow extends Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
}

@Injectable()
export class SpeechRecognitionService {

  speechRecognition: any;

  constructor(private zone: NgZone) {
  }

  record(): Observable<string> {
    return Observable.create(observer => {
      const { webkitSpeechRecognition }: IWindow = <IWindow>window;
      this.speechRecognition = new webkitSpeechRecognition();
      this.speechRecognition.continuous = false;
      this.speechRecognition.lang = 'en-US';
      this.speechRecognition.maxAlternatives = 1;

      this.speechRecognition.onresult = speech => {
        let term = '';
        if (speech.results) {
          const result = speech.results[speech.resultIndex];
          const transcript = result[0].transcript;
          if (result.isFinal) {
            if (result[0].confidence < 0.3) {
              term = '';
            } else {
              term = transcript;
            }
          }
        }
        this.zone.run(() =>
          observer.next(term)
        );
      };

      this.speechRecognition.onerror = error =>
        observer.error(error);

      this.speechRecognition.onend = () =>
        observer.complete();

      this.speechRecognition.start();
    });
  }

  unsubscribe() {
    if (this.speechRecognition) {
      this.speechRecognition.stop();
    }
  }
}
