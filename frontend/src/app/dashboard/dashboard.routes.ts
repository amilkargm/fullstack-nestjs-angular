import { Routes } from '@angular/router';
import { Crud } from '../pages/crud/crud';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { HomePage } from './home-page';

export default [
    {
        path: '',
        component: DashboardLayoutComponent,
        children: [
            { path: '', component: HomePage },
            { path: 'crud', component: Crud },
            { path: '**', redirectTo: '/' }
        ]
    }
] as Routes;
