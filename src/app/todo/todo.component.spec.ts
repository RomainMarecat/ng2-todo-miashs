import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { TodoComponent } from './todo.component';
import { TodoDescriptionComponent } from './todo-description/todo-description.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DBModule } from '@ngrx/db';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { schema } from './../db';
import { reducer } from './../reducers/root.reducers';
import { TodoListEffects } from './../effects/todo-list.effects';
import { Angulartics2 } from 'angulartics2';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodoComponent,
        TodoDescriptionComponent
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        RouterTestingModule.withRoutes([
         { path: '', component: TodoComponent }
        ]),
        StoreModule.provideStore(reducer),
        StoreDevtoolsModule.instrumentOnlyWithExtension(),
        EffectsModule.run(TodoListEffects),
        DBModule.provideDB(schema)
      ],
      providers: [
        Angulartics2
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
