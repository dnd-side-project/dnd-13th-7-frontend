const COLORS = {
  /**grey */
  grey1: '#bcbdbf',
  grey2: '#b0b1b3',
  grey3: '#8d8e8f',
  grey4: '#6a6a6c',
  grey5: '#3c3d3e',

  /**light grey*/
  light1: '#fafafc',
  light2: '#f7f7f9',
  light3: '#ebecef',
  light4: '#d4d4d7',

  white: '#ffffff',
  black: '#0b0b0b',

  /**main color */
  main1: '#6e58fe',
  main2: '#5846cb',
  main3: '#f1eeff',

  /** state*/
  failure: '#F44336',
} as const

const THEMES = {
  'grey-color-1': COLORS.grey1,
  'grey-color-2': COLORS.grey2,
  'grey-color-3': COLORS.grey3,
  'grey-color-4': COLORS.grey4,
  'grey-color-5': COLORS.grey5,

  'light-color-1': COLORS.light1,
  'light-color-2': COLORS.light2,
  'light-color-3': COLORS.light3,
  'light-color-4': COLORS.light4,

  'white-color': COLORS.white,
  'black-color': COLORS.black,

  'main-color-1': COLORS.main1,
  'main-color-2': COLORS.main2,
  'main-color-3': COLORS.main3,

  'failure-color': COLORS.failure,
} as const

export default COLORS
export { THEMES }
