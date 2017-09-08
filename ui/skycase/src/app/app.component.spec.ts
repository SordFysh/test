import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { AppComponent } from './app.component';

interface ThisContext {
  component: AppComponent;
}

describe('AppComponent', function () {

  beforeEach(function(this: ThisContext) {
    this.component = new AppComponent();
  });

  it('should be created', function(this: ThisContext) {
    // assert
    expect(this.component.title).toEqual('app');
    expect(this.component).toBeTruthy();
  });

});
