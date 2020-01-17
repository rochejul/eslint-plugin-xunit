Function.RegisterNamespace('Test.myTests');

[Fixture, Skip]
Test.myTests.myHelper = function () {
  [Fixture]
  function myFixtureToTest1() {
    [Fact]
    function myFirstRealTest() {
      // Arrange
      var a = "a";

      // Act
      Mocks.Mock()(function () {
        a += "b";
      });

      // Assert
      Assert.Equal(a, 5);
    }
  }

  [Fixture, Skip]
  function myFixtureToTest2() {
    [Fact, Skip]
    function myFirstRealTest() {
      // Arrange
      var a = "a";

      // Act
      Mocks.Mock()(function () {
        a += "b";
      });

      // Assert
      Assert.Equal(a, 5);
    }

    [Fact, Skip]
    function myFirstRealTest2() {
      // Arrange
      var a = "a";

      // Act
      Mocks.Mock()(function () {
        a += "b";
      });

      // Assert
      Assert.Equal(a, 5);
    }
  }

  [Fixture, Skip('Why not?')]
  function myFixtureToTest3() {
    var myData = ['b'];

    [Fact, Data(myData)]
    function myFirstRealTest1(data) {
      // Arrange
      var a = "a";

      // Act
      Mocks.Mock()(function () {
        a += data;
      });

      // Assert
      Assert.Equal(a, 5);
    }
  }

  [Fixture, Trait('MyFeature')]
  function myFixtureToTest4() {
    [Fact, Async]
    function myFirstRealTest(callback) {
      // Arrange
      var a = "a";

      // Act
      Mocks.Mock()(function () {
        a += "b";
      });

      // Assert
      callback(function(){
        Assert.Equal(a, 5);
      });
    }
  }

  [Fixture, Trait('MyFeature'), Skip]
  function myFixtureToTest5() {
  }
}
