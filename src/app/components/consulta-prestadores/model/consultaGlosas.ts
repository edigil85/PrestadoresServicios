export interface  IconsultaGlosa {
    idPrestador: String;
	tipoIdentificacion: String;
    numeroGlosa: String;
	prefijoFactura: String;
	numeroFactura: String;
    fechaNotificacionDesde: String;
	fechaNotificacionHasta: String;
    tipoconsulta: number;
}

export class consultaGlosa {
    idPrestador: String;
	tipoIdentificacion: String;
    numeroGlosa: String;
	prefijoFactura: String;
	numeroFactura: String;
    fechaNotificacionDesde: String;
	fechaNotificacionHasta: String;
    tipoconsulta: Number;

    constructor(
    idPrestador: String,
	tipoIdentificacion: String,
    numeroGlosa: String,
	prefijoFactura: String,
	numeroFactura: String,
    fechaNotificacionDesde: String,
	fechaNotificacionHasta: String,
    tipoconsulta: Number) {
         this.idPrestador=idPrestador;
         this.tipoIdentificacion=tipoIdentificacion;
         this.numeroGlosa=numeroGlosa;
         this.prefijoFactura=prefijoFactura;
         this.numeroFactura=numeroFactura;
         this.fechaNotificacionDesde=fechaNotificacionDesde;
         this.fechaNotificacionHasta=fechaNotificacionHasta;
         this.tipoconsulta=tipoconsulta;
    }
}