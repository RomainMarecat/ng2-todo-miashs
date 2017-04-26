import { Injectable } from '@angular/core';
import { NF } from './nf';
import { TodoList } from './todo-list';
import { Todo } from './todo';
import { EventTodoList } from './event-todo-list';
import { TodoSerialization } from './todo-serialization';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class TodoListService {

  todos: Array<Todo>;


  data: Array<Todo> = [{
    id: 0,
    text: 'One',
    isCompleted: false
  }, {
    id: 1,
    text: 'Two',
    isCompleted: true
  }, {
    id: 2,
    text: 'Three',
    isCompleted: false
  }];

  // nf = new TodoList();

  // constructor() {
  //   const cbSaveData = () => {
  //   const serialization: TodoSerialization = [];
  //   this.nf.choses.forEach( c => serialization.push({texte: c.texte, fait: c.fait, date: c.date.toString()}));
  //     localStorage.setItem('todoListMiage', JSON.stringify(serialization));
  //   };

  //   this.nf.on('update', (nf: TodoList, eventName: string, eventValue: EventTodoList) => {
  //     if (eventValue.append) {
  //       const chose = eventValue.append;
  //       chose.on('update', cbSaveData);
  //     }
  //     if (eventValue.remove) {
  //       const chose = eventValue.remove;
  //       chose.off('update', cbSaveData);
  //     }
  //     cbSaveData();
  //   });

  //   const choses: TodoSerialization = <TodoSerialization>JSON.parse(localStorage.getItem('todoListMiage') || '[]');
  //   choses.forEach(c => {
  //     this.nf.Ajouter(c.texte, c.fait, new Date(c.date));
  //   });
  // }

  // getData(): Promise<TodoList> {
  //   return Promise.resolve(this.nf);
  // }




  // getTodoList(): Observable<Array<Todo>> {
  //   return Observable.of(this.todos).map(todo => todo);
  // }

  // addTodo(text: string): Observable<Todo> {
  //   const todo = {
  //     text: text,
  //     isCompleted: false
  //   } as Todo;

  //   return Observable.of(todo).map(todo => todo);
  // }

  // removeTodo(todo: Todo): Observable<ReadonlyArray<Todo>> {
  //   const todos = this.todos.filter((val: Todo) => {
  //     return todo.id !== val.id;
  //   });

  //   return Observable.of(todos).map(todo => todo);
  // }

  // toggleTodo(todo: Todo): Observable<ReadonlyArray<Todo>> {
  //   const todos = this.todos.map((val: Todo) => {
  //     if (val.id === todo.id) {
  //       todo.isCompleted = !todo.isCompleted;
  //     }
  //     return todo;
  //   });

  //   return Observable.of(todos).map(todo => todo);
  // }


  getTodoList(): Observable<Array<Todo>> {
    return Observable.of(this.data).map(res => res);
  }

  removeTodo(list: ReadonlyArray<Todo>, id: Number): Observable<ReadonlyArray<Todo>> {
    const newList = list.filter(item => item.id !== id);

    return Observable.of(newList).map(res => res);
  }

  addTodo(list: ReadonlyArray<Todo>, text: string): Observable<Todo> {
    const newTodo: Todo = {
      id: list.length,
      text: text,
      isCompleted: false
    };

    return Observable.of(newTodo).map(res => res);
  }

  changeStatus(list: ReadonlyArray<Todo>, id: Number) {
    const newList = list.map(item => {
      if (item.id === id) {
        return { ...item, isCompleted: !item.isCompleted };
      }
      return item;
    });

    return Observable.of(newList).map(res => res);
  }

  getTodoItem(list: ReadonlyArray<Todo>, id: Number) {
    const todoItem = list.filter(item => item.id === id);

    return Observable.of(todoItem[0]).map(res => res);
  }

}

