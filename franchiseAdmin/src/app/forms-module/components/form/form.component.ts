import { Component, Input, OnInit } from '@angular/core';
import { FormContainer, FormElement } from '../../service/forms.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {

    // Tornando o formulario dinamico
    @Input() form: FormContainer | undefined;

    constructor() { }

    ngOnInit(): void {
    }

    // Valida os campos ? 
    isValid(): boolean {
        if (!this.form) return false;
        return this.form?.validateFields();
    }

}
