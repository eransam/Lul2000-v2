import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-lol2000',
  templateUrl: './lol2000.component.html',
  styleUrls: ['./lol2000.component.scss'],
})
export class Lol2000Component implements OnInit {
  ChkShow: string;
  ChkSave: string;
  ChkUpdate: string;
  ChkDelete: string;
  ChkAdd: string;
  ChkReport: string;
  ChkXls: string;
  ChkSorek: string;

  MessageBox_Caption = 'חיפוש מגדל';
  SelectSug: string;

  IsHeader: boolean;
  readonly Yzrnim = 'Yzrnim';

  Rw: number;
  SumRec0: string;
  SumRec1: string;

  SugTz: string;
  Tz: string;
  Row: number;
  Col: number;
  SugSrch: string;

  gSearchTyp_Yz: string = '';
  settlementName = '';
  showEstateField = false;
  rishaionNo: string;
  rishaion: string;
  chngYzrn: boolean;
  funder: boolean;
  @ViewChild('dbcTzrt') dbcTzrt: ElementRef;

  onMainSearch(): void {
    this.gSearchTyp_Yz = '';
    try {
      this.showWaitCursor();
      this.SrchYzrn();
    } catch (error) {
      console.error(error);
    } finally {
      this.hideWaitCursor();
    }
  }

  showWaitCursor(): void {
    document.body.style.cursor = 'wait';
  }

  hideWaitCursor(): void {
    document.body.style.cursor = 'default';
  }

  SrchYzrn(): void {
    if (Number(this.rishaionNo) > 0 || this.rishaion?.length > 0) {
      this.refreshCallYazranAtar(0);
      // TODO: assign value to gSearchTyp_Yz
      // TODO: assign value to gSlctByChgNmRegular
    } else if (this.chngYzrn) {
      this.refreshCallYazranChngNm(0);
      // TODO: assign value to gSlctByChgNmRegular
    } else if (this.funder) {
      this.refreshCallFunderSearch(0);
      // TODO: assign value to gSlctByChgNmRegular
    } else {
      this.refreshCallYazran(0);
      // TODO: assign value to gSlctByChgNmRegular
    }
  }

  RefreshCallYazran(): void {
    let NmYz: string;
    let NmYzv: string;
    let CodeYz: string;
    let KnatNo: string;
    let RishaionNo: string = '%'; //not in use
    let AcountNo: string;
    let Id_No: string;
    let Msk: string;
    let ActPrc: number;
    let Cd: number;
    let Yr: string = new Date().getFullYear().toString();
    // CheckOpt()
  }

  private refreshCallYazranAtar(param: number): void {
    // TODO: implement refreshCallYazranAtar function
  }

  private refreshCallYazranChngNm(param: number): void {
    // TODO: implement refreshCallYazranChngNm function
  }

  private refreshCallFunderSearch(param: number): void {
    // TODO: implement refreshCallFunderSearch function
  }

  private refreshCallYazran(param: number): void {
    // TODO: implement refreshCallYazran function
  }

  onSettlementNameChange(): void {
    this.showEstateField = this.settlementName !== '';
  }

  onSelectedIndexChanged(): void {
    try {
      const selectedIndex = this.dbcTzrt.nativeElement.selectedIndex;
      switch (selectedIndex + 1) {
        case 1:
        case 2:
          this.SugTz = '30';
          break;
        case 3:
          this.SugTz = '01';
          break;
        case 4:
          this.SugTz = '10';
          break;
        default:
          this.SugTz = '';
          break;
      }
    } catch (eException) {
      console.error(`${this.constructor.name}`);
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
