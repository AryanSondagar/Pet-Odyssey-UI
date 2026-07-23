export interface ImageObject {
  url: string;
  public_id: string;
}

export interface AdoptionForm {
    _id?: string,
    petName: string;
    petCategory: string;
    petBreed: string;
    petAge: number;
    petSellingPrice: number;
    ownerMobileNumber: string;
    // returned from API
    images?: ImageObject[];

    // used only when uploading
    petImages?: File[];
};