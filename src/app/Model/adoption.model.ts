export interface AdoptionForm {
    _id?: string,
    petName: string;
    petCategory: string;
    petBreed: string;
    petAge: number;
    petSellingPrice: number;
    ownerMobileNumber: string;
    // returned from API
    images?: string[];

    // used only when uploading
    petImages?: File[];
};