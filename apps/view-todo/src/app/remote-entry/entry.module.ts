import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { RemoteEntryComponent } from './entry.component';
import { StoreModule } from '@ngrx/store';
import { DataStoreModule, todoReducer } from '@mfe-prototype/data-store';

const routes = [{ path: '', component: RemoteEntryComponent }];

@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [
    CommonModule,
    FormsModule,
    DataStoreModule,
    // StoreModule.forFeature('todo-host', todoReducer),
    RouterModule.forChild(routes),
  ],
  providers: [],
})
export class RemoteEntryModule {}
