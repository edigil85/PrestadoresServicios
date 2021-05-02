import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalDialogComponent } from 'src/app/components/modal-dialog/modal-dialog.component';
import { AgendaExtVacunacionService } from '../../service/agenda-ext-vacunacion.service';
import { UtilCsvService } from '../../service/utilCsv.service';
import * as XLSX from 'xlsx';
import { TemplateIpsNoConect } from '../../model/TemplateIpsNoConect';
import { formatsValid } from '../../model/formatsValid';
import { InfoUploadFile } from '../../model/InfoUploadFile';
import { TemplateIpsNoConectCancel } from '../../model/TemplateIpsNoConectCancel';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-agenda-externo-vacunacion',
  templateUrl: './agenda-externo-vacunacion.component.html',
  styleUrls: ['./agenda-externo-vacunacion.component.css']
})
export class AgendaExternoVacunacionComponent implements OnInit {

  existFileUpload = false;
  file: FormData;
  formatsValid: formatsValid;
  data = [];
  dataJson = [];
  error: string = ""
  radioButton = true;

  reactiveForm: FormGroup = new FormGroup({
    reactiveRadio: new FormControl(true)
  })

  constructor(public utilService: UtilCsvService,
    public fb: FormBuilder,
    public agendaService: AgendaExtVacunacionService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog) {

    this.reactiveForm.controls['reactiveRadio'].valueChanges.subscribe((state: any) => {
      this.radioButton = state;
      this.data = [];
      this.dataJson = [];
      this.existFileUpload = false;
    })

  }


  ngOnInit(): void {
    this.spinner.show();
    this.utilService.getFormats().subscribe((resp) => {
      this.formatsValid = resp;
      this.spinner.hide();
    }, error => {
      this.getFormatLocal();
      this.spinner.hide();
    })

  }

  getFormatLocal() {
    this.utilService.getFormatsLocal().subscribe((resp2) => {
      this.formatsValid = resp2;
    }
    )
  }

  openDialog(pTittle, pSubtittle = "", pMessage) {
    this.dialog.open(ModalDialogComponent, {
      data: {
        tittle: pTittle,
        subtittle: pSubtittle,
        message: pMessage,
      },
    });
  }


  uploadFile(evt: any) {

    this.existFileUpload = true;
    const target: DataTransfer = <DataTransfer>(evt.target);
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary', cellDates: true });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];

      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <any>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
    };
    reader.readAsBinaryString(target.files[0]);


  }

  downloadGuia(){
    window.open("https://comunicaciones.segurossura.com.co/MercadeoComunicacionesExternas/guia-agendamiento-afiliados-vacunacion.pdf")
   }

  createModelFileUpload(fileUp: File) {

    const formData: FormData = new FormData();
    formData.append('file', fileUp);
    return formData;
  }

  sendFile() {

    const url = this.radioButton ? "agendamiento" : "anulacion";
    this.spinner.show();
    const bool = this.convertDataToJson();
    this.spinner.hide();

    if (bool) {

      this.spinner.show();
      let infoUpload: InfoUploadFile = null;

      const jsonObject = JSON.stringify(this.dataJson);
      console.log(jsonObject)
      let file = this.createBlobCsv(jsonObject, 'filename');
    
      this.agendaService.getUrlCarga(url).subscribe(resp => {
        infoUpload = resp;
        this.agendaService.upload(infoUpload, file).subscribe(resp2 => {
          this.data = [];
          this.dataJson = [];
          this.existFileUpload = false;
          this.spinner.hide();
          this.openDialog(
            'Mensaje Informativo',
            'Carga masiva',
            'El envío de información ha sido exitoso.'
          );
        },
          error => {
            this.spinner.hide();
            this.openDialog(
              'Mensaje Error',
              '',
              'A ocurrido un error mientras se cargaba el archivo por favor intente de nuevo.'
            );
          })
      }, error => {

        this.spinner.hide();
        this.openDialog(
          'Mensaje Error',
          '',
          'A ocurrido un error mientras se cargaba el archivo por favor intente de nuevo.'
        );
      })

    }


  }


  numeroAFecha(numeroDeDias, esExcel = false) {
    var diasDesde1900 = esExcel ? 25567 + 1 : 25567;
    // 86 es el número de segundos en un día, luego multiplicamos por 1000 para obtener milisegundos.
    return new Date((numeroDeDias - diasDesde1900) * 86 * 1000);
  }

  convertDecimalToDate(dataIps) {

    try {
      const formatDates = 'yyyy/MM/dd';
      const formatHour = 'HH:mm';
      const locale = 'en-US';
      let fecha = new Date(dataIps.FechaAgendamiento);

      const date = formatDate(fecha, formatDates, locale)
      dataIps.FechaAgendamiento = date;

      let hora = new Date(dataIps.HoraAgendamiento);

      const formattedDate = formatDate(hora, formatHour, locale);
      dataIps.HoraAgendamiento = formattedDate;
      return true;
    } catch (error) {
      return false;
    }

    /*
    var fecha = this.numeroAFecha(dataIps.FechaAgendamiento, true);
    const month = fecha.getMonth() + 1 < 10 ? "0" + (fecha.getMonth() + 1) : fecha.getMonth() + 1;
    const day = fecha.getDate() < 10 ? "0" + (fecha.getDate()) : fecha.getDate();
    var dateAgendamiento = fecha.getFullYear() + "/" + month + "/" + day;
    dataIps.FechaAgendamiento = dateAgendamiento;


    const decimalTimeString = dataIps.HoraAgendamiento ;
    const decimalTime = (parseFloat(decimalTimeString) * 24).toString();
    const array = decimalTime.split('.');
    const hour = parseFloat(array[0]);
    const minutes = (parseFloat("0."+array[1]) * 60);
    const hourString = hour<10 ? "0"+hour:hour;
    const minuteString = minutes<10 ? "0"+ minutes : minutes;
    dataIps.HoraAgendamiento = hourString +":"+ minuteString;
   */
  }

  validateTemplateIpsNoConnect(dataIps: TemplateIpsNoConect) {



    if (!this.convertDecimalToDate(dataIps)) {
        return false;
    }

    if (dataIps.TipoIDPaciente === undefined || dataIps.NoIDPaciente === undefined || dataIps.PrimerNombre === undefined ||
      dataIps.PrimerApellido === undefined || dataIps.CodPrestador === undefined || dataIps.CausaNoAgendamiento === undefined) {
        return false;
    }

    if (!new RegExp(this.formatsValid.tipoDoc).test(dataIps.TipoIDPaciente) || !new RegExp(this.formatsValid.numDoc).test(dataIps.NoIDPaciente) ||
      !new RegExp(this.formatsValid.nombres).test(dataIps.PrimerNombre) || !new RegExp(this.formatsValid.nombres).test(dataIps.PrimerApellido) ||
      !new RegExp(this.formatsValid.codPres).test(dataIps.CodPrestador) || !new RegExp(this.formatsValid.causa).test(dataIps.CausaNoAgendamiento)
    ) {
      return false;
    }

    if ((dataIps.SegundoNombre !== undefined && dataIps.SegundoNombre.length > 0 && !new RegExp(this.formatsValid.nombres).test(dataIps.SegundoNombre)) ||
      (dataIps.SegundoApellido !== undefined && dataIps.SegundoApellido.length > 0 && !new RegExp(this.formatsValid.nombres).test(dataIps.SegundoApellido))
    ) {
      return false;
    }

    if (dataIps.CausaNoAgendamiento.toString() === "0" && (!new RegExp(this.formatsValid.dosis).test(dataIps.NumeroDosis))) {
      return false;
    }
   
    if (dataIps.CausaNoAgendamiento.toString() !== "0") {
      dataIps.FechaAgendamiento = '';
      dataIps.HoraAgendamiento = '';
      dataIps.NumeroDosis = '';
    }

    return true;
  }

  validateTemplateIpsNoConnectCancel(dataIps: TemplateIpsNoConectCancel) {
    
    if (!this.convertDecimalToDate(dataIps)) {
      
      return false;
    }

    if (dataIps.TipoIDPaciente === undefined || dataIps.NoIDPaciente === undefined || dataIps.FechaAgendamiento === undefined ||
      dataIps.HoraAgendamiento === undefined
    ) {
      return false;
    }

    if (!new RegExp(this.formatsValid.tipoDoc).test(dataIps.TipoIDPaciente) || !new RegExp(this.formatsValid.numDoc).test(dataIps.NoIDPaciente)) {
      return false;
    }
    return true;
  }

  convertDataToJson() {
    let keys = this.data.shift();
    if (keys.length === 11 && this.radioButton) {
      return this.validatTemplateIpsNoConectA();
    } else if (keys.length === 4 && !this.radioButton) {
      return this.validatTemplateIpsNoConectCancel();
    } else {
      this.openDialog(
        'Mensaje Error',
        '',
        'Archivo no cumple con el formato de la plantilla original.'
      );

      return false;
    }
  }


  validatTemplateIpsNoConectA() {
    this.error = "El archivo cargado presenta errores en las siguentes Lineas: \n";
    let isError = false;
    this.data.map((e, i) => {
      if (e !== undefined && e.length > 0) {
        let dataIps: TemplateIpsNoConect = new TemplateIpsNoConect(e[0],
          e[1], e[2], e[3],
          e[4], e[5], e[6],
          e[7], e[8], e[9],
          e[10]);
        if (this.validateTemplateIpsNoConnect(dataIps)) {

          this.dataJson = [...this.dataJson, dataIps]
        } else {
          isError = true;
          this.error += (i + 2) + ", ";
        }

      }
    });

    if (isError) {
      this.openDialog(
        'Mensaje Error',
        '',
        this.error.substring(0, this.error.length - 2)
      );
      return false;
    }

    return true;

  }

  validatTemplateIpsNoConectCancel() {
    this.error = "El archivo cargado presenta errores en las siguentes Lineas: \n";
    let isError = false;
    this.data.map((e, i) => {
      if (e !== undefined && e.length > 0) {
        let dataIps: TemplateIpsNoConectCancel = new TemplateIpsNoConectCancel(e[0],
          e[1], e[2], e[3]);
        if (this.validateTemplateIpsNoConnectCancel(dataIps)) {

          this.dataJson = [...this.dataJson, dataIps]
        } else {
          isError = true;
          this.error += (i + 2) + ", ";
        }
      }
    });

    if (isError) {

      this.openDialog(
        'Mensaje Error',
        '',
        this.error.substring(0, this.error.length - 2)
      );
      return false;
    }

    return true;

  }


  createBlobCsv(data, filename = 'data') {

    let arrHeader = [];
    if(this.radioButton){
      arrHeader = ["TipoIDPaciente", "NoIDPaciente", "PrimerNombre", "SegundoNombre", "PrimerApellido"
      , "SegundoApellido", "CodPrestador", "FechaAgendamiento", "HoraAgendamiento", "NumeroDosis", "CausaNoAgendamiento"
      ];
    }else{
      arrHeader = ["TipoIDPaciente", "NoIDPaciente", "FechaAgendamiento", "HoraAgendamiento"
      ];
    }
    

    let csvData = this.ConvertToCSV(data, arrHeader);
    return new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
  }

  ConvertToCSV(objArray, headerList) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = '';

    for (let index in headerList) {
      row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (let index in headerList) {
        let head = headerList[index];
        if (line === '') {
          line += this.strRep(array[i][head]);
        } else {
          line += ',' + this.strRep(array[i][head]);
        }
      }
      str += line + '\r\n';
    }
    return str;
  }

  strRep(data) {
    if (typeof data == "string") {
      let newData = data.replace(/,/g, " ");
      return newData;
    }
    else if (typeof data == "undefined") {
      return "";
    }
    else if (typeof data == "number") {
      return data.toString();
    }
    else {
      return data;
    }
  }

  deleteFile() {
    this.data = null;
    this.existFileUpload = false;
  }

  


}
