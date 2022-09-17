import { CdkStepper } from '@angular/cdk/stepper';

export class StepperProvider extends CdkStepper{

    selectStepByIndex(index: number){
      this.selectedIndex = index
    }
  
  }