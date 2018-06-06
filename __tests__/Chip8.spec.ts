import { Chip8 } from '../src/Chip8';

describe('Chip8', () => {
  describe('runs passed program', () => {
    it('works with capital hex letters', () => {
      const sut = new Chip8();

      const vmState = sut.run('AFFF');

      expect(vmState.I).toEqual(0x0fff);
    });

    it('works with non-capital hex letters', () => {
      const sut = new Chip8();

      const vmState = sut.run('aabc');

      expect(vmState.I).toEqual(0x0abc);
    });

    it('returns copy of the VM state', () => {
      const sut = new Chip8();

      const notChangedVmState = sut.run('A777');
      const changedVmState = sut.run('A777');
      changedVmState.I = 555;

      expect(notChangedVmState.I).toEqual(0x0777);
    });

    it('runs only passed operation', () => {
      const sut = new Chip8();

      const vmState = sut.run('A777');

      expect(vmState.V0).toEqual(0);
    });

    describe('ANNN', () => {
      it('Stores memory address NNN in register I', () => {
        const sut = new Chip8();

        const vmState = sut.run('A777');

        expect(vmState.I).toEqual(0x0777);
      });
    });

    describe('6XNN: Stores number NN in register VX', () => {
      it('stores to V0 register', () => {
        const sut = new Chip8();

        const vmState = sut.run('60aa');

        expect(vmState.V0).toEqual(0x00aa);
      });
    });
  });
});
