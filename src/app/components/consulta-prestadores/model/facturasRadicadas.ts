export interface  IfacturaRadicada {
    idPrestador: String;
	tipoIdPrestador: String;
	fechaRadicacion: String;
	numeroRadicacion: String;
    totalFacturasRadicadas: String;
	valorTotalFacturasRadicadas: Number;
}

export class facturaRadicada {
    idPrestador: String;
	tipoIdPrestador: String;
	fechaRadicacion: String;
	numeroRadicacion: String;
    totalFacturasRadicadas: String;
	valorTotalFacturasRadicadas: Number;

    constructor(
        idPrestador: String,
	    tipoIdPrestador: String,
	    fechaRadicacion: String,
	    numeroRadicacion: String,
        totalFacturasRadicadas: String,
	    valorTotalFacturasRadicadas: Number) {
         this.idPrestador=idPrestador;
         this.tipoIdPrestador=tipoIdPrestador;
         this.fechaRadicacion=fechaRadicacion;
         this.totalFacturasRadicadas=totalFacturasRadicadas;
         this.valorTotalFacturasRadicadas=valorTotalFacturasRadicadas;
    }
}