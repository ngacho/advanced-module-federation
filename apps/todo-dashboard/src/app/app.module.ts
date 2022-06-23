import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { loadRemoteModule } from '@nrwl/angular/mfe';
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import {
  DataStoreModule,
  todoReducer,
  toDosFeatureKey,
} from '@mfe-prototype/data-store';
import { EffectsModule } from '@ngrx/effects';

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    console.log('shell state', state);
    console.log('shell action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [debug];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers,
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictActionSerializability: true,
          strictStateSerializability: true,
        },
      }
    ),
    EffectsModule.forRoot(),
    DataStoreModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/view-todo', pathMatch: 'full' },
      {
        path: 'view-todo',
        loadChildren: () =>
          loadRemoteModule('view-todo', './Module').then(
            (m) => m.RemoteEntryModule
          ),
      },
      {
        path: 'create-todo',
        loadChildren: () =>
          loadRemoteModule('create-todo', './Module').then(
            (m) => m.RemoteEntryModule
          ),
      }
    ]
    ),
    StoreModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
