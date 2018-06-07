import { IVMState } from '../VM/IVMState';
import { getRegisterByIndex } from '../VM/Registers';
import { Instruction } from './Base/Instruction';

export class Instruction6XNN extends Instruction {
  public perform(vmState: IVMState): IVMState {
    const registerIndex = this.getX();
    const register = getRegisterByIndex(registerIndex);

    const value = this.getNN();

    this.log(`put 0x${value.toString(16)} to ${register}`);

    return {
      ...vmState,
      [register]: value,
    };
  }
}
