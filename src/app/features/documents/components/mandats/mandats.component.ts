import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Mandate } from '../../../../shared/models/mandate.model';
import { TimeSpanToDatePipe } from '../../../../shared/pipe/time-span-to-date.pipe';
import { User } from '../../../../shared/models/user.model';
import { MaskRIBPipe } from '../../../../shared/pipe/mask-rib.pipe';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-documents-mandats',
  imports: [CommonModule, TimeSpanToDatePipe, MaskRIBPipe, PanelModule, CardModule],
  templateUrl: './mandats.component.html',
  styleUrl: './mandats.component.scss'
})
export class AppDocumentsMandatsComponent {
  @Input() mandates: Mandate[] = [];
  @Input() currentUser: User | null = null;
}
