import {Component, OnInit, Input} from '@angular/core';
import {SpeechRecognitionService} from "../speech-recognition.service";
import {SpeechSynthesisService} from '../speech-synthesis.service';
import {TodoList} from "./../../shared/todo-list";
import {TodoListService} from './../../shared/todo-list.service';

@Component({
  selector: 'app-speech-recognition',
  templateUrl: './speech-recognition.component.html',
  styleUrls: ['./speech-recognition.component.css'],
  providers: [SpeechRecognitionService, SpeechSynthesisService]
})
export class SpeechRecognitionComponent implements OnInit {
  @Input ('nf') nf: TodoList;
  private choses:any;

  constructor(private speechRecognitionService: SpeechRecognitionService, private speechSynthesisService: SpeechSynthesisService, private todoListService: TodoListService) {

  }

  ngOnInit() {
    this.todoListService.getData().then((nf) => {
      this.nf = nf;
      this.choses = nf.choses;
    });
  }

  ngOnDestroy(){
    this.speechRecognitionService.DestroySpeechObject();
  }

  // Nous n'avons pas réussi à utiliser la SpeechGrammarList correctement ducoup nous ferons un split sur les chaines de caractères
  speechRecognition(){
    this.speechSynthesisService.speech("Votre tout doux liste vous écoute");
    this.speechRecognitionService.record().subscribe(
      (value) => {
        console.log(value);
        if(value === "ajouter une tâche"){
          this.speechRecognitionService.DestroySpeechObject();
          this.ajouterUneTache();
        }else if (value === "supprimer une tâche"){
          this.speechRecognitionService.DestroySpeechObject();
          this.supprimerUneTache();
        }else if (value === "modifier une tâche"){
          this.speechRecognitionService.DestroySpeechObject();
          this.modifierUneTache();
        }else if (value === "combien de tâches me reste-t-il à faire"){
          this.speechRecognitionService.DestroySpeechObject();
          let count = this.choses.reduce((acc, chose) => {
            return acc + (chose.fait ? 0 : 1);
          }, 0);
          this.speechSynthesisService.speech("il vous reste " + count + "tâches à faire");
        }else if (value === "qu'est-ce qu'il me reste à faire") {
          this.speechSynthesisService.speech("Alors il vous reste à faire");
          this.choses.forEach((chose,i) => {
            if(!chose.fait){
              this.speechSynthesisService.speech(chose.texte);
            }
          });
          console.log("esle if");
        }else if (value === "valider toutes les tâches") {
          this.choses.forEach((chose,i) => {
            chose.Fait(true);
          });
        }else if (value === "lire toutes les tâches") {
          this.choses.forEach((chose,i) => {
            this.speechSynthesisService.speech(chose.texte);
          });
        }else if (value === "supprimer les tâches effectuées") {
          this.choses.forEach((chose,i) => {
            if(chose.fait){
              chose.dispose();
            }
          });
          this.speechSynthesisService.speech("tâches nettoyées");
        }else {
          this.speechSynthesisService.speech("Je n'ai pas compris, allez vous chercher du café, ou peut-être voulez-vous ajouter une tâche ? ");
          this.speechRecognitionService.DestroySpeechObject();
        }
      }
    );
  }

  ajouterUneTache(){
    this.speechSynthesisService.speech("C'est parti !");
    this.speechRecognitionService.record().subscribe(
      (value) => {
        this.nf.Ajouter(value);
        this.speechRecognitionService.DestroySpeechObject();
        this.speechSynthesisService.speech(value + " à été ajoutée");
      }
    );
  }

  supprimerUneTache(){
    this.speechSynthesisService.speech("Laquelle ?");
    this.speechRecognitionService.record().subscribe(
      (value) => {
        this.choses.forEach((chose,i) => {
          if(chose.texte === value){
            this.speechRecognitionService.DestroySpeechObject();
            this.speechSynthesisService.speech("Suppression de : " + value);
            chose.dispose();
          }
        });
        if (value === "annuler") {
          this.speechRecognitionService.DestroySpeechObject();
          this.speechSynthesisService.speech("Okay bon courage");
        }
      }
    );
  }

  modifierUneTache(){
    this.speechSynthesisService.speech("Laquelle ?");
    this.speechRecognitionService.record().subscribe(
      (value) => {
        this.choses.forEach((chose,i) => {
          if(chose.texte === value){
            this.speechRecognitionService.DestroySpeechObject();
            this.speechSynthesisService.speech("Okay j'écoutes : ");
            this.speechRecognitionService.record().subscribe(
              (value) => {
                chose.Texte(value);
                this.speechRecognitionService.DestroySpeechObject();
                this.speechSynthesisService.speech("Modification Effectuée");
              });
          }
        });
        if (value === "annuler") {
          this.speechRecognitionService.DestroySpeechObject();
          this.speechSynthesisService.speech("Okay bon courage");
        }
      }
    );
  }


}
