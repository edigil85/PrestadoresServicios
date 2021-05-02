import {Component, Inject,Injectable} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from '../../shared/model/DialogData';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
@Injectable()
export class ModalDialogComponent{

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
  }

  redirect(){
    localStorage.setItem('noAuthorized', 'true');
  }

}
