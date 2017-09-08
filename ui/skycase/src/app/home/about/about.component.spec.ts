import { AboutComponent } from './about.component';

interface ThisContext {
  component: AboutComponent;
}

describe('AboutComponent', () => {

  beforeEach(function(this: ThisContext) {
    this.component = new AboutComponent();
  });

  it('should be created', function(this: ThisContext) {
    // assert
    expect(this.component).toBeTruthy();
  });
});
