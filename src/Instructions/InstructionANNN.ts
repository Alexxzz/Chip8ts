import { IVMState } from '../VM/IVMState';
import { Instruction } from './Base/Instruction';

export class InstructionANNN extends Instruction {
  public perform(vmState: IVMState): IVMState {
    return {
      ...vmState,
      I: this.getNNN(),
    };
  }
}
