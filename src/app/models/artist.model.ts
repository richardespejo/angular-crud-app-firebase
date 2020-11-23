import { StaticClassSansProvider } from '@angular/core';

export class ArtistModel {
    id: string;
    nombre: string;
    habilidad: string;
    status: boolean;

    constructor(){
        this.status = true;
    }

}