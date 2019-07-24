import chalk from 'chalk';
import { body, options, title } from '../src/index';

describe('title: ', () => {

  it("format as title: ", () => {
    const usage = title("Usage");
    expect(usage).toBe('\n' + chalk.bold.underline('Usage') + '\n\n');
  });

});

describe('body: ', () => {

  it('print plain text with new line if very short.', () => {
    const content = body('The app is awesome.');
    expect(content).toBe('The app is awesome.\n');
  });

  it('print plain text with new line if very short.', () => {
    const content = body('The app is awesome.');
    expect(content).toBe('The app is awesome.\n');
  });

  it('print plain text with leading spaces.', () => {
    const content = body('The app is awesome.', 2);
    expect(content).toBe('  The app is awesome.\n');
  });

  it("doesn't print trailing spaces for one line content.", () => {
    const content = body('The app is awesome.', 2, 2);
    expect(content).toBe('  The app is awesome.\n');
  });

  it('wrap lines.', () => {
    const content = body('The app is awesome. The app usage is very very very long. The app has a lot of complex features.');
    expect(content).toBe('The app is awesome. The app usage is very very very long. The app has a lot of c\nomplex features.\n');
  });

  it('wrap lines with spaces.', () => {
    const content = body('The app is awesome. The app usage is very very very long. The app has a lot of complex features.', 2, 2);
    expect(content).toBe('  The app is awesome. The app usage is very very very long. The app has a lot   \n  of complex features.\n');
  });
});

describe("options: ", () => {

  describe("handle argument format: ", () => {

    it("string", () => {
      const usage = options({
        file: {
          type: 'string',
          desc: 'the file input.'
        }
      });
      expect(usage).toBe(
        chalk.bold('--file') + chalk.dim(' ' + chalk.underline('string')) + ' '.repeat(4) + 'the file input.'
      );
    });

    it("string[]", () => {
      const usage = options({
        files: {
          type: 'string[]',
          desc: 'the files input.'
        }
      });
      expect(usage).toBe(
        chalk.bold('--files') + chalk.dim(' ' + chalk.underline('string') + ' ...') + ' '.repeat(4) + 'the files input.'
      );
    });

    it("number", () => {
      const usage = options({
        age: {
          type: 'number',
          desc: 'the age of the user.'
        }
      });
      expect(usage).toBe(
        chalk.bold('--age') + chalk.dim(' ' + chalk.underline('number')) + ' '.repeat(4) + 'the age of the user.'
      );
    });

    it("number[]", () => {
      const usage = options({
        ages: {
          type: 'number[]',
          desc: 'the ages of the users.'
        }
      });
      expect(usage).toBe(
        chalk.bold('--ages') + chalk.dim(' ' + chalk.underline('number') + ' ...') + ' '.repeat(4) + 'the ages of the users.'
      );
    });

    it("boolean", () => {
      const usage = options({
        power: {
          type: 'boolean',
          desc: 'whether use power output.'
        }
      });
      expect(usage).toBe(
        chalk.bold('--power') + ' '.repeat(4) + 'whether use power output.'
      );
    });

  });

  it("display alias if it's present.", () => {
    const usage = options({
      power: {
        type: 'boolean',
        alias: 'p',
        desc: 'whether use power output.'
      }
    });
    expect(usage).toBe(
      chalk.bold('-p, ') + chalk.bold('--power') + ' '.repeat(4) + 'whether use power output.'
    );
  });

  it("put spaces before the line if leading spaces are present.", () => {
    const usage = options({
      power: {
        type: 'boolean',
        desc: 'whether use power output.'
      }
    }, 4);
    expect(usage).toBe(
      ' '.repeat(4) + chalk.bold('--power') + ' '.repeat(4) + 'whether use power output.'
    );
  });

  it("aligns description.", () => {
    const usage = options({
      help: {
        type: 'boolean',
        desc: 'display help.'
      },
      version: {
        type: 'boolean',
        desc: 'display version.'
      },
      veryVeryVeryLong: {
        type: 'number',
        desc: 'the longest number.'
      }
    });
    expect(usage).toBe(
      chalk.bold('--help') + ' '.repeat(26) + 'display help.\n' +
      chalk.bold('--version') + ' '.repeat(23) + 'display version.\n' +
      chalk.bold('--very-very-very-long') + chalk.dim(' ' + chalk.underline('number')) + ' '.repeat(4) + 'the longest number.'
    );
  });

  it("wraps long descriptions into the next line.", () => {
    const usage = options({
      version: {
        type: 'boolean',
        desc: 'Display version.'
      },
      veryVeryVeryLong: {
        type: 'number',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
    });
    expect(usage).toBe(
      chalk.bold('--version') + ' '.repeat(23) + 'Display version.\n' +
      chalk.bold('--very-very-very-long') + chalk.dim(' ' + chalk.underline('number')) + ' '.repeat(4) + `Lorem ipsum dolor sit amet, consectetur adipisic\n${' '.repeat(32)}ing elit, sed do eiusmod tempor incididunt ut la\n${' '.repeat(32)}bore et dolore magna aliqua. Ut enim ad minim ve\n${' '.repeat(32)}niam, quis nostrud exercitation ullamco laboris \n${' '.repeat(32)}nisi ut aliquip ex ea commodo consequat.`
    );
  });

});
