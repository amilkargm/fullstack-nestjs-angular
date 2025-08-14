import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category, CategoriesResponse, CategoryResponse } from '@dashboard/interfaces';
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
export class CategoriesService {
    private http = inject(HttpClient);

    getCategories(): Observable<Category[]> {
        return this.http
            .get<CategoriesResponse>(`${baseUrl}/categories`, {
                headers
            })
            .pipe(map((resp) => resp.categories));
    }

    updateCategory(id: number, categoryLike: Partial<Category>): Observable<Category> {
        return this.http.patch<CategoryResponse>(`${baseUrl}/categories/${id}`, categoryLike, { headers }).pipe(map((resp) => resp.category));
    }

    createCategory(categoryLike: Partial<Category>): Observable<Category> {
        return this.http.post<CategoryResponse>(`${baseUrl}/categories`, categoryLike, { headers }).pipe(map((resp) => resp.category));
    }

    deleteCategory(id: number): Observable<unknown> {
        return this.http.delete<unknown>(`${baseUrl}/categories/${id}`, { headers });
    }
}
