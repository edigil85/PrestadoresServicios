export class Constants {

    /** uri upload file p8 */
  static URI_SERVICE_UPLOAD_FILE_P8 = '/solicitudes/cargarArchivo';

  static URI_SERVICE_DELETE_FILE_P8 = '/solicitudes/eliminarArchivo/';

  static URI_SERVICE_CIE10 = '/solicitudes/consultarDiagnosticos';

  static URI_SERVICE_CONSULT_MEDICATIONS = '/solicitudes/consultarMedicamentos';
  
  static URI_SERVICE_CONSULT_PROCEDURES = '/solicitudes/consultarProcedimientos';

  static URI_SERVICE_CONSULT_BASIC_DATA = '/solicitudes/consultarDatosBasicos';

  static URI_SERVICE_SETTLE_APPLICATION = '/solicitudes/radicarSolicitud';

  /** Uri Modulo de informacion prestadores **/

  static URI_SERVICE_SEDES_CONSULTA = '/sedeprestador/consultarsedeprestador';

  static URI_SERVICE_SEDES_CREAR = '/sedeprestador/insertarsedeprestador';

  static URI_SERVICE_SEDES_ACTUALIZAR = '/sedeprestador/actualizarsedeprestador';

  static URI_SERVICE_SEDES_ELIMINAR = '/sedeprestador/eliminarsedeprestador';

  static URI_SERVICE_CODIGOHABILITACION_CONSULTA = '/codigohabilitacion/consultarcodigoshabiliatacion';

  static URI_SERVICE_CODIGOHABILITACION_CREAR = '/codigohabilitacion/insertarcodigohabilitacion';

  static URI_SERVICE_CODIGOHABILITACION_ACTUALIZAR ='/codigohabilitacion/actualizarcodigohabilitacion';

  static URI_SERVICE_CODIGOHABILITACION_ELIMINAR ='/codigohabilitacion/eliminarcodigohabilitacion';

  static URI_SERVICE_CONTACTOPRESTADOR_CONSULTA = '/contactonotificacion/consultarcontactoprestador';

  static URI_SERVICE_CONTACTOPRESTADOR_CREAR = '/contactonotificacion/insertarcontactoprestador';

  static URI_SERVICE_CONTACTOPRESTADOR_ACTUALIZAR ='/contactonotificacion/actualizarcontactoprestador';

  static URI_SERVICE_CONTACTOPRESTADOR_ELIMINAR ='/contactonotificacion/eliminarcontactoprestador';

  static URI_SERVICE_INFOPRESTADOR_CONSULTA = '/informacionprestador/consultarinfoprestador';

  static URI_SERVICE_INFOPRESTADOR_CREAR = '/informacionprestador/insertarinfoprestador';

  static URI_SERVICE_INFOPRESTADOR_ACTUALIZAR ='/informacionprestador/actualizarinfoprestador';

  static URI_SERVICE_PREFIJOFACTURACION_CONSULTA = '/prefijofacturacion/consultarprefijofacturacion';

  static URI_SERVICE_PREFIJOFACTURACION_CREAR = '/prefijofacturacion/insertarprefijofacturacion';

  static URI_SERVICE_PREFIJOFACTURACION_ACTUALIZAR ='/prefijofacturacion/actualizarprefijofacturacion';

  static URI_SERVICE_PREFIJOFACTURACION_ELIMINAR ='/prefijofacturacion/eliminarprefijofacturacion';

  static URI_SERVICE_CONSULTA_DEPARTAMENTO = '/ubicacion/departamento';

  static URI_SERVICE_CONSULTA_CIUDAD = '/ubicacion/ciudad';

  static URI_SERVICE_SECCION_DATA ='/informacionseccion/consultar';

  static URI_SERVICE_SEDES_ELIMINARTODOS = '/sedeprestador/eliminartodossedeprestador';

  static URI_SERVICE_CODIGOHABILITACION_ELIMINARTODOS ='/codigohabilitacion/eliminartodoscodigohabilitacion';

  static URI_SERVICE_CONTACTOPRESTADOR_ELIMINARTODOS ='/contactonotificacion/eliminartodoscontactoprestador';

  static URI_SERVICE_PREFIJOFACTURACION_ELIMINARTODOS ='/prefijofacturacion/eliminartodosprefijofacturacion';

  //Constanetes para maximos registros

  static SEDES_PRESTADORES_MAX = 80;

  static RANGOSFACTURACION_PRESTADORES_MAX = 300;

  static CODIGOSHABILITACION_PRESTADORES_MAX = 300;

}