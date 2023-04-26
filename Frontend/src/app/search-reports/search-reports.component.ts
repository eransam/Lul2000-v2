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

  hova: any = '135201';
  zhot: any = '521222';
  theTtxetToTheAscii: any = '';

  @Output()
  public addRep = new EventEmitter<any>();

  selectedDepartment: any;
  selectedMonth: string;
  selectedYear: string;
  username: string;
  users: any[] = [];
  users2: any[];
  yearInput: FormControl;
  DetailsForm: FormGroup;
  monthInput: FormControl;
  usernameInput: FormControl;
  detailsFromformUsername: any = '';
  detailsFromformcheckbox: any = '';
  detailsFromformMonth: any = '';
  detailsFromformYear: any = '';

  filteredUsers: Observable<string[]>;

  usernameControl = new FormControl();
  selectedDepartmentControl = new FormControl();
  constructor(
    private reportService: ReportService,
    private megadelSearchService: MegadelSearchService,
    public router: Router,
    private notify: NotifyService
  ) {
    this.filteredUsers = this.usernameControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  async ngOnInit(): Promise<void> {
    (this.monthInput = new FormControl('', Validators.required)),
      (this.yearInput = new FormControl('', Validators.required)),
      (this.usernameInput = new FormControl('', Validators.required));
    this.DetailsForm = new FormGroup({
      nameBox: this.monthInput,
      priceBox: this.usernameInput,
      yaerBox: this.yearInput,
    });

    this.users2 =
      await this.megadelSearchService.getAllMegadelDetailsWantedFunc();
    console.log('this.users2: ', this.users2);

    for (let i = 0; i < this.users2.length; i++) {
      this.users.push(
        `${this.users2[i].yz_first_name}-${this.users2[i].yz_last_name}-${this.users2[i].yz_zehut}-${this.users2[i].yz_shem}-${this.users2[i].yz_yzrn}-${this.users2[i].yz_is_activ}`
      );
    }
  }

  async add() {
    this.detailsFromformUsername = this.usernameControl.value;
    if (this.detailsFromformUsername) {
      const results =
        await this.megadelSearchService.getAllMegadelDetailsWantedByFirstNameFunc(
          this.detailsFromformUsername
        );
      console.log('results: ', results);
      this.addRep.emit(results);
    }
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.users.filter((user) =>
      user.toLowerCase().includes(filterValue)
    );
  }
}
