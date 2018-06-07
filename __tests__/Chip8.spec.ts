import { Chip8 } from '../src/Chip8';
import { Registers } from '../src/VM/Registers';

describe('Chip8', () => {
  let sut: Chip8;

  beforeEach(() => {
    sut = new Chip8();
  });

  describe('runs passed program', () => {
    it('works with capital hex letters', () => {
      const vmState = sut.run(['AFFF']);

      expect(vmState.I).toEqual(0x0fff);
    });

    it('works with non-capital hex letters', () => {
      const vmState = sut.run(['aabc']);

      expect(vmState.I).toEqual(0x0abc);
    });

    it('returns copy of the VM state', () => {
      const notChangedVmState = sut.run(['A777']);
      const changedVmState = sut.run(['A777']);
      changedVmState.I = 555;

      expect(notChangedVmState.I).toEqual(0x0777);
    });

    it('runs only passed operation', () => {
      const vmState = sut.run(['A777']);

      expect(vmState.V0).toEqual(0);
    });

    describe('ANNN', () => {
      it('Stores memory address NNN in register I', () => {
        const vmState = sut.run(['A777']);

        expect(vmState.I).toEqual(0x0777);
      });
    });

    describe('6XNN: Stores number NN in register VX', () => {
      it('stores to V0 register', () => {
        const vmState = sut.run(['60aa']);

        expect(vmState.V0).toEqual(0x00aa);
      });

      it('stores to VF register', () => {
        const vmState = sut.run(['6F42']);

        expect(vmState.VF).toEqual(0x0042);
      });
    });

    describe('8XY0: Store the value of register VY in register VX', () => {
      it('stores value of V7 to VE', () => {
        const program = [
          '6724', // write 0x0024 to V7
          '8E70', // write to VE value of V7
        ];

        const vmState = sut.run(program);

        expect(vmState[Registers.VE]).toEqual(0x24);
      });
    });
  });
});
