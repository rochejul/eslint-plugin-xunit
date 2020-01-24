# Ensure that only known xunit methods of the API are called (api)

To ensure developers call existing xunit api methods, this rule will check the call of any xunit object used into the tests.

Here are some examples:

```js
// Bad
Assert.equal('a', 'b');

// Good
Assert.Equal('a', 'b');

```

## Rule Details

## Options

* `extendedApi` allows to add more objects and associated methods in the case the developer extends the xunit api (Default `{}`).

### extendedApi

Examples of **incorrect** code for the default `{ "extendedApi": { }` option:

```js
Assert.MyAssertMethod('a', 'b');
```

Examples of **correct** code for the default `{ "extendedApi": { Assert: ['MyAssertMethod'] } }` option:

```js
Assert.MyAssertMethod('a', 'b');
```

## Known Limitations

## When Not To Use It

## Further Reading
