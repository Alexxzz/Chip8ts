import { Chip8 } from '../src/Chip8';
import { Register } from '../src/VM/Register';

let sut: Chip8;
describe('Chip8', () => {
  beforeEach(() => {
    sut = new Chip8();
  });

  describe('runs passed program', () => {
    it('works with capital hex letters', () => {
      const vmState = sut.run(['AFFF']);

      expect(vmState.getRegister(Register.I)).toEqual(0x0fff);
    });

    it('works with non-capital hex letters', () => {
      const vmState = sut.run(['aabc']);

      expect(vmState.getRegister(Register.I)).toEqual(0x0abc);
    });

    it('returns copy of the VM state', () => {
      const notChangedVmState = sut.run(['A777']);
      const changedVmState = sut.run(['A777']);
      changedVmState.setRegister(Register.I, 555);

      expect(notChangedVmState.getRegister(Register.I)).toEqual(0x0777);
    });

    it('runs only passed operation', () => {
      const vmState = sut.run(['A777']);

      expect(vmState.getRegister(Register.V0)).toEqual(0);
    });

    describe('ANNN', () => {
      it('Stores memory address NNN in register I', () => {
        const vmState = sut.run(['A777']);

        expect(vmState.getRegister(Register.I)).toEqual(0x0777);
      });
    });

    describe('6XNN: Stores number NN in register VX', () => {
      it('stores to V0 register', () => {
        const vmState = sut.run(['60aa']);

        expect(vmState.getRegister(Register.V0)).toEqual(0x00aa);
      });

      it('stores to VF register', () => {
        const vmState = sut.run(['6F42']);

        expect(vmState.getRegister(Register.VF)).toEqual(0x0042);
      });
    });

    describe('8XY0: Store the value of register VY in register VX', () => {
      it('stores value of V7 to VE', () => {
        const program = [
          '6724', // write 0x0024 to V7
          '8E70', // write to VE value of V7
        ];

        const vmState = sut.run(program);

        expect(vmState.getRegister(Register.VE)).toEqual(0x24);
      });

      it('stores value of VF to V0', () => {
        const program = [
          '6f42', // write to VF value 0x0042
          '80F0', // write to V0 value of VF
        ];

        const vmState = sut.run(program);

        expect(vmState.getRegister(Register.V0)).toEqual(0x42);
      });
    });

    describe('7XNN: Add the value NN to register VX', () => {
      it('adds 1 to 1 in V7', () => {
        const program = [
          '6701', // write to V7 value 0x1
          '7701', // add to V7 value 0x1
        ];

        const vmState = sut.run(program);

        expect(vmState.getRegister(Register.V7)).toEqual(0x2);
      });

      it('correctly overloads register if result is bigger than 0xff', () => {
        const program = [
          writeValueToRegister('ff', Register.VA), // '6Aff' write to VA value 0xff
          '7A0f', // add to VA value 0x1
        ];

        const vmState = sut.run(program);

        expect(vmState.getRegister(Register.VA)).toEqual(0xe);
      });
    });

    describe('8XY4: Add the value of register VY to value of register VX and store at VX', () => {
      it('Adds value VB to VC', () => {
        const program = [
          writeValueToRegister('05', Register.VB), // '6B05' write to VB value 0x5
          writeValueToRegister('02', Register.VC), // '6C02' write to VC value 0x2
          '8CB4', // add value of VB to value of VC
        ];

        const vmState = sut.run(program);

        expect(vmState.getRegister(Register.VC)).toEqual(0x7);
      });

      it('Set VF to 01 if a carry occurs', () => {

      });

      it('Set VF to 00 if a carry does not occur', () => {

      });
    });
  });
});

const writeValueToRegister = (value: string, register: Register) => `6${register.substring(1)}${value}`;
