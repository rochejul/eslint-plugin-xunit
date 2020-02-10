describe('eslint-plugin-xunit - ', () => {
  const path = require('path');

  const baseTestFiles = path.resolve(path.join(__dirname, './fake-files/'));
  const eslintXunit = require('../index');
  const mockEslintXunitPath = path.resolve(__dirname, '../index.js');

  let cli;

  beforeEach(() => {
    jest.mock('eslint/lib/shared/relative-module-resolver', () => {
      return {
        resolve: () => {
          return mockEslintXunitPath;
        }
      }
    });

    const { CLIEngine } = require('eslint');

    cli = new CLIEngine({
        baseConfig: eslintXunit.configs.recommended,
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
