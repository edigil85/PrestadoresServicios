export interface  IinfoPrestadores {
    nitPrestador: String;
    tipoIdentificacion: String;
    razonSocial: String;
    representanteLegal: String;
    emailReperesentantelegal: String;
}
export class infoPrestadores {
    nitPrestador: String;
    tipoIdentificacion: String;
    razonSocial: String;
    representanteLegal: String;
    emailReperesentantelegal: String;

    constructor(
        nitPrestador: String,
    tipoIdentificacion: String,
    razonSocial: String,
    representanteLegal: String,
    emailReperesentantelegal: String) {
            this.nitPrestador=nitPrestador;
            this.tipoIdentificacion=tipoIdentificacion;
            this.razonSocial=razonSocial;
            this.representanteLegal=representanteLegal;
            this.emailReperesentantelegal=emailReperesentantelegal;
    }
}