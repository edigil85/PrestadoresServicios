export interface  IcodigoHabilitacion {
    nitPrestador: String;
    tipoIdentificacion: String;
	codigo: String;
    descripcionServicio: String;
}

export class codigoHabilitacion {
    nitPrestador: String;
    tipoIdentificacion: String;
	codigo: String;
    descripcionServicio: String;
    constructor(
        nitPrestador: String,
    tipoIdentificacion: String,
	codigo: String,
    descripcionServicio: String) {
            this.nitPrestador=nitPrestador;
            this.tipoIdentificacion=tipoIdentificacion;
            this.codigo=codigo;
            this.descripcionServicio=descripcionServicio;
    }
}