import { getRegisterByIndex, Register } from '../VM/Register';
import { VMState } from '../VM/VMState';
import { Instruction } from './Base/Instruction';

export class Instruction8XY4 extends Instruction {
  public perform(vmState: VMState): VMState {
    const fromRegisterIndex = this.getY();
    const fromRegister = getRegisterByIndex(fromRegisterIndex.numberValue());
    const fromRegisterValue = vmState.getRegister(fromRegister);

    const toRegisterIndex = this.getX();
    const toRegister = getRegisterByIndex(toRegisterIndex.numberValue());
    const toRegisterValue = vmState.getRegister(toRegister);

    const result = (fromRegisterValue + toRegisterValue) % 256;
    const leftover = (fromRegisterValue + toRegisterValue) / 256 > 1;

    vmState.setRegister(toRegister, result);
    vmState.setRegister(Register.VF, Number(leftover));

    this.log(
      `add value of ${fromRegister}:${fromRegisterValue} to value of ${toRegister}:${toRegisterValue} = ${result}`,
    );

    return vmState;
  }
}
