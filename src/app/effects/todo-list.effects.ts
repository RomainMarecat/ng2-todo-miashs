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
    .map((action: todoList.DeleteTodoAction) => action)
    .switchMap((action: todoList.DeleteTodoAction) =>
      this.db.executeWrite('todos', 'delete', [ action.payload ])
        .map((todos: Todo[]) => new todoList.DeleteTodoActionSuccess(todos))
    );

  @Effect()
  addTodo: Observable<Action> = this.actions$
    .ofType(todoList.ADD_TODO)
    .map((action: todoList.AddTodoAction) => action)
    .switchMap((action: todoList.AddTodoAction) =>
      this.db.insert('todos', [ action.payload ])
        .map((newTodo: Todo) => {
          console.log(newTodo)
          return new todoList.AddTodoActionSuccess(newTodo)
        })
    );

  @Effect()
  changeStatus: Observable<Action> = this.actions$
    .ofType(todoList.CHANGE_STATUS)
    .map((action: todoList.ChangeTodoStatus) => action)
    .switchMap((action: todoList.ChangeTodoStatus) =>
      this.db.executeWrite('todos', 'update', [ action.payload ])
        .map((todos: Todo[]) => new todoList.ChangeTodoStatusSuccess(todos))
    );
}