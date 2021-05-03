export interface  IcodigoHabilitacion {
    nitPrestador: String;
    tipoIdentificacion: String;
	codigoHabilitacion: String;
    descripcionServicio: String;
}

export class codigoHabilitacion {
    nitPrestador: String;
    tipoIdentificacion: String;
	codigoHabilitacion: String;
    descripcionServicio: String;
    constructor(
        nitPrestador: String,
    tipoIdentificacion: String,
	codigoHabilitacion: String,
    descripcionServicio: String) {
            this.nitPrestador=nitPrestador;
            this.tipoIdentificacion=tipoIdentificacion;
            this.codigoHabilitacion=codigoHabilitacion;
            this.descripcionServicio=descripcionServicio;
    }
}