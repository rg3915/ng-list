import { Component, OnInit, Input } from '@angular/core';
import { ListFranchise, Franchise, FranquiseService } from 'src/app/services/api/franquise.service';
import { Observable } from 'rxjs';
  
@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  @Input()
  franchise: Franchise = {
    franchise: '',
    listfranchise: []
  }; 
  
  list: ListFranchise[] = [];
        
  id: number = -1;
  
  
  formSat: any = [];
  form: any;
  
  constructor(private api: FranquiseService) { }

  ngOnInit(): void {

  }

  
  addFranchise() {
   
    this.list.push(new ListFranchise());
  }

  removeFranchise(index: number) {
    if (index > -1) {
      this.list.splice(index, 1);
    }
  }


  // Faz um get para pegar os items que foram cadastrados
  getItem(id: number) {
    this.api.getCollectionItem(id).subscribe(
      (data) => {
        console.log(data);
        this.franchise = data.Franchise;
      }
    )
  }
  
  
  

  onSelect() { 
    let data: any = {  
    
      franquise: this.franchise.franchise,
      valuexquantity: [],
      
    };
        
    for (let ef of this.list) {
      //const franchise = `${ef.value}x${ef.quantity};`
      data.valuexquantity.push({ value: ef.value, quantity: ef.quantity }); 
    }
    console.log(data)
    
    this.api.insertCollection(data).subscribe(data => {
      console.log(data)
    })
   
   
    

  }

  // Função é para remover os elementos da array e inserir novos elementos no field.
  onRemove(event: any) {
    console.log(event);
    this.list.splice(this.list.indexOf(event), 1);
  }
}

