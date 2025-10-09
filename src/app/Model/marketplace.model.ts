export interface MarketplaceForm {
    id: string,
    productName: string,
    productCategory: string,
    productPrice: any,
    productStock: any,
    productDescription: string,
     productImages: File[];
};
interface ProductImage {
  id: string;
  imageUrl: string;
  marketplaceFormId: string;
}