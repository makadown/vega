import { Contact } from './Contact';

export interface SaveVehicle extends BackendSaveVehicle {
    id: number;
    makeId: number;
}

export interface BackendSaveVehicle {
    modelId: number;
    isRegistered: boolean;
    contact: Contact;
    lastUpdate: string;
    features: number[];
}
