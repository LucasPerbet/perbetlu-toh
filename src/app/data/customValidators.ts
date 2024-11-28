import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidators {
   
    totalNotExceeding(max: number) {
        return (form: AbstractControl): ValidationErrors | null => {
        const attaque = form.get('attaque')?.value || 0;
        const esquive = form.get('esquive')?.value || 0;
        const degats = form.get('degats')?.value || 0;
        const pv = form.get('pv')?.value || 0;
    
        const total = attaque + esquive + degats + pv;
    
        // Retourne une erreur si le total dépasse `max`
        return total > max ? { totalExceeds: true } : null;
        };
}
}