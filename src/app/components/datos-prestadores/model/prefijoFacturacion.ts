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

    constructor(
        idRegistro: Number,
        nitPrestador: String,
        tipoIdentificacion: String,
        prefijoFacturacion: String,
        activo: String,
        fechaInicial: String,
        fechaFinal: String) {
            this.idRegistro=idRegistro
            this.nitPrestador=nitPrestador;
            this.tipoIdentificacion=tipoIdentificacion;
            this.prefijoFacturacion=prefijoFacturacion;
            this.activo=activo;
            this.fechaInicial=fechaInicial;
            this.fechaFinal=fechaFinal;
            this.fechaInicial=fechaInicial;
            this.fechaFinal=fechaFinal;
    }
}