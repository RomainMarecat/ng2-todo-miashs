import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { TodoList } from './../shared/todo-list';
import { TodoListService } from './../shared/todo-list.service';
import { Todo } from './../shared/todo';
import { TodoFilter } from './../shared/todo-filter';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  @Input() title: string;
  @ViewChild('newTodo') newTodo: ElementRef;
  public nf: TodoList;
  private choses: Todo[];
  toggle: boolean;
  filterAll: TodoFilter;
  filterCompleted: TodoFilter;
  filterActives: TodoFilter;
  currentFilter: TodoFilter;

  constructor (private todoListService: TodoListService) {
    this.choses = [];
    this.toggle = false;
    this.filterAll = () => true;
    this.filterCompleted = (c) => c.fait;
    this.filterActives = (c) => !c.fait;
    this.currentFilter = this.filterAll;
  }

  ngOnInit() {
    this.todoListService.getData().then((nf) => {
      this.nf = nf;
      this.choses = nf.choses;
    });
  }

  getChoses(): Todo[] {
    return this.choses.filter(this.currentFilter);
  }

  getCountTodo() {
    return this.choses.reduce((acc, chose) => {
      return acc + (chose.fait ? 0 : 1);
    }, 0);
  }

  getCountCompleted() {
    return this.choses.reduce((acc, chose) => {
      return acc + (chose.fait ? 1 : 0);
    }, 0);
  }

  disposeAll() {
    return this.choses.filter(this.filterCompleted).forEach(c => c.dispose());
  }

  addTodo() {
    this.nf.Ajouter(this.newTodo.nativeElement.value);
    this.newTodo.nativeElement.value="";
  }

  toggleAllChange() {
    const check = !this.toggleAll();
    this.choses.forEach((c) => c.Fait(check));
  }

  toggleAll(): boolean {
    return this.choses.reduce((acc, c) => acc && c.fait, true);
  }
}
