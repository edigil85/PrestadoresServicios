import { Pipe, PipeTransform } from '@angular/core';
import { prefijoFacturacion } from '../model/prefijoFacturacion';

@Pipe({
  name: 'prefijoFacFilter'
})
export class prefijoFacFilter implements PipeTransform {
    transform(prefijoFacturacion: prefijoFacturacion[], textoFiltro: String ): prefijoFacturacion[]{
        if(!prefijoFacturacion || !textoFiltro){
            return prefijoFacturacion;
        }
        return prefijoFacturacion.filter(prefijoFacturacion=>
            prefijoFacturacion.prefijoFacturacion.toLowerCase().indexOf(textoFiltro.toLowerCase())!==-1
        );
    }
}