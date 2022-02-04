import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollectableItemService } from '../services/api/collection.service';

@Component({
        selector: 'app-list-item',
        templateUrl: './list-item.component.html',
        styleUrls: ['./list-item.component.scss']
})

export class ListItemComponent implements OnInit {

        list: any = [];

        constructor(private api: CollectableItemService, private route: ActivatedRoute) { } 
         
        ngOnInit(): void {
                this.listItem();
                // Pesquisar itens clicando na categorias
                //   this.route.params.subscribe(params => {
                //     if(params.searchTerm)
                //       this.listItem = this.api.getAll().filter(list => 
                //         list.name.toLowerCase().includes(params.searchTerm.toLowerCase));
                //   });
        }
        
        listItem() {
                this.api.getCollection().subscribe(
                        data => {
                                this.list = data;
                                console.log(data);
                });
        }
        
}