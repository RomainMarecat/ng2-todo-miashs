import { Action } from '@ngrx/store';
import { Todo } from './../shared/todo';

export const INIT_LIST =                  '[TodoList] List initial loading';
export const INIT_LIST_SUCCESS =          '[TodoList] List initial loading success';
export const DELETE_TODO =                '[TodoList] Delete todo';
export const DELETE_TODO_SUCCESS =        '[TodoList] Delete todo success';
export const DELETE_TODOS =               '[TodoList] Delete todos';
export const DELETE_TODOS_SUCCESS =       '[TodoList] Delete todos success';
export const ADD_TODO =                   '[TodoList] Add todo';
export const ADD_TODO_SUCCESS =           '[TodoList] Add todo success';
export const CHANGE_STATUS =              '[TodoList] Change status';
export const CHANGE_STATUS_SUCCESS =      '[TodoList] Change status success';
export const CHANGE_STATUS_FAIL =         '[TodoList] Change status fail';
export const CHANGE_STATUS_ALL =          '[TodoList] Change status all';
export const CHANGE_STATUS_ALL_SUCCESS =  '[TodoList] Change status all success';

export class InitListAction implements Action {
  type = INIT_LIST;
  payload: Todo = {} as Todo;

  constructor() { }
}

export class InitListActionSuccess implements Action {
  type = INIT_LIST_SUCCESS;

  constructor(public payload: Todo[]) { }
}

export class DeleteTodoAction implements Action {
  type = DELETE_TODO;

  constructor(public payload: Todo) { }
}

export class DeleteTodoActionSuccess implements Action {
  type = DELETE_TODO_SUCCESS;

  constructor(public payload: Todo) { }
}

export class DeleteTodosAction implements Action {
  type = DELETE_TODOS;
  payload: Todo = {} as Todo;

  constructor() { }
}

export class DeleteTodosActionSuccess implements Action {
  type = DELETE_TODOS_SUCCESS;

  constructor(public payload: Todo[]) { }
}

export class AddTodoAction implements Action {
  type = ADD_TODO;

  constructor(public payload: Todo) { }
}

export class AddTodoActionSuccess implements Action {
  type = ADD_TODO_SUCCESS;

  constructor(public payload: Todo[]) { }
}

export class ChangeTodoStatus implements Action {
  type = CHANGE_STATUS;

  constructor(public payload: Todo) { }
}

export class ChangeTodoStatusSuccess implements Action {
  type = CHANGE_STATUS_SUCCESS;

  constructor(public payload: Todo) { }
}

export class ChangeTodoStatusFail implements Action {
  type = CHANGE_STATUS_FAIL;

  constructor(public payload: Todo) { }
}

export class ChangeTodoAllStatus implements Action {
  type = CHANGE_STATUS_ALL;
  payload: Todo = {} as Todo;

  constructor() { }
}

export class ChangeTodoStatusAllSuccess implements Action {
  type = CHANGE_STATUS_ALL_SUCCESS;

  constructor(public payload: Todo[]) { }
}

export type Actions
  = InitListAction
  | InitListActionSuccess
  | DeleteTodoAction
  | DeleteTodoActionSuccess
  | DeleteTodosAction
  | DeleteTodosActionSuccess
  | AddTodoAction
  | AddTodoActionSuccess
  | ChangeTodoStatus
  | ChangeTodoStatusSuccess
  | ChangeTodoStatusFail
  | ChangeTodoAllStatus
  | ChangeTodoStatusAllSuccess;
