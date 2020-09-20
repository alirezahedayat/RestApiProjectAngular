import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../service/employee.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  employee: any = {};
  currentEmployeeId: any;
  loading = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private _location: Location,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.employeeService.getEmployee(this.route.snapshot.params['id'])
      .subscribe(data => {
        this.employee = data.data;
        this.currentEmployeeId = this.route.snapshot.params['id'];
      });
  }

  updateEmployee(): void {
    this.loading = true;
    this.employeeService.updateEmployee(this.employee)
      .subscribe(data => {
        this.toastr.success('Employee updated successfully');
        this.loading = false;
        this.router.navigate(['/employees']);
      });
  }

  goBack(event) {
    event.preventDefault();
    this._location.back();
  }
}

