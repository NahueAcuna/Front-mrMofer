import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const dateRangeValidator: ValidatorFn = (control: AbstractControl) => {
  const start = control.get('startDay')?.value;
  const end = control.get('endDay')?.value;

  if (start && end && end < start) {
    return { 'fechasInvertidas': true }; 
  }
  
  return null;
};