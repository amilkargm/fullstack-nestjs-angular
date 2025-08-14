import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, ProductsResponse, ProductResponse } from '@dashboard/interfaces';
import { MessageService } from 'primeng/api';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/app/environments/environment';

const baseUrl = environment.baseUrl;

const headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
};

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    private http = inject(HttpClient);

    getProducts(): Observable<Product[]> {
        return this.http
            .get<ProductsResponse>(`${baseUrl}/products`, {
                headers
            })
            .pipe(map((resp) => resp.products));
    }

    updateProduct(id: number, productLike: Partial<Product>): Observable<Product> {
        return this.http.patch<ProductResponse>(`${baseUrl}/products/${id}`, productLike, { headers }).pipe(map((resp) => resp.product));
    }

    createProduct(productLike: Partial<Product>): Observable<Product> {
        return this.http.post<ProductResponse>(`${baseUrl}/products`, productLike, { headers }).pipe(map((resp) => resp.product));
    }

    deleteProduct(id: number): Observable<unknown> {
        return this.http.delete<unknown>(`${baseUrl}/products/${id}`, { headers });
    }
}
