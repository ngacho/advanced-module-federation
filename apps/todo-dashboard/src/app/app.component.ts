import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { select } from '@ngrx/store';
import { ToDoState, areTodosLoaded, todoActions } from '@mfe-prototype/data-store';

@Component({
  selector: 'mfe-prototype-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  numTodos$ : Observable<number>; // = of(0);
  areTodosLoaded$: Observable<boolean>; // = of(false)
  title = 'todo-dashboard';


  constructor(private store : Store<ToDoState>){
    this.areTodosLoaded$ = this.store.pipe(select(areTodosLoaded));
    this.numTodos$ = of(0);

  }
  ngOnInit(): void {

    this.areTodosLoaded$.subscribe((value) => {
      if(!value) {
        console.log('No todos');
        this.store.dispatch(todoActions.loadToDos());
      }
    });
    
    this.store.subscribe((state) => {
      const todoState = state as any;
      console.log("App Component: " + todoState["todos"]["ids"].length);
      this.numTodos$ = of(todoState?.["todos"]["ids"].length) || of(0);
     });
    

  }


}
