import { TypeRowItem } from '@/models/rowItem';

export interface ValidateValuePromo {
    getDiscountProduct(item: TypeRowItem): number;
    getValueProduct(item: TypeRowItem): number;
}