import { Pipe, PipeTransform } from '@angular/core';
import { codigoHabilitacion } from '../model/codigoHabilitacion';

@Pipe({
  name: 'codigoHabFilter'
})
export class codigoHabFilter implements PipeTransform {
    transform(codigoHabilitacion: codigoHabilitacion[], textoFiltro: String ): codigoHabilitacion[]{
        if(!codigoHabilitacion || !textoFiltro){
            return codigoHabilitacion;
        }
        return codigoHabilitacion.filter(codigoHabilitacion=>
            codigoHabilitacion.codigoHabilitacion.toLowerCase().indexOf(textoFiltro.toLowerCase())!==-1 ||
            codigoHabilitacion.descripcionServicio.toLowerCase().indexOf(textoFiltro.toLowerCase())!==-1
        );
    }
}