# Ensure that the xunit Trait annotation is used well (trait)

To ensure developers put into the right place the Trait annotation.

Here are some examples:

```js
// Bad
[Trait]
MyApi.testA = function () {
  // ...
};

// Bad
[Fixture, Trait]
function testA () {
  // ...
}

// Bad
[Fixture, Trait()]
function testA () {
  // ...
}

// Bad
[Fact, Trait]
function testA () {
  // ...
}

// Bad
[Fact, Trait()]
function testA () {
  // ...
}

// Good
[Fixture, Trait('myFeature')]
function myFixture () {
    // ...
}

[Fact, Trait('myFeature')]
function testA () {
  // ...
}

```

## Rule Details

## Options

## Known Limitations

## When Not To Use It

## Further Reading
