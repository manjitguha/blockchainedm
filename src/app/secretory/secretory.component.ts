import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';


import { User } from '../models/index';
import { Provider } from '../models/index';
import { GoogleMap } from '../models/index';
import { Appointment } from '../models/index';
import { PatientService } from '../services/index';
import { ProviderService } from '../services/index';
import { AppointmentService } from '../services/index';
import { GoogleMapsService } from '../services/index';


@Component({
    templateUrl: 'secretory.component.html',
    styleUrls: ['secretory.component.css']
})

export class SecretoryComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';
    mapURL = '';

    constructor(private patientService: PatientService, 
        private providerService: ProviderService, 
        private appointmentService : AppointmentService, 
        private sanitizer:DomSanitizer,
        private mapService: GoogleMapsService) { }

    ngOnInit() {
        this.model.currentUser = JSON.parse(localStorage.getItem('currentUser')).userDetails;
        this.model.patientSelected = false;
        this.model.providerSelected = false;
        this.model.appointmentDate = new Date().toDateString();
        this.model.appointmentTime = {};
        this.model.appointmentTimeList = [];
        this.model.appointmentDateList = [];
        this.model.blockchainId = "";
        this.model.appointmentScheduledMsg = "";
        this.populateTopMessage();
        this.getPatients();
        this.getProviders();
        this.setBlockChainId();
    }

    setBlockChainId(){
        this.appointmentService
                    .fetchUUID()
                    .subscribe(result => {
                        this.model.blockchainId = result;
                        console.log("Blockchain ID Created");
                    });
    }
    areAllFieldsAvailable(){
        if(this.model.patientSelected 
            && this.model.providerSelected 
            && this.model.appointmentDate 
            && this.model.appointmentTime
            && this.model.appointmentTime.slotDuration
            && this.model.blockchainId){
            return true;
        }
        else{
            return false;
        }
    }

    getAppointmentTimeList(){
        this.appointmentService
           .getAppointmentsForId(this.model.selectedProviderDetail._id)
           .subscribe(result =>{
                    if(result && result.length>0){
                        this.model.selectedProviderAppointments = JSON.parse(result);
                        if(this.model.selectedProviderAppointments 
                            && this.model.selectedProviderAppointments.appointmentSlotMap
                            && this.model.selectedProviderAppointments
                                .appointmentSlotMap[this.model.appointmentDate]){
                            this.model.appointmentDateSelected = true;
                        }
                        else{
                            this.model.appointmentDateSelected = false;
                        }
                    }
                    else{
                        this.model.appointmentDateSelected = false;
                    }
                    this.populateTimeList(this.model.selectedProviderAppointments);
                  
                    this.loading = false;
                },
                error=> { 
                    console.log("Error happened" + error);
                    this.loading = false;
                });

      }
    
    populateTimeList(selectedProviderAppointments){
           if(selectedProviderAppointments && this.model.appointmentDate){
                let startTime = 8;
                let endTime = 9;
                this.model.appointmentTimeList = [];
                for(let loopCounter =0;loopCounter<8;loopCounter++){
                    var slotDuration  = startTime+":00 - "+endTime+":00";
                    var slotId = loopCounter+1;
                    if(selectedProviderAppointments
                                && selectedProviderAppointments.appointmentSlotMap
                                && selectedProviderAppointments
                                    .appointmentSlotMap[this.model.appointmentDate]){
                        let appointmentSlotMap = selectedProviderAppointments
                            .appointmentSlotMap[this.model.appointmentDate];
                        if(appointmentSlotMap.timeSlotMap && appointmentSlotMap.timeSlotMap[slotDuration]){
                            this.model.appointmentTimeList.push({"slotId":"Slot-"+slotId
                                ,"slotDuration":slotDuration,"selected": "success", "appointmentId":appointmentSlotMap.timeSlotMap[slotDuration]});
                        }
                        else{
                            this.model.appointmentTimeList.push({"slotId":"Slot-"+slotId,"slotDuration":slotDuration});
                        }
                    }
                    else{
                        this.model.appointmentTimeList.push({"slotId":"Slot-"+slotId,"slotDuration":slotDuration});
                    }
                    
                    startTime++;
                    endTime++;
                }
            }
            else{
                let startTime = 8;
                let endTime = 9;
                for(let loopCounter =0;loopCounter<8;loopCounter++){
                    var slotDuration  = startTime+":00 - "+endTime+":00";
                    var slotId = loopCounter+1;
                    this.model.appointmentTimeList.push({"slotId":"Slot-"+slotId,"slotDuration":slotDuration});
                    startTime++;
                    endTime++;
                }
            }
    }
    getAppointmentDateList(){
        let currentDate = new Date();
        for(let loopCounter =0;loopCounter<30;loopCounter++){
            this.model.appointmentDateList.push(currentDate.toDateString());
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }

    getPatients(){
        let patients = this.patientService.getPatients().subscribe(result => {
            if(result && result.length>0){
                this.model.patients = result;
                this.model.selectedPatientDetail = result[0];
                this.model.patientSelected = true;
                let patientURL = 'https://www.google.com/maps/embed/v1/place?q='
                +this.model.selectedPatientDetail.address
                +'%20'+this.model.selectedPatientDetail.city
                +'%20'+this.model.selectedPatientDetail.state
                +'%20'+this.model.selectedPatientDetail.zip
                +'&key=AIzaSyDl5nNHaO-xMJcv8imELnZMV41xJ8Fv-bY';
                this.populateDistance();
                this.populateTopMessage();
                this.model.patientMapURL = this.sanitizer.bypassSecurityTrustResourceUrl(patientURL.replace(' ', '%20'));
                
            }
        });
    }

    refreshTimeList(){
        this.getAppointmentTimeList();
    }

    scheduleAppointment(){
        if(this.areAllFieldsAvailable()){
            this.model.selectedProviderAppointments = {};
            let appointment = new Appointment();
            appointment.appointmentId = this.model.blockchainId;
            appointment.patientId = this.model.selectedPatientDetail._id;
            appointment.providerId = this.model.selectedProviderDetail._id;
            appointment.referralProviderId = "";
            appointment.pharmacyId = "";
            appointment.secretoryId = this.model.currentUser.parentId;
            appointment.laboratoryId = "";
            appointment.appointmentDate = this.model.appointmentDate;
            appointment.appointmentTime = this.model.appointmentTime.slotDuration;
            appointment.diagnosisNotes = "";
            appointment.prescriptionNotes = "";
            appointment.laboratoryNotes = "";
            appointment.currentlyAssignedTo = this.model.selectedProviderDetail._id;
            appointment.status = "NEW";
            this.appointmentService
                .scheduleAppointment(appointment)
                .subscribe(result => {
                    this.model.appointmentScheduledMsg = result;
                    console.log("Appointment Scheduled");
                    this.setCurrentProvider(this.model.selectedProviderDetail);
                    this.selectAppointmentDate();
                });
        }
        if(this.model.selectedPatientId){
            this.getPatientDetail(this.model.selectedPatientId);
        }
        if(this.model.selectedProviderId){
            this.getProviderDetail(this.model.selectedProviderId);
        }
    }

    getPatientDetail(patientId: string){
        let patient = this.patientService.getPatientDetail(patientId);
        this.model.patients = [];
        this.model.patients.push(patient);
        this.model.patientSelected = true;
        this.model.selectedPatientDetail = patient;
        this.populateTopMessage();
    }

    populateTopMessage(){
        this.setBlockChainId();
        if(this.model.patientSelected && this.model.providerSelected){
            this.model.topMessage = "Scheduling Appointment for ";
            this.model.topMessage += this.model.selectedPatientDetail.firstName;
            this.model.topMessage += " " ;
            this.model.topMessage += this.model.selectedPatientDetail.lastName;
            this.model.topMessage += " with Dr. " ;
            this.model.topMessage += this.model.selectedProviderDetail.firstName;
            this.model.topMessage += " " ;
            this.model.topMessage += this.model.selectedProviderDetail.lastName;
        } else if(this.model.patientSelected){
            this.model.topMessage = "Scheduling Appointment for ";
            this.model.topMessage += this.model.selectedPatientDetail.firstName;
            this.model.topMessage += " " ;
            this.model.topMessage += this.model.selectedPatientDetail.lastName;
        } else if(this.model.providerSelected){
            this.model.topMessage = "Scheduling Appointment with ";
            this.model.topMessage += this.model.selectedProviderDetail.firstName;
            this.model.topMessage += " " ;
            this.model.topMessage += this.model.selectedProviderDetail.lastName;
        } else{
            this.model.topMessage = "Schedule Appointment";
        }
        if(this.model.appointmentDate){
            this.model.topMessage += " On "+this.model.appointmentDate;
        }
        if(this.model.appointmentTime && this.model.appointmentTime.slotDuration){
            this.model.topMessage += " At " + this.model.appointmentTime.slotDuration;
        }
    }

    getProviders(){
        let providers = this.providerService.getProviders().subscribe(result => {
            if(result && result.length>0){
                var providerArray : Provider[] = new Array();
                for(var loopCounter in result){
                    if(result[loopCounter].pcpFlag){
                        providerArray.push(result[loopCounter]);    
                    }
                }

                this.model.providers = providerArray;
                this.setCurrentProvider(providerArray[0]);
                this.model.providerSelected = true;
                this.populateTopMessage();
            }
        }, error => { 
        console.log("Error happened" + error);
        });
    }

    setCurrentProvider(provider: Provider){
       this.loading = true;
       this.model.selectedProviderAppointments = {};
       this.model.selectedProviderDetail = provider;
       let url = 'https://www.google.com/maps/embed/v1/place?q='
                        +this.model.selectedProviderDetail.address
                        +'%20'+this.model.selectedProviderDetail.city
                        +'%20'+this.model.selectedProviderDetail.state
                        +'%20'+this.model.selectedProviderDetail.zip
                        +'&key=AIzaSyDl5nNHaO-xMJcv8imELnZMV41xJ8Fv-bY';

       this.model.providerMapURL = this.sanitizer.bypassSecurityTrustResourceUrl(url.replace(' ', '%20'));
       this.getAppointmentTimeList();
       //this.selectAppointmentDate();
       this.getAppointmentDateList();
       this.populateDistance();
       this.populateTopMessage()
    }

    selectAppointmentDate(){
         this.loading = true;
         this.model.appointmentTime = {};
         this.getAppointmentTimeList();
         this.populateTopMessage();
    }

    selectAppointmentTime(){
        console.log(this.model.appointmentTime.slotDuration) ;
        this.populateTopMessage();
    }

    /*getAppointments(){
        let appointments = this
                .appointmentService
                .getAppointments()
                 .subscribe(result => {
                    if(result){
                         this.model.appointments = JSON.parse(result);
                    } 
                }, function(error) { 
                    console.log("Error happened" + error);
                },
                function() { 
                    console.log("the subscription is completed");
                });
    }
    */
    openAppointment(selectedAppointmentId: string){
        let appointmentDetails = this
                .appointmentService
                .getAppointmentDetails(selectedAppointmentId, "SECRETARY")
                 .subscribe(result => {
                    if(result){
                        this.model.selectedAppointment = JSON.parse(result);
                        this.patientService
                        .getPatientDetail(this.model.selectedAppointment.patientId)
                        .subscribe(response=>{
                            if(response && response.length>0){
                                this.model.selectedAppointment.patientDetails = response[0];    
                            }
                        },error=>{
                            console.log("Unable to fetch Patient Details");
                        });
                    } 
                }, function(error) { 
                    console.log("Error happened" + error);
                },
                function() { 
                    console.log("the subscription is completed");
                });
        console.log(this.model.selectedAppointment);
    }

    getProviderDetail(providerId: string){
        let provider = this.providerService.getProviderDetail(providerId);
        this.model.providers = [];
        this.model.providers.push(provider);
        this.model.providerSelected = true;
        this.model.selectedProviderDetail = provider;
        this.populateTopMessage();
    }

    selectPatient(){
        this.model.patientSelected = true; 
        let url = 'https://www.google.com/maps/embed/v1/place?q='
        +this.model.selectedPatientDetail.address
        +'%20'+this.model.selectedPatientDetail.city
        +'%20'+this.model.selectedPatientDetail.state
        +'%20'+this.model.selectedPatientDetail.zip
        +'&key=AIzaSyDl5nNHaO-xMJcv8imELnZMV41xJ8Fv-bY';
        this.model.patientMapURL = this.sanitizer.bypassSecurityTrustResourceUrl(url.replace(' ', '%20'));
        this.populateDistance();
        this.populateTopMessage()
    }
    selectProvider(){
        this.model.appointmentTime = {};
        this.model.providerSelected = true; 
        this.setCurrentProvider(this.model.selectedProviderDetail);
    }

    populateDistance(){
        if(this.model.selectedProviderDetail 
            && this.model.selectedPatientDetail){
            this.mapService.getBestGuessPath((this.model.selectedProviderDetail.address
            +'+'+this.model.selectedProviderDetail.city
            +'+'+this.model.selectedProviderDetail.state
            +'+'+this.model.selectedProviderDetail.zip).replace(' ', '+')
            ,(this.model.selectedPatientDetail.address
            +'+'+this.model.selectedPatientDetail.city
            +'+'+this.model.selectedPatientDetail.state
            +'+'+this.model.selectedPatientDetail.zip).replace(' ', '+'))
            .subscribe(result =>{
                    this.model.mapmodel = result;
                },
                function(error) { 
                    console.log("Error happened" + error);
                },
                function() { 
                    console.log("the subscription is completed")
                }
            );
        }
    }
}