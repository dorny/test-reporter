using System;
using System.Threading;
using DotnetTests.Unit;
using Xunit;

namespace DotnetTests.XUnitTests
{
    public class CalculatorTests
    {
        private readonly Calculator _calculator = new Calculator();

        [Fact]
        public void Passing_Test()
        {
            Assert.Equal(2, _calculator.Sum(1,1));
        }

        [Fact(DisplayName = "Custom Name")]
        public void Passing_Test_With_Name()
        {
            Assert.Equal(2, _calculator.Sum(1, 1));
        }

        [Fact]
        public void Failing_Test()
        {
            Assert.Equal(3, _calculator.Sum(1, 1));
        }

        [Fact]
        public void Exception_In_TargetTest()
        {
            _calculator.Div(1, 0);
        }

        [Fact]
        public void Exception_In_Test()
        {
            throw new Exception("Test");
        }

        [Fact(Timeout = 1)]
        public void Timeout_Test()
        {
            Thread.Sleep(100);
        }

        [Fact(Skip = "Skipped test")]
        public void Skipped_Test()
        {
            throw new Exception("Test");
        }
    }
}
