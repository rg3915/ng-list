import { Injectable } from '@angular/core';

export function validateEl(el: FormElement) {
 
    console.log("do validate", el.label, el.value);

    if (!el.value && !el.required) el.is_valid = true;
    if (el.value == undefined || el.value == "") return;
    if (el.validator && typeof el.validator == 'function'){
        console.log("valid is func");
        el.is_valid = el.validator(el.value)
    } else if (el.validator && el.validator instanceof RegExp){
        console.log("valid is regex");
        el.is_valid = el.validator.test(el.value);
        console.log(el.validator, el.value)
        console.log(el.is_valid);
    } else {
        console.log("no validator");
        el.is_valid = true;
        console.log(el.is_valid);
    }

}

export interface ImageFile {
    name: string;
    image: string;
    thumbnail: string;
}

export interface FormElementOption {
	label: string;
	value: any;
}

export interface FormElement {

    custom_class?: string;

    // tipo de elemento do formulário
    type: "text" | "select" | "hidden" | 
            "password" | "tel" | "date" | 
            "checkbox" | "number" | "text-area";
    
    // Função ou regex para validação
	validator?: RegExp | Function;

	// Rótulo no formulário
	label: string;

    // Label no datamodel
    data_label: string;

    /**
     * indica se o campo deve ser required
     */
    required: boolean;

    /**
     * função para ser utilizada na formatação
     */
    format_function?: (value: string, form?: FormContainer) => string;

    /**
     * Valor do input
     */
    value?: any;

    /**
     * Indica se o campo está valido ou não
     */
    is_valid?: boolean;

    /**
     * Função para ser executada no blur
     */
    doOnBlur?: (a:FormElement, form?: FormContainer) => void;

    /**
     * se campo está enable ou disabled
     */
    disabled: boolean;

    /**
     * Apenas para campos select
     */
    options?: FormElementOption[];

    /**
     * Para utilizar em date fields
     */
    max?: string | number;
    min?: string | number;
}


// 
export class FormContainer {

    elements: FormElement[] = [];

    initialData: any = {};

    public custom_class?: string;

    constructor(elements?: FormElement[]) {
        if (elements)
            this.setElements(elements);
    }

    prePopulate(initialData?: any) {
        this.initialData = initialData;
        for (let el of this.elements) {
            if (this.initialData[el.data_label])
                el.value = this.initialData[el.data_label];
                validateEl(el);
        }
    }
    
    // customiza a class dos formularios
    setCustomClass(custom_class: string) {
        this.custom_class = custom_class;
    }

    // class elementos
    setElements(elements: FormElement[]) {
        this.elements = elements;
    }

    getValue(data_label: string) {
        return this.elements.find(s => s.data_label == data_label)?.value;
    }

    public validateFields(): boolean {
        if (! this.elements) return true;

        for (let el of this.elements){
            if (!(el.value === "" || el.value === undefined) && !el.is_valid) {
				console.log(el.label, "is invalid", el.value, el.is_valid);
				return false;
			}
			if ((el.value === "" || el.value === undefined) && el.required){
				console.log(el.label, "is required", el.value, el.required);
				return false;
			}
        }

        return true;
    }

    public isValid():boolean {
        return this.validateFields();
    }

    serializeData(): any {
        for (let el of this.elements) {
            this.initialData[el.data_label] = el.value;
        }
        return this.initialData;
    }

    on_element_change() {

    }

}


@Injectable({
  providedIn: 'root'
})
export class FormsService {

    constructor() { }
}
