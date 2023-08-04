import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChatbotPopupComponent } from './chatbot-popup/chatbot-popup.component';
import { ChatService } from './services/chat.service';
import { MediatorService } from './services/mediator.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientCardComponent } from './client-card/client-card.component';
import { PendingApprovalListComponent } from './pending-approval-list/pending-approval-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatbotPopupComponent,
    NavBarComponent,
    ClientListComponent,
    ClientCardComponent,
    PendingApprovalListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [
    ChatService,
    MediatorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
