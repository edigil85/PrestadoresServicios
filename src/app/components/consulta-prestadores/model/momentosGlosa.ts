export interface  ImomentosGlosa {
    idMomentoGlosa: Number;
    nombreMomento: String;
    diasPlazoRespuesta: Number;
    fechaInicioMomento: String;
    fechaTentativaRespuesta: String;
    fechaRespuestaMomento: String;
    observacion: String;
    estado: String;
}

export class momentosGlosa {
    idMomentoGlosa: Number;
    nombreMomento: String;
    diasPlazoRespuesta: Number;
    fechaInicioMomento: String;
    fechaTentativaRespuesta: String;
    fechaRespuestaMomento: String;
    observacion: String;
    estado: String;
    constructor(
        idMomentoGlosa: Number,
        nombreMomento: String,
        diasPlazoRespuesta: Number,
        fechaInicioMomento: String,
        fechaTentativaRespuesta: String,
        fechaRespuestaMomento: String,
        observacion: String,
        estado: String) {
         this.idMomentoGlosa=idMomentoGlosa;
         this.nombreMomento=nombreMomento;
         this.diasPlazoRespuesta=diasPlazoRespuesta;
         this.fechaInicioMomento=fechaInicioMomento;
         this.fechaTentativaRespuesta=fechaTentativaRespuesta;
         this.fechaRespuestaMomento=fechaRespuestaMomento;
         this.observacion=observacion;
         this.estado=estado;
    }
}