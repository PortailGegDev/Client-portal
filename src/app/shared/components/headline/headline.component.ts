import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-headline',
  imports: [PanelModule],
  templateUrl: './headline.component.html',
  styleUrl: './headline.component.scss'
})
export class HeadlineComponent {

  @Input() comsuptionHeadline: boolean = false
  
  constructor(private router: Router) { }

  navigateToService() {
    this.router.navigate(["/services"]);
  }
}
