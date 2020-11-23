import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ArtistModel } from 'src/app/models/artist.model';
import { ArtistsService } from 'src/app/services/artists.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  artist : ArtistModel = new ArtistModel();

  constructor(  private _artistService : ArtistsService, 
                private route : ActivatedRoute
    ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('aqui', id);
    if(id !== 'new'){
      this.getDataArtist(id);
    }

  }

  /**
   * Function to get data of artist from service
   * Funcion para obtener los datos del artista desde el servicio 
   * @param id 
   */
  getDataArtist(id:string){
    this._artistService.getArtist(id)
        .subscribe( (response: ArtistModel) => {
          this.artist = response;
          this.artist.id = id;
        });
  }

  /**
   * Function save and get data from ngForm to service
   * Funcion de guardar que obtiene los datos del formulario y los envia al servicio
   * @param form 
   */
  saveData(form : NgForm){

    if(form.invalid) { 
      return;
    }
    /**
     * Sweet alert plugin for loading
     */
    Swal.fire({
      title: 'Espere',
      text: 'Guardando',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let request : Observable<any>;
    if( this.artist.id){
      request = this._artistService.updateArtist(this.artist);
    }else{
      request = this._artistService.createArtist(this.artist);
    }

    request.subscribe( response => {
      Swal.fire({
        title: this.artist.nombre,
        text:'Actualizado correctamente',
        icon:'success'
      });
    });
    
  }

}
