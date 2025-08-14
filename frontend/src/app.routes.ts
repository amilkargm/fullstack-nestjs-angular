import { Routes } from '@angular/router';
import { IsAuthenticatedGuard } from '@/auth/guards/is-authenticated.guard';
import { NotAuthenticatedGuard } from '@/auth/guards/not-authenticated.guard';

export const appRoutes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./app/auth/auth.routes'),
        canMatch: [NotAuthenticatedGuard]
    },
    {
        path: '',
        loadChildren: () => import('./app/dashboard/dashboard.routes'),
        canMatch: [IsAuthenticatedGuard]
    }
    // {
    //     path: '',
    //     component: AppLayout,
    //     children: [
    //         { path: '', component: Dashboard },
    //         { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
    //     ]
    // },
    // { path: 'notfound', component: Notfound },
    // { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    // { path: '**', redirectTo: '/notfound' }
];
