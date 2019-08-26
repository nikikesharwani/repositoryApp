import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterdata'
})
export class FilterdataPipe implements PipeTransform {

  // filter array based on searchText
  transform(list: string[], searchText: string): string[] {
    if (!list) { return []; }
    if (!searchText) { return list; }

    searchText = searchText.toLowerCase();
    return list.filter( item => {
          return item.toLowerCase().includes(searchText);
    });
  }

}
