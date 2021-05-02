import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog'
import { MatDialogRef} from '@angular/material/dialog'

@Component({
  selector: 'app-deleteconfirmmodal',
  templateUrl: './deleteconfirmmodal.component.html',
  styleUrls: ['./deleteconfirmmodal.component.css']
})
export class DeleteconfirmmodalComponent {

  constructor(public dialogRef: MatDialogRef<DeleteconfirmmodalComponent>){}  

  public confirmMessage:string;
 
}
