import { Injectable } from '@angular/core';
import { CloudService } from './cloud.service';
import { Observable } from 'rxjs';


export class Franchise {
        id?: number;
        value: number;
        quantity: number;
}

export interface Collectable {
        id?: number;
        collection?: number;
        type?: string;
        name?: string;
        franchise?: Array<Franchise>; 
}


@Injectable({
        providedIn: 'root'
})


export class CollectableItemService {

        constructor(private api: CloudService) { }

        getCollection() {
                return this.api.get('collectable/')
        }

        getCollectionItem(id: number) {
                return this.api.get(`collectable/${id}/`)
        }

        insertCollection(data: Collectable): Observable<any> {
                return this.api.post("collectable/", data);
        }

        editCollectable(id: number, data: Collectable) {
                return this.api.patch(`collectable/${id}/`, data);
        }

}
