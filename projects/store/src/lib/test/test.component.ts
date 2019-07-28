import {Component} from '@angular/core';
import {LocalStored, SessionStored} from '../decorator';

@Component({
  template: ``,
  styles: []
})
export class TestComponent {

  @LocalStored(1, 'test0')
  local = {foo: 5};

  @SessionStored('test')
  session = {foo: 5};


}
