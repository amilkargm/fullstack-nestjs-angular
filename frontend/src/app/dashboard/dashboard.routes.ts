import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { HomePage } from './home-page';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';

export default [
    {
        path: '',
        component: DashboardLayoutComponent,
        children: [
            { path: '', component: HomePage },
            { path: 'categories', component: CategoriesPageComponent },
            { path: 'products', component: ProductsPageComponent },
            { path: '**', redirectTo: '/' }
        ]
    }
] as Routes;
