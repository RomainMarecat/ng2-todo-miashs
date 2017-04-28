import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DBModule } from '@ngrx/db';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MaterialModule, MdButtonModule } from '@angular/material';

import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoComponent } from './todo/todo.component';
import { SpeechRecognitionService } from './shared/speech-recognition.service';
import { schema } from './db';
import { reducer } from './reducers/root.reducers';
import { TodoListEffects } from './effects/todo-list.effects';
import { SpeechRecognitionComponent } from './speech-recognition/speech-recognition.component';
import 'hammerjs';
import { TodoDescriptionComponent } from './todo/todo-description/todo-description.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoComponent,
    SpeechRecognitionComponent,
    TodoDescriptionComponent
  ],
  exports: [
    TodoListComponent,
    TodoComponent,
  ],
  entryComponents: [
    TodoDescriptionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    AppRoutingModule,
    MaterialModule.forRoot(),
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(TodoListEffects),
    DBModule.provideDB(schema)
  ],
  providers: [
    SpeechRecognitionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
