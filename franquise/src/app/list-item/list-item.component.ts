import { Component, OnInit, Input} from '@angular/core';
import { ListFranchise, FranquiseService } from 'src/app/services/api/franquise.service';  
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

    
  id: number = -1;
  
  constructor(private api: FranquiseService) {}

  ngOnInit(): void {

  }
  
 
  addFranchise(){
       this.franquise.push(new ListFranchise());
  }
   
  removeFranchise(index:number){
       if(index > -1){
         this.franquise.splice(index,1);
       }
  } 


    // Faz um get para pegar os items que foram cadastrados
    getItem(id: number) {
      this.api.getCollectionItem(id).subscribe(
          (data) => {
              console.log(data); 
          this.franquise = data.FranquiaList;  
          }
      )
    }
    
    franquise: ListFranchise[] = [];  
    onSelect() { 
      let data: any = { 
        ListFranchise: []
      };
 
      for (let ef of this.franquise) {
        const franchise = `${ef.value}x ${ef.quantity};`
        data.ListFranchise.push({ franchise })
      } 
      console.log(data)  


      console.log(data.ListFranchise.join()); 
      

    }

     // Função é para remover os elementos da array e inserir novos elementos no field.
     onRemove(event: any) {
      console.log(event);
       this.franquise.splice(this.franquise.indexOf(event), 1);
    } 
}
