import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';
import { TimeSpanToDatePipe } from '../../../../shared/pipe/time-span-to-date.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documents-contracts-list',
  imports: [CommonModule, MessageModule, ButtonModule, PanelModule, TimeSpanToDatePipe],
  templateUrl: './contracts-list.component.html',
  styleUrl: './contracts-list.component.scss'
})
export class AppDocumentsContractsListComponent implements OnChanges {
  @Input() groupedContracts: any[] = [];
  @Input() activeContract: boolean = false;

  constructor(private router: Router) {
  }

  ngOnChanges(): void {
    if (this.activeContract) { }
  }

  viewDetails() {
    this.router.navigate(['/documents/contract-details']);
  }
}
