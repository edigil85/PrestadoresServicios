import { ImomentosGlosa } from "./momentosGlosa";
export interface  Iglosas {
    idPrestador: String;
	tipoIdentificacion: String;
	numeroGlosa: String;
	prefijoFactura: String;
    fechaRadicacion: String;
	valorFactura: String;
    valorGlosa: String;
    momentosGlosa: ImomentosGlosa [];
    estado: string;
}

export class glosas {
    idPrestador: String;
	tipoIdentificacion: String;
	numeroGlosa: String;
	prefijoFactura: String;
    fechaRadicacion: String;
	valorFactura: String;
    valorGlosa: String;
    momentosGlosa: ImomentosGlosa [];
    estado: String;

    constructor(
    idPrestador: String,
	tipoIdentificacion: String,
	numeroGlosa: String,
	prefijoFactura: String,
    fechaRadicacion: String,
	valorFactura: String,
    valorGlosa: String,
    momentosGlosa: ImomentosGlosa [],
    estado: String) {
         this.idPrestador=idPrestador;
         this.tipoIdentificacion=tipoIdentificacion;
         this.numeroGlosa=numeroGlosa;
         this.prefijoFactura=prefijoFactura;
         this.fechaRadicacion=fechaRadicacion;
         this.valorFactura=valorFactura;
         this.valorGlosa=valorGlosa;
         this.momentosGlosa=momentosGlosa;
         this.estado=estado;
    }
}

