import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { HeaderComponent } from './header.component';

interface ThisContext {
  component: HeaderComponent;
  router: any;
}

describe('HeaderComponent', () => {

  beforeEach(function(this: ThisContext) {
    this.router = jasmine.createSpyObj('router', ['navigate']);

    this.component = new HeaderComponent(this.router);
  });

  it('should be created', function(this: ThisContext) {
    // assert
    expect(this.component).toBeTruthy();
  });

});
