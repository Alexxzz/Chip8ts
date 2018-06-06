import { Instruction } from './Instruction';

export class InstructionWithNNNOperand extends Instruction {
  public readonly NNN: number;

  constructor(hexString: string) {
    super(hexString);

    this.NNN = this.getNNN();
  }
}
