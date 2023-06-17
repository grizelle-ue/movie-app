import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appFilter' })
export class AppFilterPipe implements PipeTransform {
  /**
   * Transform
   *
   * @param {any[]} items
   * @param {string} searchText
   * @param {string} itemProp
   * @param {boolean} returnNoData
   * @returns {any[]}
   */
  transform(items: any[], searchText: string, itemProp = 'name', returnNoData = false): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    const returnItems = items.filter(it => {
      return it[itemProp].toLocaleLowerCase().includes(searchText);
    });
    if (!returnItems.length && returnNoData) {
      const noDataObj = [{ id: null, value: 'No Data Found' }];
      return noDataObj;
    } else {
      return returnItems;
    }
  }
}
