import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RepositoryComponent } from './repository/repository.component';
import { RequestInterceptor } from './helpers/request.interceptor';

import { ToastrModule } from 'ngx-toastr';
declare var $: any;

@NgModule({
  declarations: [
    AppComponent,
    RepositoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ positionClass: 'toast-top-right', newestOnTop: true,
    tapToDismiss: true, enableHtml: true, maxOpened: 5, autoDismiss: true, timeOut: 5000 }),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    $.blockUI.defaults.message = `<div class="lds-roller"><div></div><div></div>
    <div></div><div></div><div></div><div></div><div></div><div></div></div>`;
    $.blockUI.defaults.css.width = '22%';
    $.blockUI.defaults.css.left = '50%';
    $.blockUI.defaults.css.backgroundColor = 'none';
    $.blockUI.defaults.css.border = '0';
    $.blockUI.defaults.css.borderColor = '#80cbc4';
    $.blockUI.defaults.baseZ = '9999';
  }
}
