import { Component, Input, OnInit } from '@angular/core';
import { FormElement, validateEl } from '../../service/forms.service';

@Component({
    selector: 'app-form-element',
    templateUrl: './form-element.component.html',
    styleUrls: ['./form-element.component.scss']
})
export class FormElementComponent implements OnInit {

    @Input() el: FormElement = {
        type: "hidden",
        data_label: "none",
        required: false,
        label: "any",
        disabled: false
    };

    constructor() { }

    ngOnInit(): void {
    }

    form_el_blur(el: FormElement) {
        if (this.el.doOnBlur) return this.el.doOnBlur(this.el);
    }

    form_el_change(el: FormElement) {

		if (this.el.format_function && this.el.value)
            this.el.value = this.el.format_function(this.el.value);
		
        this.validate();
    
    }

    validate() {
        validateEl(this.el);
    }

}
