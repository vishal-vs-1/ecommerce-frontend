// src/interfaces/ProductResponse.ts
export interface ProductResponse {
    productId: number;
    productName: string;
    quantity: number;
    description: string;
    cost: number;
    discount: number;
    imageUrl: string;
    sizes: Size[];
    categories: Category[];
    tags: Tag[];
  }
  
  export interface Size {
    sizeId: number;
    sizeName: string;
  }
  
  export interface Category {
    categoryId: number;
    categoryName: string;
  }
  
  export interface Tag {
    tagId: number;
    tagName: string;
  }
  