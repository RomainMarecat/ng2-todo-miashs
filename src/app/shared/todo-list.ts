import { NF } from './nf';
import { Todo } from './todo';
import { NfTodoListCallback } from './nf-todo-list-callback';

export class TodoList {
  // choses: Todo[];

  // constructor() {
  //   super();
  //   this.choses = [];
  // }

  // Ajouter(texte: string, fait: boolean = false, date: Date = null): this {
  //   const chose = new Todo(texte, this, fait, date);
  //   this.choses.push( chose );
  //   this.emit('update', {append: chose});

  //   return this;
  // }

  // Retirer(chose: Todo): this {
  //   this.choses.splice(this.choses.indexOf(chose), 1);
  //   this.emit('update', {remove: chose});

  //   return this;
  // }

  // on(eventName: 'update', cb: NfTodoListCallback): this {
  //   return super.on(eventName, cb);
  // }

  // off(eventName: 'update', cb: NfTodoListCallback): this {
  //   return super.off(eventName, cb);
  // }
}
