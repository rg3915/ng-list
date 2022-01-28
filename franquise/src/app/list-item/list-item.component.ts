import { Component, OnInit, Input } from '@angular/core';
import { ListFranchise, FranquiseService } from 'src/app/services/api/franquise.service';
import { Observable } from 'rxjs';

export class Franchise {
  value?: number;
  quantity?: number;
}

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {


  id: number = -1;

  constructor(private api: FranquiseService) { }

  ngOnInit(): void {

  }


  addFranchise() {
    this.franquise.push(new Franchise());
  }

  removeFranchise(index: number) {
    if (index > -1) {
      this.franquise.splice(index, 1);
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

  franquise: Franchise[] = [];

  onSelect() {
    let data: any = {
      Franchise: []
    };

    for (let ef of this.franquise) {
      const franchise = `${ef.value}x ${ef.quantity};`
      data.Franchise.push({ franchise })
    }
    console.log(data)
 
    console.log(data.Franchise.join());


  }

  // Função é para remover os elementos da array e inserir novos elementos no field.
  onRemove(event: any) {
    console.log(event);
    this.franquise.splice(this.franquise.indexOf(event), 1);
  }
}
