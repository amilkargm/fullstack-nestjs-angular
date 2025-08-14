import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';

export class FormUtils {
    // Expresiones regulares
    static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
    static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

    static getTextError(errors: ValidationErrors) {
        console.log(errors);
        for (const key of Object.keys(errors)) {
            
            switch (key) {
                case 'required':
                    return 'This field is required!';

                case 'minLengthIfPresent':
                    return `If provided, this field requires at least ${errors['minLengthIfPresent'].requiredLength} characters!`;

                case 'minlength':
                    return `This field requires at least ${errors['minlength'].requiredLength} characters!`;


                case 'min':
                    return `This field's value must be at least ${errors['min'].min}!`;

                case 'email':
                    return `The value provided is not an email!`;

                default:
                    return `¡Error de validación no controlado ${key}!`;
            }
        }

        return null;
    }

    static isValidField(form: FormGroup, fieldName: string): boolean | null {
        return !!form.controls[fieldName].errors && form.controls[fieldName].touched;
    }

    static getFieldError(form: FormGroup, fieldName: string): string | null {
        if (!form.controls[fieldName]) return null;

        const errors = form.controls[fieldName].errors ?? {};

        return FormUtils.getTextError(errors);
    }

    static isValidFieldInArray(formArray: FormArray, index: number) {
        return formArray.controls[index].errors && formArray.controls[index].touched;
    }

    static getFieldErrorInArray(formArray: FormArray, index: number): string | null {
        if (formArray.controls.length === 0) return null;

        const errors = formArray.controls[index].errors ?? {};

        return FormUtils.getTextError(errors);
    }

    static isFieldOneEqualFieldTwo(field1: string, field2: string) {
        return (formGroup: AbstractControl) => {
            const field1Value = formGroup.get(field1)?.value;
            const field2Value = formGroup.get(field2)?.value;

            return field1Value === field2Value ? null : { passwordsNotEqual: true };
        };
    }
}
