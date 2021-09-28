export interface IconsultaDevoluciones{
    idPrestador: String;	
    tipoIdentificacion: String;
    prefijoFactura : String;
    numeroFactura: String;
    fechaDevolucionDesde: String;
    fechaDevolucionHasta: String;
    tipoconsulta: Number;
}

export class consultaDevoluciones{
    idPrestador: String;	
    tipoIdentificacion: String;
    prefijoFactura : String;
    numeroFactura: String;
    fechaDevolucionDesde: String;
    fechaDevolucionHasta: String;
    tipoconsulta: Number;

    constructor(
        idPrestador: String,
        tipoIdentificacion: String,
        prefijoFactura : String,
        numeroFactura: String,
        fechaDevolucionDesde: String,
        fechaDevolucionHasta: String,
        tipoconsulta: Number
    ){
        this.idPrestador=idPrestador;
        this.tipoIdentificacion=tipoIdentificacion;
        this.prefijoFactura=prefijoFactura;
        this.numeroFactura=numeroFactura;
        this.fechaDevolucionDesde=fechaDevolucionDesde;
        this.fechaDevolucionHasta=fechaDevolucionHasta;
        this.tipoconsulta=tipoconsulta;
    }
}




