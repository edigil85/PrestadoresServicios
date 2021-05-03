import { Pipe, PipeTransform } from '@angular/core';
import { sedes } from '../model/sedes';

@Pipe({
  name: 'sedesFilter'
})
export class sedesFilter implements PipeTransform {
    transform(sedes: sedes[], textoFiltro: String ): sedes[]{
        if(!sedes || !textoFiltro){
            return sedes;
        }
        return sedes.filter(sedes=>
        sedes.direccion.toLowerCase().indexOf(textoFiltro.toLowerCase())!==-1 ||
        sedes.departamento.toLowerCase().indexOf(textoFiltro.toLowerCase())!==-1 ||
        sedes.ciudad.toLowerCase().indexOf(textoFiltro.toLowerCase())!==-1
        );
    }
}
