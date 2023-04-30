import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartItemModel } from '../models/cart-item.model';
import { ProductModel } from '../models/product.model';

import { CartModel } from '../models/cart.model';
import {
  deleteAllFromCartAction,
  deleteItemFromCartAction,
  fetchCartItemsAction,
  getActiveCartAction,
} from '../redux/carts-state';
import store from '../redux/store';

@Injectable({
  providedIn: 'root',
})
export class MegadelSearchService {
  constructor(private http: HttpClient) {}

  //   Megadel: ------------------------------------------------------------------------------------------------------------------------

  async all_Megadel_Details_ByFirstName(firstName: any): Promise<any[]> {
    const item = await firstValueFrom(
      this.http.get<any[]>(
        `${environment.apiPath}growerService.asmx/All_Megadel_Details_ByFirstName_All?firstName=${firstName}`
      )
    );
    console.log('item: ', item);

    return item;
  }

  async all_Megadel_Details_ByFirstName_That_Active(
    firstName: any
  ): Promise<any[]> {
    const item = await firstValueFrom(
      this.http.get<any[]>(
        `${environment.apiPath}growerService.asmx/all_Megadel_Details_ByFirstName_That_Active?firstName=${firstName}`
      )
    );
    console.log('item: ', item);

    return item;
  }

  async all_Megadel_Details_ByFirstName_That_NotActiv(
    firstName: any
  ): Promise<any[]> {
    const item = await firstValueFrom(
      this.http.get<any[]>(
        `${environment.apiPath}growerService.asmx/all_Megadel_Details_ByFirstName_That_NotActive?firstName=${firstName}`
      )
    );
    console.log('item: ', item);

    return item;
  }

  async getAllShloha(): Promise<any[]> {
    const item = await firstValueFrom(
      this.http.get<any[]>(
        `${environment.apiPath}growerService.asmx/getAllShloha`
      )
    );
    console.log('item: ', item);
    return item;
  }

  async getAllMegadelDetailsWantedFunc(): Promise<any[]> {
    const item = await firstValueFrom(
      this.http.get<any[]>(
        `${environment.apiPath}growerService.asmx/getAllMegadelDetailsWantedFunc`
      )
    );
    console.log('item: ', item);
    return item;
  }

  async getAllNameSiteIdstatus(): Promise<any[]> {
    const item = await firstValueFrom(
      this.http.get<any[]>(
        `${environment.apiPath}growerService.asmx/getAllNameSiteIdstatus`
      )
    );
    console.log('item: ', item);
    return item;
  }

  async getAllYeshovimAndEzurim(): Promise<any[]> {
    const item = await firstValueFrom(
      this.http.get<any[]>(
        `${environment.apiPath}growerService.asmx/getAllYeshovimAndEzurim`
      )
    );
    console.log('item: ', item);
    return item;
  }

  //  end Megadel: ------------------------------------------------------------------------------------------------------------------------

  async bringRepMin(userNameOrId: any, month: any, year: any): Promise<any[]> {
    console.log('month: ', month);
    console.log('userNameOrId: ', userNameOrId);
    const yearRegex = /\d+$/;
    const userId = userNameOrId.match(yearRegex)[0];

    // const words = userNameOrId.split('-');
    // const userId = words[1];
    // console.log('userId: ', userId);

    const item = await firstValueFrom(
      this.http.get<any[]>(
        `${environment.apiPath}FoodService.asmx/getRepByUserIdAndMonthAandYear?userId=${userId}&monthNum=${month}&yearNum=${year}`
      )
    );

    console.log('item: ', item);

    return item;
  }

  async bringRepFull(userNameOrId: any, month: any, year: any): Promise<any[]> {
    console.log('month: ', month);
    console.log('userNameOrId: ', userNameOrId);

    const words = userNameOrId.split('-');
    const userId = words[1];
    console.log('userId: ', userId);

    const item = await firstValueFrom(
      this.http.get<any[]>(
        `${environment.apiPath}FoodService.asmx/getRepByUserIdAndMonthAandYearFull?userId=${userId}&monthNum=${month}&yearNum=${year}`
      )
    );

    console.log('item: ', item);

    return item;
  }

  async bringRepIntheCurrentMonth(): Promise<any[]> {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const item = await firstValueFrom(
      this.http.get<any[]>(
        `${environment.apiPath}FoodService.asmx/BringRepIntheCurrentMonthAndYear?monthNum=${currentMonth}&yearNum=${currentYear}`
      )
    );

    console.log('item: ', item);

    return item;
  }

  async bringRepIntheChosenMonthAndYear(month: any, year: any): Promise<any[]> {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const item = await firstValueFrom(
      this.http.get<any[]>(
        `${environment.apiPath}FoodService.asmx/BringRepIntheCurrentMonthAndYear?monthNum=${month}&yearNum=${year}`
      )
    );

    console.log('item: ', item);

    return item;
  }

  async getAllTotalAmountByYearAndMonth(month: any, year: any): Promise<any[]> {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    console.log('currentMonth: ', currentMonth);
    console.log('currentYear: ', currentYear);

    const item = await firstValueFrom(
      this.http.get<any[]>(
        `${environment.apiPath}FoodService.asmx/getAllTotalAmountByYearAndMonth?monthNum=${month}&yearNum=${year}`
      )
    );

    console.log('item in getAllTotalAmountByYearAndMonth: ', item);
    item[0].lastDayOfMonth = lastDayOfMonth;
    console.log('typeof(item[0].year: ', typeof item[0].year);

    const cutTheYear = item[0].year.toString();

    const newValue = cutTheYear.substring(2); // This will extract the characters from index 2 to the end of the string.
    let numValue = parseInt(newValue); // Convert the string to a number

    item[0].year = numValue;

    console.log('getAllTotalAmountByYearAndMonthWithLastDay: ', item);

    return item;
  }

  async getAllRepMin2(): Promise<any[]> {
    const item = await firstValueFrom(
      this.http.get<any[]>(
        `${environment.apiPath}FoodService.asmx/getAllRepMin2`
      )
    );
    return item;
  }

  async getUserTotalByDate(): Promise<any[]> {
    const itemsByCart = await firstValueFrom(
      this.http.get<any[]>(
        `${environment.apiPath}FoodService.asmx/getUserTotalByDate`
      )
    );
    console.log('itemsByCart: ', itemsByCart);

    return itemsByCart;
  }

  async getFullNameAnrUserId(): Promise<any[]> {
    const itemsByCart = await firstValueFrom(
      this.http.get<any[]>(
        `${environment.apiPath}FoodService.asmx/getFullNameAnrUserId`
      )
    );
    return itemsByCart;
  }
}
