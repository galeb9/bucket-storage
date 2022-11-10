import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// import { NgbPaginationModule, NgbAlertModule, NgbModalModule  } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// components
import { BasePopupComponent } from './components/UI/base-popup/base-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    BasePopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // NgbPaginationModule,
    // NgbAlertModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
