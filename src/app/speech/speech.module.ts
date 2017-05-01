import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeechSynthesisComponent } from './speech-synthesis/speech-synthesis.component';
import { SpeechRecognitionComponent } from './speech-recognition/speech-recognition.component';
import { SpeechRecognitionService } from './speech-recognition.service';
import { SpeechSynthesisService } from './speech-synthesis.service';
import {TodoListService} from "../shared/todo-list.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SpeechSynthesisComponent,
    SpeechRecognitionComponent
  ],
  providers: [
    SpeechRecognitionService,
    SpeechSynthesisService,
    TodoListService
  ]
})
export class SpeechModule { }
