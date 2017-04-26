import {Component, OnInit, Input} from '@angular/core';
import {SpeechRecognitionService} from "../speech-recognition.service";
import {TodoList} from "./../../shared/todo-list";
import { TodoListService } from './../../shared/todo-list.service';

@Component({
  selector: 'app-speech-recognition',
  templateUrl: './speech-recognition.component.html',
  styleUrls: ['./speech-recognition.component.css'],
  providers: [SpeechRecognitionService]
})
export class SpeechRecognitionComponent implements OnInit {
  @Input ('nf') nf: TodoList;
  private choses:any;

  constructor(private speechRecognitionService: SpeechRecognitionService, private todoListService: TodoListService) {

  }

  ngOnInit() {
    this.todoListService.getData().then((nf) => {
      this.nf = nf;
      this.choses = nf.choses;
    });
  }

  speechRecognition(){
    let texte = "";
    this.speechRecognitionService.record().subscribe(
      (value) => {
        console.log(value);
        this.nf.Ajouter(value);
        texte = value;
      }
    );

  }


}
