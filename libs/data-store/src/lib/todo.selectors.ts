import { ToDoState, selectAllTodos, selectToDoIds } from "./todo.reducers";
import { ToDo } from "./model/todo.model";
import { createSelector, createFeatureSelector } from "@ngrx/store";

export const selectTodoState = createFeatureSelector<ToDoState>('todos');

/**
 * Using predefined selectAll (renamed as selectAllTodos) in reducers to retrieve
 * all todos.
 */
export const getTodos = createSelector(
    selectTodoState,
    selectAllTodos
);

/**
 * using have todos finished loading selector to check if the todo's are loaded
 * in the st
 */
export const areTodosLoaded = createSelector(
    selectTodoState,
    state => state?.todosFinishedLoading
)
