export interface MarketplaceForm {
  _id: string,
  productName: string,
  productCategory: string,
  productPrice: any,
  productStock: any,
  productDescription: string,
  // returned from API
  productImages?: string[];

  // used only when uploading
  images?: File[];
};
interface ProductImage {
  _id: string;
  imageUrl: string;
  marketplaceFormId: string;
}