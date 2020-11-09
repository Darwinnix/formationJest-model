import {Component, OnDestroy, OnInit} from '@angular/core';
import {Employee} from '../../../../shared/models/employee';
import {FirstFeatureService} from '../../services/first-feature.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-first-liste',
  templateUrl: './first-liste.component.html',
  styleUrls: ['./first-liste.component.css']
})
export class FirstListeComponent implements OnInit, OnDestroy {

  employeeList: Employee[] = [];
  sub: Subscription[] = [];
  cols: any[] = [];

  constructor(
    private firstService: FirstFeatureService
  ) {
  }

  ngOnInit(): void {
    this.sub.push(
      this.firstService.findAllEmployees().subscribe((employees: Employee[]) => {
        this.employeeList = employees;
      })
    );

    this.cols = [
      {type: 'string', header: 'Nom', field: 'prenom', field2: 'nom', width: '20%', align: 'left'},
      {type: 'string', header: 'Fonction', field: 'fonction', subfield: 'libelle', width: '20%', align: 'left'},
      {type: 'string', header: 'Sexe', field: 'sexe', width: '10%', align: 'center'},
      {type: 'date', header: 'Date d\'arrivée', field: 'dateArrivee', width: '20%', align: 'center'},
      {type: 'date', header: 'Date de sortie', field: 'dateDepart', width: '20%', align: 'center'}
    ];
  }

  ngOnDestroy() {
    this.sub.forEach(x => x.unsubscribe());
  }

}
