import { Component } from '@angular/core';

import { Store } from '@ngrx/store'
import { UUID } from 'angular2-uuid';
import { ToDoState, ToDo, todoActions } from '@mfe-prototype/data-store';


@Component({
  selector: 'mfe-prototype-create-todo-entry',
  templateUrl : './app.remote-component.html',
  styleUrls : ['./app.remote-component.css']
})
export class RemoteEntryComponent {

  title = 'Please enter your task';

  constructor(private store: Store<ToDoState>) {}

  showAddTaskForm() {
    // this.isShow = !this.isShow;
    // reroute to home page.
  }

  onSubmit(submittedForm: { invalid: boolean | null; value: { title: string; description: string; }; }) {
    if (submittedForm.invalid) {
      return;
    }

    const todo: ToDo = {
      id: UUID.UUID(),
      title: submittedForm.value.title,
      description: submittedForm.value.description,
    };


    // this.store.pipe(
    //   select(areTodosLoaded),
    //   tap((todosLoaded) => {
    //     if (!todosLoaded) {
    //       this.store.dispatch(todoActions.todoLoaded({ todos: [todo] }));
    //     } else {
          
    //     }
    //   })
    // );

    this.store.dispatch(todoActions.createToDo({ todo }));
  }



}
