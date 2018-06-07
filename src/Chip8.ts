import { instructionFactory } from './Instructions/Instructions';
import { IVMState, NullVMState } from './VM/IVMState';

export class Chip8 {
  private vmState: IVMState = NullVMState;

  public run(program: string[]): IVMState {
    for (const stringInstruction of program) {
      const instruction = instructionFactory(stringInstruction);
      this.vmState = instruction.perform(this.vmState);
    }

    return this.vmState;
  }
}
