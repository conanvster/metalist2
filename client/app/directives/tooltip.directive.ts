import {Input, Directive, ElementRef, OnInit, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[tooltip]',
  exportAs: 'tooltip'
})
export class TooltipDirective implements OnInit {
  tooltipElement = document.createElement('div');

  @HostBinding('style.position')
  position:string = 'relative';

  @Input()
  set tooltip(value) {
    this.tooltipElement.innerHTML = value;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.tooltipElement.style.display = 'block';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.tooltipElement.style.display = 'none';
  }

  constructor(private element:ElementRef) {
  }

  ngOnInit() {
    this.tooltipElement.className = 'tooltips';
    this.element.nativeElement.appendChild(this.tooltipElement);
  }
}
