# Ensure that the xunit Data annotation is used well (data)

To ensure developers put into the right place the Data annotation.

Here are some examples:

```js
// Bad
[Data]
function myTest () {
  // ...
};

// Bad
[Fact, Data]
function myTest () {
  // ...
};

// Bad
[Fact, Data()]
function myTest () {
  // ...
};

// Bad
[Fact, Data(myVar1, myVar2)]
function myTest () {
  // ...
};

// Bad
[Fact, Data(myVar1)]
function myTest () {
  // ...
};

// Good
[Fact, Data(myVar)]
function myTest (data) {
  // ...
};

```

## Rule Details

## Options

* `suffix` will be used (when defined) to put a convention on the Data annotation parameter where we take the test function name and we add a suffix (Default `''`).
* `dataParameterName` will be used (when defined) to put a convention on the test function parameter name (Default `''`).

### suffix

Examples of **correct** code for the default `{ "suffix": { "Data" } }` option:

```js
[Fact, Data(myTestData)]
function myTest(data) {
  // ...
};
```

### dataParameterName

Examples of **correct** code for the default `{ "dataParameterName": { "myData" } }` option:

```js
[Fact, Data(myTestData)]
function myTest(myData) {
  // ...
};
```

## Known Limitations

## When Not To Use It

## Further Reading
