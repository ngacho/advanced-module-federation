import { todoActions } from './todo.actions';
import { ToDo } from './model/todo.model';
import { ToDoService } from './sevice/to-do.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatMap, map, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent } from '@angular/common/http';

@Injectable()
export class ToDoEffects {
  constructor(private toDoService: ToDoService, private actions$: Actions) {}

  loadToDos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.loadToDos),
      concatMap(() => this.toDoService.getAllTodos()),
      map((todos: ToDo[]) => todoActions.todoLoaded({ todos: todos }))
    )
  );

  createToDo$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(todoActions.createToDo),
        concatMap((action) => this.toDoService.createToDo(action.todo))
      ),
    { dispatch: false }
  );

  deleteToDo$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(todoActions.deleteTodo),
        concatMap((action) => this.toDoService.deleteToDo(action.todoId))
      ),
    { dispatch: false }
  );

  updateToDos$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(todoActions.updateToDo),
        concatMap((action) =>
          this.toDoService.updateCourse(
            action.updatedTask.id,
            action.updatedTask.changes
          )
        )
      ),
    { dispatch: false }
  );
}
