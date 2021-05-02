import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog'
import {ModalcodigohabilitacionComponent} from '../modals/modalcodigohabilitacion/modalcodigohabilitacion.component'

@Component({
  selector: 'app-codigohabilitacion',
  templateUrl: './codigohabilitacion.component.html',
  styleUrls: ['./codigohabilitacion.component.css']
})
export class CodigohabilitacionComponent implements OnInit {

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
    this.dialog.open(ModalcodigohabilitacionComponent, dialogConfig)
  }


}
