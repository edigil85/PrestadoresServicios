export class TemplateIpsNoConect{
    constructor(
        public TipoIDPaciente: string,
        public NoIDPaciente: string,
        public PrimerNombre: string,
        public SegundoNombre: string,
        public PrimerApellido: string,
        public SegundoApellido: string,
        public CodPrestador: string,
        public FechaAgendamiento: string,
        public HoraAgendamiento: string,
        public NumeroDosis: string,
        public CausaNoAgendamiento: string
    ){
    }
}