import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidadoresService {
  constructor() {}

  customValidate(identType: string, numDoc: string) {
    return (formGroup: FormGroup) => {
      const identTypeControl = formGroup.controls[identType];
      const numDocControl = formGroup.controls[numDoc];

      const type = identTypeControl.value;
      const document = numDocControl.value;
      let result;
      let re;
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
            (document.length >= 15 && document.length <= 15) ||
            re.test(document)
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
          result = numDocControl.invalid && numDocControl.touched;
      }
      if (!result) {
        numDocControl.setErrors(null);
      } else {
        numDocControl.setErrors({ error: true });
      }
    };
  }
}
