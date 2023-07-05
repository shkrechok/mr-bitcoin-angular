import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-root/app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ContactDetailsPageComponent } from './pages/contact-details-page/contact-details-page.component';
import { ContactEditPageComponent } from './pages/contact-edit-page/contact-edit-page.component';
import { ContactListComponent } from './cmps/contact-list/contact-list.component';
import { ContactPreviewComponent } from './cmps/contact-preview/contact-preview.component';
import { HttpClientModule } from '@angular/common/http';
import { StatisticsPageComponent } from './pages/statistics-page/statistics-page.component';
import { FormsModule } from '@angular/forms';
import { ChartComponent } from './cmps/chart/chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { TransferFundsComponent } from './cmps/transfer-funds/transfer-funds.component'
import { Subscription } from 'rxjs';
import { UserService } from './services/user.service';
import { MoveListComponent } from './cmps/move-list/move-list.component';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ContactPageComponent,
    ContactDetailsPageComponent,
    ContactEditPageComponent,
    ContactListComponent,
    ContactPreviewComponent,
    StatisticsPageComponent,
    ChartComponent,
    SignupPageComponent,
    TransferFundsComponent,
    MoveListComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
