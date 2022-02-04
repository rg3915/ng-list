import { Component, OnInit } from '@angular/core';
import { Franchise, CollectableItemService } from 'src/app/services/api/collection.service';
import { Observable } from 'rxjs';
import { FormContainer, FormElement } from 'src/app/forms-module/service/forms.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
        selector: 'app-add-item',
        templateUrl: './add-item.component.html',
        styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

        files: File[] = [];
        id: number = -1;

        gallery: any;

        franchise: any;
        list: Franchise[] = [];

        formSat: any = [];
        form: any;


        // 1 formulario collectableForm
        collectableForm = new FormContainer(
                [
                        {
                                label: "Identificador do item:",
                                validator: /.{3,}/,
                                type: "text",
                                required: true,
                                data_label: 'name',
                                disabled: false
                        },
                        {
                                label: "Tipo de item",
                                disabled: false,
                                required: true,
                                type: "select",
                                data_label: "type",
                                options: [
                                        { label: "Olho de Boi", value: "OLHO_DE_BOI" },
                                        { label: "Cartas primeira emissão", value: "FIRST_EDITION_LETTER" },
                                        { label: "Cartas segunda emissão", value: "SECOND_EDITION_LETTER" },
                                ]

                        },
                ]
        );
        // 1 formulario collectableForm

        constructor(private api: CollectableItemService, private route: ActivatedRoute, private router: Router) { }


        ngOnInit(): void {

                this.route.paramMap.subscribe(
                        (params) => {
                                let id = params.get("id"); 
                                if (id) {
                                        this.getItem(parseInt(id));
                                }
                        }
                )

        }



        addFranchise() {
                this.list.push(new Franchise());
        }
        

        removeFranchise(index: number) {
                if (index > -1) {
                        this.list.splice(index, 1);
                }
        }
        

        getItem(id: number) {
                this.api.getCollectionItem(id).subscribe(
                        (data) => {

                                console.log(data);

                                this.list = data.franchise;

                                for (let el of data.franchise) {
                                        el.value
                                        el.quantity
                                } 
                                
                                this.id = data.id;
                                this.collectableForm.prePopulate(data);  
                                
                        }
                )
        }
        
        

        save() {
 
                let collectable_serialized: any = this.collectableForm.serializeData();
            
                collectable_serialized.franchise = [];
                
                for (let ef of this.list) {
                        collectable_serialized.franchise.push({
                                id: ef.id,
                                value: ef.value,
                                quantity: ef.quantity
                        });
                }
  
                console.log(collectable_serialized);
 
                let save$: Observable<any>; 
                
                if (collectable_serialized.id) {
                        save$ = this.api.editCollectable(collectable_serialized.id, collectable_serialized); 
                } else {
                        save$ = this.api.insertCollection(collectable_serialized);
                }

                // subscribe save
                save$.subscribe(
                        (data) => { 
                                console.log(data);
                                this.router.navigate(["list-item"])
                        }
                )
                console.log(collectable_serialized);

        }

        

        // Função é para remover os elementos da array e inserir novos elementos no field.
        onRemove(event: any) {
                console.log(event);
                this.list.splice(this.list.indexOf(event), 1);
        }
}

