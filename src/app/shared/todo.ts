// import { NF } from './nf';
import { TodoList } from './todo-list';
// import { NFTodoCallback } from './nf-todo-callback';

export class Todo {
  // readonly liste: TodoList;
  // readonly date: Date;
  id: number;
  text: string;
  isCompleted: boolean;

  // constructor(texte: string, liste: TodoList, fait: boolean = false, date: Date = null) {
  //   super();
  //   this.texte = texte;
  //   this.date = date || new Date(Date.now());
  //   this.fait = fait || false;
  //   this.liste = liste;
  // }

  // dispose() {
  //   this.liste.Retirer(this);
  // }

  // Texte(texte: string) {
  //   this.texte = texte;
  //   this.emit('update', {texte: texte});
  //   return this;
  // }

  // Fait(fait: boolean) {
  //   this.fait = fait;
  //   this.emit('update', {fait: fait});
  //   return this;
  // }

  // on(eventName: 'update', cb: NFTodoCallback): this {
  //   return super.on(eventName, cb);
  // }

  // off(eventName: 'update', cb: NFTodoCallback): this {
  //   return super.off(eventName, cb);
  // }
}
