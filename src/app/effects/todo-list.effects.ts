import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { TodoListService } from './../shared/todo-list.service';
import { Todo } from './../shared/todo';
import * as todoList from './../actions/todo-list.actions';

@Injectable()
export class TodoListEffects {
  constructor(private actions$: Actions, private todoListService: TodoListService) { }

  @Effect()
  initTodoList: Observable<Action> = this.actions$
    .ofType(todoList.INIT_LIST)
    .map((action: todoList.InitListAction) => action)
    .switchMap(() => {
      return this.todoListService.getTodoList()
        .map((newList: ReadonlyArray<Todo>) => {
          return new todoList.InitListActionSuccess({newList});
        });
    });

  @Effect()
  deleteTodo: Observable<Action> = this.actions$
    .ofType(todoList.DELETE_TODO)
    .map((action: todoList.DeleteTodoAction) => action)
    .switchMap((action: todoList.DeleteTodoAction) => {
      return this.todoListService.removeTodo(action.list, action.id)
        .map((newList: ReadonlyArray<Todo>) => {
          return new todoList.DeleteTodoActionSuccess({newList});
        });
    });

  @Effect()
  addTodo: Observable<Action> = this.actions$
    .ofType(todoList.ADD_TODO)
    .map((action: todoList.AddTodoAction) => action)
    .switchMap((action: todoList.AddTodoAction) => {
      return this.todoListService.addTodo(action.list, action.text)
        .map((newTodo: Todo) => {
          return new todoList.AddTodoActionSuccess({newTodo});
        })
    });

  @Effect()
  changeStatus: Observable<Action> = this.actions$
    .ofType(todoList.CHANGE_STATUS)
    .map((action: todoList.ChangeTodoStatus) => action)
    .switchMap((action: todoList.ChangeTodoStatus) => {
      return this.todoListService.changeStatus(action.list, action.id)
        .map((newList: ReadonlyArray<Todo>) => {
          return new todoList.ChangeTodoStatusSuccess({newList});
        });
    });

  @Effect()
  getTodoItem: Observable<Action> = this.actions$
    .ofType(todoList.GET_TODO_ITEM)
    .map((action: todoList.GetTodoItem) => action)
    .switchMap((action: todoList.GetTodoItem) => {
      return this.todoListService.getTodoItem(action.list, action.id)
        .map((todoItem: Todo) => {
          return new todoList.GetTodoItemSuccess({todoItem});
        });
    });
}