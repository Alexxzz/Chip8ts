import { IVMState } from '../Chip8';
import { InstructionWithXNNOperands } from './Base/InstructionWithXNNOperands';
import { Opcode } from './Opcode';

export class Instruction6XNN extends InstructionWithXNNOperands {
  public readonly opcode: Opcode._6XNN = Opcode._6XNN;

  public perform(vmState: IVMState): IVMState {
    return {
      ...vmState,
      V0: this.NN,
    };
  }
}
