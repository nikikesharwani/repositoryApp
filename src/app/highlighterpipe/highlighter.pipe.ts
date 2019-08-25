import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlighter'
})
export class HighlighterPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  // pipe to highlight the matched substring in repos name
  transform(name: string, searchText: string): SafeHtml {

    if (!name) { return []; }
    if (!searchText) { return name; }

    if (name.toLowerCase().includes(searchText.toLowerCase())) {
      searchText = name.substring(0, searchText.length);
    }
    const value = name.replace(
      searchText, `<span style='background-color:yellow'>${searchText}</span>` );

    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

}
