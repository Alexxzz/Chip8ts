export class Hex {
  private readonly hexString: string;
  private readonly hexNumber: number;

  constructor(from: string | number) {
    if (typeof from === 'string') {
      this.hexString = from;
      this.hexNumber = parseInt(from, 16);
    } else {
      this.hexString = from.toString(16);
      this.hexNumber = from;
    }
  }

  public map(f: (h: number) => number): Hex {
    return new Hex(f(this.hexNumber));
  }

  public stringValue(): string {
    return this.hexString;
  }

  public numberValue(): number {
    return this.hexNumber;
  }

  public toString(): string {
    return this.hexString.indexOf('0x') === 0 ? this.hexString : '0x' + this.hexString;
  }
}
