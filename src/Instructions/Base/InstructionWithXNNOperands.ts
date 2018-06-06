import { Instruction } from './Instruction';

export class InstructionWithXNNOperands extends Instruction {
  public readonly X: number;
  public readonly NN: number;

  constructor(hexString: string) {
    super(hexString);

    this.X = this.getX();
    this.NN = this.getNN();
  }
}
