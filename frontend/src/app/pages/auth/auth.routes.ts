import { Routes } from '@angular/router';
import { Login } from './login';

export const authRoutes: Routes = [
    {
        path: '',
        component: Login,
        children: [
            {
                path: 'login',
                component: Login
            }
        ]
    }
];

export default authRoutes;
