# Ensure that the xunit Skip annotation is used well (skip)

To ensure developers put into the right place the Skip annotation.

Here are some examples:

```js
// Bad
[Skip]
MyApi.testA = function () {
  // ...
};

// Bad
[Fixture, Skip('a', 'b')]
function testA () {
  // ...
}

// Bad
[Fact, Skip]
function testA () {
  // ...
}

// Bad
[Fact, Skip('a', 'b')]
function testA () {
  // ...
}

// Good
[Fixture, Skip('why not?')]
function myFixture () {
    // ...
}

[Fact, Skip('why not?')]
function myFixture () {
    // ...
}

[Fixture, Skip]
function myFixture () {
    // ...
}

[Fact, Skip]
function myFixture () {
    // ...
}

```

## Rule Details

## Options

## Known Limitations

## When Not To Use It

## Further Reading
