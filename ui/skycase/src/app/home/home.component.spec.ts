import { HomeComponent } from './home.component';

interface ThisContext {
  component: HomeComponent;
}

describe('HomeComponent', function () {

  it('should be created', function (this: ThisContext) {
    // arrange
    this.component = new HomeComponent();

    // assert
    expect(this.component).toBeTruthy();
  });

});
