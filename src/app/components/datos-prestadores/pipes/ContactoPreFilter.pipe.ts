import { Pipe, PipeTransform } from '@angular/core';
import { IcontactoPrestador } from '../model/contactoPrestador';

@Pipe({
  name: 'contactoPreFilter'
})
export class contactoPreFilter implements PipeTransform {
    transform(contactoPrestador: IcontactoPrestador[], textoFiltro: String ): IcontactoPrestador[]{
        if(!contactoPrestador || !textoFiltro){
            return contactoPrestador;
        }
        return contactoPrestador.filter(contactoPrestador=>
            contactoPrestador.nombre.toLowerCase().indexOf(textoFiltro.toLowerCase())!==-1 ||
            contactoPrestador.telefono.toLowerCase().indexOf(textoFiltro.toLowerCase())!==-1 ||
            contactoPrestador.emailNotificacion.toLowerCase().indexOf(textoFiltro.toLowerCase())!==-1
        );
    }
}