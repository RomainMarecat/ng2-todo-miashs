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
      return { ...state, todoList: action.payload as Todo[] };

    case todoList.DELETE_TODO_SUCCESS:
      console.log(state);
      console.log(action.payload);
      return {
        ...state,
        todoList: state.todoList
        .filter((v: Todo) => v !== action.payload) as Todo[]
      };

    case todoList.ADD_TODO_SUCCESS:
      console.log(state);
      console.log(action.payload);
      return { ...state, todoList: action.payload as Todo[] };

    case todoList.CHANGE_STATUS_SUCCESS:
      const todo = action.payload as Todo;
      return {
        ...state,
        todoList: [...state.todoList
        .filter((t: Todo) => todo.id !== t.id),
        action.payload] as Todo[]
       };

    default:
      return state;
  }
}

export const getTodoList = (state: State) => state.todoList;