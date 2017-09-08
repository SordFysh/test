import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { ShowcaseComponent } from './showcase.component';

interface ThisContext {
  component: ShowcaseComponent;
  router: any;
}

describe('ShowcaseComponent', () => {

  beforeEach(function(this: ThisContext) {
    this.router = jasmine.createSpyObj('Router', ['navigate']);

    this.component = new ShowcaseComponent(this.router);
  });

  it('should be created', function(this: ThisContext) {
    // assert
    expect(this.component).toBeTruthy();
  });

});
