import { Component, OnInit, Input, ElementRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { TodoList } from './../shared/todo-list';
import { TodoListService } from './../shared/todo-list.service';
import { Todo } from './../shared/todo';
import { TodoFilter } from './../shared/todo-filter';
import { Store } from '@ngrx/store';
import * as reducer from './../reducers/root.reducers';
import * as actions from './../actions/todo-list.actions';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit {
  @Input() title: string;
  @ViewChild('newTodo') newTodo: ElementRef;
  toggle: boolean;
  filterAll: TodoFilter;
  filterCompleted: TodoFilter;
  filterActives: TodoFilter;
  currentFilter: TodoFilter;
  todos: Observable<ReadonlyArray<Todo>>;

  constructor(private store: Store<reducer.State>) {
    this.toggle = false;
    this.filterAll = () => true;
    this.filterCompleted = (c) => c.isCompleted;
    this.filterActives = (c) => !c.isCompleted;
    this.currentFilter = this.filterAll;
  }

  ngOnInit() {
    this.store.dispatch(new actions.InitListAction());
    this.todos = this.store.select(reducer.getTodoList);
  }

  getTodos(): Observable<Todo[]> {
    return this.todos.map((todos: Todo[]) =>
      todos.filter(this.currentFilter).sort((a, b) => a.id < b.id ? -1 : 1)
    );
  }

  getCountTodo(): Observable<number> {
    return this.todos.map((todos: Todo[]) =>
      todos.reduce((acc, chose) => acc + (chose.isCompleted ? 0 : 1), 0)
    );
  }

  getCountCompleted(): Observable<number> {
    return this.todos.map((todos: Todo[]) => {
      return todos.reduce((acc, chose) => acc + (chose.isCompleted ? 1 : 0), 0)
    });
  }

  disposeAll() {
    this.todos.map((todos: Todo[]) =>
      todos.filter(this.filterCompleted)
        .forEach(c => this.store.dispatch(new actions.DeleteTodoAction(c)))
    );
  }

  addTodo() {
    const todo = {
      text: this.newTodo.nativeElement.value,
      isCompleted: false
    } as Todo;
    this.store.dispatch(new actions.AddTodoAction(todo));
    this.newTodo.nativeElement.value = '';
  }

  toggleAllChange() {
    const check = true;
    this.todos.map((todos: Todo[]) => {
      return todos.forEach((c) => {
        this.store.dispatch(new actions.ChangeTodoStatus(Object.assign({}, c, {isCompleted: check})))
      });
    });
  }

  toggleAll(): Observable<boolean> {
    return this.todos.map((todos: Todo[]) => {
      const val = todos.reduce((acc, c) => acc && c.isCompleted, true);
      console.log(val);

      return val;
    });
  }
}
