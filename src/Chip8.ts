import { Instruction } from './Instructions/Base/Instruction';
import { Instruction6XNN } from './Instructions/Instruction6XNN';
import { InstructionANNN } from './Instructions/InstructionANNN';
import { Instructions } from './Instructions/Instructions';
import { Opcode } from './Instructions/Opcode';

export interface IVMState {
  I: number;
  V0: number;
}

export class Chip8 {
  private readonly vmState: IVMState;

  constructor() {
    this.vmState = {
      I: 0,
      V0: 0,
    };
  }

  public run(program: string): IVMState {
    const instruction = instructionFactory(program);
    return instruction.perform(this.vmState);
  }
}

const instructionFactory = (opcode: string): Instructions => {
  const instruction = new Instruction(opcode);

  switch (instruction.opcode) {
    case Opcode._6XNN: return new Instruction6XNN(opcode);
    case Opcode._ANNN: return new InstructionANNN(opcode);
  }
};
