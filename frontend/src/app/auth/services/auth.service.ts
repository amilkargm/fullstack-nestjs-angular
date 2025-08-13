import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { AuthResponse, User } from '@auth/interfaces';
import { AuthStatus } from '@auth/types/auth-status.type';
import { BlockDocumentService } from '@shared/services/block-document.service';
import { FormUtils } from '@utils/form-utils';
import { MessageService } from 'primeng/api';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/app/environments/environment';

const baseUrl = environment.baseUrl;

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _authStatus = signal<AuthStatus>('checking');
    private _user = signal<User | null>(null);
    private _token = signal<string | null>(localStorage.getItem('token'));
    private _isAdmin = signal<boolean | null>(null);

    private http = inject(HttpClient);
    private messageService = inject(MessageService);
    private blockDocumentService = inject(BlockDocumentService);

    checkStatusResource = rxResource({
        stream: () => this.checkStatus()
    });

    authStatus = computed<AuthStatus>(() => {
        if (this._authStatus() === 'checking') return 'checking';
        if (this._user()) return 'authenticated';
        return 'not-authenticated';
    });

    user = computed<User | null>(() => this._user());
    token = computed<string | null>(() => this._token());
    isAdmin = computed<boolean>(() => this._user()?.role.includes('admin') ?? false);

    login(email: string, password: string): Observable<boolean> {
        this.blockDocumentService.blockDocument();
        return this.http
            .post<AuthResponse>(`${baseUrl}/auth/login`, {
                email,
                password
            })
            .pipe(
                map((resp) => this.handleAuthSuccess(resp)),
                catchError((error: any) => this.handleAuthError(error))
            );
    }

    checkStatus(): Observable<boolean> {
        const token = localStorage.getItem('token');
        console.log({token});
        
        if (!token) {
            this.logout();
            return of(false);
        }
        return this.http
            .get<AuthResponse>(`${baseUrl}/auth/check-status`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .pipe(
                map((resp) => this.handleAuthSuccess(resp)),
                catchError((error: any) => this.handleAuthError(error))
            );
    }

    logout() {
        this._user.set(null);
        this._token.set(null);
        this._authStatus.set('not-authenticated');
        this._isAdmin.set(false);
        localStorage.removeItem('token');
    }

    private handleAuthSuccess({ token, user }: AuthResponse) {
        console.log({ token, user });

        this.blockDocumentService.unblockDocument();
        this._user.set(user);
        this._authStatus.set('authenticated');
        this._token.set(token);
        this._isAdmin.set(user.role.includes('admin'));
        localStorage.setItem('token', token);
        return true;
    }

    private handleAuthError(error: any) {
        console.log({ error });

        this.blockDocumentService.unblockDocument();
        this.messageService.add({
            severity: 'error',
            summary: '¡Error!',
            key: 'errors',
            detail: '¡El correo electrónico o la contraseña son incorrectos! Por favor, vuelve a intentarlo.',
            life: 5000
        });
        this.logout();
        return of(false);
    }
}
