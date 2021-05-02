import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog'
import {ModalprefijofacturacionComponent} from '../modals/modalprefijofacturacion/modalprefijofacturacion.component'

@Component({
  selector: 'app-rangofacturacion',
  templateUrl: './rangofacturacion.component.html',
  styleUrls: ['./rangofacturacion.component.css']
})
export class RangofacturacionComponent implements OnInit {

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
    this.dialog.open(ModalprefijofacturacionComponent, dialogConfig)
  }
}
