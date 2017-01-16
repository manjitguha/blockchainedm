import { Provider } from './provider';
import { Patient } from './patient';

export class Appointment {
	appointmentId:string;
	provider: Provider;
	patient: Patient;
	appointmentTime: string;
	diagnosisNotes: string;
	prescriptionNotes: string;
	status: string;
}