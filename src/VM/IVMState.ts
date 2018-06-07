import { Registers } from './Registers';

export interface IVMState {
  I: number;

  [Registers.V0]: number;
  [Registers.V1]: number;
  [Registers.V2]: number;
  [Registers.V3]: number;
  [Registers.V4]: number;
  [Registers.V5]: number;
  [Registers.V6]: number;
  [Registers.V7]: number;
  [Registers.V8]: number;
  [Registers.V9]: number;
  [Registers.VA]: number;
  [Registers.VB]: number;
  [Registers.VC]: number;
  [Registers.VD]: number;
  [Registers.VE]: number;
  [Registers.VF]: number;
}

export const NullVMState: IVMState = {
  I: 0,

  [Registers.V0]: 0,
  [Registers.V1]: 0,
  [Registers.V2]: 0,
  [Registers.V3]: 0,
  [Registers.V4]: 0,
  [Registers.V5]: 0,
  [Registers.V6]: 0,
  [Registers.V7]: 0,
  [Registers.V8]: 0,
  [Registers.V9]: 0,
  [Registers.VA]: 0,
  [Registers.VB]: 0,
  [Registers.VC]: 0,
  [Registers.VD]: 0,
  [Registers.VE]: 0,
  [Registers.VF]: 0,
};
