import { Category } from './category.interface';

export interface Product {
    id?: number;
    name?: string;
    description?: string;
    stock?: number;
    price?: number;
    category?: Category;
    status?: number;
}
