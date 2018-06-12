import { instructionFactory } from './Instructions/Instructions';
import { VMState } from './VM/VMState';

export class Chip8 {
  private vmState = new VMState();

  public run(program: string[]): VMState {
    for (const stringInstruction of program) {
      const instruction = instructionFactory(stringInstruction);
      this.vmState = instruction.perform(this.vmState);
    }

    return new VMState(this.vmState);
  }
}
