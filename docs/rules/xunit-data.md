# Ensure that the xunit Data annotation is used well (data)

To ensure developers put into the right place the Data annotation.

Here are some examples:

```js
// Bad
[Data]
MyApi.testA = function () {
  // ...
};

// Bad
[Fact, Data]
MyApi.testA = function () {
  // ...
};

// Bad
[Fact, Data()]
MyApi.testA = function () {
  // ...
};

// Bad
[Fact, Data(myVar1, myVar2)]
MyApi.testA = function () {
  // ...
};

// Good
[Fact, Data(myVar)]
MyApi.testA = function () {
  // ...
};

```

## Rule Details

## Options

* `suffix` will be used (when defined) to put a convention on the Data annotation parameter where we take the test function name and we add a suffix (Default `''`).

### suffix

Examples of **correct** code for the default `{ "suffix": { "Data" } }` option:

```js
[Fact, Data(myTestData)]
MyApi.myTest = function () {
  // ...
};
```

## Known Limitations

## When Not To Use It

## Further Reading
