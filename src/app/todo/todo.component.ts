import { Component, OnInit, Input, ElementRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Todo } from './../shared/todo';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { MdButton, MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { TodoDescriptionComponent } from './todo-description/todo-description.component';
import { Angulartics2 } from 'angulartics2';
import * as reducer from './../reducers/root.reducers';
import * as actions from './../actions/todo-list.actions';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent implements OnInit {
  @Input() todo: Todo;
  @ViewChild('newText') newTextInput: ElementRef;
  editing: boolean;

  constructor(private store: Store<reducer.State>,
    public dialog: MdDialog, private angulartics2: Angulartics2) {
    this.editing = false;
  }

  ngOnInit() {
  }

  dispose() {
    this.angulartics2.eventTrack.next({ action: 'Todo delete' + this.todo.text, properties: { category: 'DeleteTodo' }});
    this.store.dispatch(new actions.DeleteTodoAction(this.todo));
  }

  done(done: boolean) {
    this.store.dispatch(new actions.ChangeTodoStatus(
      Object.assign({}, this.todo, {isCompleted: done})));
    this.angulartics2.eventTrack.next({ action: 'Todo change isCompleted to ' + done, properties: { category: 'ChangeTodoStatus' }});
  }

  edit() {
    this.editing = true;
    requestAnimationFrame(() => {
      this.newTextInput.nativeElement.focus();
    });
  }

  setLabel() {
    let value: string;
    if (this.todo.label === 'primary') {
      value = 'warn';
    } else if (this.todo.label === 'warn') {
      value = 'accent';
    } else if (this.todo.label === 'accent') {
      value = 'primary';
    }
    this.angulartics2.eventTrack.next({ action: 'Todo change label to ' + value, properties: { category: 'ChangeTodoLabel' }});
    this.store.dispatch(new actions.ChangeTodoStatus(
      Object.assign({}, this.todo, {label: value})));
  }

  setText(value: string) {
    this.angulartics2.eventTrack.next({ action: 'Todo change text to ' + value, properties: { category: 'ChangeTodoText' }});
    this.store.dispatch(new actions.ChangeTodoStatus(
      Object.assign({}, this.todo, {text: value})));
    this.editing = false;
  }

  openDialogDescription() {
    const mdDialogConfig = new MdDialogConfig();
    mdDialogConfig.data = {
      todo: this.todo
    };
    const dialogRef = this.dialog.open(TodoDescriptionComponent, mdDialogConfig);
    dialogRef.afterClosed().subscribe((description: string|boolean) => {
      if (description !== false) {
        this.angulartics2.eventTrack.next({ action: 'Todo change description to ' + description, properties: { category: 'ChangeTodoDescription' }});
        this.store.dispatch(new actions.ChangeTodoStatus(
          Object.assign({}, this.todo, {description: description})));
      }
    });
  }

  isSmallDevice(): boolean {
    if (window && window.innerWidth) {
      if (window.innerWidth <= 600) {
        return true;
      }
    }
    return false;
  }
}
