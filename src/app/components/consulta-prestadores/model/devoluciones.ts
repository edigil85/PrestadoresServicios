export interface Idevoluviones{
    idPrestador: String;
    tipoIdentificacion: String;
    prefijoFactura: String;
    numeroFactura: String;
    valorFactura: number;
    fechaRadicacion: String;
    fechaDevolucion: String;
    radicado: String;
    plan: String;
    causaRechazo: String;
    observacion: String;
    fechaFactura: String;
    nombreUsuario: String;
    fechaTentativaRespuesta: String;
    estado: String;
}

export class devoluciones{
    idPrestador: String;
    tipoIdentificacion: String;
    prefijoFactura: String;
    numeroFactura: String;
    valorFactura: number;
    fechaRadicacion: String;
    fechaDevolucion: String;
    radicado: String;
    plan: String;
    causaRechazo: String;
    observacion: String;
    fechaFactura: String;
    nombreUsuario: String;
    fechaTentativaRespuesta: String;
    estado: String;

    constructor(
        idPrestador: String,
        tipoIdentificacion: String,
        prefijoFactura: String,
        numeroFactura: String,
        valorFactura: number,
        fechaRadicacion: String,
        fechaDevolucion: String,
        radicado: String,
        plan: String,
        causaRechazo: String,
        observacion: String,
        fechaFactura: String,
        nombreUsuario: String,
        fechaTentativaRespuesta: String,
        estado: String,
    ){
        this.idPrestador=idPrestador;
        this.tipoIdentificacion=tipoIdentificacion;
        this.prefijoFactura=prefijoFactura;
        this.numeroFactura=numeroFactura;
        this.valorFactura=valorFactura;
        this.fechaRadicacion=fechaRadicacion
        this.fechaDevolucion=fechaDevolucion;
        this.radicado=radicado;
        this.plan=plan;
        this.causaRechazo=causaRechazo;
        this.observacion=observacion;
        this.fechaFactura=fechaFactura;
        this.nombreUsuario=nombreUsuario;
        this.fechaTentativaRespuesta=fechaTentativaRespuesta;
        this.estado=estado;
    }
}