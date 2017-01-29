import { Provider } from './provider';
import { Patient } from './patient';

export class Appointment {
	appointmentId:string;
	providerId: string;
	patientId: string;
	referralProviderId: string;
	pharmacyId: string;
	secretoryId: string;
	laboratoryId: string;
	appointmentDate: string;
	appointmentTime: string;
	diagnosisNotes: string;
	prescriptionNotes: string;
	laboratoryNotes: string;
	currentlyAssignedTo: string;
	status: string;
}