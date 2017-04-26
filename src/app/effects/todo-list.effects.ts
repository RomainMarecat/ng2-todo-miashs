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
    .switchMap((action: todoList.DeleteTodoAction) => {


      return this.db.executeWrite('todos', 'delete', [ action.payload.id ])
        .map(() => new todoList.DeleteTodoActionSuccess(action.payload))
    });

  @Effect()
  addTodo: Observable<Action> = this.actions$
    .ofType(todoList.ADD_TODO)
    .switchMap((action: todoList.AddTodoAction) =>
      this.db.insert('todos', [ action.payload ])
        .map((newTodo: Todo) => {
          console.log(newTodo);
          return new todoList.AddTodoActionSuccess(newTodo)
        })
    );

  @Effect()
  changeStatus: Observable<Action> = this.actions$
    .ofType(todoList.CHANGE_STATUS)
    .map((action: todoList.ChangeTodoStatus) => action)
    .switchMap((action: todoList.ChangeTodoStatus) => {
      console.log(action.payload);
      return this.db.executeWrite('todos', 'update', [ action.payload.id ])
        .map((todo: Todo) =>  {
          console.log(todo);
          return new todoList.ChangeTodoStatusSuccess(todo);
        })
      }
    );
}