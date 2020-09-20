import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ApiUtilityService } from './../../shared/api-utility-service';

@Injectable()
export class EmployeeService {

  constructor(private http: HttpClient,
    private utilityService: ApiUtilityService) { }

  private employeeUrl = 'http://dummy.restapiexample.com/api/v1';

  getEmployees(): Observable<any> {
    return this.utilityService.get<any>(`${this.employeeUrl}/employees`);
  }

  getEmployee(id): Observable<any> {
    return this.utilityService.get<any>(`${this.employeeUrl}/employee/${id}`);
  }

  deleteEmployee(employee): Observable<any> {
    return this.utilityService.delete<any>(`${this.employeeUrl}/delete/${employee.id}`);
  }

  createEmployee(employee): Observable<any> {
    return this.utilityService.postFullUrl<any>(`${this.employeeUrl}/create`,employee);
  }

  public updateEmployee(employee): Observable<any> {
    return this.utilityService.putFullUrl<any>(`${this.employeeUrl}/update/'${employee.id}`, JSON.stringify(employee))
   // return this.http.put(`${this.employeeUrl}/update/'${employee.id}`, JSON.stringify(employee))
  }

}
