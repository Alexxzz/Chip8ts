import { IVMState } from '../Chip8';
import { InstructionWithNNNOperand } from './Base/InstructionWithNNNOperand';
import { Opcode } from './Opcode';

export class InstructionANNN extends InstructionWithNNNOperand {
  public readonly opcode: Opcode._ANNN = Opcode._ANNN;

  public perform(vmState: IVMState): IVMState {
    return {
      ...vmState,
      I: this.NNN,
    };
  }
}
