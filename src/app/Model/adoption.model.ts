export interface AdoptionForm {
    id?: string,
    petName: string;
    petCategory: string;
    petBreed: string;
    petAge: number;
    petSellingPrice: number;
    owner_MobileNumber: string;
    petFiles: File[]; // Images
};