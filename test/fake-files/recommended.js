Function.RegisterNamespace('Test.myTests');

[Fixture, Skip]
Test.myTests.myHelper = function () {
  [Fixture]
  function myFixtureToTest1() {
  }

  [Fixture, Skip]
  function myFixtureToTest2() {
  }

  [Fixture, Skip('Why not?')]
  function myFixtureToTest3() {
  }

  [Fixture, Trait('MyFeature')]
  function myFixtureToTest4() {
  }

  [Fixture, Trait('MyFeature'), Skip]
  function myFixtureToTest5() {
  }
}
