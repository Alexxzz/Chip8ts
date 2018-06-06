import { Instruction } from './Instruction';

export class InstructionWithNoOperands extends Instruction {
  constructor(hexString: string) {
    super(hexString);
  }
}
