import {parseStackTraceElement} from '../src/parsers/java-junit/java-stack-trace-element-parser'

describe('parseStackTraceLine tests', () => {
  it('empty line is not parsed', async () => {
    const line = ''
    expect(parseStackTraceElement(line)).toBe(undefined)
  })

  describe('java class', () => {
    it('simple', async () => {
      const line =
        'at org.apache.pulsar.AddMissingPatchVersionTest.testVersionStrings(AddMissingPatchVersionTest.java:29)'
      expect(parseStackTraceElement(line)).toEqual({
        tracePath: 'org.apache.pulsar.AddMissingPatchVersionTest.testVersionStrings',
        fileName: 'AddMissingPatchVersionTest.java',
        lineStr: '29'
      })
    })

    it('inner class', async () => {
      const line = 'at com.foo.Main$Inner.run(Main.java:29)'
      expect(parseStackTraceElement(line)).toEqual({
        tracePath: 'com.foo.Main$Inner.run',
        fileName: 'Main.java',
        lineStr: '29'
      })
    })

    it('starts with whitespaces', async () => {
      const line =
        ' \tat org.apache.pulsar.AddMissingPatchVersionTest.testVersionStrings(AddMissingPatchVersionTest.java:29)'
      expect(parseStackTraceElement(line)).toEqual({
        tracePath: 'org.apache.pulsar.AddMissingPatchVersionTest.testVersionStrings',
        fileName: 'AddMissingPatchVersionTest.java',
        lineStr: '29'
      })
    })

    describe('since Java 9', () => {
      it('with classloader and module', async () => {
        // Based on Java 9 StackTraceElement.toString() Doc: https://docs.oracle.com/javase/9/docs/api/java/lang/StackTraceElement.html#toString--
        const line = 'at com.foo.loader/foo@9.0/com.foo.Main.run(Main.java:101)'
        expect(parseStackTraceElement(line)).toEqual({
          classLoader: 'com.foo.loader',
          moduleNameAndVersion: 'foo@9.0',
          tracePath: 'com.foo.Main.run',
          fileName: 'Main.java',
          lineStr: '101'
        })
      })

      it('with classloader', async () => {
        const line = 'at com.foo.loader//com.foo.Main.run(Main.java:101)'
        expect(parseStackTraceElement(line)).toEqual({
          classLoader: 'com.foo.loader',
          moduleNameAndVersion: undefined,
          tracePath: 'com.foo.Main.run',
          fileName: 'Main.java',
          lineStr: '101'
        })
      })
    })
  })

  describe('Kotlin class', () => {
    it('method name containing whitespaces', async () => {
      const line = 'at com.foo.Main.method with whitespaces(Main.kt:18)'
      expect(parseStackTraceElement(line)).toEqual({
        tracePath: 'com.foo.Main.method with whitespaces',
        fileName: 'Main.kt',
        lineStr: '18'
      })
    })
  })
})
