# Ensure that the xunit Fixture annotation is used well (fixture)

To ensure developers put into the right place the Fixture annotation.

Here are some examples:

```js
// Bad
[Fixture]
function testA () {
  // ...
}

// Good
[Fixture]
MyApi.testA = function () {
  // ...
};

// Bad
[Fixture]
function myFixture () {
  [Fact]
  function testA () {
    // ...
  }
}

// Good
[Fixture]
MyApi.testA = function () {
  [Fixture]
  function myFixture () {
    [Fact]
    function testA () {
      // ...
    }
  }
};

```

## Rule Details

## Options

## Known Limitations

## When Not To Use It

## Further Reading
