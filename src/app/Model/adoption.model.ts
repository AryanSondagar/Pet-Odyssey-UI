export interface AdoptionForm {
    id?: string,
    petName: string;
    petCategory: string;
    petBreed: string;
    petAge: number;
    petsellingprice: number;
    owner_MobileNumber: string;
    petImages: File[]; // Images
};