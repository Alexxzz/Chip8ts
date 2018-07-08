import { getRegisterByIndex, Register } from '../VM/Register';
import { VMState } from '../VM/VMState';
import { Instruction } from './Base/Instruction';

export class Instruction8XY5 extends Instruction {
  public perform(vmState: VMState): VMState {
    const xRegisterIndex = this.getX();
    const xRegister = getRegisterByIndex(xRegisterIndex.numberValue());
    const xRegisterValue = vmState.getRegister(xRegister);

    const yRegisterIndex = this.getY();
    const yRegister = getRegisterByIndex(yRegisterIndex.numberValue());
    const yRegisterValue = vmState.getRegister(yRegister);

    const subtraction = xRegisterValue - yRegisterValue;
    const borrow = subtraction < 0 ? 0 : 1;
    const result = Math.abs(subtraction);

    vmState.setRegister(xRegister, result);
    vmState.setRegister(Register.VF, borrow);

    return vmState;
  }
}
