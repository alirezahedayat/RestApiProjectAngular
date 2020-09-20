import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiUtilityService {

  constructor(
    private http: HttpClient) {
  }

  static defaultPageMeta = ApiUtilityService.generatePageMeta(1, 20);
  baseUrl: string;

  static addTrailingSlash(input: string): string {
    // return input.replace(/\/?$/, '/');
    if (input.substr(-1) !== '/') {
      input += '/';
    }
    return input;
  }

  static generatePageMeta(pageIndex: number, pageSize: number, totalCount: number = 0) {
    return (
      {
        currentPage: pageIndex,
        perPage: pageSize,
        totalCount: totalCount,
      });
  }

  postFullUrl<T>(
    url: string,
    metaData: any): Observable<T> {
    return this.http.post<any>(url, JSON.stringify(metaData));
  }

  putFullUrl<T>(
      url: string,
      metaData: any): Observable<T> {
      return this.http
          .put<any>(url, JSON.stringify(metaData));
  }

  get<T>(url: string, routeParams?: string): Observable<T> {
    if (routeParams) {
       url = ApiUtilityService.addTrailingSlash(url) + routeParams;
    }
    return this.http.get<T>(url);
  }

  delete<T>(url: string, routeParams?: string): Observable<T> {
    if (routeParams) {
       url = ApiUtilityService.addTrailingSlash(url) + routeParams;
    }
    return this.http.delete<T>(url);
  }
}
