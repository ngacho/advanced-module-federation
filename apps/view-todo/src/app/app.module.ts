import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { StoreModule, MetaReducer, ActionReducer } from '@ngrx/store';
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects';
import { DataStoreModule } from '@mfe-prototype/data-store';

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('view todo state', state);
    console.log('view todo action', action);
 
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [debug];

@NgModule({
 declarations: [AppComponent],
 imports: [
   BrowserModule,
   StoreModule.forRoot({}, {
    metaReducers,
    runtimeChecks: {
      strictStateImmutability: true,
      strictActionImmutability: true,
      strictActionSerializability: true,
      strictStateSerializability: true
    }
  }),
   EffectsModule.forRoot(),
   RouterModule.forRoot([{
     path: '',
     loadChildren: () => import('./remote-entry/entry.module').then(m => m.RemoteEntryModule)
   }], { initialNavigation: 'enabledBlocking' }),
 ],
 providers: [],
 bootstrap: [AppComponent],
})
export class AppModule {}