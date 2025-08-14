import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { HomePage } from './home-page';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';

export default [
    {
        path: '',
        component: DashboardLayoutComponent,
        children: [
            { path: '', component: HomePage },
            { path: 'categories', component: CategoriesPageComponent },
            { path: '**', redirectTo: '/' }
        ]
    }
] as Routes;
