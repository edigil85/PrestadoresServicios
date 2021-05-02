import { Component, HostListener, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { AutorizacionesService } from '../service/autorizaciones.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import {
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { ModalDialogComponent } from '../../modal-dialog/modal-dialog.component';
import { ValidadoresService } from '../service/validadores.service';
import { FileUpload } from '../model/FileUpload';
import { UploadFileService } from '../service/upload-file.service';
import { FileResponse } from '../model/FileResponse';
import { Afiliado } from 'src/app/shared/model/Afiliado';
import { Cie10 } from 'src/app/shared/model/Cie10';
import { Cups } from 'src/app/shared/model/Cups';
import { DialogData } from 'src/app/shared/model/DialogData';
import { Medicamento } from 'src/app/shared/model/Medicamento';
import { SolicitudAutorizacion } from 'src/app/shared/model/SolicitudAutorizacion';
import { SolicitudResponse } from 'src/app/shared/model/SolicitudResponse';
import { UtilService } from 'src/app/shared/service/util.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MedicamentoRequest } from '../../../shared/model/MedicamentoRequest';
import { ProcedureRequest } from '../../../shared/model/ProcedureRequest';
import { SolicitudAutorizacionPpal } from '../../../shared/model/SolicitudAutorizacionPpal';
import { DocumentRequest } from '../../../shared/model/DocumentsRequest';
import { NgAnimateScrollService } from 'ng-animate-scroll';

@Component({
  selector: 'app-solicitud-autorizaciones',
  templateUrl: './solicitud-autorizaciones.component.html',
  styleUrls: ['./solicitud-autorizaciones.component.css'],
})
export class SolicitudAutorizacionesComponent implements OnInit {
  typeIndetification: any[] = [];
  listRequest: any[] = [];
  myForm: FormGroup;
  myFormData: FormGroup;
  affiliate: Afiliado;
  tieneAcceso = false;
  datosSolicitud = false;
  showCUPs = false;
  showCUMS = false;
  cie10: Cie10[];
  qty = 0;
  swButton = false;

  filteredCie10: Observable<string[]>;

  cupsArray: Cups[];
  medicineArray: Medicamento[];
  cups: Cups;
  array: string[] = [];
  filteredCupsCode: Observable<string[]>;
  filteredCupsDescription: Observable<string[]>;

  cie10Description: Cie10[];
  filteredCie10Description: Observable<string[]>;
  filteredMedicine: Observable<string[]>;

  dialogConfig = new MatDialogConfig();

  dialogData: DialogData;

  fileClinicHistory: File;
  fileFormOrRem: File;
  authorizationRequest: SolicitudAutorizacionPpal;
  authorizationRequestBody: SolicitudAutorizacion;
  response: SolicitudResponse;

  idxFileHistory: number;
  idxFileFormOrRem: number;
  idxFileOther: number;

  interval;

  observacionmax: number = 300;

  swTem: Boolean = false;
  constructor(
    public fb: FormBuilder,
    private utilService: UtilService,
    private autorizacionesService: AutorizacionesService,
    private validadores: ValidadoresService,
    public dialog: MatDialog,
    public fileUploadService: UploadFileService,
    private spinner: NgxSpinnerService,
    private animateScrollService: NgAnimateScrollService,
  ) { }

  ngOnInit(): void {
    this._createForm();
    this._getDocumentTypes();
    this._filterCIE10();
    this._filterMedecine();
    this._filterCups();

  }

  ngAfterViewInit(): void {
    this._loadCIE10();
    this._loadMedicines();
    this._loadCups();
  }



  openDialog(pTittle, pSubtittle, pMessage) {
    this.dialog.open(ModalDialogComponent, {
      data: {
        tittle: pTittle,
        subtittle: pSubtittle,
        message: pMessage,
      },
    });
  }

  _createForm() {
    this.myForm = this.fb.group(
      {
        identificationType: ['', [Validators.required]],
        documentNumber: ['', [Validators.required, Validators.maxLength(20)]],
      },
      {
        validators: this.validadores.customValidate(
          'identificationType',
          'documentNumber'
        ),
      }
    );
    this.myFormData = this.fb.group({
      nombreCompleto: ['', [Validators.required]],
      telefonoFijo: ['', [Validators.maxLength(7), Validators.pattern("^[0-9]*$")]],
      celular: ['', [Validators.required, Validators.maxLength(10), Validators.pattern("^[0-9]*$")]],
      correoElectronico: ['', [Validators.required, Validators.maxLength(80), Validators.pattern("^[_a-zA-Z0-9-]+(.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)*(.[a-zA-Z]{2,4})$")]],
      tipoPlanPAC: [''],
      requestType: ['', [Validators.required]],
      cie10: ['', Validators.required],
      descripcionCIE10: ['', Validators.required],
      medicamento: [''],
      observaciones: ['', [Validators.required, Validators.maxLength(300)]],
      medicamentos: this.fb.array([]),
      cups: this.fb.group({
        cantidad: ['1'],
        codigo: [''],
        descripcion: [''],
      }),
      cupsArrayForm: this.fb.array([]),
      listadoArchivos: this.fb.array([]),
    });
  }

  _sumQty() {
    this.qty = this.qty + 1;
  }

  _minusQty() {
    this.qty = this.qty - 1;
  }


  _validateAddQty() {
    this.swButton = this.qty <= 9 ? false : true;
  }

  _filterCIE10() {
    this.filteredCie10 = this.myFormData.get('cie10').valueChanges.pipe(
      startWith(''),
      map((value) => {
        return this._filter(value)
      })
    );
    this.filteredCie10Description = this.myFormData
      .get('descripcionCIE10')
      .valueChanges.pipe(
        startWith(''),
        map((value) => {
          return this._filterDescriptionCIE10(value)
        })
      );
  }

  _filterMedecine() {
    this.filteredMedicine = this.myFormData
      .get('medicamento')
      .valueChanges.pipe(
        startWith(''),
        map((value) => this._filterMedicines(value))
      );
  }

  _filterCups() {
    this.filteredCupsCode = this.myFormData
      .get('cups.codigo')
      .valueChanges.pipe(
        startWith(''),
        map((value) => this._filterCupsCode(value))
      );

    this.filteredCupsDescription = this.myFormData
      .get('cups.descripcion')
      .valueChanges.pipe(
        startWith(''),
        map((value) => this._filterCupsDescription(value))
      );
  }

  notRepeatMedicine(m: Medicamento) {
    let resp = false;
    if (this.medicamentos != null) {
      for (const c of this.medicamentos.controls) {
        resp = m.codigoMedicamento === c.value.codigoMedicamento ? true : false;
        break;
      }
    }
    return resp;
  }

  addMedicine() {

    const medicine = this.myFormData.get('medicamento').value;
    let medicineAux: Medicamento = this._findMedicine(medicine);
    if (medicine !== '' && medicineAux != null) {
      if (!this.notRepeatMedicine(medicineAux)) {
        this.medicamentos.push(new FormControl(medicineAux));
        this._sumQty();
        this._validateAddQty();
        this.myFormData.patchValue({
          medicamento: '',
        });
        if (this.swButton) {
          this.openDialog(
            'Mensaje Informativo',
            'Medicamentos',
            'Recuerde que por esta opción se permite ingresar máximo 10 medicamentos'
          );
        }
      } else {
        this.openDialog(
          'Mensaje Informativo',
          'Medicamentos',
          'El Medicamento ' + medicineAux.nombreGenerico + ' ' + medicineAux.descripcionMedicamento + '  ya se encuentra ingresado'
        );
      }

    } else {
      this.openDialog(
        'Mensaje Informativo',
        'Medicamentos',
        'Diligencie el campo descripciòn de Medicamento'
      );
    }
  }

  loadMedicineRequest(medicine: Medicamento) {
    let mReq: MedicamentoRequest = {
      codigoPrestacion: medicine.codigoMedicamento,
      cantidad: medicine.cantidad
    };
    return mReq;
  }

  loadDocumentsRequest(f: FileResponse) {
    let fReq: DocumentRequest = {
      idDocumento: f.idDocumento,
      documentalClassName: f.claseDocumental
    };
    return fReq;
  }

  loadProcedureRequest(cup: Cups) {
    const pReq: ProcedureRequest = {
      codigoPrestacion: cup.codigoCups,
      cantidad: cup.cantidad
    }
    return pReq;
  }

  notRepeatCups(value: string) {
    let resp = false;
    if (this.cupsArrayForm != null) {
      for (const c of this.cupsArrayForm.controls) {
        if (c.value.codigoCups == value) {
          return true;
        }
      }
    }
    return false;
  }

  validateMaxCups() {
    if (this.cupsArrayForm.controls.length == 10) {
      this.openDialog(
        'Mensaje Informativo',
        '',
        'Recuerde que por esta opción se permite ingresar máximo 10 prestaciones'
      );
      return false;
    }
    return true;
  }

  addCups() {
    
    const qty = this.myFormData.get('cups.cantidad').value;
    const code = this.myFormData.get('cups.codigo').value;
    const desc = this.myFormData.get('cups.descripcion').value;
    if (qty !== '' && code !== '' && desc !== '' &&
      qty !== null && code !== null && desc !== null) {
      if (qty >= 1 && qty < 11) {
        if (this.validateMaxCups()) {
          if (!this.notRepeatCups(code)) {
            this.loadCup();
            this.cupsArrayForm.push(new FormControl(this.cups));
            this._sumQty();
            this._validateAddQty();
            this.resetCups();
          } else {
            this.openDialog(
              'Mensaje Informativo',
              'Código de prestación (CUPS)',
              'El Código de prestación  ' + code + ' ya se encuentra ingresado'
            );
          }
        }

      } else {
        this.openDialog(
          'Mensaje Informativo',
          'Código de prestación (CUPS)',
          'El campo cantidad debe tener un valor mayor a 0'
        );
      }

    } else {
      this.openDialog(
        'Mensaje Informativo',
        'Código de prestación (CUPS)',
        'Diligencie todos los campos para agregar cups'
      );
    }
  }

  loadCup() {
    this.cups = {
      cantidad: this.myFormData.get('cups.cantidad').value,
      codigoSuracups: this.cups.codigoSuracups,
      codigoCups: this.myFormData.get('cups.codigo').value,
      nombreProcedimiento: this.myFormData.get('cups.descripcion').value,
    };
  }

  _resetRequest() {
    this.myForm.patchValue({
      identificationType: '',
      documentNumber: '',
    });

    this.myFormData.patchValue({
      cie10: '',
      descripcionCIE10: '',
      observaciones: '',
      cups: {
        cantidad: '1',
        codigo: '',
        descripcion: '',
      }
    });
  }

  resetCie10() {
    this.myFormData.patchValue({
      cie10: '',
      descripcionCIE10: '',
    });
  }

  resetMedicine() {
    this.myFormData.patchValue({
      medicamento: '',
    });
    while (this.medicamentos.length > 0) {
      this.medicamentos.removeAt(0);
    }
  }


  resetFile() {
    while (this.listadoArchivos.length > 0) {
      this.listadoArchivos.removeAt(0);
      (<HTMLInputElement>document.getElementById("exampleInputFile1")).value = "";
    }
    const slides = document.getElementsByClassName('custom-file-input');
    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i] as HTMLElement;
      slide.nodeValue = "";
    }
  }

  resetCups() {
    this.myFormData.patchValue({
      cups: {
        cantidad: '1',
        codigo: '',
        descripcion: '',
      },
    });
  }

  resetCupFormArray() {
    if (this.cupsArrayForm != null) {
      while (this.cupsArrayForm.length > 0) {
        this.cupsArrayForm.removeAt(0);
      }
    }
  }

  removeMedicine(idx: number) {
    this.medicamentos.removeAt(idx);
    this._minusQty();
    this._validateAddQty();

  }

  removeCups(idx: number) {
    this.cupsArrayForm.removeAt(idx);
    this._minusQty();
    this._validateAddQty();
  }

  _getDocumentTypes() {
    this.utilService.getDocumentTypes().subscribe(
      (result) => {
        this.typeIndetification = result;
        this._loadSelect();
      },
      (error) => console.error(error)
    );
  }
  _consult() {
    this.showCUMS = false;
    this.showCUPs = false;
    this.datosSolicitud = false;
    if (this.myForm.invalid) {
      return Object.values(this.myForm.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((c) => c.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    } else {
      this.spinner.show();
      this.affiliate = null;
      this.tieneAcceso = false;
      const identificationType = this.myForm.get('identificationType').value;
      const documentNumber = this.myForm.get('documentNumber').value;
      this.autorizacionesService.findAffiliate(
        identificationType,
        documentNumber
      ).subscribe(
        async (result) => {
          this.affiliate = await result;
          const secondName = this.affiliate.segundoNombre==null?"":' '+this.affiliate.segundoNombre;
          this.affiliate.NombreCompleto = this.affiliate.primerNombre +  secondName + ' ' +
            this.affiliate.primerApellido + ' ' + this.affiliate.segundoApellido;
          this.classClinicHistory = 'clinic-history';
          this.classRem = 'rem';
          this.classOther = 'other'
          if (this.affiliate.tieneDerechosPbs === true) {
            this.tieneAcceso = true;
            if (this.affiliate.tieneDerechosPac) {
              this.utilService.getListRequestPAC().subscribe(
                (result0) => {
                  this.listRequest = result0;
                },
                (error) => console.error(error)
              );
            } else {
              this.utilService.getListrequestPBS().subscribe(
                (result1) => {
                  this.listRequest = result1;
                },
                (error) => console.error(error)
              );
            }
            this.spinner.hide();
          } else {
            this.spinner.hide();
            this.openDialog(
              'Mensaje Informativo',
              '',
              'Comuníquese con el usuario para verificar su estado de afiliación.'
            );
          }
        },
        (error) => {
          this.spinner.hide();
          this._getError(error);
        }
      );

    }
  }

  _getError(error) {
    if (error.status === 500) {
      this.openDialog(
        'Mensaje Error',
        '',
        'Ocurrió un error en el servicio, por favor intente más tarde.'
      );
    } else if (error.status === 401) {
      this.openDialog(
        'Mensaje Error',
        '401',
        'Su sesión ha terminado, por favor inicia nuevamente.'
      );

    } else if (error.error.frontEndErrorCode != undefined) {
      this.openDialog(
        'Mensaje Error',
        '',
        this.utilService.showMessageError(error.error.frontEndErrorCode)
      );
    }
  }


  _loadAuthorizationRequest() {
    this.authorizationRequestBody = {
      tipoIdentificacion: this.affiliate.tipoDocumento.toUpperCase(),
      numeroIdentificacion: this.affiliate.numeroDocumento,
      telefonoFijo: this.myFormData.get('telefonoFijo').value === "" ? null : this.myFormData.get('telefonoFijo').value,
      telefonoCelular: this.myFormData.get('celular').value,
      correoElectronico: this.myFormData.get('correoElectronico').value,
      codigoProductoPac: this.affiliate.codigoProductoPac,
      codigoPlanPac: this.affiliate.codigoTipoPlanPac,
      codigoCIE10Principal: this.myFormData.get('cie10').value,
      codigoCIE10Dos: '',
      codigoCIE10Tres: '',
      tipoSolicitud: this.myFormData.get('requestType').value,
      observacionesSolicitud: this.myFormData.get('observaciones').value,
      listaProcedimientos: this._getCupsArray(),
      listaMedicamentos: this._getMedicineArray(),
    };
  }

  _getMedicineArray(): Medicamento[] {
    const array = [];
    if (this.medicamentos != null) {
      for (const c of this.medicamentos.controls) {
        array.push(this.loadMedicineRequest(c.value));
      }
    }

    return array;
  }

  _getFileArray() {
    const array = [];

    if (this.listadoArchivos != null) {
      for (const c of this.listadoArchivos.controls) {
        array.push(c.value);
      }
    }
    return array;
  }

  _getCupsArray() {
    const array = [];
    if (this.cupsArrayForm != null) {
      for (const c of this.cupsArrayForm.controls) {
        array.push(this.loadProcedureRequest(c.value));
      }
    }

    return array;
  }


  _send() {

    if (this.myFormData.invalid) {
      return this.errorFormInvalid();
    } else if (this.validateMedAndPro()) {
    } else if (this.existFileFormOrRem /*&& this.existFileClinicHistory*/) {
      this.spinner.show();
      this._loadAuthorizationRequest();
      this.authorizationRequest = { solicitudAutorizacion: this.authorizationRequestBody, listaDocumentosP8: this._getFileArray(), };
      this.autorizacionesService
        .sendAuthorizationRequest(this.authorizationRequest)
        .subscribe(
          async (result) => {
            this.response = result;
            this.openDialog(
              'Mensaje Informativo',
              'Solicitud de Autorización',
              "Hemos recibido la solicitud " + this.response.numeroSolicitud + " en máximo 4 días hábiles enviaremos al correo electrónico registrado del afiliado, la información requerida"
            );
            this.affiliate = null;
            this.tieneAcceso = false;
            this.datosSolicitud = false;
            this.resetMedicine();
            this.resetCupFormArray();
            this._resetRequest();
            this.resetFile();
            this.qty = 0;
            this.idxFileFormOrRem = null;
            this.idxFileHistory = null;
            this.idxFileOther = null;
            this.classClinicHistory = 'clinic-history';
            this.classRem = 'rem';
            this.classOther = 'other'
            this.existFileFormOrRem = undefined;
            this.existFileClinicHistory = undefined;
            this.spinner.hide();
          },
          (error) => {
            this._getError(error);
            this.spinner.hide();
          }

        );
    } else {
      this.openDialog(
        'Mensaje Informativo',
        '',
        'Por favor seleccionar archivos'
      );

    }
  }


  isValidUpload = false;
  errorFormInvalid() {
    this.isValidUpload = false;
    if(!this.existFileFormOrRem){
        this.isValidUpload = true;
    }
    this.animateScrollService.scrollToElement('header');
    this.interval = setInterval(() => {
      this.openDialog(
        'Mensaje Informativo',
        '',
        'Por favor diligencie todos los campos del formulario faltantes'
      );
      clearInterval(this.interval);
    }, 2000);



    return Object.values(this.myFormData.controls).forEach((control) => {
      if (control instanceof FormGroup) {
        Object.values(control.controls).forEach((c) => { c.markAsTouched(); });
      } else {
        control.markAsTouched();
      }
    });
  }

  _loadSelect() {
    this.typeIndetification.unshift({
      text: '[ SELECCIONE TIPO DE IDENTIFICACION]',
      value: '',
    });

    this.listRequest.unshift({
      text: '[ SELECCIONE TIPO DE SOLICITUD]',
      value: '',
    });
  }

  _onTypeChange() {
    const requestType = this.myFormData.get('requestType').value;
    this.datosSolicitud = true;
    this.resetCie10();
    this.resetCups();
    this.resetMedicine();
    this.resetCupFormArray();
    this.deleteFileFormOrRem();
    this.deleteFileOther();
    this.deleteFileClinicHistory();
    
    this.myFormData.patchValue({
      observaciones: '',
    });

    this.qty = 0;
    if (requestType === '2') {
      this.showCUMS = true;
      this.showCUPs = false;
    } else if (requestType === '0') {
      this.datosSolicitud = false;
    } else {
      this.showCUPs = true;
      this.showCUMS = false;
    }
  }

  private _filter(value: string): string[] {
    const resp: string[] = [];
    if (value != null && value.length >= 3 && value != '') {
      let arrayAux: string[] = JSON.parse(localStorage.getItem("CIE10CODE"));
      return this._filterGeneric(value, arrayAux);
    }
    return resp;
  }

  private _filterDescriptionCIE10(value: string): string[] {
    if (value != null && value.length >= 5) {
      let arrayAux: string[] = JSON.parse(localStorage.getItem("CIE10DESC"));
      return this._filterGeneric(value, arrayAux);
    }
  }

  private _filterMedicines(value: string): string[] {
    if (value != null && value.length >= 5) {
      let arrayAux: string[] = JSON.parse(localStorage.getItem("MEDICINE"));
      return this._filterGeneric(value, arrayAux);
    }
  }

  private _filterCupsCode(value: string): string[] {
    if (value != null && value.length >= 3) {
      let arrayAux: string[] = JSON.parse(localStorage.getItem("CUPSCODE"));
      return this._filterGeneric(value, arrayAux);
    }
  }

  private _filterCupsDescription(value: string): string[] {
    if (value != null && value.length >= 5) {
      let arrayAux: string[] = JSON.parse(localStorage.getItem("CUPSDESC"));
      return this._filterGeneric(value, arrayAux);
    }
  }

  private _filterGeneric(value: string, array: string[]) {
    let resp: string[];
    if (array !== undefined && array.length >= 0) {
      const filterValue = this._normalizeValue(value);
      resp = array.filter((v) => this._normalizeValue(v).includes(filterValue));
      return resp;
    }
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  _loadCIE10() {
    this.utilService.getListCIE10().subscribe(
      async (result) => {
        this.cie10 = await result;
        this.array = [];
        let auxArray = [];
        this.cie10.forEach((e) => {
          this.array.push(e.codigoDiagnostico);
          auxArray.push(e.descripcionDiagnostico);
        });
        localStorage.setItem("CIE10CODE", JSON.stringify(this.array));
        localStorage.setItem("CIE10DESC", JSON.stringify(auxArray));
      },
      (error) => {
        this._getError(error);
      }
    );
  }

  _loadCie10Description() {
    this.utilService.getListCIE10().subscribe(
      async (result) => {
        this.cie10 = await result;
        this.array = [];
        this.cie10.forEach((e) => {
          this.array.push(e.descripcionDiagnostico);
        });
        localStorage.setItem("CIE10DESC", JSON.stringify(this.array));
      },
      (error) => {
        this._getError(error);
      }
    );
  }

  _loadMedicines() {
    this.utilService.getListMedicine().subscribe(
      async (result) => {
        this.array = [];
        this.medicineArray = await result;
        this.medicineArray.forEach((e) => {
          this.array.push(e.nombreGenerico + ' ' + e.descripcionMedicamento);
        });
        localStorage.setItem("MEDICINE", JSON.stringify(this.array));
      },
      (error) => {
        this._getError(error);
      }
    );
  }

  _loadCups() {
    this.utilService.getListCUPS().subscribe(
      async (result) => {
        this.array = [];
        let auxArray = [];
        this.cupsArray = await result;
        this.cupsArray.forEach((e) => {
          this.array.push(e.codigoCups);
          auxArray.push(e.nombreProcedimiento);
        });
        localStorage.setItem("CUPSCODE", JSON.stringify(this.array));
        localStorage.setItem("CUPSDESC", JSON.stringify(auxArray));
      },
      (error) => {
        this._getError(error);
      }
    );
  }

  _getCIE10(value: string) {
    const e: Cie10 = this._findCIE10(value);
    if (e != null) {
      this.myFormData.patchValue({
        descripcionCIE10: e.descripcionDiagnostico,
      });
      this.swTem = true;
    } else {
      this.swTem = false;
    }

  }

  _getCIE10InputCod() {
    if (this.myFormData.get('cie10').value != null && this.myFormData.get('cie10').value != undefined
      && this.myFormData.get('cie10').value != '') {

      const e: Cie10 = this._findCIE10TotalCod(this.myFormData.get('cie10').value);
      if (e != null) {
        this.codeCIE10Validate;
        this.swTem = true;
        this.myFormData.patchValue({
          descripcionCIE10: e.descripcionDiagnostico
        });
      } else {
        this.myFormData.patchValue({
          descripcionCIE10: ''
        });
        this.swTem = false;
      }
    }


  }

  _findCIE10TotalCod(value: string) {
    let cie10: Cie10;
    value = value.toLowerCase();
    this.cie10.forEach((c) => {
      const aux = c;
      const cod = aux.codigoDiagnostico.toLowerCase();
      if (cod === value) {
        cie10 = aux;
      }
    });
    return cie10;
  }

  _getCIE10InputDesc() {
    if (this.myFormData.get('descripcionCIE10').value != null && this.myFormData.get('descripcionCIE10').value != undefined
      && this.myFormData.get('descripcionCIE10').value != '') {

      const e: Cie10 = this._findCIE10TotalDesc(this.myFormData.get('descripcionCIE10').value);
      if (e != null) {
        this.codeCIE10Validate;
        this.myFormData.patchValue({
          cie10: e.codigoDiagnostico
        });
        this.swTem = true;
      } else {
        this.myFormData.patchValue({
          cie10: ''
        });
        this.swTem = false;
      }
    }


  }

  _findCIE10TotalDesc(value: string) {
    let cie10: Cie10;
    value = value.toLowerCase();
    this.cie10.forEach((c) => {
      const aux = c;
      const des = aux.descripcionDiagnostico.toLowerCase();
      if (des === value) {
        cie10 = aux;
      }
    });
    return cie10;
  }


  _getCupsCode(value: string) {
    const e: Cups = this._findCups(value);
    this.myFormData.patchValue({
      cups: {
        codigo: e.codigoCups,
      },
    });
  }

  _getCupsDescription(value: string) {
    const e: Cups = this._findCups(value);
    this.myFormData.patchValue({
      cups: {
        descripcion: e.nombreProcedimiento,
      },
    });
  }

  _getCIE10Code(value: string) {
    const e: Cie10 = this._findCIE10(value);
    if (e != null) {
      this.myFormData.patchValue({
        cie10: e.codigoDiagnostico,
      });
      this.swTem = true;
    } else {
      this.swTem = false;
    }

  }

  _findCIE10(value: string) {
    let cie10: Cie10;
    value = value.toLowerCase();
    this.cie10.forEach((c) => {
      const aux = c;
      const cod = aux.codigoDiagnostico.toLowerCase();
      const des = aux.descripcionDiagnostico.toLowerCase();
      if (cod.indexOf(value) >= 0 || des.indexOf(value) >= 0) {
        cie10 = aux;
      }
    });
    return cie10;
  }

  _findMedicine(value: string) {
    let medicine: Medicamento;
    value = value.toLowerCase();
    this.medicineArray.forEach((c) => {
      const aux = c;
      const des = aux.nombreGenerico.toLowerCase() + ' ' + aux.descripcionMedicamento.toLowerCase();
      if (des.indexOf(value) >= 0) {
        medicine = aux;
        medicine.cantidad = 1;
      }
    });
    return medicine;
  }

  _findCups(value: string) {
    let cups: Cups;
    value = value.toLowerCase();
    this.cupsArray.forEach((c) => {
      const aux = c;
      const cod = aux.codigoCups.toLowerCase();
      const des = aux.nombreProcedimiento.toLowerCase();
      if (cod.indexOf(value) >= 0 || des.indexOf(value) >= 0) {
        cups = aux;
        this.cups = aux;
      }
    });
    return cups;
  }

  // tslint:disable-next-line:member-ordering
  existFileClinicHistory = undefined;
  // tslint:disable-next-line:member-ordering
  existFileFormOrRem = undefined;
  // tslint:disable-next-line:member-ordering
  existFileOther = undefined;

  // tslint:disable-next-line:member-ordering
  respFileHistory: FileResponse = null;
  // tslint:disable-next-line:member-ordering
  respFileFormOrRem: FileResponse = null;
  // tslint:disable-next-line:member-ordering
  respFileOther: FileResponse = null;

  deleteClinic: boolean = false;

  deleteFormOrRem: boolean = false;

  deletFileOther: boolean = false;

  classClinicHistory: string = 'clinic-history';
  classRem: string = 'rem';
  classOther: string = 'other'


  _deleteSuccessClinicHistory() {
    this.respFileHistory = null;
    this.listadoArchivos.removeAt(this.idxFileHistory);
    this.classClinicHistory = 'clinic-history';
  }

  uploadFileClinicHistory(fileUp: File) {
    const file: FormData = this.createModelFileUpload(fileUp, 'HC');
    let deleteSuccessful = true;
    this.deleteClinic = false;
    if (this.existFileClinicHistory === false) {
      this.existFileClinicHistory = undefined;
    }
    this.spinner.show();
    if (this.existFileClinicHistory) {

      if (this.respFileHistory !== null) {
        this.fileUploadService.delete(this.respFileHistory.idDocumento).subscribe(
          resp => {
            deleteSuccessful = true;
            this._deleteSuccessClinicHistory();
          },
          error => {
            if (error.error.frontEndErrorCode != undefined && error.error.frontEndErrorCode === 'AUT012 ') {
              deleteSuccessful = false;
              this._deleteSuccessClinicHistory();
            } else {
              this._getError(error);
            }
          }
        );
      } else {
        this._deleteSuccessClinicHistory();
      }
    }
    if (deleteSuccessful) {
      this.fileUploadService.upload(file).subscribe(
        resp => {
          this.existFileClinicHistory = true;
          this.respFileHistory = resp;
          this.listadoArchivos.push(new FormControl(this.loadDocumentsRequest(this.respFileHistory)));
          this.classClinicHistory = '';
          this.idxFileHistory = this.listadoArchivos.length - 1;
          this.spinner.hide();
        },
        error => {
          this.existFileClinicHistory = false;
          this.classClinicHistory = 'clinic-history';
          this._getError(error);
          this.spinner.hide();
        }
      );
    } else {
      this.spinner.hide();
    }
  }

  deleteSuccesFullRem() {
    this.respFileFormOrRem = null;
    this.listadoArchivos.removeAt(this.idxFileFormOrRem);
    this.classRem = 'rem';
  }

  uploadFileFormOrRem(fileUp: File) {
    const file: FormData = this.createModelFileUpload(fileUp, 'FM');
    let deleteSuccessful = true;
    if (this.existFileFormOrRem === false) {
      this.existFileFormOrRem = undefined;
    }

    this.spinner.show();
    if (this.existFileFormOrRem) {
      if (this.respFileFormOrRem !== null) {

        this.fileUploadService.delete(this.respFileFormOrRem.idDocumento).subscribe(
          resp => {
            deleteSuccessful = true;
            this.deleteFormOrRem = true;
            this.deleteSuccesFullRem();
          },
          error => {

            this.deleteSuccesFullRem();
            deleteSuccessful = true;
            this.deleteFormOrRem = false;
            this._getError(error);
          }
        );
      } else {
        this.deleteSuccesFullRem();
        deleteSuccessful = true;
        this.deleteFormOrRem = false;
      }
    }
    if (deleteSuccessful) {

      this.fileUploadService.upload(file).subscribe(
        resp => {
          this.deleteFormOrRem = false;
          this.existFileFormOrRem = true;
          this.respFileFormOrRem = resp;
          this.listadoArchivos.push(new FormControl(this.loadDocumentsRequest(this.respFileFormOrRem)));
          this.classRem = '';
          this.idxFileFormOrRem = this.listadoArchivos.length - 1;
          this.isValidUpload = false;
          this.spinner.hide();

        },
        error => {
          this.deleteFormOrRem = true;
          this.existFileFormOrRem = false;
          this.classRem = 'rem'
          this._getError(error);
          this.spinner.hide();
        }
      );
    } else {
      this.spinner.hide();
    }
  }

  deleteSuccesFullOther() {
    this.respFileOther = null;
    this.listadoArchivos.removeAt(this.idxFileOther);
    this.classOther = 'other';
  }

  uploadFileOther(fileUp: File) {

    const file: FormData = this.createModelFileUpload(fileUp, 'FM');
    let deleteSuccessful = true;

    if (this.existFileOther === false) {
      this.existFileOther = undefined;
    }
    this.spinner.show();
    if (this.existFileOther) {
      if (this.respFileOther !== null) {
        this.fileUploadService.delete(this.respFileOther.idDocumento).subscribe(
          resp => {
            deleteSuccessful = true;
            this.deleteSuccesFullOther();
          },
          error => {

            this.deleteSuccesFullOther();
            deleteSuccessful = true;
            this._getError(error);
          }
        );
      } else {
        this.deleteSuccesFullOther();
        deleteSuccessful = true;
      }
    }
    if (deleteSuccessful) {

      this.fileUploadService.upload(file).subscribe(
        resp => {
          this.existFileOther = true;
          this.respFileOther = resp;
          this.listadoArchivos.push(new FormControl(this.loadDocumentsRequest(this.respFileOther)));
          this.classOther = '';
          this.idxFileOther = this.listadoArchivos.length - 1;
          this.spinner.hide();
        },
        error => {
          this.existFileOther = false;
          this.classOther = 'other'
          this._getError(error);
          this.spinner.hide();
        }
      );
    } else {
      this.spinner.hide();
    }
  }


  deleteFileClinicHistory() {
    if (this.respFileHistory !== null) {
      this.spinner.show();
      this.fileUploadService.delete(this.respFileHistory.idDocumento).subscribe(
        resp => {
          this.existFileClinicHistory = false;
          this.deleteClinic = true;
          this.respFileHistory = null;
          this.classClinicHistory = 'clinic-history';
          this._deleteSuccessClinicHistory();
          this.spinner.hide();
        },
        error => {
          this.existFileClinicHistory = false;
          this.deleteClinic = true;
          this.classClinicHistory = 'clinic-history';
          this._deleteSuccessClinicHistory();
          this._getError(error);
          this.spinner.hide();

        }
      );
    }
  }

  deleteFileOther() {
    if (this.respFileOther !== null) {
      this.spinner.show();
      this.fileUploadService.delete(this.respFileOther.idDocumento).subscribe(
        resp => {

          this.deleteSuccesFullOther();

          this.deletFileOther = true;
          this.existFileOther = false;
          this.respFileOther = null;
          this.classOther = 'other';
          this.spinner.hide();
        },
        error => {

          this.deletFileOther = true;
          this.existFileOther = false;
          this.classOther = 'other';
          this.deleteSuccesFullOther();
          this._getError(error);
          this.spinner.hide();
        }
      );
    }
  }



  deleteFileFormOrRem() {
    if (this.respFileFormOrRem !== null) {

      this.spinner.show();
      this.fileUploadService.delete(this.respFileFormOrRem.idDocumento).subscribe(
        resp => {
          this.existFileFormOrRem = false;
          this.respFileFormOrRem = null;
          this.classRem = 'rem';
          this.deleteFormOrRem = true;
          this.deleteSuccesFullRem();
          this.spinner.hide();
        },
        error => {
          this.existFileFormOrRem = false;
          this.deleteFormOrRem = false;
          this.classRem = 'rem';
          this._getError(error);
          this.deleteSuccesFullRem();
          this.spinner.hide();
        }
      );
    }
  }


  createModelFileUpload(fileUp: File, type: string) {

    let documentType: string;
    if (this.affiliate.tieneDerechosPac) {
      switch (type) {
        case 'HC':
          documentType = 'AO_PAC_HC';
          break;
        case 'FM':
          documentType = 'AO_PAC_FM';
          break;
        case 'O':
          documentType = 'AO_PAC_FM';
          break;
      }
    } else {
      switch (type) {
        case 'HC':
          documentType = 'AO_HC';
          break;
        case 'FM':
          documentType = 'AO_FM';
          break;
        default:
          documentType = '';

      }
    }
    const file: FileUpload = new FileUpload(this.affiliate.tipoDocumento.toUpperCase(),
      this.affiliate.numeroDocumento, documentType);
    const formData: FormData = new FormData();
    formData.append('file', fileUp);
    formData.append('request', new Blob([
      JSON.stringify(file)
    ], {
      type: 'application/json'
    }));
    return formData;
  }

  get identificationTypeValid() {
    return (
      this.myForm.get('identificationType').invalid &&
      this.myForm.get('identificationType').touched
    );
  }

  get documentNumberValidate() {
    return (
      this.myForm.get('documentNumber').invalid &&
      this.myForm.get('documentNumber').touched
    );
  }

  get nameValidate() {
    return (
      this.myFormData.get('nombreCompleto').invalid &&
      this.myFormData.get('nombreCompleto').touched
    );
  }
  get phoneValidate() {
    return (
      this.myFormData.get('celular').invalid &&
      this.myFormData.get('celular').touched
    );
  }

  get emailValidate() {
    return (
      this.myFormData.get('correoElectronico').invalid &&
      this.myFormData.get('correoElectronico').touched
    );
  }
  get observationValidate() {
    return (
      this.myFormData.get('observaciones').invalid &&
      this.myFormData.get('observaciones').touched
    );
  }

  get codeCIE10Validate() {
    return (
      this.myFormData.get('cie10').invalid &&
      this.myFormData.get('cie10').touched
    );
  }

  get descriptionCIE10Validate() {
    return (
      this.myFormData.get('descripcionCIE10').invalid &&
      this.myFormData.get('descripcionCIE10').touched
    );
  }

  get medicamentos() {
    return this.myFormData.get('medicamentos') as FormArray;
  }

  get listadoArchivos() {
    return this.myFormData.get('listadoArchivos') as FormArray;
  }

  get cupsArrayForm() {
    return this.myFormData.get('cupsArrayForm') as FormArray;
  }

  get codeCIE10() {
    return this.myFormData.get('descripcionCIE10').value;
  }

  get medicine() {
    return this.myFormData.get('medicamento').value;
  }

  get cupsDescripcion() {
    return this.myFormData.get('cups.descripcion').value;
  }

  get cantidad() {
    return (
      this.myFormData.get('cups.cantidad').invalid &&
      this.myFormData.get('cups.cantidad').touched
    );
  }

  get customValidate() {
    let result;
    let re;
    const type = this.myForm.get('identificationType').value;
    const document = this.myForm.get('documentNumber').value;
    switch (type) {
      case 'CC':
        re = new RegExp('[^0-9]');
        result =
          (document.length >= 3 && document.length <= 11) || re.test(document)
            ? false
            : true;
        break;
      case 'CE':
        re = new RegExp('[^A-Za-z0-9]');
        result =
          (document.length >= 3 && document.length <= 7) || re.test(document)
            ? false
            : true;
        break;
      case 'CD':
        re = new RegExp('[^A-Za-z0-9]');
        result =
          (document.length >= 3 && document.length <= 11) || re.test(document)
            ? false
            : true;
        break;
      case 'CN':
        re = new RegExp('[^0-9]');
        result =
          (document.length >= 9 && document.length <= 9) || re.test(document)
            ? false
            : true;
        break;
      case 'NU':
        result = document.length >= 9 && document.length <= 11 ? false : true;
        break;
      case 'PA':
        re = new RegExp('[^A-Za-z0-9]');
        result =
          (document.length >= 6 && document.length <= 11) || re.test(document)
            ? false
            : true;
        break;
      case 'PE':
        re = new RegExp('[^0-9]');
        result =
          (document.length >= 3 && document.length <= 16) || re.test(document)
            ? false
            : true;
        break;
      case 'PF':
        re = new RegExp('[^0-9]');
        result =
          (document.length >= 15 && document.length <= 15) || re.test(document)
            ? false
            : true;
        break;
      case 'RC':
        re = new RegExp('[^0-9]');
        result = document.length <= 10 || re.test(document) ? false : true;
        break;
      case 'SC':
        re = new RegExp('[^0-9]');
        result =
          (document.length >= 9 && document.length <= 9) || re.test(document)
            ? false
            : true;
        break;
      case 'TI':
        re = new RegExp('[^0-9]');
        result =
          (document.length >= 8 && document.length <= 11) || re.test(document)
            ? false
            : true;
        break;
      default:
        result =
          this.myForm.get('documentNumber').invalid &&
          this.myForm.get('documentNumber').touched;
    }
    return result;
  }

  get requestTypeValidate() {
    return (
      (this.myFormData.get('requestType').invalid &&
        this.myFormData.get('requestType').touched) ||
      (this.myFormData.get('requestType').value === '0' &&
        this.myFormData.get('requestType').touched)
    );
  }

  get telephoneValidate() {
    return (
      this.myFormData.get('telefonoFijo').invalid &&
      this.myFormData.get('telefonoFijo').touched
    );
  }


  validarObservaciones(event) {

    var numeroTecla = !event.charCode ? event.which : event.charCode;
    if (numeroTecla === 13) {
      return;
    }
    var regex = new RegExp("^[a-z,A-ZZáéíóúÁÉÍÓÚÑñüÜ\:\n\,\s,0-9. $/()#\"¿?\-]*$");

    var key = String.fromCharCode(numeroTecla);
    if (!regex.test(key)) {
      event.preventDefault();
      return false;
    }
  }

  validarObservacionesPaste(event: ClipboardEvent) {
    let clipboardData = event.clipboardData;
    let pastedText = clipboardData.getData('text');

    var regex = new RegExp("^[a-z,A-ZZáéíóúÁÉÍÓÚÑñüÜ\:\n\,\s,0-9. $/()#\"¿?\-]*$");
    if (!regex.test(pastedText)) {

      this.openDialog(
        'Mensaje Informativo',
        '',
        'El Texto contiene caracteres especiales no permitidos'
      );
      event.preventDefault();

      return false;
    }

  }

  validateMedAndPro() {
    
    const requestType = this.myFormData.get('requestType').value;
    let message = '';
    let valid = false;
    if (requestType === "2") {
      const medicamentos = this.myFormData.get('medicamentos').value;
      valid = medicamentos.length > 0 ? false : true;
      message = 'Por favor agregue medicamentos para continuar con el envío de la solicitud';
    } else {
      const cupsArrayForm = this.myFormData.get('cupsArrayForm').value;
      message = 'Por favor agregue procedimientos para continuar con el envío de la solicitud';
      valid = cupsArrayForm.length > 0 ? false : true;
    }

    if (valid) {
      this.openDialog(
        'Mensaje Informativo',
        '',
        message
      );
      
      return true;
    }
    return false;
  }

  validatePredictiveCodeCIE10() {
    const code = this.myFormData.get('cie10').value;
    const desc = this.myFormData.get('descripcionCIE10').value;
    const e: Cie10 = this._findCIE10(desc);
    if (code != '' && desc != '') {
      if (e.codigoDiagnostico != code) {
        this.myFormData.patchValue({
          cie10: '',
        });
      }
    }
  }


  swQuatity = false;
  validateNumberQuantity() {

    var qty = this.myFormData.get('cups.cantidad').value;
    let sw = 0;
    let cantidad = 0;
    if (qty > 10) {
      cantidad = 10;
      sw = 1;
    } else if (qty < 0) {
      cantidad = 1;
      sw = 1;
    }

    if (sw === 1) {
      const data = this.myFormData.controls.cups.value;
      this.myFormData.patchValue({
        cups: {
          cantidad: cantidad,
          codigo: data.codigo,
          descripcion: data.descripcion,
        },
      });
    }
  }


  validatePredictiveDescCIE10() {
    const code = this.myFormData.get('cie10').value;
    const desc = this.myFormData.get('descripcionCIE10').value;
    const e: Cie10 = this._findCIE10(desc);
    if (code != '' && desc != '') {
      if (e.descripcionDiagnostico != desc) {
        this.myFormData.patchValue({
          descripcionCIE10: '',
        });
      }
    }


  }


}
