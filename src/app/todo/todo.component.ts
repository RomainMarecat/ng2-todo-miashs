import { Component, OnInit, Input, ElementRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Todo } from './../shared/todo';
import { Store } from '@ngrx/store';
import * as reducer from './../reducers/root.reducers';
import * as actions from './../actions/todo-list.actions';
import { Observable } from 'rxjs/Observable';
import { MdButton, MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { TodoDescriptionComponent } from './todo-description/todo-description.component';

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

  constructor(private store: Store<reducer.State>, public dialog: MdDialog) {
    this.editing = false;
  }

  ngOnInit() {
  }

  dispose() {
    this.store.dispatch(new actions.DeleteTodoAction(this.todo));
  }

  done(done: boolean) {
    this.store.dispatch(new actions.ChangeTodoStatus(
      Object.assign({}, this.todo, {isCompleted: done})));
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
    this.store.dispatch(new actions.ChangeTodoStatus(
      Object.assign({}, this.todo, {label: value})));
  }

  setText(value: string) {
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
