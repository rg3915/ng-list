import { Injectable } from '@angular/core';
import { CloudService } from './cloud.service';
import { Observable } from 'rxjs';

  
export class ListFranchise {
  value: number; 
  quantity: number; 
}


export interface Franchise {
  franchise?: string;
  listfranchise: Array<ListFranchise>;
}


@Injectable({
  providedIn: 'root'
})
export class FranquiseService {

  constructor(private api: CloudService) { }

  getCollection() {
    return this.api.get('franquia/')
  }

  getCollectionItem(id: number) {
    return this.api.get(`franquia/${id}/`)
  }

  insertCollection(data: Franchise): Observable<any> {
    return this.api.post("franquia/", data);
  }

  editCollectable(id: number, data: Franchise) {
    return this.api.patch(`franquia/${id}/`, data);
  }


}
