import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { select } from '@ngrx/store';
import { ToDoState, areTodosLoaded } from '@mfe-prototype/data-store';

@Component({
  selector: 'mfe-prototype-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  numTodos$ : Observable<number> = of(0);
  areTodosLoaded$ : Observable<boolean> = of(false)
  title = 'todo-dashboard';


  constructor(private store : Store<ToDoState>){

  }
  ngOnInit(): void {
    this.areTodosLoaded$ = this.store.pipe(select(areTodosLoaded))
    this.store.subscribe((state) => {
      const todoState = state as any;
      this.numTodos$ = of(todoState["todos"]["ids"].length);
    });
    

  }


}
