import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatQaFormComponent } from './components/chat-qa-form/chat-qa-form.component';
import { ChatTableComponent } from './components/chat-table/chat-table.component';
import { HeaderComponent } from './components/header/header.component';
import { LeftPanelComponent } from './components/left-panel/left-panel.component';
import { LocatorComponent } from './components/locator/locator.component';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule} from '@angular/forms';
import { ChatQAService } from './services/chat-qa.service';
import { HttpClientModule} from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import { ValueTrackComponent } from './components/value-track/value-track.component';
import { RealEstateManagementComponent } from './components/real-estate-management/real-estate-management.component';
import { ProductNameComponent } from './components/product-name/product-name.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    ChatQaFormComponent,
    ChatTableComponent,
    HeaderComponent,
    LeftPanelComponent,
    LocatorComponent,
    ValueTrackComponent,
    RealEstateManagementComponent,
    ProductNameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    FontAwesomeModule
  ],
  providers: [
    ChatQAService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
