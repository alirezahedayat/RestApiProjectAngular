import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { EmployeeComponent } from './employee/employee.component';
import { ToastrModule } from 'ngx-toastr';
import { EmployeeService } from './employee/service/employee.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpErrorInterceptor } from './services/http-error-interseptor';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpdateEmployeeComponent } from './employee/update-employee/update-employee.component';
import { MaterialModule } from './material.module';
import { MAT_DIALOG_DATA } from '@angular/material';
import { EmployeeAddDialogComponent } from './employee/employee-add-dialog/employee-add-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    UpdateEmployeeComponent,
    EmployeeAddDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxDatatableModule,
    MaterialModule

  ],
  entryComponents: [EmployeeAddDialogComponent],
  providers: [EmployeeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
