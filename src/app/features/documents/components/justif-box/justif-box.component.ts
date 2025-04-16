import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-documents-justif-box',
  imports: [CardModule, ButtonModule],
  templateUrl: './justif-box.component.html',
  styleUrl: './justif-box.component.scss'
})
export class AppDocumentsJustifBoxComponent {
  @Input() title: string = '';
  @Input() date: string = '';
  @Input() justifDomicileByContractIsu:boolean = false;
  @Input() contractIsu: string = '';
  @Input() contractJustificatifType: string = '';

  @Output() onClick: EventEmitter<string> = new EventEmitter<string>();
}
