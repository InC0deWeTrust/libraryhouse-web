import { Pipe, PipeTransform } from '@angular/core';
import { AuthorDto } from 'src/shared/service-proxies/service-proxies';

@Pipe({
  name: 'searchFilterAuthors'
})
export class SearchFilterAuthorsPipe implements PipeTransform {

  transform(list: AuthorDto[], filterText: string): any {
    return list ? list.filter(item => item.lastName!.search(new RegExp(filterText, 'i')) > -1) : [];
  }

}
