import {HostBinding, Input} from '@angular/core';

export class StarComponent {

  @Input()
  size: 'xs' | 'lg' | 'sm' | '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x';

  @HostBinding('class.star-xs')
  get starXs(): boolean {
    return this.size === 'xs';
  }

  @HostBinding('class.star-lg')
  get starLg(): boolean {
    return this.size === 'lg';
  }

  @HostBinding('class.star-sm')
  get starSm(): boolean {
    return this.size === 'sm';
  }

  @HostBinding('class.star-1x')
  get star1x(): boolean {
    return this.size === '1x';
  }

  @HostBinding('class.star-2x')
  get star2x(): boolean {
    return this.size === '2x';
  }

  @HostBinding('class.star-3x')
  get star3x(): boolean {
    return this.size === '3x';
  }

  @HostBinding('class.star-4x')
  get star4x(): boolean {
    return this.size === '4x';
  }

  @HostBinding('class.star-5x')
  get star5x(): boolean {
    return this.size === '5x';
  }

  @HostBinding('class.star-6x')
  get star6x(): boolean {
    return this.size === '6x';
  }

  @HostBinding('class.star-7x')
  get star7x(): boolean {
    return this.size === '7x';
  }

  @HostBinding('class.star-8x')
  get star8x(): boolean {
    return this.size === '8x';
  }

  @HostBinding('class.star-9x')
  get star9x(): boolean {
    return this.size === '9x';
  }

  @HostBinding('class.star-10x')
  get star10x(): boolean {
    return this.size === '10x';
  }

}

