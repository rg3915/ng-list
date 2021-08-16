import { Component, OnInit } from '@angular/core';
import { ListFranchise, FranquiseService } from 'src/app/services/api/franquise.service';  
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  constructor(private franquiaApi: FranquiseService) {}

  ngOnInit(): void {}
 
  public FranquiaList : ListFranchise [] =[];

  files: File[] = [];   

  id: number = -1;

  addFranchise(){
       this.FranquiaList.push(new ListFranchise());
  }
   
  removeFranchise(index:number){
       if(index > -1){
           this.FranquiaList.splice(index,1);
       }
  } 


    // Faz um get para pegar os items que foram cadastrados
    getItem(id: number) {
      this.franquiaApi.getCollectionItem(id).subscribe(
          (data) => {
              console.log(data); 
              this.FranquiaList = data.FranquiaList;  
          }
      )
    }

    onSelect(event: any) {
      console.log(event); 

      let FranchiseSerializer: ListFranchise = this.FranquiaList;

      // se nao tiver ID
      if (!FranchiseSerializer.id) return;

      this.files.push(...event.addedFiles); 
       
    }

     // Função é para remover os elementos da array e inserir novos elementos no field.
     onRemove(event: any) {
      console.log(event);
      this.files.splice(this.files.indexOf(event), 1);
    }

     // depois de selecionar o serializar é salvo as informações no DB.
     save() {

      // form
      let FranchiseSerializer: any = this.FranquiaList;    
      if (FranchiseSerializer.FranquiaList) delete FranchiseSerializer.FranquiaList;

      console.log(FranchiseSerializer);

      // pega o save e passa para observable ler o arquivo e enviar para o DB
      let save$: Observable<any>; 
      
      if (FranchiseSerializer.id) {
          save$ = this.franquiaApi.editCollectable(FranchiseSerializer.id, FranchiseSerializer);
      // se não inserir informação no banco de dados
      } else {
          save$ = this.franquiaApi.insertCollection(FranchiseSerializer);
      }
      
      // subscribe save
      save$.subscribe(
          (data) => {
              console.log(data); 
          }
      )
      console.log(FranchiseSerializer);
  }
    

}
