import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { Database } from '@ngrx/db';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';

import { TodoListService } from './../shared/todo-list.service';
import { Todo } from './../shared/todo';
import * as todoList from './../actions/todo-list.actions';

@Injectable()
export class TodoListEffects {
  constructor(private actions$: Actions, private todoListService: TodoListService, private db: Database) { }

  @Effect({ dispatch: false })
    openDB$: Observable<any> = defer(() => {
      return this.db.open('todo_app');
    });

  @Effect()
  initTodoList: Observable<Action> = this.actions$
    .ofType(todoList.INIT_LIST)
    .startWith(new todoList.InitListAction())
    .switchMap(() =>
      this.db.query('todos')
        .toArray()
        .map((todos: Array<Todo>) => new todoList.InitListActionSuccess(todos))
    );

  @Effect()
  deleteTodo: Observable<Action> = this.actions$
    .ofType(todoList.DELETE_TODO)
    .map((action: todoList.DeleteTodoAction) => action.payload)
    .mergeMap((todo: Todo) => {
      return this.db.executeWrite('todos', 'delete', [ todo.id ])
        .map(() => {
          return new todoList.DeleteTodoActionSuccess(todo);
        })
    });

  @Effect()
  deleteDoneTodo: Observable<Action> = this.actions$
    .ofType(todoList.DELETE_DONE_TODO)
    .map((action: todoList.DeleteDoneTodoAction) => {
      action.payload.forEach(todos => {
        todo => {
          this.db.executeWrite('todos', 'delete', [ todo.id ])
        }
      });
      return new todoList.DeleteDoneTodoActionSuccess(action.payload);
    });

  @Effect()
  addTodo: Observable<Action> = this.actions$
    .ofType(todoList.ADD_TODO)
    .map((action: todoList.AddTodoAction) => action.payload)
    .mergeMap((todo: Todo) =>
      this.db.insert('todos', [ todo ])
        .map((todo) => todo)
        .mergeMap(() => this.db.query('todos')
          .toArray()
          .map((todos: Todo[]) =>
            new todoList.AddTodoActionSuccess(todos))
        )
    );

  @Effect()
  changeStatus: Observable<Action> = this.actions$
    .ofType(todoList.CHANGE_STATUS)
    .map((action: todoList.ChangeTodoStatus) => action.payload)
    .mergeMap((todo: Todo) =>
      this.db.executeWrite('todos', 'delete', [ todo.id ])
      .map((todo: Todo) => todo)
      .mergeMap(() =>
        this.db.insert('todos', [ todo ])
        .map(() =>  {
          return new todoList.ChangeTodoStatusSuccess(todo);
        })
        .catch((error) => {
          return of(new todoList.ChangeTodoStatusFail(todo))
        }))
    );
}