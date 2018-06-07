import { IVMState } from '../VM/IVMState';
import { getRegisterByIndex } from '../VM/Registers';
import { Instruction } from './Base/Instruction';

export class Instruction8XY0 extends Instruction {
  public perform(vmState: IVMState): IVMState {
    const toRegisterIndex = this.getX();
    const toRegister = getRegisterByIndex(toRegisterIndex);

    const fromRegisterIndex = this.getY();
    const fromRegister = getRegisterByIndex(fromRegisterIndex);

    const fromValue = vmState[fromRegister];

    this.log(`copy 0x${fromValue.toString(16)} from ${fromRegister} to ${toRegister}`);

    return {
      ...vmState,
      [toRegister]: fromValue,
    };
  }
}
