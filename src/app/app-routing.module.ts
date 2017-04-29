import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { MetaGuard } from '@nglibs/meta';

const routes: Routes = [
  {
    path: '',
    component: TodoListComponent,
    canActivate: [MetaGuard],
    data: {
      meta: {
        title: 'Todo List with Angular2 and ngrx/store',
        description: 'A Todo app example featuring ngrx/store - RxJS powered state management inspired by Redux for Angular apps',
        publisher: 'Romain Marecat',
        author: 'Romain Marecat'
      }
    }
  },
  {
    path: '**',
    component: TodoListComponent,
    canActivate: [MetaGuard],
    data: {
      meta: {
        title: 'Todo List with Angular2 and ngrx/store',
        description: 'A Todo app example featuring ngrx/store - RxJS powered state management inspired by Redux for Angular apps',
        publisher: 'Romain Marecat',
        author: 'Romain Marecat'
      }
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
