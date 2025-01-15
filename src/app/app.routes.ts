import { Routes } from '@angular/router';
import { AppHomeComponent } from './features/home/pages/home/home.component';
import { AppConsumptionComponent } from './features/consumption/pages/consumption/consumption.component';
import { AppInvoicesComponent } from './features/invoices/pages/invoices/invoices.component';
import { AppDocumentsComponent } from './features/documents/pages/documents/documents.component';
import { AppServicesComponent } from './features/services/pages/services/services.component';
import { AppServicesGreenOptionComponent } from './features/services/pages/green-option/green-option.component';
import { SerenityElectricityComponent } from './features/services/pages/serenity-electricity/serenity-electricity.component';
import { AppDocumentContractDetailsComponent } from './features/documents/pages/contract-details/contract-details.component';
import { AppRequestsComponent } from './features/requests/pages/requests/requests.component';
import { AppRequestsNewRequestComponent } from './features/requests/pages/new-request/new-request.component';
import { AppRequestsFaqComponent } from './features/requests/pages/faq/faq.component';

export const routes: Routes = [
    { path: 'home', component: AppHomeComponent },
    { path: 'consumption', component: AppConsumptionComponent },
    { path: 'invoices', component: AppInvoicesComponent },
    { path: 'documents', component: AppDocumentsComponent },
    { path: 'documents/contract-details', component: AppDocumentContractDetailsComponent },
    { path: 'services', component: AppServicesComponent },
    { path: 'services/serenity-electricity', component: SerenityElectricityComponent },
    { path: 'services/green-option', component: AppServicesGreenOptionComponent },
    { path: 'requests', component: AppRequestsComponent },
    { path: 'requests/new', component: AppRequestsNewRequestComponent },
    { path: 'requests/frequently-asked-questions', component: AppRequestsFaqComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];
