import { Register } from './Register';

type Registers = { [r in Register]: number };

const ZeroRegisters: Registers = {
  [Register.I]: 0,

  [Register.V0]: 0,
  [Register.V1]: 0,
  [Register.V2]: 0,
  [Register.V3]: 0,
  [Register.V4]: 0,
  [Register.V5]: 0,
  [Register.V6]: 0,
  [Register.V7]: 0,
  [Register.V8]: 0,
  [Register.V9]: 0,
  [Register.VA]: 0,
  [Register.VB]: 0,
  [Register.VC]: 0,
  [Register.VD]: 0,
  [Register.VE]: 0,
  [Register.VF]: 0,
};

export class VMState {
  private readonly registers: Registers = { ...ZeroRegisters };

  constructor(vmState?: VMState) {
    if (vmState) {
      this.registers = { ...vmState.registers };
    }
  }

  public getRegister(r: Register): number {
    return this.registers[r];
  }

  public setRegister(r: Register, value: number): void {
    this.registers[r] = value;
  }
}
