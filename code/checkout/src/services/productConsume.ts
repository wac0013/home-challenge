import { Product } from '@/models/product';

export interface IProductConsume {
    getListProducts(): Promise<Product[]>
    getProduct(id: string): Promise<Product | null>;
}