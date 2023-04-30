import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ReportService } from '../services/reports.service';
import { MegadelSearchService } from '../services/MegadelSearch.service';

import { Router } from '@angular/router';
import { NotifyService } from '../services/notify.service';

@Component({
  selector: 'app-search-reports',
  templateUrl: './search-reports.component.html',
  styleUrls: ['./search-reports.component.scss'],
})
export class SearchReportsComponent implements OnInit {
  AllTotalAmountByYearAndMonth: any = '';
  TotalAmountDay: any = '';
  TotalAmountMonth: any = '';
  TotalAmountYear: any = '';
  totalAmountTemplate: any = '';
  checkDecimal: any = '';

  @Output()
  public addRep = new EventEmitter<any>();

  selectedDepartment: any;
  selectedMonth: string;
  selectedYear: string;
  username: string;
  site: string;
  settlement: string;
  extension: string;

  // the input box
  users: any[] = [];
  users2: any[];

  settlement1: any[] = [];
  settlement2: any[];

  site1: any[] = [];
  site2: any[];

  extension1: any[] = [];
  extension2: any[];

  detailsFromformcheckbox: any = '';
  detailsFromformMonth: any = '';
  detailsFromformYear: any = '';

  //מגדירים פילטר חיפוש לכל שדה אינפוט
  filteredUsers: Observable<string[]>;
  filteredsite: Observable<string[]>;
  filteredsettlement: Observable<string[]>;
  filteredextension: Observable<string[]>;

  // מגדירים את הפורם אינפוטים כדי שדרכם יועבר הערך המוזן באינפוט

  selectedDepartmentControl = new FormControl();
  monthInput: FormControl;
  usernameInput: FormControl;
  settlementInput: FormControl;
  siteInput: FormControl;
  extensionInput: FormControl;
  yearInput: FormControl;

  //   FormGroup:
  DetailsForm: FormGroup;

  //   the checkBox search:
  checkBoxActive = false;
  checkBoxNotActive = false;
  checkBoxAll = false;

  //   form varible:
  selectedCheckbox = '';
  usernameControl = new FormControl();
  siteControl = new FormControl();
  settlementControl = new FormControl();
  extensionControl = new FormControl();

  constructor(
    private reportService: ReportService,
    private megadelSearchService: MegadelSearchService,
    public router: Router,
    private notify: NotifyService
  ) {
    //ערך חדש וכל שינוי שמהשתמש הזין באינפוט this.filteredUsers כאן אנו מגדירים למשתנה
    this.filteredUsers = this.usernameControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterUser(value))
    );

    this.filteredsite = this.siteControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterSite(value))
    );

    this.filteredsettlement = this.settlementControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterSettlement(value))
    );

    this.filteredextension = this.extensionControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterExtension(value))
    );
  }

  updateValue() {
    if (this.checkBoxActive) {
      this.selectedCheckbox = 'active';
    } else if (this.checkBoxNotActive) {
      this.selectedCheckbox = 'notActive';
    } else if (this.checkBoxAll) {
      this.selectedCheckbox = 'all';
    } else {
      this.selectedCheckbox = '';
    }
  }

  checkboxClicked(checkboxValue: string) {
    if (checkboxValue === this.selectedCheckbox) {
      // If the clicked checkbox is already selected, unselect it
      this.selectedCheckbox = '';
    } else {
      // Otherwise, select the clicked checkbox and unselect the other checkboxes
      this.selectedCheckbox = checkboxValue;
      this.checkBoxActive = false;
      this.checkBoxNotActive = false;
      this.checkBoxAll = false;
    }
  }

  private _filterUser(value: string): string[] {
    const filterValue1 = value.toLowerCase();
    return this.users.filter((user) =>
      user.toLowerCase().includes(filterValue1)
    );
  }

  private _filterSite(value: string): string[] {
    const filterValue2 = value.toLowerCase();
    return this.site1.filter((site) =>
      site.toLowerCase().includes(filterValue2)
    );
  }
  private _filterSettlement(value: string): string[] {
    const filterValue3 = value.toLowerCase();
    console.log('filterValue3: ', filterValue3);
    console.log('this.settlement1/: ', this.settlement1);

    return this.settlement1.filter((settlement) =>
      settlement.toLowerCase().includes(filterValue3)
    );
  }
  private _filterExtension(value: string): string[] {
    const filterValue4 = value.toLowerCase();
    return this.extension1.filter((extension) =>
      extension.toLowerCase().includes(filterValue4)
    );
  }

  async ngOnInit(): Promise<void> {
    //FormControl מגדירים את המשתנים כך שיהיו מסוג
    (this.monthInput = new FormControl('', Validators.required)),
      (this.yearInput = new FormControl('', Validators.required)),
      (this.usernameInput = new FormControl());
    this.siteInput = new FormControl();
    this.settlementInput = new FormControl();
    this.extensionInput = new FormControl();

    this.DetailsForm = new FormGroup({
      nameBox: this.monthInput,
      priceBox: this.usernameInput,
      yaerBox: this.yearInput,
    });

    this.extension2 = await this.megadelSearchService.getAllShloha();
    console.log('this.extension2: ', this.extension2);

    for (let i = 0; i < this.extension2.length; i++) {
      this.extension1.push(`${this.extension2[i].belonging_group_id}`);
    }
    let mergedArray: any[] = this.mergeIdenticalValues(this.extension1);
    console.log('mergedArray: ', mergedArray);
    this.extension1 = mergedArray;
    this.users2 =
      await this.megadelSearchService.getAllMegadelDetailsWantedFunc();
    console.log('this.users2: ', this.users2);

    for (let i = 0; i < this.users2.length; i++) {
      this.users.push(
        `${this.users2[i].yz_first_name}-${this.users2[i].yz_last_name}-${this.users2[i].yz_zehut}-${this.users2[i].yz_shem}-${this.users2[i].yz_yzrn}-${this.users2[i].yz_is_activ}`
      );
    }

    this.site2 = await this.megadelSearchService.getAllNameSiteIdstatus();
    console.log('this.site2: ', this.site2);

    for (let i = 0; i < this.site2.length; i++) {
      this.site1.push(
        `${this.site2[i].name}-${this.site2[i].code}-${this.site2[i].farm_status_id}`
      );
      console.log();
    }

    this.settlement2 =
      await this.megadelSearchService.getAllYeshovimAndEzurim();
    console.log('this.settlement2: ', this.settlement2);

    for (let i = 0; i < this.settlement2.length; i++) {
      this.settlement1.push(
        `${this.settlement2[i].yv_Shem}-${this.settlement2[i].yv_Ezor}`
      );
    }
  }

  mergeIdenticalValues(arr: any[]): any[] {
    const uniqueValues = new Set(arr);
    if (uniqueValues.size === 1) {
      return [arr[0]];
    }
    return arr.filter((value, index, self) => self.indexOf(value) === index);
  }

  selectedButton: string;

  onButtonMenuClick(button: string) {
    this.selectedButton = button;
    console.log('Selected button:', button);
  }
  getSettlementName(value: string): string {
    const parts = value.split('-');
    return parts.slice(0, -1).join('-');
  }

  async add() {
    let SettlementName = '';
    let SitetName = '';
    let Username = '';
    let extension = this.extensionControl.value;

    console.log('usernameControl: ', this.usernameControl.value);
    console.log('siteControl: ', this.siteControl.value);
    console.log('settlementControl: ', this.settlementControl.value);
    console.log('extensionControl: ', this.extensionControl.value);
    if (this.settlementControl.value) {
      // מלקט מהמחרוזת רק את שם היישוב
      SettlementName = this.getSettlementName(this.settlementControl.value);
    }

    if (this.siteControl.value) {
      SitetName = this.siteControl.value.split('-').pop();
    }

    if (this.usernameControl.value) {
      Username = this.usernameControl.value.split('-')[0];
    }

    console.log('SettlementName1: ', SettlementName);
    console.log('SitetName1: ', SitetName);
    console.log('Username1: ', Username);
    console.log('extensionControl1: ', this.extensionControl.value);

    if (Username && !extension && !SitetName && !SettlementName) {
      if (this.selectedCheckbox === '' || this.selectedCheckbox === 'active') {
        const results =
          await this.megadelSearchService.all_Megadel_Details_ByFirstName_That_Active_To_Desplay(
            Username
          );
        results.forEach(async (item) => {
          let yz_yzrn = item.yz_yzrn;
          const results2 =
            await this.megadelSearchService.Get_num_of_gidol_hotz_from_yz_yzrn(
              yz_yzrn
            );
          if (results2[0]?.pa_Counter) {
            item.pa_Counter = results2[0].pa_Counter;
          } else {
            item.pa_Counter = 'אין גידול חוץ';
          }

          item.newParameter = 'some value';
        });

        console.log('results: ', results);
        this.addRep.emit(results);
      } else if (this.selectedCheckbox === 'notActive') {
        const results =
          await this.megadelSearchService.all_Megadel_Details_ByFirstName_That_Not_Active_To_Desplay(
            Username
          );
        this.addRep.emit(results);
      } else if (this.selectedCheckbox === 'all') {
        const results =
          await this.megadelSearchService.All_Megadel_Details_ByFirstName_All_To_Desplay(
            Username
          );
        this.addRep.emit(results);
      }
    }

    if (Username && !extension && !SitetName && SettlementName) {
      if (this.selectedCheckbox === '' || this.selectedCheckbox === 'active') {
        const results =
          await this.megadelSearchService.AllMegadelDetails_ByFirstName_and_shemYeshuv_To_Desplay_that_active(
            Username,
            SettlementName
          );
        results.forEach(async (item) => {
          let yz_yzrn = item.yz_yzrn;
          const results2 =
            await this.megadelSearchService.Get_num_of_gidol_hotz_from_yz_yzrn(
              yz_yzrn
            );
          if (results2[0]?.pa_Counter) {
            item.pa_Counter = results2[0].pa_Counter;
          } else {
            item.pa_Counter = 'אין גידול חוץ';
          }

          item.newParameter = 'some value';
        });

        console.log('results: ', results);
        this.addRep.emit(results);
      } else if (this.selectedCheckbox === 'notActive') {
        const results =
          await this.megadelSearchService.AllMegadelDetails_ByFirstName_and_shemYeshuv_To_Desplay_that_Notactive(
            Username,
            SettlementName
          );
        this.addRep.emit(results);
      } else if (this.selectedCheckbox === 'all') {
        const results =
          await this.megadelSearchService.allMegadelDetails_ByFirstName_and_shemYeshuv_To_Desplay(
            Username,
            SettlementName
          );
        this.addRep.emit(results);
      }
    }



    if (Username && !extension && SitetName && SettlementName) {
        if (this.selectedCheckbox === '' || this.selectedCheckbox === 'active') {
          const results =
            await this.megadelSearchService.AllMegadelDetails_ByFirstName_and_shemYeshuv_To_Desplay_that_active(
              Username,
              SettlementName
            );
          results.forEach(async (item) => {
            let yz_yzrn = item.yz_yzrn;
            const results2 =
              await this.megadelSearchService.Get_num_of_gidol_hotz_from_yz_yzrn(
                yz_yzrn
              );
            if (results2[0]?.pa_Counter) {
              item.pa_Counter = results2[0].pa_Counter;
            } else {
              item.pa_Counter = 'אין גידול חוץ';
            }
  
            item.newParameter = 'some value';
          });
  
          console.log('results: ', results);
          this.addRep.emit(results);
        } else if (this.selectedCheckbox === 'notActive') {
          const results =
            await this.megadelSearchService.AllMegadelDetails_ByFirstName_and_shemYeshuv_To_Desplay_that_Notactive(
              Username,
              SettlementName
            );
          this.addRep.emit(results);
        } else if (this.selectedCheckbox === 'all') {
          const results =
            await this.megadelSearchService.allMegadelDetails_ByFirstName_and_shemYeshuv_To_Desplay(
              Username,
              SettlementName
            );
          this.addRep.emit(results);
        }
      }


  }
}
