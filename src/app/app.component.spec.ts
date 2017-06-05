import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MetaModule } from '@nglibs/meta';

import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoComponent } from './todo/todo.component';
import { SpeechRecognitionService } from './shared/speech-recognition.service';
import { schema } from './db';
import { reducer } from './reducers/root.reducers';
import { TodoListEffects } from './effects/todo-list.effects';
import { SpeechRecognitionComponent } from './speech-recognition/speech-recognition.component';
import { TodoDescriptionComponent } from './todo/todo-description/todo-description.component';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TodoListComponent,
        TodoComponent,
        SpeechRecognitionComponent,
        TodoDescriptionComponent
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ]),
        RouterTestingModule.withRoutes([
         { path: '', component: TodoListComponent }
        ]),
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
