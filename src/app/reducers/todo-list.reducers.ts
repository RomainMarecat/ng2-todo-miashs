import * as todoList from './../actions/todo-list.actions';
import { Todo } from './../shared/todo';


export interface State {
  todoList: ReadonlyArray<Todo>,
  activeTodo: Todo
}

const initialState: State = {
  todoList: [],
  activeTodo: {
    id: null,
    text: '',
    isCompleted: false
  }
};

export function reducer(state = initialState, action: todoList.Actions): State {
  switch (action.type) {
    case todoList.INIT_LIST_SUCCESS:
      return { ...state, todoList: action.payload };

    case todoList.DELETE_TODO_SUCCESS:
      return { ...state, todoList: action.payload.newList };

    case todoList.ADD_TODO_SUCCESS:
      return { ...state, todoList: [...state.todoList, action.payload.newTodo] };

    case todoList.CHANGE_STATUS_SUCCESS:
      return { ...state, todoList: action.payload.newList };

    case todoList.GET_TODO_ITEM_SUCCESS:
      return { ...state, activeTodo: action.payload.todoItem };

    default:
      return state;
  }
}

export const getTodoList = (state: State) => state.todoList;