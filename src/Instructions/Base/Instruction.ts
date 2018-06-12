import { ILogger } from '../../Services/ILogger';
import { VMState } from '../../VM/VMState';
import { Opcode } from '../Opcode';
import { Hex } from './Hex';

export class Instruction {
  public readonly opcode: Opcode;
  public readonly subOpcode: number;
  protected readonly logger?: ILogger;
  private readonly hex: Hex;

  constructor(hexString: string, logger?: ILogger) {
    this.logger = logger;
    this.hex = new Hex(hexString);
    this.opcode = this.hex.numberValue() & 0xf000;
    this.subOpcode = this.hex.numberValue() & 0x000f;
  }

  public perform(vmState: VMState): VMState {
    return vmState;
  }

  public toString = (): string => this.hex.stringValue();
  public toNumber = (): number => this.hex.numberValue();

  protected getX = (): Hex => this.hex.map(h => (h & 0x0f00) >> 8);
  protected getY = (): Hex => this.hex.map(h => (h & 0x00f0) >> 4);

  protected getN = (): Hex => this.hex.map(h => h & 0x000f);
  protected getNN = (): Hex => this.hex.map(h => h & 0x00ff);
  protected getNNN = (): Hex => this.hex.map(h => h & 0x0fff);

  protected log(message?: any, ...optionalParams: any[]) {
    if (this.logger) {
      this.logger.log(`${this.hex.stringValue()}: ${message}`, ...optionalParams);
    }
  }
}
