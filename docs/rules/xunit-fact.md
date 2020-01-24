# Ensure that the xunit Fact annotation is used well (fact)

To ensure developers put into the right place the Fact annotation.

Here are some examples:

```js
// Bad
[Fact]
MyApi.testA = function () {
  // ...
};

// Bad
[Fact]
function testA () {
  // ...
}

// Good
[Fixture]
function myFixture () {
  [Fact]
  function testA () {
    // ...
  }
}

```

## Rule Details

## Options

## Known Limitations

## When Not To Use It

## Further Reading
