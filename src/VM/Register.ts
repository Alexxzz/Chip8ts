export enum Register {
  V0 = 'V0',
  V1 = 'V1',
  V2 = 'V2',
  V3 = 'V3',
  V4 = 'V4',
  V5 = 'V5',
  V6 = 'V6',
  V7 = 'V7',
  V8 = 'V8',
  V9 = 'V9',
  VA = 'VA',
  VB = 'VB',
  VC = 'VC',
  VD = 'VD',
  VE = 'VE',
  VF = 'VF',

  I = 'I',
}

export const getRegisterByIndex = (index: number): Register =>
  Object.keys(Register)[index] as Register;
