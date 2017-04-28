import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { Database } from '@ngrx/db';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';
import { Todo } from './../shared/todo';
import * as todoList from './../actions/todo-list.actions';

@Injectable()
export class TodoListEffects {
  constructor(private actions$: Actions,
    private db: Database) { }

  @Effect({ dispatch: false })
    openDB$: Observable<any> = defer(() =>
      this.db.open('todo_app')
    );

  @Effect()
  initTodoList: Observable<Action> = this.actions$
    .ofType(todoList.INIT_LIST)
    .startWith(new todoList.InitListAction())
    .switchMap(() =>
      this.db.query('todos')
        .toArray()
        .map((todos: Array<Todo>) =>
          new todoList.InitListActionSuccess(todos))
    );

  @Effect()
  deleteTodo: Observable<Action> = this.actions$
    .ofType(todoList.DELETE_TODO)
    .map((action: todoList.DeleteTodoAction) => action.payload)
    .mergeMap((todo: Todo) =>
      this.db.executeWrite('todos', 'delete', [ todo.id ])
      .map(() =>
        new todoList.DeleteTodoActionSuccess(todo)
      )
    );

  @Effect()
  deleteTodos: Observable<Action> = this.actions$
    .ofType(todoList.DELETE_TODOS)
    .map((action: todoList.DeleteTodosAction) => action)
    .mergeMap(() =>
      this.db.query('todos')
      .toArray()
      .map((todos: Todo[]) =>
        todos.filter((todo: Todo) => todo.isCompleted)
      )
      .mergeMap((todos: Todo[]) =>
        this.db.executeWrite(
          'todos',
          'delete',
          todos.reduce((prev, current: Todo) =>
            prev.concat(current.id), [])
        )
        .map(() =>
          new todoList.DeleteTodosActionSuccess(todos)
        )
      )
    );

  @Effect()
  addTodo: Observable<Action> = this.actions$
    .ofType(todoList.ADD_TODO)
    .map((action: todoList.AddTodoAction) => action.payload)
    .mergeMap((todo: Todo) =>
      this.db.insert('todos', [ todo ])
        .map((t: Todo) => t)
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
      .map((t: Todo) => t)
      .mergeMap(() =>
        this.db.insert('todos', [ todo ])
        .map(() =>
          new todoList.ChangeTodoStatusSuccess(todo)
        )
        .catch((error) =>
          of(new todoList.ChangeTodoStatusFail(todo))
        ))
    );

  @Effect()
  changeStatusAll: Observable<Action> = this.actions$
    .ofType(todoList.CHANGE_STATUS_ALL)
    .map((action: todoList.ChangeTodoStatusAll) => action.payload)
    .mergeMap((toggle: boolean) =>
      this.db.query('todos')
      .toArray()
      .map((todos: Todo[]) =>
        todos.map((todo: Todo) => {
          todo.isCompleted = toggle;
          return todo;
        })
      )
      .mergeMap((todos: Todo[]) =>
        this.db.executeWrite(
          'todos',
          'delete',
          todos.reduce((prev, current: Todo) =>
            prev.concat(current.id), [])
        )
        .map(() =>
          todos
        )
      )
      .mergeMap((todos: Todo[]) =>
        this.db.insert(
          'todos',
          todos
        )
        .map(() =>
          new todoList.ChangeTodoStatusAllSuccess(todos, toggle)
        )
      )
    );
}
