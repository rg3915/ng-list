import { Injectable } from '@angular/core';
import { CloudService } from './cloud.service';
import { Observable } from 'rxjs';

export class ListFranchise {
  public id: number;
	public franchise: number; 
}

@Injectable({
  providedIn: 'root'
})
export class FranquiseService {

  constructor(private api: CloudService) { }
 
  getCollection() {
    return this.api.get('lista-franquia/')
  }
 
  getCollectionItem(id: number) {
    return this.api.get(`lista-franquia/`)
  } 
 
  insertCollection(data: ListFranchise): Observable<any> {
    return this.api.post("lista-franquia/", data);
  }
 
  editCollectable(id: number, data: ListFranchise) {
    return this.api.patch(`lista-franquia/`, data);
  }

  
}
