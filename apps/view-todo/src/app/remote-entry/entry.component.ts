import { Component } from '@angular/core';
import { Update } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { distinctUntilChanged, filter, first, tap } from 'rxjs';
import { UUID } from 'angular2-uuid';
import {
  areTodosLoaded,
  ToDo,
  todoActions,
  ToDoState,
  getTodos,
} from '@mfe-prototype/data-store';
import { of } from 'rxjs';

@Component({
  selector: 'mfe-prototype-view-todo-entry',
  templateUrl: './app.viewtodo-component.html',
  styleUrls: ['./app.viewtodo-component.css'],
})
export class RemoteEntryComponent {
  title = 'Your Todo List';

  isUpdating = false;

  toDoToBeUpdated: ToDo = {
    id: '',
    title: '',
    description: '',
  };

  todos$: Observable<ToDo[]> = new Observable<ToDo[]>();

  mfeTodosLoad$: Observable<boolean> = of(false);

  constructor(private store: Store<ToDoState>) {}

  ngOnInit(): void {
    
    this.mfeTodosLoad$.pipe(distinctUntilChanged()).subscribe((value) => {
      if (!value) {
        this.store.dispatch(todoActions.loadToDos());
      }
    });

    // see how the whole store looks like
    this.store.subscribe((state) => {
      const todoData = state as any;
      // this.numTodos$ = of(todoData['todos'].ids.length);
    });
    this.store.dispatch(todoActions.loadToDos());

    this.mfeTodosLoad$ = this.store.pipe(select(areTodosLoaded));

    this.todos$ = this.store.pipe(select(getTodos));
  }

  showUpdateTaskForm(todo: ToDo) {
    if (!this.isUpdating) {
      this.toDoToBeUpdated = { ...todo };
      this.isUpdating = !this.isUpdating;
    } else {
      console.log("Please finish or cancel the task you're updating");
    }
  }

  hideUpdateTaskForm() {
    this.isUpdating = false;
  }

  updateTask(updatedTaskDetailForm: { value: Partial<ToDo> }) {
    // eslint-disable-next-line prefer-const
    let updatedTask: Update<ToDo> = {
      id: this.toDoToBeUpdated.id,
      changes: {
        ...this.toDoToBeUpdated,
        ...updatedTaskDetailForm.value,
      },
    };

    this.store.dispatch(todoActions.updateToDo({ updatedTask }));

    this.isUpdating = false;
    this.toDoToBeUpdated = { id: '', title: '', description: '' };
  }

  addRandomTask(){

    const randomTask : ToDo = {
      id: UUID.UUID(),
      title: "Task Random " + (Math.random() * 10),
      description: "Describe task",
    };

    this.store.dispatch(todoActions.createToDo({todo : randomTask}))

  }

  deleteTask(taskId: string) {
    this.store.dispatch(todoActions.deleteTodo({ todoId: taskId }));
  }
}
