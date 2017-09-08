import { AssemblyComponent } from './assembly.component';

interface ThisContext {
  component: AssemblyComponent;
}

/* 
  The tests here are stubbed out. May need to be 
  moved to end to end or wherever we handle
  template tests.
*/

describe('AssemblyComponent', () => {

  beforeEach(function(this: ThisContext) {
    const dummyElement = document.createElement('div');
    document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);

    this.component = new AssemblyComponent();
  });

  it('should be created', function(this: ThisContext) {
    // assert
    expect(this.component).toBeTruthy();
  });

  it('should call ngOnInit', function(this: ThisContext) {
    // arrange
    spyOn(this.component, 'setStep');

    // act
    this.component.ngOnInit();

    // assert
    expect(this.component.setStep).toHaveBeenCalledTimes(1);
    expect(this.component.setStep).toHaveBeenCalledWith(1);
  });

  it('should set the current step', function(this: ThisContext) {
    // arrange
    spyOn(this.component, 'setProgress');
    spyOn(this.component, 'setView');

    // act
    this.component.setStep(1);

    // assert 
    expect(this.component.setProgress).toHaveBeenCalledTimes(1);
    expect(this.component.setProgress).toHaveBeenCalledWith(1);
    expect(this.component.setView).toHaveBeenCalledTimes(1);
    expect(this.component.setView).toHaveBeenCalledWith(1);
    expect(this.component.currentStep).toEqual(1);
  }); 

  it('should set the active step', function(this: ThisContext) {
    // act
    this.component.setProgress(1);
  });

  it('should set the view content to display the active step', function(this: ThisContext) {
    // act
    this.component.setView(1);
  });
});
