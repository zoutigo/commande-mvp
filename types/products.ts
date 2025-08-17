export type ProductCategoryCode = 'ENTREE' | 'PLAT' | 'DESSERT' | 'ACCOMP' | 'SUPPL';

export interface Category {
  id: string; // ex: "cat-plat"
  code: ProductCategoryCode; // ex: "PLAT"
  name: string; // ex: "Plats"
}

export interface Product {
  id: string;
  name: string;
  categoryId: string; // ← référence à Category.id (cohérent avec tes seeds)
  price: number;
}
