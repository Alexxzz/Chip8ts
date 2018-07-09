import { Instruction } from './Base/Instruction';
import { Instruction6XNN } from './Instruction6XNN';
import { Instruction7XNN } from './Instruction7XNN';
import { Instruction8XY0 } from './Instruction8XY0';
import { Instruction8XY2 } from './Instruction8XY2';
import { Instruction8XY4 } from './Instruction8XY4';
import { Instruction8XY5 } from './Instruction8XY5';
import { Instruction8XY7 } from './Instruction8XY7';
import { InstructionANNN } from './InstructionANNN';
import { Opcode, SubOpcode8XY_ } from './Opcode';

export const instructionFactory = (opcode: string): Instruction => {
  const instruction = new Instruction(opcode);

  const instructionClass = factory(instruction.opcode, instruction.subOpcode);
  return new instructionClass(opcode, console);
};

const factory = (opcode: Opcode, subOpcode: number) => {
  const instructions = {
    [Opcode._6XNN]: Instruction6XNN,
    [Opcode._7XNN]: Instruction7XNN,
    [Opcode._8XY_]: factory8XYZ[subOpcode as SubOpcode8XY_],
    [Opcode._ANNN]: InstructionANNN,
  };
  return instructions[opcode];
};

const factory8XYZ = {
  [SubOpcode8XY_._8XY0]: Instruction8XY0,
  [SubOpcode8XY_._8XY2]: Instruction8XY2,
  [SubOpcode8XY_._8XY4]: Instruction8XY4,
  [SubOpcode8XY_._8XY5]: Instruction8XY5,
  [SubOpcode8XY_._8XY7]: Instruction8XY7,
};
