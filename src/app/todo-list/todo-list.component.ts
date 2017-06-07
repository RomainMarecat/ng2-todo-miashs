import { Component, OnInit, OnDestroy, Input, ElementRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { Todo } from './../shared/todo';
import { TodoFilter } from './../shared/todo-filter';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { SpeechRecognitionService } from './../shared/speech-recognition.service';
import { Angulartics2 } from 'angulartics2';
import * as reducer from './../reducers/root.reducers';
import * as actions from './../actions/todo-list.actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit, OnDestroy {
  @ViewChild('newTodo') newTodo: ElementRef;
  error: any;
  toggle: boolean;
  filterAll: TodoFilter;
  filterCompleted: TodoFilter;
  filterActives: TodoFilter;
  currentFilter: TodoFilter;
  todos: Observable<ReadonlyArray<Todo>>;
  iconRecord: string;

  constructor(private store: Store<reducer.State>,
    private speechRecognitionService: SpeechRecognitionService,
    private angulartics2: Angulartics2) {
    this.toggle = false;
    this.filterAll = () => true;
    this.filterCompleted = (c) => c.isCompleted;
    this.filterActives = (c) => !c.isCompleted;
    this.currentFilter = this.filterAll;
    this.iconRecord = 'keyboard_voice';
  }

  ngOnDestroy() {
    this.speechRecognitionService.unsubscribe();
  }

  activateSpeech(event: any) {
    this.iconRecord = 'settings_voice';
    this.speechRecognitionService.record()
    .subscribe(
      (value) => {
        if (value && value !== '') {
          if (this.newTodo.nativeElement.value !== '') {
            this.newTodo.nativeElement.value += ' ' + value;
          } else {
            this.newTodo.nativeElement.value = value;
          }
          this.angulartics2.eventTrack.next({ action: value, properties: { category: 'Speech Recognition' }});
          requestAnimationFrame(() => {
            this.newTodo.nativeElement.focus();
          });
        } else {
          throw new Error('Unrecognized voice');
        }
      },
      (error) => {
        this.error = error;
      },
      () => {
        this.iconRecord = 'keyboard_voice';
      });
  }

  ngOnInit() {
    this.angulartics2.eventTrack.next({ action: 'InitializeAllTodos', properties: { category: 'InitTodos' }});
    this.store.dispatch(new actions.InitListAction());
    this.todos = this.store.select(reducer.getTodoList);
  }

  getTodos(): Observable<Todo[]> {
    return this.todos.map((todos: Todo[]) =>
      todos.filter(this.currentFilter).sort((a, b) => a.id < b.id ? -1 : 1)
    );
  }

  getCountTodo(): Observable<number> {
    return this.todos.map((todos: Todo[]) =>
      todos.reduce((acc, chose) => acc + (chose.isCompleted ? 0 : 1), 0)
    );
  }

  getCountCompleted(): Observable<number> {
    return this.todos.map((todos: Todo[]) => {
      return todos.reduce((acc, chose) => acc + (chose.isCompleted ? 1 : 0), 0);
    });
  }

  disposeAll() {
    this.store.dispatch(new actions.DeleteTodosAction());
    this.angulartics2.eventTrack.next({ action: 'DeleteAllTodos', properties: { category: 'Delete' }});
  }

  addTodo() {
    if (this.newTodo.nativeElement.value !== '') {
      const todo = {
        text: this.newTodo.nativeElement.value,
        isCompleted: false,
        label: 'primary',
        description: ''
      } as Todo;
      this.store.dispatch(new actions.AddTodoAction(todo));
      this.angulartics2.eventTrack.next({ action: 'Add new todo ' + todo.text, properties: { category: 'AddTodo' }});
      this.newTodo.nativeElement.value = '';
    } else {
      this.newTodo.nativeElement.placeholder = 'Une note ne peut pas être vide';
      setTimeout(() => {
        this.newTodo.nativeElement.placeholder = 'Que faire ?';
      }, 5000);
    }
  }

  toggleAllChange() {
    this.toggle = !this.toggle;
    this.store.dispatch(new actions.ChangeTodoStatusAll(this.toggle));
  }

  toggleAll(): Observable<boolean> {
    return Observable.of(this.toggle);
  }
}
