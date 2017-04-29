import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { MdDialogRef, MdDialogConfig } from '@angular/material';
import { Todo } from './../../shared/todo';

@Component({
  selector: 'app-todo-description',
  templateUrl: './todo-description.component.html',
  styleUrls: ['./todo-description.component.scss']
})
export class TodoDescriptionComponent implements OnInit {
  todo: Todo;
  editing: boolean;
  @ViewChild('newDescription') newDescriptionInput: ElementRef;

  constructor(public dialogRef: MdDialogRef<TodoDescriptionComponent>) { }

  ngOnInit() {
    if (this.dialogRef
      && this.dialogRef._containerInstance
      && this.dialogRef._containerInstance.dialogConfig
      && this.dialogRef._containerInstance.dialogConfig.data
      && this.dialogRef._containerInstance.dialogConfig.data.todo) {
      this.todo = this.dialogRef._containerInstance.dialogConfig.data.todo as Todo;
    }
  }

  setDescription(description: string) {
    this.todo = Object.assign({}, this.todo, {description: description});
    this.editing = false;
  }

  edit() {
    this.editing = true;
    requestAnimationFrame(() => {
      this.newDescriptionInput.nativeElement.focus();
    });
  }

  saveAndClose() {
    if (typeof this.newDescriptionInput !== 'undefined') {
      this.setDescription(this.newDescriptionInput.nativeElement.value);
    }
    this.dialogRef.close(this.todo.description);
  }

}
