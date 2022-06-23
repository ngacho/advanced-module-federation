import { Injectable } from '@angular/core';
import { of, tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ToDo } from '../model/todo.model';
@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  todos: Observable<ToDo[]> = of([
    {
      id: 'ad443cfb-c96b-42fd-848b-ad449ef48b72',
      title: 'Complete guide to Ngrx',
      description: 'Write the complete guide to NgRx',
    },
    {
      id: '1a87969a-4aec-4213-b589-b73a0d32c114',
      title: 'Fix Null value bug',
      description: 'Investigate what the issue is and fix the bug',
    },
    {
      id: 'd322a9a8-047c-43ad-9cf5-364dde9289f0',
      title: 'Cook dinner',
      description: 'Prepare and cook dinner',
    },
  ]);

  getAllTodos(): Observable<ToDo[]> {
    return this.todos;
  }

  updateCourse(id: string | number, changes: Partial<ToDo>): Observable<any> {
    return of(id);
  }

  deleteToDo(todoId: string): Observable<any> {
    return of(todoId);
  }

  createToDo(todo: ToDo): Observable<ToDo> {
    // created todo
    // add to todo list
    this.todos.pipe(
      tap((todoList) => {
        todoList.push(todo);
      })
    );

    return of(todo);
  }
}
