import { Routes } from '@angular/router';
import { AppHomeComponent } from './features/home/pages/home/home.component';
import { AppConsumptionComponent } from './features/consumption/pages/consumption/consumption.component';
import { AppInvoicesComponent } from './features/invoices/pages/invoices/invoices.component';
import { AppDocumentsComponent } from './features/documents/pages/documents/documents.component';
import { AppServicesComponent } from './features/services/pages/services/services.component';

export const routes: Routes = [
    { path: 'home', component: AppHomeComponent },
    { path: 'consumption', component: AppConsumptionComponent },
    { path: 'invoices', component: AppInvoicesComponent },
    { path: 'documents', component: AppDocumentsComponent },
    { path: 'services', component: AppServicesComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },  
];
