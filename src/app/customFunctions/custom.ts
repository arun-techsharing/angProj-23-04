import { AbstractControl, ValidationErrors } from "@angular/forms";



export function ageValidation(cntrl: AbstractControl): ValidationErrors | null {

    let inputVal = cntrl.value;

    if (inputVal <= 18) {
        return { 'ageValInvaled': false }
    }

    return null;
}

export function allZeros(cntrl: AbstractControl): ValidationErrors | null {

    let inputVal = cntrl.value;

    if (inputVal <= 0) {
        return { 'allZeros': false }
    }

    return null;
}