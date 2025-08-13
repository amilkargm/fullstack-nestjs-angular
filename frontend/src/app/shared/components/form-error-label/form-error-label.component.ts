import { Component, input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { FormUtils } from '@utils/form-utils';
import { MessageModule } from 'primeng/message';

@Component({
    selector: 'form-error-label',
    imports: [MessageModule],
    templateUrl: './form-error-label.component.html',
    styleUrl: './form-error-label.component.css'
})
export class FormErrorLabelComponent {
    control = input.required<AbstractControl>();
    get errorMessage() {
        const errors: ValidationErrors = this.control().errors || {};
        return this.control().touched && Object.keys(errors).length > 0 ? FormUtils.getTextError(errors) : null;
    }
}
