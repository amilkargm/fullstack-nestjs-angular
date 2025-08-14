import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export function minLengthIfPresent(minLength: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (control.value == '') {
            return null;
        }
        if (control.value && control.value.length < minLength) {
            return { minLengthIfPresent: { requiredLength: minLength, actualLength: control.value.length } };
        }
        return null;
    };
}
