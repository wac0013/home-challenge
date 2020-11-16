import { Product } from '@/models/product';
import { axios } from '../axiosConfig';
import { IProductConsume } from '../productConsume';

export class ProductConsumeWS implements IProductConsume {
  getListProducts(): Promise<Product[]> {
    return axios.get("api/products", {
      transformResponse: (data) => {
        const products: Product[] = [];

        if (Array.isArray(data)) {
          data.forEach(d => products.push(new Product(d)));
        }

        return products;
      }
    });
  }
  
  async getProduct(id: string): Promise<Product | null> {
    if (id) {
      const response = await axios.get(`api/products/${id.trim()}`, {
        transformResponse: (data) => {
          try {
            return new Product(JSON.parse(data));
          } catch (error) {
            throw new Error("Not Found");
          }
        }
      });
      return response.data;
    } else {
      return null;
    }
  }
  
}