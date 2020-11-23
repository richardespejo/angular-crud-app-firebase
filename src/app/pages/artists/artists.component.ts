import { Component, OnInit } from '@angular/core';
import { ArtistModel } from 'src/app/models/artist.model';
import { ArtistsService } from 'src/app/services/artists.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {

  artists : ArtistModel[] = [];
  cargando = false;

  constructor(private _artistsService : ArtistsService) { }

  /**
   * init function to search if exist data from service
   * funcion inicial donde busca los datos desde el servicio
   */
  ngOnInit(): void {
    this.cargando = true;
    this._artistsService.getAllArtist()
      .subscribe(respond => {
        this.artists = respond;
        this.cargando = false;

      })
  }

  /**
   * delete function with sweet aler2 confirm and render the angular list colletion
   * funcion de eliminar con sweet alert 2 de tipo confirmacion y renderiza la lista
   * @param artists 
   * @param i 
   */
  deleteArtist( artists : ArtistModel , i: number ){
    Swal.fire({
      title: '¡CUIDADO!',
      text: '¿Está seguro de eliminar el registro?',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp =>{
      if( resp.value ){
        this.artists.splice(i,1);
        this._artistsService.deleteArtist(artists.id).subscribe();
      }
    });
  }

}
