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

  @Output() onClick: EventEmitter<void> = new EventEmitter();
}
