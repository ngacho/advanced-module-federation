import { ToDo } from "./model/todo.model";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { Action, createReducer, on } from "@ngrx/store";
import { todoActions } from "./todo.actions";
import { selectTodoState } from "./todo.selectors";

export const toDosFeatureKey = 'todos'

/**
 * Define the state of a course by extending the entity state.
 * Entity state maintains a list od ids and a dictionary of entities.
 * 
 * This custom property indicates whether or not the course have been loaded.
 */
export interface ToDoState extends EntityState<ToDo>{
    todosFinishedLoading : boolean;
}

export const selectToDoId = (todo: ToDo): string => todo.id;

/**
 * Creates an entity adapter that provides helper functions.
 * 
 * Adapter provides helper functions to add, update, remove entitites from entity state.
 */
export const todoAdapter : EntityAdapter<ToDo> = createEntityAdapter<ToDo>({
    selectId: selectToDoId
});

/**
 * Initial state provides a helper function to obtain the initial state.
 * 
 * It's set to false.
 */
export const initialState = todoAdapter.getInitialState({
    todosFinishedLoading : false
});

export const todoReducer = createReducer(
    initialState,
   
    on(todoActions.todoLoaded, (state, todoAction) => {
        return todoAdapter.setAll(
            todoAction.todos,
            {...state,  todosFinishedLoading : true}
        )
    }),


    on(todoActions.createToDo, (state, todoAction) => {
        return todoAdapter.addOne(todoAction.todo, state);
    }),

    on(todoActions.deleteTodo, (state, todoAction) => {
        return todoAdapter.removeOne(todoAction.todoId, state);
    }),

    on(todoActions.updateToDo, (state, todoAction) => {
        return todoAdapter.updateOne(todoAction.updatedTask, state);
    })

)

export function reducer(state: ToDoState | undefined, action: Action) {
    return todoReducer(state, action);
}

/**
 * Exports the adapter's predefined selectors. These will be used by the custom selectors.
 */
export const {
    selectAll : selectAllTodos, 
    selectIds : selectToDoIds
} = todoAdapter.getSelectors()

  