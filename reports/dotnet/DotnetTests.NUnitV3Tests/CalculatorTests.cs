using System;
using System.Threading;
using DotnetTests.Unit;
using NUnit.Framework;

namespace DotnetTests.XUnitTests
{
    public class CalculatorTests
    {
        private readonly Calculator _calculator = new Calculator();                

        [Test]
        public void Passing_Test()
        {
            Assert.That(_calculator.Sum(1, 1), Is.EqualTo(2));
        }

        [Test(Description = "Some description")]
        public void Passing_Test_With_Description()
        {
            Assert.That(2, Is.EqualTo(2));
        }

        [Test]
        public void Failing_Test()
        {
            Assert.That(_calculator.Sum(1, 1), Is.EqualTo(3));
        }

        [Test]
        public void Exception_In_TargetTest()
        {
            _calculator.Div(1, 0);
        }

        [Test]
        public void Exception_In_Test()
        {
            throw new Exception("Test");
        }

        [Test]
        [Timeout(1)]
        public void Timeout_Test()
        {
            Thread.Sleep(100);
        }

        [Test]
        [Ignore("Skipped")]
        public void Skipped_Test()
        {
            throw new Exception("Test");
        }

        [Theory]        
        [TestCase(2)]
        [TestCase(3)]
        public void Is_Even_Number(int i)
        {
            Assert.True(i % 2 == 0);
        }
    }
}
