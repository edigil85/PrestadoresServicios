export interface  IconsultaFacturaRadicada {
    idPrestador: String;
    tipoIdentificacion: String;
	numeroRadicacion: String;
	fechaRadicacionDesde: String;
	fechaRadicacionHasta: String;
}

export class consultaFacturaRadicada {
    idPrestador: String;
    tipoIdentificacion: String;
	numeroRadicacion: String;
	fechaRadicacionDesde: String;
	fechaRadicacionHasta: String;

    constructor(
        idPrestador: String,
        tipoIdentificacion: String,
        numeroRadicacion: String,
        fechaRadicacionDesde: String,
        fechaRadicacionHasta: String) {
         this.idPrestador=idPrestador;
         this.tipoIdentificacion=tipoIdentificacion;
         this.numeroRadicacion=numeroRadicacion;
         this.fechaRadicacionDesde=fechaRadicacionDesde;
         this.fechaRadicacionHasta=fechaRadicacionHasta;
    }
}