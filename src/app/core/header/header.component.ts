import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  items: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {label: 'liste', icon: 'pi pi-list', routerLink: ['/first/liste']},
      {label: 'formulaire', icon: 'pi pi-user-plus', routerLink: ['/first/form']}
    ];
  }

}
