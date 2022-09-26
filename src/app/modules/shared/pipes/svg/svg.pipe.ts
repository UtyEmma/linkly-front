import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SVG } from 'src/library/svgs';

@Pipe({
  name: 'svg'
})
export class SvgPipe implements PipeTransform {

  constructor(
    protected sanitizer: DomSanitizer
  ){}
  transform(value: keyof typeof SVG): unknown {
    return this.sanitizer.bypassSecurityTrustHtml(SVG[value]);
  }

}
