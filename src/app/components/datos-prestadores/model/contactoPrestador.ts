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

    constructor(
        idRegistro: String,
	nitPrestador: String,
	tipoIdentificacion: String,
	notificacionGlosa: String,
	notificacionDevoluciones: String,
	notificacionCartera: String,
	emailNotificacion: String,
	nombre: String,
	telefono: String,) {
        this.idRegistro=idRegistro;
        this.nitPrestador=nitPrestador;
        this.tipoIdentificacion=tipoIdentificacion;
        this.notificacionGlosa=notificacionGlosa;
        this.notificacionDevoluciones=notificacionDevoluciones;
        this.notificacionCartera=notificacionCartera;
        this.emailNotificacion=emailNotificacion;
        this.nombre=nombre;
        this.telefono=telefono;
    }
}