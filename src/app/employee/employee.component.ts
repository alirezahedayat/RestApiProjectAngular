import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from './extra';
import { EmployeeService } from './service/employee.service';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { MatDialog } from '@angular/material';
import { EmployeeAddDialogComponent } from './employee-add-dialog/employee-add-dialog.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees: Employee[];
  showDialog: boolean = false;
  message = '';
  buttonText = '';
  action: any;
  loading = false;
  rows = [];
  loadingIndicator = true;
  reorderable = true;
  columns = [{ prop: 'employee_name', name: 'Name' }, { prop: 'employee_salary', name: 'Salary' }, { prop: 'employee_age', name: 'Age' }];
  ColumnMode = ColumnMode;
  animal: string;
  name: string;



  constructor(private router: Router,
     private employeeService: EmployeeService,
     public dialog: MatDialog) {
  }

  ngOnInit() {
    this.configGrid();
  }

  configGrid() {
    this.employees = new Array<Employee>();
    this.loading = true;
    this.employeeService.getEmployees().subscribe(data => {
      const result = data.data
      result.forEach(e => {
        this.employees.push(e);
      });
      this.rows = this.employees;
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 1500);
      this.loading = false;
    });
  }

  deleteEmployee(employee: any): void {
    this.openDialog('Are you sure?', 1, () => {
      this.employeeService.deleteEmployee(employee)
        .subscribe(data => {
          this.employees = this.employees.filter(u => u !== employee);
          this.rows = this.employees;
          this.openDialog('Employee deleted successfully', 2, () => this.showDialog = false);
        });
    });
  }

  openDialog(msg, type, action) {
    this.message = msg;
    if (type === 1) {
      this.buttonText = 'Yes';
    } else {
      this.buttonText = 'Ok';
    }
    this.action = action;
    this.showDialog = true;
  }

  openModal() {
    const dialogRef = this.dialog.open(EmployeeAddDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
    });
}

}

