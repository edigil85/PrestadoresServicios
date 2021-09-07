export interface  IconsultaFacturaRadicada {
    idPrestador: String;
    tipoIdentificacion: String;
	numeroRadicacion: String;
	fechaRadicacionDesde: String;
	fechaRadicacionHasta: String;
    tipoConsulta: Number;
}

export class consultaFacturaRadicada {
    idPrestador: String;
    tipoIdentificacion: String;
	numeroRadicacion: String;
	fechaRadicacionDesde: String;
	fechaRadicacionHasta: String;
    tipoConsulta: Number;

    constructor(
        idPrestador: String,
        tipoIdentificacion: String,
        numeroRadicacion: String,
        fechaRadicacionDesde: String,
        fechaRadicacionHasta: String,
        tipoConsulta: Number) {
         this.idPrestador=idPrestador;
         this.tipoIdentificacion=tipoIdentificacion;
         this.numeroRadicacion=numeroRadicacion;
         this.fechaRadicacionDesde=fechaRadicacionDesde;
         this.fechaRadicacionHasta=fechaRadicacionHasta;
         this.tipoConsulta=tipoConsulta;
    }
}