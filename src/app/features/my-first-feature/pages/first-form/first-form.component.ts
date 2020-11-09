import {Component, OnDestroy, OnInit} from '@angular/core';
import {Employee} from '../../../../shared/models/employee';
import {Fonction} from '../../../../shared/models/fonction';
import {Subscription} from 'rxjs';
import {FirstFeatureService} from '../../services/first-feature.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';

@Component({
  selector: 'app-first-form',
  templateUrl: './first-form.component.html',
  styleUrls: ['./first-form.component.css']
})
export class FirstFormComponent implements OnInit, OnDestroy {

  employee: Employee = new Employee();
  fonctionList: Fonction[] = [];
  sub: Subscription[] = [];
  empForm: FormGroup;

  constructor(
    private firstService: FirstFeatureService,
    private messageService: MessageService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.sub.push(this.firstService.findAllFonctions().subscribe((res: Fonction[]) => {
        this.fonctionList = res;
      })
    );
    this.createForm();
  }

  createForm(): void {
    this.empForm = new FormGroup({
      nom: new FormControl('', [Validators.required]),
      prenom: new FormControl('', [Validators.required]),
      fonction: new FormControl('', [Validators.required]),
      dateArrivee: new FormControl('', [Validators.required]),
      sexe: new FormControl('', [Validators.required])
    });
  }

  showMessage(severity: string, detail: string, sticky: boolean, key: string) {
    this.messageService.add({
      severity,
      summary: 'Enregistrement d\'employée',
      detail, sticky, key
    });
  }

  setTitleCase(value: string): string {
    return value.substr(0, 1).toUpperCase() + value.substring(1).toLowerCase();
  }

  submit(): void {
    this.empForm.markAllAsTouched();
    if (this.empForm.valid) {
      Object.keys(this.empForm.value).forEach(key => this.employee[key] = this.empForm.value[key]);
      this.sub.push(
        this.firstService.saveEmployee(this.employee).subscribe((empCree: Employee) => {
          this.showMessage('success', `L'employee ${empCree.prenom} ${empCree.nom} a été enregistré.`, false, 'success');
          this.empForm.reset();
          this.router.navigate(['/first/liste']);
        }, error => {
          console.error(error);
          this.showMessage('error', `Une erreur est survenue lors de l'enregistrement de l'employée`, true, 'error');
        })
      );
    }
  }

  ngOnDestroy() {
    this.sub.forEach(x => x.unsubscribe());
  }

}
