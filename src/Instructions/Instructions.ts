import { Instruction } from './Base/Instruction';
import { Instruction6XNN } from './Instruction6XNN';
import { Instruction8XY0 } from './Instruction8XY0';
import { InstructionANNN } from './InstructionANNN';
import { Opcode } from './Opcode';

export const instructionFactory = (opcode: string): Instruction => {
  const instruction = new Instruction(opcode);

  const instructionClass = factory[instruction.opcode];
  return new instructionClass(opcode, console);
};

const factory = {
  [Opcode._6XNN]: Instruction6XNN,
  [Opcode._ANNN]: InstructionANNN,
  [Opcode._8XY0]: Instruction8XY0,
};
