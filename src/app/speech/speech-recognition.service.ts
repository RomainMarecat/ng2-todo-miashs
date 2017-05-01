import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as _ from "lodash";

interface IWindow extends Window {
  webkitSpeechRecognition: any;
  SpeechRecognition: any;
  webkitSpeechGrammarList: any;
}

@Injectable()
export class SpeechRecognitionService {
  speechRecognition: any;
  speechGrammarList: any;
  grammar: string;
  action: string[];

  constructor(private zone: NgZone) {
    // tentative d'essai d'utilisation d'une grammarList, ne fonctionne pas et l'ordinateur fait moins de faute d'orthographe que moi
    this.action = [
      'Ajouter une tache',
      'Qu\'est ce qu\'il me reste à faire',
      'Selectionner toute les taches',
      'Lire toutes les tâches',
      'Supprimer les taches effectuées',
    ];
    this.grammar = '#JSGF V1.0; grammar action; public <action> ='  + this.action +';';
  }


  record(): Observable<string> {
    return Observable.create(observer => {
      const { webkitSpeechRecognition }: IWindow = <IWindow>window;
      const { webkitSpeechGrammarList }: IWindow = <IWindow>window;
      this.speechRecognition = new webkitSpeechRecognition();
      //this.speechRecognition = SpeechRecognition;
      this.speechRecognition.continuous = true;
      //this.speechRecognition.interimResults = true;

      /**we need to ge a speechGrammarList (Ne fonctionne pas)
      this.speechGrammarList = new webkitSpeechGrammarList();
      this.speechGrammarList.addFromString(this.grammar, 1);
      this.speechRecognition.grammars = this.speechGrammarList; **/

      this.speechRecognition.lang = 'fr-fr';
      this.speechRecognition.maxAlternatives = 1;

      this.speechRecognition.onresult = speech => {
        let term: string = "";
        if (speech.results) {
          var result = speech.results[speech.resultIndex];
          var transcript = result[0].transcript;
          if (result.isFinal) {
            if (result[0].confidence < 0.3) {
              console.log("Unrecognized result - Please try again");
            }
            else {
              term = _.trim(transcript);
              console.log("The magic todo heard : " + term );
            }
          }
        }
        this.zone.run(() => {
          observer.next(term);
        });
      };

      this.speechRecognition.onerror = error => {
        observer.error(error);
      };

      this.speechRecognition.onend = () => {
        observer.complete();
      };

      this.speechRecognition.start();
      console.log("We are listening ... ");
    });
  }

  DestroySpeechObject() {
    if (this.speechRecognition)
      this.speechRecognition.stop();
  }

}
