import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArtistModel } from '../models/artist.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {

  /**
   * Create your own realtime database from your firebase account
   * Private URL only use in this controller
   * Crea tu propia base de datos desde tu cuanta de firebase
   * URL privada que es usaa solo en este controlador
   */
  private url: string = 'https://crud-respejo.firebaseio.com';

  constructor( private http: HttpClient) { }


  /**
   * POST method service
   * Metodo POST del servicio
   * @param artist 
   */
  createArtist( artist: ArtistModel) {
    return this.http.post(`${this.url}/artists.json` , artist)
            /**
             * Mapping respond to fusion the id from firebase to model to avoid duplication
             * se Mapea la respuesta desde firebase para evitar que el id de ese registro vuelva a diplicarse
             */
            .pipe(
              map( (respond:any) => {
                artist.id = respond.name;
                return artist;
              })
            );
  }

  /**
   * Put method service
   * Metodo que actualiza del serivcio
   * @param artist 
   */
  updateArtist( artist : ArtistModel){
    /**
     * create a temp const with array spread syntax
     * se crea una constante temporal con la sintaxis de propagacion
     */
    const tempArtist = {
      ...artist
    };
    /**
     * delete the id from the temp to avoid duplicate attribute in the forebase
     * se elimina el id del temporal para evitar la ducplicidad del atributo id en el firebase
     */
    delete tempArtist.id;
    return this.http.put(`${this.url}/artists/${artist.id}.json` , tempArtist);
  }

  /**
   * Method to get all artists from firebase
   * Metodo que trae todos los artistas desde el firebase
   */
  getAllArtist(){
    return this.http.get(`${this.url}/artists.json`)
              .pipe(
                map( this.mapArray ),
                delay(500)
              );
  }

  private mapArray( artistsObject: Object ){
      const artists: ArtistModel[] = [];
      if( artistsObject === null ) { return []; }

      Object.keys ( artistsObject ).forEach( key => {
        const artist : ArtistModel = artistsObject[key];
        artist.id = key;
        artists.push( artist );
      });

      return artists;
  }

  /**
   * method to get a only artist
   * metodo que obtiene solo a un artista
   * @param id 
   */
  getArtist(id : string ){
    return this.http.get(`${this.url}/artists/${id}.json`);
  }

  /**
   * method to delete an artist
   * metodo que elimina a un artista
   * @param id 
   */
  deleteArtist(id:string){
    return this.http.delete(`${this.url}/artists/${id}.json`);
  }


}
