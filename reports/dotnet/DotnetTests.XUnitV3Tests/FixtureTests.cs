using System;
using Xunit;

namespace DotnetTests.XUnitV3Tests;

public sealed class Fixture : IDisposable
{
    public void Dispose()
    {
        throw new InvalidOperationException("Failure during fixture disposal");
    }
}

public class FixtureTests(Fixture fixture) : IClassFixture<Fixture>
{
    [Fact]
    public void Passing_Test()
    {
        Assert.NotNull(fixture);
    }

    [Fact]
    public void Failing_Test()
    {
        Assert.Null(fixture);
    }
}
