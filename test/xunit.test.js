describe('eslint-plugin-xunit - ', () => {
  const { CLIEngine } = require('eslint');
  const path = require('path');

  const baseTestFiles = path.resolve(path.join(__dirname, './fake-files/'));
  const mockEslintXunit = require('../index');

  let cli;

  beforeEach(() => {
      jest.mock('eslint-plugin-xunit', () => mockEslintXunit, { virtual: true });
      cli = new CLIEngine({
          baseConfig: mockEslintXunit.configs.recommended,
          useEslintrc: false,
          ignore: false
      });
  });

  it('with code', () => {
    const eslintReport = cli.executeOnFiles([
        `${baseTestFiles}/recommended.js`
    ]);

    const [errorReport] = eslintReport.results;
    expect(
      errorReport.messages.map(({ ruleId, message }) => `${ruleId}::${message}`)
      ).toEqual([ ]);
});
});
