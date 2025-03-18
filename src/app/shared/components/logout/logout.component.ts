import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/http-services/auth.service';
import { ContractService } from '../../services/contract.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-logout',
  imports: [ProgressSpinnerModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService,
    private contractService: ContractService,
  ) { }

  ngOnInit(): void {
    this.authService.logout();
    this.contractService.cleanContracts();

    setTimeout(() => {
      window.location.href = '/logout';
    },
      3000);
  }
}
