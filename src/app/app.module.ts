import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import  { HttpClientModule } from '@angular/common/http'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';

// components
import { HeaderComponent } from './components/header/header.component';
import { TabsComponent } from './components/tabs/tabs/tabs.component';
import { TabComponent } from './components/tabs/tab/tab.component';
import { CreateBucketComponent } from './components/create-bucket/create-bucket.component';
import { BucketsListComponent } from './components/buckets-list/buckets-list.component';
import { PopupComponent } from './components/popup/popup.component';
import { DetailsComponent } from './components/details/details.component';
import { FileListComponent } from './components/file-list/file-list.component';

// views
import { BucketsViewComponent } from './views/buckets-view/buckets-view.component';
import { SingleBucketComponent } from './views/single-bucket/single-bucket.component';
import { SingleBucketItemComponent } from './views/single-bucket-item/single-bucket-item.component';
import { NotFoundComponent } from './views/not-found/not-found.component';

const appRoutes: Routes = [
  { path: '', component: BucketsViewComponent },
  { path: 'bucket-list', component: BucketsViewComponent },
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
    BucketsViewComponent,
    SingleBucketComponent,
    NotFoundComponent,
    HeaderComponent,
    SingleBucketItemComponent,
    TabsComponent,
    TabComponent,
    CreateBucketComponent,
    BucketsListComponent,
    PopupComponent,
    DetailsComponent,
    FileListComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false}),
    NgbModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
