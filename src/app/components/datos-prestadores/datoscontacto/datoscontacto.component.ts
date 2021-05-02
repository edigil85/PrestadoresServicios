import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog'
import {ModalcontactoprestadorComponent} from '../modals/modalcontactoprestador/modalcontactoprestador.component'

@Component({
  selector: 'app-datoscontacto',
  templateUrl: './datoscontacto.component.html',
  styleUrls: ['./datoscontacto.component.css']
})
export class DatoscontactoComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialog.open(ModalcontactoprestadorComponent, dialogConfig)
  }
}
