import { IVMState } from '../../Chip8';
import { Opcode } from '../Opcode';

export class Instruction {
  public readonly opcode: Opcode;

  private readonly hexString: string;
  private readonly hexNumber: number;

  constructor(hexString: string) {
    this.hexString = hexString;
    this.hexNumber = parseInt(hexString, 16);
    this.opcode = this.hexNumber & 0xf000;
  }

  public perform(vmState: IVMState): IVMState {
    return vmState;
  }

  public toString = (): string => this.hexString;
  public toNumber = (): number => this.hexNumber;

  protected getX = (): number => this.hexNumber & 0x0f00;
  protected getY = (): number => this.hexNumber & 0x00f0;

  protected getN = (): number => this.hexNumber & 0x000f;
  protected getNN = (): number => this.hexNumber & 0x00ff;
  protected getNNN = (): number => this.hexNumber & 0x0fff;
}
