import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemoteEntryComponent } from './entry.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataStoreModule } from '@mfe-prototype/data-store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { toDosFeatureKey, todoReducer, ToDoEffects } from '@mfe-prototype/data-store';



const routes = [{ path: '', component: RemoteEntryComponent}];

@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [
    CommonModule,
    FormsModule,
    DataStoreModule,
    RouterModule.forChild(routes),
  ],
  providers: [],
})
export class RemoteEntryModule {}
