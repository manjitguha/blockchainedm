import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/index';
import { HomeComponent } from './home/index';
import { ProviderComponent } from './provider/index';
import { PayerComponent } from './payer/index';
import { PharmacyComponent } from './pharmacy/index';
import { PatientComponent } from './patient/index';
import { LabComponent } from './lab/index';
import { SecretoryComponent } from './secretory/index';
import { NoAccessComponent } from './noaccess/index';

import { AuthGuard } from './guards/index';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'provider', component: ProviderComponent, canActivate: [AuthGuard] },
    { path: 'secretory', component: SecretoryComponent, canActivate: [AuthGuard] },
    { path: 'pharmacy', component: PharmacyComponent, canActivate: [AuthGuard] },
    { path: 'patient', component: PatientComponent, canActivate: [AuthGuard] },
    { path: 'payer', component: PayerComponent, canActivate: [AuthGuard] },
    { path: 'lab', component: LabComponent, canActivate: [AuthGuard] },
    { path: 'noaccess', component: NoAccessComponent, canActivate: [AuthGuard] }
];

export const routing = RouterModule.forRoot(appRoutes);