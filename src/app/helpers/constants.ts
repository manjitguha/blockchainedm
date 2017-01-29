import { Config } from '../models/index';


export const CONSTANTS: Config = 
{
	authenticationURL:"http://localhost:3000/api/searchuser",
	searchPatientURL:"http://localhost:3000/api/searchPatient",
	searchProviderURL:"http://localhost:3000/api/searchProvider",
	patientAllDocsURL:"http://localhost:3000/api/patientAllDocs",
	providerAllDocsURL: "http://localhost:3000/api/providerAllDocs",
	userAllDocsURL:"http://localhost:3000/api/userAllDocs",
	patientSearchURL: "http://localhost:3000/api/searchPatient",
	pharmacyAllDocsURL: "string",
    labAllDocsURL: "",
	googleMapsURL :"https://maps.googleapis.com/maps/api/directions/json",
	googleMapsURLAppendOrigin : "?origin=",
	googleMapsURLAppendDestination : "&destination=",
	googleMapsURLAppendDepartureTime : "&departure_time=",
	googleMapsURLAppendTrafficModel :"&traffic_model=best_guess",
	googleMapsURLAppendKey : "&key=AIzaSyCnTSj6OKVAIJouCCZSSZCwlTU8L6fKa0s",
	chaincodeId : "d4100f8a566f55d1de3f865232302794352c09983e777c28ffd11e7fbac9590a9797cd376aa6365a78504fe3fad2eadb2ce81681950375ca5cd673a4e77ff019",
	chaincodeURL : "https://7ad59079ad8449c4a1334fd3a1ede09b-vp0.us.blockchain.ibm.com:5004/chaincode"
};