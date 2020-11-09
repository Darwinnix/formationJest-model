import {Injectable} from '@angular/core';
import {Employee} from '../../../shared/models/employee';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Fonction} from '../../../shared/models/fonction';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirstFeatureService {

  fonctionsURL = environment.fonctions;
  employeeURL = environment.employees;

  constructor(private http: HttpClient) {
  }

  findAllFonctions(): Observable<Fonction[]> {
    return this.http.get(this.fonctionsURL) as Observable<Fonction[]>;
  }

  findAllEmployees(): Observable<Employee[]> {
    return this.http.get(this.employeeURL) as Observable<Employee[]>;
  }

  saveEmployee(employee: Employee): Observable<Employee> {
    return this.http.post(this.employeeURL, employee) as Observable<Employee>;
  }
}
