import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IconDefinition} from '@fortawesome/free-brands-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-section-toolbar',
  templateUrl: './section-toolbar.component.html',
  styles: []
})
export class SectionToolbarComponent {

  @Input()
  items: any[];

  @Input()
  routing = false;

  @Input()
  getLabelFn: (item: any) => string = this.getLabel;

  @Input()
  getIconFn: (item: any) => IconDefinition;

  @Input()
  align: 'left' | 'justify' | 'right' = 'right';

  @Output()
  itemClick: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router, private route: ActivatedRoute) { }

  getLabel(item: any): string {
    return item.label;
  }

  onButtonClick(item: any) {
    if (this.routing) {
      this.router.navigate([item.url], {relativeTo: this.route}).then();
    }
    this.itemClick.emit(item);
  }
}
