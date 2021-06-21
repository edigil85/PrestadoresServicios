export interface  IcodigoHabilitacion {
    nitPrestador: String;
    tipoIdentificacion: String;
	codigoHabilitacion: String;
    descripcionServicio: String;
    fechaCreacion: String ;
	fechaModificacion: String;
}

export class codigoHabilitacion {
    nitPrestador: String;
    tipoIdentificacion: String;
	codigoHabilitacion: String;
    descripcionServicio: String;
    fechaCreacion: String ;
	fechaModificacion: String;
    constructor(
        nitPrestador: String,
    tipoIdentificacion: String,
	codigoHabilitacion: String,
    descripcionServicio: String,
    fechaCreacion: String ,
	fechaModificacion: String) {
            this.nitPrestador=nitPrestador;
            this.tipoIdentificacion=tipoIdentificacion;
            this.codigoHabilitacion=codigoHabilitacion;
            this.descripcionServicio=descripcionServicio;
            this.fechaCreacion=fechaCreacion;
            this.fechaModificacion=fechaModificacion;
    }
}