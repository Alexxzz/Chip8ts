import { Register } from '../VM/Register';
import { VMState } from '../VM/VMState';
import { Instruction } from './Base/Instruction';

export class InstructionANNN extends Instruction {
  public perform(vmState: VMState): VMState {
    vmState.setRegister(Register.I, this.getNNN().numberValue());

    return vmState;
  }
}
