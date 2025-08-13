import { AppFloatingConfigurator } from '@/dashboard/layout/components/app.floatingconfigurator';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormErrorLabelComponent } from 'src/app/shared/components/form-error-label/form-error-label.component';

@Component({
    selector: 'app-login-page',
    imports: [AppFloatingConfigurator, ReactiveFormsModule, CardModule, ButtonModule, FloatLabelModule, InputTextModule, PasswordModule, FormErrorLabelComponent],
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
    fb: FormBuilder = inject(FormBuilder);
    authService = inject(AuthService);
    router = inject(Router);
    hasError = signal(false);
    isPosting = signal(false);

    loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
    });

    onSubmit() {
        if (this.loginForm.invalid) {
            this.hasError.set(true);
            setTimeout(() => {
                this.hasError.set(false);
            }, 2000);
            return;
        }
        const { email = '', password = '' } = this.loginForm.value;
        this.authService.login(email!, password!).subscribe((isAuthenticated) => {
            if (isAuthenticated) {
                this.router.navigateByUrl('/');
                return;
            }
            this.hasError.set(true);
            setTimeout(() => {
                this.hasError.set(false);
            }, 2000);
        });
    }
}
