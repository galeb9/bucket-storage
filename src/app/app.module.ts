import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import  { HttpClientModule } from '@angular/common/http'

// components
import { BasePopupComponent } from './components/UI/base-popup/base-popup.component';
import { HeaderComponent } from './components/header/header.component';

// views
import { BucketListComponent } from './views/bucket-list/bucket-list.component';
import { SingleBucketComponent } from './views/single-bucket/single-bucket.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { SingleBucketItemComponent } from './views/single-bucket-item/single-bucket-item.component';


const appRoutes: Routes = [
  { path: '', component: BucketListComponent },
  { 
    path: 'bucket-list', 
    component: BucketListComponent,
  },
  { 
    path: 'single-bucket', 
    component: SingleBucketComponent,
    children: [
        {
          path: ':id',
          component: SingleBucketItemComponent
        } 
    ]
  },
  { path: '**', component: NotFoundComponent }
]
@NgModule({
  declarations: [
    AppComponent,
    BasePopupComponent,
    BucketListComponent,
    SingleBucketComponent,
    NotFoundComponent,
    HeaderComponent,
    SingleBucketItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false}),
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
