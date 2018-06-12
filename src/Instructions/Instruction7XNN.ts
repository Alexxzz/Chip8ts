import { getRegisterByIndex } from '../VM/Register';
import { VMState } from '../VM/VMState';
import { Instruction } from './Base/Instruction';

export class Instruction7XNN extends Instruction {
  public perform(vmState: VMState): VMState {
    const registerIndex = this.getX();
    const register = getRegisterByIndex(registerIndex.numberValue());

    const addendum = this.getNN();
    const value = vmState.getRegister(register);
    const sum = addendum.map(h => (h + value) % 256);

    this.log(
      `add ${addendum} to ${value.toString(16)} = ${sum} in register ${register}`,
    );

    vmState.setRegister(register, sum.numberValue());
    return vmState;
  }
}
