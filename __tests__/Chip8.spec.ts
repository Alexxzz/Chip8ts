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
        const program = [
          writeValueToRegister('42', Register.V3), // write to V3 value 0xff
          writeValueToRegister('ff', Register.VE), // write to VE value 0x42
          '83E4', // add value of VE to value of V3
        ];

        const vmState = sut.run(program);

        expect(vmState.getRegister(Register.VF)).toEqual(0x1);
        expect(vmState.getRegister(Register.V3)).toEqual(0x41);
      });

      it('Set VF to 00 if a carry does not occur', () => {
        const program = [
          writeValueToRegister('01', Register.VF), // preset VF to 0x1

          writeValueToRegister('15', Register.VA), // write to VA value 0x15
          writeValueToRegister('23', Register.VD), // write to VD value 0x23
          '8DA4', // add value of VA to value of VD
        ];

        const vmState = sut.run(program);

        expect(vmState.getRegister(Register.VF)).toEqual(0);
      });
    });

    describe('8XY5: Subtract the value of register VY from register VX', () => {
      it('subtracts VA(Vy) from VB(Vx) and sets to VB(Vx)', () => {
        const program = [
          writeValueToRegister('05', Register.VA), // write to VA value 0x15
          writeValueToRegister('0a', Register.VB), // write to VD value 0x23
          '8BA5', // subtract value of VA from VB
        ];

        const vmState = sut.run(program);

        expect(vmState.getRegister(Register.VB)).toEqual(0x5);
      });

      it('Set VF to 00 if a borrow occurs', () => {
        const program = [
          writeValueToRegister('01', Register.VF),
          writeValueToRegister('0a', Register.VA),
          writeValueToRegister('05', Register.VB),
          '8BA5',
        ];

        const vmState = sut.run(program);

        expect(vmState.getRegister(Register.VB)).toEqual(0x5);
        expect(vmState.getRegister(Register.VF)).toEqual(0x0);
      });

      it('Set VF to 01 if a borrow does not occur', () => {
        const program = [
          writeValueToRegister('00', Register.VF),
          writeValueToRegister('03', Register.VA),
          writeValueToRegister('03', Register.VB),
          '8BA5',
        ];

        const vmState = sut.run(program);

        expect(vmState.getRegister(Register.VB)).toEqual(0x0);
        expect(vmState.getRegister(Register.VF)).toEqual(0x1);
      });
    });

    describe('8XY7: Set register VX to the value of VY minus VX', () => {
      it('sets VC(Vx) to value VD(Vy) minus VC(Vx)', () => {
        const program = [
          writeValueToRegister('03', Register.VC),
          writeValueToRegister('08', Register.VD),
          '8CD7',
        ];

        const vmState = sut.run(program);

        expect(vmState.getRegister(Register.VC)).toEqual(0x5);
      });

      it('Set VF to 00 if a borrow occurs', () => {
        const program = [
          writeValueToRegister('01', Register.VF),
          writeValueToRegister('05', Register.VA),
          writeValueToRegister('0a', Register.VB),
          '8BA7',
        ];

        const vmState = sut.run(program);

        expect(vmState.getRegister(Register.VB)).toEqual(0x5);
        expect(vmState.getRegister(Register.VF)).toEqual(0x0);
      });

      it('Set VF to 01 if a borrow does not occur', () => {
        const program = [
          writeValueToRegister('00', Register.VF),
          writeValueToRegister('03', Register.VA),
          writeValueToRegister('03', Register.VB),
          '8BA7',
        ];

        const vmState = sut.run(program);

        expect(vmState.getRegister(Register.VB)).toEqual(0x0);
        expect(vmState.getRegister(Register.VF)).toEqual(0x1);
      });
    });

    describe('8XY2: Set VX to VX AND VY', () => {
      it('sets V1(Vx) to V1(Vx) AND V3(Vy)', () => {
        const program = [
          writeValueToRegister('0e', Register.V1),
          writeValueToRegister('04', Register.V3),
          '8132',
        ];

        const vmState = sut.run(program);

        expect(vmState.getRegister(Register.V1)).toEqual(0x4);
      });
    });
  });
});

const writeValueToRegister = (value: string, register: Register) => {
  if (value.length !== 2) {
    fail('value should be length of 2');
  }
  return `6${register.substring(1)}${value}`;
};
