import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { todoReducer, toDosFeatureKey } from './todo.reducers';
import { ToDoEffects } from './todo.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(toDosFeatureKey, todoReducer),
    EffectsModule.forFeature([ToDoEffects]),
  ],
})
export class DataStoreModule {}
