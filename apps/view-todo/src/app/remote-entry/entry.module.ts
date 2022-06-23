import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { RemoteEntryComponent } from './entry.component';
import { DataStoreModule } from '@mfe-prototype/data-store';

const routes = [{ path: '', component: RemoteEntryComponent }];

@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [
    CommonModule,
    
    DataStoreModule,
    RouterModule.forChild(routes),
  ],
  providers: [],
})
export class RemoteEntryModule {}
