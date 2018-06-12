import { getRegisterByIndex } from '../VM/Register';
import { VMState } from '../VM/VMState';
import { Instruction } from './Base/Instruction';

export class Instruction6XNN extends Instruction {
  public perform(vmState: VMState): VMState {
    const registerIndex = this.getX();
    const register = getRegisterByIndex(registerIndex.numberValue());

    const value = this.getNN();

    this.log(`put ${value} to ${register}`);

    vmState.setRegister(register, value.numberValue());
    return vmState;
  }
}
