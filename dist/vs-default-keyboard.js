/***
 *
 * ###########################################################
 *      DEFINING KEYBOARD LAYOUTS AND SPECIAL KEYS
 * ###########################################################
 *
 */


/**
 * Shortcuts for lowercase
 */
const shortcuts = [
  '@gmail.com',
  '@live.com',
  '.com'
];

/**
 * NUMERIC
 * Numeric keyboard config
 */
  const numericKb = [

  // First numeric row
  [...'1234567890'],

  // Math symbols row
  [...'-/:;()$&@"'],

  // Other symbols row
  [
    {
      symbol: '#+=',
      layoutShift: 'advanced-math-symbols'
    },

    ...'.,?!\'',

    {
      symbol: 'backspace',
      action(value) {
        value = value+'';
        value = value.substr(0, value.length - 1);
        return value;
      },
      base64Icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAgCAYAAACPb1E+AAAABGdBTUEAALGPC/xhBQAAAYRpQ0NQSUNDIHByb2ZpbGUAACiRfZE9SMNAHMVfU0tFKw52KOKQoTpZFBVx1CoUoUKpFVp1MLn0C5o0JCkujoJrwcGPxaqDi7OuDq6CIPgB4ubmpOgiJf4vKbSI8eC4H+/uPe7eAUKjwlSzaxxQNctIJ+JiNrcqBl8RQAS9GENMYqY+l0ol4Tm+7uHj612MZ3mf+3P0KXmTAT6ReJbphkW8QTy9aemc94nDrCQpxOfEowZdkPiR67LLb5yLDgs8M2xk0vPEYWKx2MFyB7OSoRJPEUcVVaN8IeuywnmLs1qpsdY9+QtDeW1lmes0h5DAIpaQgggZNZRRgYUYrRopJtK0H/fwDzr+FLlkcpXByLGAKlRIjh/8D353axYmJ9ykUBwIvNj2xzAQ3AWaddv+Prbt5gngfwautLa/2gBmPkmvt7XoEdC/DVxctzV5D7jcASJPumRIjuSnKRQKwPsZfVMOGLgFetbc3lr7OH0AMtRV8gY4OARGipS97vHu7s7e/j3T6u8Htlxywqi417gAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQflBRgLMhVb6I/qAAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAAxtJREFUWMPVmEtME1EYhc+UPiR2UAiWFisE5NHaVmWhLhABQ1jgBjUpoRhJhWBj8VEhbjQ+Froyxg0SIw+NATRUKKAoSIuFvTFAUAy4MhFh4UIwEqa9rtoAre2dKRb5d3PnTubLPXPO/e8Am6AYPpNfDbnJp8/T8Hq9/xQqMSEBZtNJhjfk3QdNxN77EoSQqKyeUqFAz9NHDACIaB7o7neSF1EEBIDZuTnUXb9NqCFb2zvgjSKgr6ZmZkAFefXOPfJ9fn5DDPN7aSk8ZM9rF3GOjm64u0NCNre1g1A6WcTQBwWfuSEh+chcXJiPi5YaSCSSsHNZVo5r9TbkGAyRQfKRubgwH2WlpdBrNDhfXRUSlGXlqLdakareBYu5Evv1euGQtDKLGAbazCz/tU6Tjdoqc1DQOJbFlVor1ColAEAcE4OM9DRhkHxk9hKChuYWfJiY8I/ptdqAFWVZOeqs55CsVPrH3r5zw97bxx9SiJs5jweNLY9Xgeo02X5Qn8S+FfQBPut2UL8jZuXFL0Zyc2FxkXdEeAnB+7FxpKrVSFLsAAAoEhORlpKCoiN52LkCcHDYjecOOkCZTIovk+O3ROsV2hzHBUiv02QHSEwLGCC3o99JXCMjEYcu5/GgsfUJxic/BtwbcvOTOABy+7a4TolUgvWo2NgtiI+PDxhXJSmpcvSvkAW5B4zHS0oiBgxmkmBmErwt2ixmJpMyt4LV2hz0STy2QvpQOUodQdWnKjplMqmgFQyWgx1dDjQ0NYfNUV6QQmQPl4PhclTQjmOzmJms3enU3YzNUrMKcHA40MU+16+VvrLMKHzvrqowUcnuJQRdff1YXl4Om4Mcx62SfmFhEW+czshOi/cftpKOLrpc27tHi6yMDKq9WCwWo7LMiAGXC1+/zYb9lIbsbaG7z9PWy2RqembDOnIfZMjO/IypXJDbo3p8KMg9YDxxrOT/hgSAS2fp3b7eFbdVTgcJAGZT+Q+ZVBZ1yH0GHT3k0cMHE2qrzWBZedQAcwwG3Ki/wPD+YQUA9r4B8lNAY0zdhYtESFapUJR3iMFmqj/kYD3mnplXWgAAAABJRU5ErkJggg=='
    }
  ],

  // Last numeric row
  [
    { symbol: 'ABC', layoutShift: 'lowercase-querty' },
    {
      symbol: 'espaço',
      action(value) {
        return value + ' ';
      }
    },
    {
      symbol: '@',
      action(value) {
        return value;
      }
    },
    {
      symbol: 'retorno',
      action(value) {
        return value;
      }
    }
  ]

];

const advancedMathSymbolsKb = [
  [...'[]{}#%^*+='],
  [...'_\\|`<>ªº≥≤'],
  [
    { symbol: '123', layoutShift: 'numeric' },

    ...'.,?!`',

    /**
     * Backspace is a special key
     */
      (() => {
      return {
        symbol: 'backspace',
        action(value) {
          value = value+'';
          value = value.substr(0, value.length - 1);
          return value;
        },
        base64Icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAgCAYAAACPb1E+AAAABGdBTUEAALGPC/xhBQAAAYRpQ0NQSUNDIHByb2ZpbGUAACiRfZE9SMNAHMVfU0tFKw52KOKQoTpZFBVx1CoUoUKpFVp1MLn0C5o0JCkujoJrwcGPxaqDi7OuDq6CIPgB4ubmpOgiJf4vKbSI8eC4H+/uPe7eAUKjwlSzaxxQNctIJ+JiNrcqBl8RQAS9GENMYqY+l0ol4Tm+7uHj612MZ3mf+3P0KXmTAT6ReJbphkW8QTy9aemc94nDrCQpxOfEowZdkPiR67LLb5yLDgs8M2xk0vPEYWKx2MFyB7OSoRJPEUcVVaN8IeuywnmLs1qpsdY9+QtDeW1lmes0h5DAIpaQgggZNZRRgYUYrRopJtK0H/fwDzr+FLlkcpXByLGAKlRIjh/8D353axYmJ9ykUBwIvNj2xzAQ3AWaddv+Prbt5gngfwautLa/2gBmPkmvt7XoEdC/DVxctzV5D7jcASJPumRIjuSnKRQKwPsZfVMOGLgFetbc3lr7OH0AMtRV8gY4OARGipS97vHu7s7e/j3T6u8Htlxywqi417gAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQflBRgLMhVb6I/qAAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAAxtJREFUWMPVmEtME1EYhc+UPiR2UAiWFisE5NHaVmWhLhABQ1jgBjUpoRhJhWBj8VEhbjQ+Froyxg0SIw+NATRUKKAoSIuFvTFAUAy4MhFh4UIwEqa9rtoAre2dKRb5d3PnTubLPXPO/e8Am6AYPpNfDbnJp8/T8Hq9/xQqMSEBZtNJhjfk3QdNxN77EoSQqKyeUqFAz9NHDACIaB7o7neSF1EEBIDZuTnUXb9NqCFb2zvgjSKgr6ZmZkAFefXOPfJ9fn5DDPN7aSk8ZM9rF3GOjm64u0NCNre1g1A6WcTQBwWfuSEh+chcXJiPi5YaSCSSsHNZVo5r9TbkGAyRQfKRubgwH2WlpdBrNDhfXRUSlGXlqLdakareBYu5Evv1euGQtDKLGAbazCz/tU6Tjdoqc1DQOJbFlVor1ColAEAcE4OM9DRhkHxk9hKChuYWfJiY8I/ptdqAFWVZOeqs55CsVPrH3r5zw97bxx9SiJs5jweNLY9Xgeo02X5Qn8S+FfQBPut2UL8jZuXFL0Zyc2FxkXdEeAnB+7FxpKrVSFLsAAAoEhORlpKCoiN52LkCcHDYjecOOkCZTIovk+O3ROsV2hzHBUiv02QHSEwLGCC3o99JXCMjEYcu5/GgsfUJxic/BtwbcvOTOABy+7a4TolUgvWo2NgtiI+PDxhXJSmpcvSvkAW5B4zHS0oiBgxmkmBmErwt2ixmJpMyt4LV2hz0STy2QvpQOUodQdWnKjplMqmgFQyWgx1dDjQ0NYfNUV6QQmQPl4PhclTQjmOzmJms3enU3YzNUrMKcHA40MU+16+VvrLMKHzvrqowUcnuJQRdff1YXl4Om4Mcx62SfmFhEW+czshOi/cftpKOLrpc27tHi6yMDKq9WCwWo7LMiAGXC1+/zYb9lIbsbaG7z9PWy2RqembDOnIfZMjO/IypXJDbo3p8KMg9YDxxrOT/hgSAS2fp3b7eFbdVTgcJAGZT+Q+ZVBZ1yH0GHT3k0cMHE2qrzWBZedQAcwwG3Ki/wPD+YQUA9r4B8lNAY0zdhYtESFapUJR3iMFmqj/kYD3mnplXWgAAAABJRU5ErkJggg=='
      }
    })()
  ],

  [
    { symbol: 'ABC', layoutShift: 'lowercase-querty' },
    {
      symbol: 'espaço',
      action(value) {
        return value + ' ';
      }
    },
    {
      symbol: '@',
      action(value) {
        return value;
      }
    },
    {
      symbol: 'retorno',
      action(value) {
        return value;
      }
    }
  ]
];

/**
 *  QUERTY
 *  A classic querty keyboard config
 */
const querty = [

  // First row
  [
    ...'qw',
    {symbol: 'e', variations: [...'éèêẽ']},
    ...'rty',
    {symbol: 'u', variations: [...'úùûũ']},
    {symbol: 'i', variations: [...'íìîĩ']},
    {symbol: 'o', variations: [...'óòôõ']},
    'p'
  ],

  // Second kb row
  [
    {symbol: 'a', variations: [...'áàâã']},
    ...'sdfghjklç'
  ],

  // Third, with special chars!
  [
    /**
     * Shift is a special key
     */
    (() => {
      return {
        symbol: 'shift',
        layoutShift: 'uppercase-querty',
        base64Icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAsCAYAAADmZKH2AAAABGdBTUEAALGPC/xhBQAAAYRpQ0NQSUNDIHByb2ZpbGUAACiRfZE9SMNAHMVfU0tFKw52KOKQoTpZFBVx1CoUoUKpFVp1MLn0C5o0JCkujoJrwcGPxaqDi7OuDq6CIPgB4ubmpOgiJf4vKbSI8eC4H+/uPe7eAUKjwlSzaxxQNctIJ+JiNrcqBl8RQAS9GENMYqY+l0ol4Tm+7uHj612MZ3mf+3P0KXmTAT6ReJbphkW8QTy9aemc94nDrCQpxOfEowZdkPiR67LLb5yLDgs8M2xk0vPEYWKx2MFyB7OSoRJPEUcVVaN8IeuywnmLs1qpsdY9+QtDeW1lmes0h5DAIpaQgggZNZRRgYUYrRopJtK0H/fwDzr+FLlkcpXByLGAKlRIjh/8D353axYmJ9ykUBwIvNj2xzAQ3AWaddv+Prbt5gngfwautLa/2gBmPkmvt7XoEdC/DVxctzV5D7jcASJPumRIjuSnKRQKwPsZfVMOGLgFetbc3lr7OH0AMtRV8gY4OARGipS97vHu7s7e/j3T6u8Htlxywqi417gAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQflBRgLMRuXffEuAAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAASFJREFUWMNjYBgJ4OnzF/+L61v+DzqHPX/56n9gfNp/c3f//zGZ+f/ff/yoRA1zGanhsKyyGoZnL17CxVSVFBgmdzQpC/Lz3xswx2FzGDUdyEgLh1HLgYy0chg1HMhIS4dR6kBGWjuMEgcy0sNh5DqQkV4OI8eBjPR0GKkOZKS3w0hxIONAOIxYBzIOlMOIcSDjQDqMkAMZB9ph+BzIOBgchsuBjIPFYdgcyDiYHIbuQJLqVmvvoP9//vwl21JZaSmGNfOmE20n02Dul4w6btRxo44bddxwdxwLKYpjQgIZ/v77R7ZlAnx8DGvmTWcYBaNgFIyCUYCj33r01Jn/RbXNdHfIspmTGJQV5BlH69Zh7zis3bQnz17QfSZGRkoCwy0A8U7lE3jFbPUAAAAASUVORK5CYII='
      }
    })(),

    ...'zxcvbnm',

    /**
     * Backspace is a special key
     */
    (() => {
      return {
        symbol: 'backspace',
        action(value) {
          value = value+'';
          value = value.substr(0, value.length - 1);
          return value;
        },
        base64Icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAgCAYAAACPb1E+AAAABGdBTUEAALGPC/xhBQAAAYRpQ0NQSUNDIHByb2ZpbGUAACiRfZE9SMNAHMVfU0tFKw52KOKQoTpZFBVx1CoUoUKpFVp1MLn0C5o0JCkujoJrwcGPxaqDi7OuDq6CIPgB4ubmpOgiJf4vKbSI8eC4H+/uPe7eAUKjwlSzaxxQNctIJ+JiNrcqBl8RQAS9GENMYqY+l0ol4Tm+7uHj612MZ3mf+3P0KXmTAT6ReJbphkW8QTy9aemc94nDrCQpxOfEowZdkPiR67LLb5yLDgs8M2xk0vPEYWKx2MFyB7OSoRJPEUcVVaN8IeuywnmLs1qpsdY9+QtDeW1lmes0h5DAIpaQgggZNZRRgYUYrRopJtK0H/fwDzr+FLlkcpXByLGAKlRIjh/8D353axYmJ9ykUBwIvNj2xzAQ3AWaddv+Prbt5gngfwautLa/2gBmPkmvt7XoEdC/DVxctzV5D7jcASJPumRIjuSnKRQKwPsZfVMOGLgFetbc3lr7OH0AMtRV8gY4OARGipS97vHu7s7e/j3T6u8Htlxywqi417gAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQflBRgLMhVb6I/qAAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAAxtJREFUWMPVmEtME1EYhc+UPiR2UAiWFisE5NHaVmWhLhABQ1jgBjUpoRhJhWBj8VEhbjQ+Froyxg0SIw+NATRUKKAoSIuFvTFAUAy4MhFh4UIwEqa9rtoAre2dKRb5d3PnTubLPXPO/e8Am6AYPpNfDbnJp8/T8Hq9/xQqMSEBZtNJhjfk3QdNxN77EoSQqKyeUqFAz9NHDACIaB7o7neSF1EEBIDZuTnUXb9NqCFb2zvgjSKgr6ZmZkAFefXOPfJ9fn5DDPN7aSk8ZM9rF3GOjm64u0NCNre1g1A6WcTQBwWfuSEh+chcXJiPi5YaSCSSsHNZVo5r9TbkGAyRQfKRubgwH2WlpdBrNDhfXRUSlGXlqLdakareBYu5Evv1euGQtDKLGAbazCz/tU6Tjdoqc1DQOJbFlVor1ColAEAcE4OM9DRhkHxk9hKChuYWfJiY8I/ptdqAFWVZOeqs55CsVPrH3r5zw97bxx9SiJs5jweNLY9Xgeo02X5Qn8S+FfQBPut2UL8jZuXFL0Zyc2FxkXdEeAnB+7FxpKrVSFLsAAAoEhORlpKCoiN52LkCcHDYjecOOkCZTIovk+O3ROsV2hzHBUiv02QHSEwLGCC3o99JXCMjEYcu5/GgsfUJxic/BtwbcvOTOABy+7a4TolUgvWo2NgtiI+PDxhXJSmpcvSvkAW5B4zHS0oiBgxmkmBmErwt2ixmJpMyt4LV2hz0STy2QvpQOUodQdWnKjplMqmgFQyWgx1dDjQ0NYfNUV6QQmQPl4PhclTQjmOzmJms3enU3YzNUrMKcHA40MU+16+VvrLMKHzvrqowUcnuJQRdff1YXl4Om4Mcx62SfmFhEW+czshOi/cftpKOLrpc27tHi6yMDKq9WCwWo7LMiAGXC1+/zYb9lIbsbaG7z9PWy2RqembDOnIfZMjO/IypXJDbo3p8KMg9YDxxrOT/hgSAS2fp3b7eFbdVTgcJAGZT+Q+ZVBZ1yH0GHT3k0cMHE2qrzWBZedQAcwwG3Ki/wPD+YQUA9r4B8lNAY0zdhYtESFapUJR3iMFmqj/kYD3mnplXWgAAAABJRU5ErkJggg=='
      }
    })()
  ],

  [
    { symbol: '123', layoutShift: 'numeric' },
    {
      symbol: 'espaço',
      action(value) {
        return value + ' ';
      }
    },
    {
      symbol: '@',
      action(value) {
        return value;
      }
    },
    {
      symbol: 'retorno',
      action(value) {
        return value;
      }
    }
  ]
];

/**
 * This is the same querty kb, but it haves uppercase chars
 */
const quertyUppercase = querty.map(q => {
  return q.map(k => {
    if (typeof k === 'object' && k.variations) {
      return {
        symbol: k.symbol.toUpperCase(),
        variations: k.variations.map(c => c.toUpperCase())
      };
    }
    return typeof k === 'string' ? k.toUpperCase() : k;
  })
});

/**
 * Shift on uppercase
 */
quertyUppercase[2][0] = {
  symbol: 'shift',
  layoutShift: 'lowercase-querty',
  base64Icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAsCAYAAADmZKH2AAAABGdBTUEAALGPC/xhBQAAAYRpQ0NQSUNDIHByb2ZpbGUAACiRfZE9SMNAHMVfU0tFKw52KOKQoTpZFBVx1CoUoUKpFVp1MLn0C5o0JCkujoJrwcGPxaqDi7OuDq6CIPgB4ubmpOgiJf4vKbSI8eC4H+/uPe7eAUKjwlSzaxxQNctIJ+JiNrcqBl8RQAS9GENMYqY+l0ol4Tm+7uHj612MZ3mf+3P0KXmTAT6ReJbphkW8QTy9aemc94nDrCQpxOfEowZdkPiR67LLb5yLDgs8M2xk0vPEYWKx2MFyB7OSoRJPEUcVVaN8IeuywnmLs1qpsdY9+QtDeW1lmes0h5DAIpaQgggZNZRRgYUYrRopJtK0H/fwDzr+FLlkcpXByLGAKlRIjh/8D353axYmJ9ykUBwIvNj2xzAQ3AWaddv+Prbt5gngfwautLa/2gBmPkmvt7XoEdC/DVxctzV5D7jcASJPumRIjuSnKRQKwPsZfVMOGLgFetbc3lr7OH0AMtRV8gY4OARGipS97vHu7s7e/j3T6u8Htlxywqi417gAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQflBRgLMRuXffEuAAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAASFJREFUWMNjYBgJ4OnzF/+L61v+DzqHPX/56n9gfNp/c3f//zGZ+f/ff/yoRA1zGanhsKyyGoZnL17CxVSVFBgmdzQpC/Lz3xswx2FzGDUdyEgLh1HLgYy0chg1HMhIS4dR6kBGWjuMEgcy0sNh5DqQkV4OI8eBjPR0GKkOZKS3w0hxIONAOIxYBzIOlMOIcSDjQDqMkAMZB9ph+BzIOBgchsuBjIPFYdgcyDiYHIbuQJLqVmvvoP9//vwl21JZaSmGNfOmE20n02Dul4w6btRxo44bddxwdxwLKYpjQgIZ/v77R7ZlAnx8DGvmTWcYBaNgFIyCUYCj33r01Jn/RbXNdHfIspmTGJQV5BlH69Zh7zis3bQnz17QfSZGRkoCwy0A8U7lE3jFbPUAAAAASUVORK5CYII='
};

/**
 * Exports default keyboard
 */
export default {
  defaultLayout: 'uppercase-querty',
  layouts: [
    { name: 'lowercase-querty', rows: querty, shortcuts },
    { name: 'uppercase-querty', rows: quertyUppercase },
    { name: 'numeric', rows: numericKb },
    { name: 'advanced-math-symbols', rows: advancedMathSymbolsKb }
  ]
};
