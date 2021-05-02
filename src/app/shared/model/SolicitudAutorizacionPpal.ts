import { SolicitudAutorizacion } from './SolicitudAutorizacion';
import { FileResponse } from '../../components/autorizaciones/model/FileResponse';
export interface SolicitudAutorizacionPpal {
    solicitudAutorizacion: SolicitudAutorizacion;
    listaDocumentosP8: FileResponse[];
}