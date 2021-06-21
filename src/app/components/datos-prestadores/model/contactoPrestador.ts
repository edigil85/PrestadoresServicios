export interface  IcontactoPrestador {
    idRegistro: String;
	nitPrestador: String;
	tipoIdentificacion: String;
	notificacionGlosa: String;
	notificacionDevoluciones: String;
	notificacionCartera: String;
	emailNotificacion: String;
	nombre: String;
	telefono: String;
	fechaCreacion: String ;
	fechaModificacion: String;
}
export class contactoPrestador {
    idRegistro: String;
	nitPrestador: String;
	tipoIdentificacion: String;
	notificacionGlosa: String;
	notificacionDevoluciones: String;
	notificacionCartera: String;
	emailNotificacion: String;
	nombre: String;
	telefono: String;
	fechaCreacion: String ;
	fechaModificacion: String;

    constructor(
        idRegistro: String,
	nitPrestador: String,
	tipoIdentificacion: String,
	notificacionGlosa: String,
	notificacionDevoluciones: String,
	notificacionCartera: String,
	emailNotificacion: String,
	nombre: String,
	telefono: String,
	fechaCreacion: String,
	fechaModificacion: String) {
        this.idRegistro=idRegistro;
        this.nitPrestador=nitPrestador;
        this.tipoIdentificacion=tipoIdentificacion;
        this.notificacionGlosa=notificacionGlosa;
        this.notificacionDevoluciones=notificacionDevoluciones;
        this.notificacionCartera=notificacionCartera;
        this.emailNotificacion=emailNotificacion;
        this.nombre=nombre;
        this.telefono=telefono;
		this.fechaCreacion=fechaCreacion;
		this.fechaModificacion=fechaModificacion;
    }
}