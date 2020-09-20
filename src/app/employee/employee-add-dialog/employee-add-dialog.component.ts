import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { EmployeeService } from '../service/employee.service';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../extra';
import { Router } from '@angular/router';
import { EmployeeComponent } from '../employee.component';


@Component({
  selector: 'app-employee-add-dialog',
  templateUrl: './employee-add-dialog.component.html',
  styleUrls: ['./employee-add-dialog.component.css']
})
export class EmployeeAddDialogComponent implements OnInit {

  employee: Employee = new Employee();
  loading = false;

  constructor(private router: Router,
    private toastr: ToastrService,
    private employeeService: EmployeeService,
    public dialogRef: MatDialogRef<EmployeeComponent>) { }

    createEmployee(): void {
      this.loading = true;
      this.employeeService.createEmployee(this.employee)
        .subscribe(data => {
          this.loading = false;
          this.dialogRef.close();
          this.toastr.success('Employee created successfully');
          this.router.navigate(['/employees']);
        });
    }

  ngOnInit() {
  }


}
