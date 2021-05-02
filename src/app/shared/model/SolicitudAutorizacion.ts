import { Cups } from './Cups';
import { Medicamento } from './Medicamento';
import { FileResponse } from '../../components/autorizaciones/model/FileResponse';
export interface SolicitudAutorizacion {
    tipoIdentificacion: string;
    numeroIdentificacion: string;
    telefonoFijo: string;
    telefonoCelular: string;
    correoElectronico: string;
    codigoProductoPac: string;
    codigoPlanPac: string;
    codigoCIE10Principal: string;
    codigoCIE10Dos: string;
    codigoCIE10Tres: string;
    tipoSolicitud: string;
    observacionesSolicitud: string;
    listaProcedimientos: Cups[];
    listaMedicamentos: Medicamento[];   
}