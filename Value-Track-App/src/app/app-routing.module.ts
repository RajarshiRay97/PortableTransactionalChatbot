import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
import { PendingApprovalListComponent } from './pending-approval-list/pending-approval-list.component';

const routes: Routes = [
  {path: '', component: ClientListComponent},
  {path: 'pending-approvals', component: PendingApprovalListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
