import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoComponent } from './todo/todo.component';
import { TodoListService } from './shared/todo-list.service';
import {SpeechSynthesisComponent} from "./speech/speech-synthesis/speech-synthesis.component";
import {SpeechRecognitionComponent} from "./speech/speech-recognition/speech-recognition.component";
import {SpeechRecognitionService} from "./speech/speech-recognition.service";
import {SpeechSynthesisService} from "./speech/speech-synthesis.service";

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoComponent,
    SpeechSynthesisComponent,
    SpeechRecognitionComponent
  ],
  exports: [
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule
  ],
  providers: [
    TodoListService,
    SpeechRecognitionService,
    SpeechSynthesisService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
