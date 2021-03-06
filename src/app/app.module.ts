import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing }        from './app.routing';

// used to create fake backend
//import { fakeBackendProvider } from './helpers/index';
//import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/index';
import { HomeComponent } from './home/index';
import { ProviderComponent } from './provider/index';
import { PayerComponent } from './payer/index';
import { PharmacyComponent } from './pharmacy/index';
import { PatientComponent } from './patient/index';
import { LabComponent } from './lab/index';
import { SecretoryComponent } from './secretory/index';
import { NoAccessComponent } from './noaccess/index';



import { LandingComponent } from './landing.component';
import { LinkService } from './link.service';
import { AuthGuard } from './guards/index';
import { AuthenticationService } from './services/index';
import { PatientService } from './services/index';
import { UserService } from './services/index';
import { ProviderService } from './services/index';
import { AppointmentService } from './services/index';
import { GoogleMapsService } from './services/index';


@NgModule({
    declarations: [
        AppComponent,
        LandingComponent,
        SecretoryComponent,
        LoginComponent,
        HomeComponent,
        ProviderComponent,
        PayerComponent,
        PatientComponent,
        LabComponent,
        SecretoryComponent,
        PharmacyComponent,
        NoAccessComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    providers: [
        LinkService,
        AuthGuard,
        AuthenticationService,
        PatientService,
        UserService,
        ProviderService,
        GoogleMapsService,
        BaseRequestOptions,
        AppointmentService],
    bootstrap: [AppComponent]
})
export class AppModule { }
