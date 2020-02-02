# Ensure that the xunit Async annotation is used well (async)

To ensure developers put into the right place the Async annotation.

Here are some examples:

```js
// Bad
[Async]
function myTest () {
  // ...
};

// Bad
[Fact, Async]
function myTest () {
  // ...
};

// Good
[Fact, Async]
function myTest (callback) {
  // ...
};

```

## Rule Details

## Options

* `callbackParameterName` will be used (when defined) to put a convention on the test function parameter name (Default `''`).

### callbackParameterName

Examples of **correct** code for the default `{ "callbackParameterName": { "myCallback" } }` option:

```js
[Fact, Async]
function myTest(myCallback) {
  // ...
};
```

## Known Limitations

## When Not To Use It

## Further Reading
