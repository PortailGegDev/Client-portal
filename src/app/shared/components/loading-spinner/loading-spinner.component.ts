import { Component, Input, OnChanges } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-loading-spinner',
  imports: [CommonModule, ProgressSpinnerModule],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss'
})
export class LoadingSpinnerComponent implements OnChanges {
  @Input() showSpinner: boolean = false;
  
  constructor(public loadingService: LoadingService) { }

  ngOnChanges() {
    if (this.showSpinner) {
      this.loadingService.show();
    } else {
      this.loadingService.hide();
    }
  }

}
