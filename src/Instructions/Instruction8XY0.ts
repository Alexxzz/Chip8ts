import { getRegisterByIndex } from '../VM/Register';
import { VMState } from '../VM/VMState';
import { Instruction } from './Base/Instruction';

export class Instruction8XY0 extends Instruction {
  public perform(vmState: VMState): VMState {
    const toRegisterIndex = this.getX();
    const toRegister = getRegisterByIndex(toRegisterIndex.numberValue());

    const fromRegisterIndex = this.getY();
    const fromRegister = getRegisterByIndex(fromRegisterIndex.numberValue());

    const fromValue = vmState.getRegister(fromRegister);

    this.log(`copy 0x${fromValue.toString(16)} from ${fromRegister} to ${toRegister}`);

    vmState.setRegister(toRegister, fromValue);

    return vmState;
  }
}
