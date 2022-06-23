import { ToDo } from "./model/todo.model";
import { createAction, props } from "@ngrx/store";
import { Update } from "@ngrx/entity";

export const loadToDos = createAction(
    '[ToDo list] Load Todo via Service'
);

/**
 * Action dispatched by the effect to inform the store that the todos have been loaded well.
 */
export const todoLoaded = createAction(
    '[ToDo Effect] Todo List Loaded successfully',
    props<{todos : ToDo[]}>()
);

export const createToDo = createAction(
    '[Create Todo Component] Create To Do',
    props<{todo : ToDo}>()
);

export const deleteTodo = createAction(
    '[ToDo list operations] Delete Todo',
    props<{todoId : string}>()
);

/**
 * Update To do accepts a payload of type Update<ToDo>
 * Update is provided by NgRx entity to help with partial updates.
 */
export const updateToDo = createAction(
    '[ToDo list operations] Update todos',
    props<{updatedTask : Update<ToDo>}>()
);


export const todoActions = {
    loadToDos,
    todoLoaded,
    createToDo,
    deleteTodo,
    updateToDo
}