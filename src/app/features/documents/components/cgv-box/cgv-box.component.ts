import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-documents-cgv-box',
  imports: [CardModule,ButtonModule],
  templateUrl: './cgv-box.component.html',
  styleUrl: './cgv-box.component.scss'
})
export class AppDocumentsCGVBoxComponent {

  @Input() title: string = '';
  @Input() date: string = '';
  @Input() href!: string;

  @Output() onClick: EventEmitter<string> = new EventEmitter<string>();

}
