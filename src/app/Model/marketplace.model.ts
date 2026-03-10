export interface MarketplaceForm {
    _id: string,
    productName: string,
    productCategory: string,
    productPrice: any,
    productStock: any,
    productDescription: string,
    productImages: File[];
};
interface ProductImage {
  _id: string;
  imageUrl: string;
  marketplaceFormId: string;
}