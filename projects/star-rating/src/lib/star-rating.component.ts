import {Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'h2-star-rating',
  template: `
      <p>
          <ng-container *ngFor="let v of starValues; index as idx">
              <h2-star-empty class="cursor" [size]="size" *ngIf="value <= idx" (click)="clickOnStar($event, idx + 1)"></h2-star-empty>
              <h2-star-half class="cursor" [size]="size" *ngIf="idx + 0.5 === value" (click)="clickOnStar($event, idx + 1)"></h2-star-half>
              <h2-star-fully class="cursor" [size]="size" *ngIf="idx + 0.5 < value" (click)="clickOnStar($event, idx + 1)"></h2-star-fully>
          </ng-container>
      </p>
  `,
  styleUrls: ['star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {

  @Input()
  size: 'xs' | 'lg' | 'sm' | '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x';

  starValues: number[];

  private _value = 0;
  private _star = 5;

  @Input()
  @HostBinding('class.disabled')
  disabled = false;

  @Input()
  set value(value: number) {
    this._value = Math.round(value * 2) / 2;
  }

  get value(): number {
    return this._value;
  }

  @Input()
  set stars(value: number) {
    this._star = value;
    this.starValues = new Array(value);
  }

  @Output()
  valueChange: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit(): void {
    if (!this.starValues || this._star !== this.starValues.length) {
      this.starValues = new Array(this._star);
    }
  }

  clickOnStar($event: MouseEvent, star: number) {
    $event.stopImmediatePropagation();
    $event.stopPropagation();
    if (this.disabled) {
      return;
    }
    let result: number = star;
    if (star === this._value) {
      result = star - 1;
    } else if (star < this._value || star - 0.5 === this._value) {
      result = star;
    } else {
      result = star - 0.5;
    }
    this._value = result;
    this.valueChange.emit(result);
  }
}
