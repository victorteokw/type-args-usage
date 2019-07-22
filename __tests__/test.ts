import { optionsToUsage } from '../src/index';

describe("optionsToUsage: ", () => {

  describe("handle argument format: ", () => {

    it("string", () => {
      const usage = optionsToUsage({
        file: {
          type: 'string',
          desc: 'the file input.'
        }
      });
      console.log(usage);
    });

    it("string[]", () => {
      const usage = optionsToUsage({
        files: {
          type: 'string[]',
          desc: 'the files input.'
        }
      });
      console.log(usage);
    });

    it("number", () => {
      const usage = optionsToUsage({
        age: {
          type: 'number',
          desc: 'the age of the user.'
        }
      });
      console.log(usage);
    });

    it("number[]", () => {
      const usage = optionsToUsage({
        ages: {
          type: 'number[]',
          desc: 'the ages of the users.'
        }
      });
      console.log(usage);
    });

    it("boolean", () => {
      const usage = optionsToUsage({
        power: {
          type: 'boolean',
          desc: 'whether use power output.'
        }
      });
      console.log(usage);
    });

  });

  describe("display alias if it's present.", () => {

  });

  describe("put spaces before the line if leading spaces are present.", () => {

  });

});
