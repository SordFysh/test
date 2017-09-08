import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assembly',
  templateUrl: './assembly.component.html',
  styleUrls: ['./assembly.component.css']
})
export class AssemblyComponent implements OnInit {

  stepTitle: string[] = ['Tools & Parts', 'Step 1', 'Step 2', 'Step 3', 'Step 4'];
  currentStep: number;

  constructor() { }

  ngOnInit() {
    this.setStep(1);
  }

   // updates the progress and the view depending on the active step
  setStep ( step: number ) {
    this.setProgress(step);
    this.setView(step);
    this.currentStep = step;
  }

  // sets the progress bar to have the step number 'step' appear active
  setProgress ( step: number ) {
    document.getElementById('progress' + step).classList.remove('bg-info');

    for (let i = 1; i <= 5; i++) {
      if ( i === step ) {
        continue;
      }
      if ( !document.getElementById('progress' + i).classList.contains('bg-info') ) {
        document.getElementById('progress' + i).classList.add('bg-info');
      }
    }
  }

  // updates the view for the current step
  setView ( step: number ) {
    document.getElementById('step' + step).style.display = '';

    for ( let i = 1; i <= 5; i++ ) {
      if ( i === step ) {
        continue;
      }
      document.getElementById('step' + i).style.display = 'none';
    }
  }

}
