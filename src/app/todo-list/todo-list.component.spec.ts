import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { TodoListComponent } from './todo-list.component';
import { TodoComponent } from './../todo/todo.component';
import { TodoDescriptionComponent } from './../todo/todo-description/todo-description.component';
import { SpeechRecognitionComponent } from './../speech-recognition/speech-recognition.component';
import { SpeechRecognitionService } from './../shared/speech-recognition.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DBModule } from '@ngrx/db';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { schema } from './../db';
import { reducer } from './../reducers/root.reducers';
import { TodoListEffects } from './../effects/todo-list.effects';
import { Angulartics2 } from 'angulartics2';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodoListComponent,
        TodoComponent,
        TodoDescriptionComponent,
        SpeechRecognitionComponent
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        RouterTestingModule.withRoutes([
         { path: '', component: TodoListComponent }
        ]),
        StoreModule.provideStore(reducer),
        StoreDevtoolsModule.instrumentOnlyWithExtension(),
        EffectsModule.run(TodoListEffects),
        DBModule.provideDB(schema)
      ],
      providers: [
        SpeechRecognitionService,
        Angulartics2
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
