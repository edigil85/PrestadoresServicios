export interface  IprefijoFacturacion {
    idRegistro: Number;
    nitPrestador: String;
    tipoIdentificacion: String;
    prefijoFacturacion: String;
    activo: String;
    fechaInicial: String;
    fechaFinal: String;
    rangoInicial: String;
    rangoFinal: String;
    fechaCreacion: String ;
	fechaModificacion: String;
}
export class prefijoFacturacion {
    idRegistro: Number;
    nitPrestador: String;
    tipoIdentificacion: String;
    prefijoFacturacion: String;
    activo: String;
    fechaInicial: String;
    fechaFinal: String;
    rangoInicial: String;
    rangoFinal: String;
    fechaCreacion: String ;
	fechaModificacion: String;

    constructor(
        idRegistro: Number,
        nitPrestador: String,
        tipoIdentificacion: String,
        prefijoFacturacion: String,
        activo: String,
        fechaInicial: String,
        fechaFinal: String,
        rangoInicial: String,
        rangoFinal: String,
        fechaCreacion: String,
        fechaModificacion: String) {
            this.idRegistro=idRegistro
            this.nitPrestador=nitPrestador;
            this.tipoIdentificacion=tipoIdentificacion;
            this.prefijoFacturacion=prefijoFacturacion;
            this.activo=activo;
            this.fechaInicial=fechaInicial;
            this.fechaFinal=fechaFinal;
            this.rangoInicial=rangoInicial;
            this.rangoFinal=rangoFinal;
            this.fechaCreacion=fechaCreacion;
            this.fechaModificacion=fechaModificacion;
    }
}