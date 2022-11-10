import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// components
import { BasePopupComponent } from './components/UI/base-popup/base-popup.component';

// views
import { BucketListComponent } from './views/bucket-list/bucket-list.component';
import { SingleBucketComponent } from './views/single-bucket/single-bucket.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';


const appRoutes: Routes = [
  { path: '', component: BucketListComponent },
  { path: 'bucket-list', component: BucketListComponent },
  { 
    path: 'sinlge-bucket', 
    component: SingleBucketComponent,
    children: [
        // {
        //   path: ':id',
        //   component:  
        // }
  //     {
  //       path: ':id',
  //       component: SingleBlogComponent
  //     },
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
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false}),
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
