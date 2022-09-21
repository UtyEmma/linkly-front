import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[autofocus]'
})
export class AutofocusDirective {
  @Input() autofocus = true;
  // @HostListener('state')  

  constructor(
    private elementRef: ElementRef
  ){}

  ngAfterViewInit(){
      this.autofocus = this.elementRef.nativeElement.focus();
  }

}
