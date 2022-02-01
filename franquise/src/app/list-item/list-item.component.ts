import { Component, OnInit, Input } from '@angular/core';
import { ListFranchise, Franchise, FranquiseService } from 'src/app/services/api/franquise.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
  
@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  @Input()
  f: Franchise = {
    franchise: '',
    listfranchise: []
  }; 
  
  list: ListFranchise[] = [];   
  formSat: any = [];
  form: any;
  id: any;
  
  constructor(private api: FranquiseService, private route: ActivatedRoute) { }

  ngOnInit(): void { 
    
    this.route.paramMap.subscribe((params) => {
        let id = params.get("id");
        console.log(id);
        if (id) {
          this.getItem(parseInt(id));
        }
      }
    )
  
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
    data => {  
      this.f = data 
      this.id = data.id;
      console.log(data); 
      
    },

      err => console.error(err),
      () => console.log('Informações carregadas'));
  }
  
  
  

  onSelect() { 
    let data: any = {
      franquise: this.f.franchise,
      listfranchise: [],
    };
    
    for (let ef of this.list) { 
      data.listfranchise.push({ 
        value: ef.value, 
        quantity: ef.quantity 
      }); 
    }
    
    console.log(data)
    
    this.api.insertCollection(data).subscribe(data => {
    
      console.log("POST") 
      console.log(data)
      alert("Add Sucessfully!");
      
      },
      err => console.error(err),
      () => console.log('Informações enviadas com sucesso!'));
   
   
    

  }

  // Função é para remover os elementos da array e inserir novos elementos no field.
  onRemove(event: any) {
    console.log(event);
    this.list.splice(this.list.indexOf(event), 1);
  }
}

