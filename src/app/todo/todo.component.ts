import { Component, OnInit, Input, ElementRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Todo } from './../shared/todo';
import { Store } from '@ngrx/store';
import * as reducer from './../reducers/root.reducers';
import * as actions from './../actions/todo-list.actions';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent implements OnInit {
  @Input() todo: Todo;
  @ViewChild('newText') newTextInput: ElementRef;
  editing: boolean;

  constructor(private store: Store<reducer.State>) {
    this.editing = false;
  }

  ngOnInit() {
  }

  dispose() {
    this.store.dispatch(new actions.DeleteTodoAction(this.todo));
  }

  fait(fait: boolean) {
    this.store.dispatch(new actions.ChangeTodoStatus(
      Object.assign({}, this.todo, {isCompleted: fait})));
  }

  edit() {
    this.editing = true;
    requestAnimationFrame(() => {
      this.newTextInput.nativeElement.focus();
    });
  }

  setText(value) {
    this.store.dispatch(new actions.ChangeTodoStatus(
      Object.assign({}, this.todo, {text: value})));
    this.editing = false;
  }
}
