package main

import (
	"math/rand"
	"testing"
	"time"
)

func TestPassing(t *testing.T) {
	randomSleep()
	t.Log("pass!")
}

func TestFailing(t *testing.T) {
	randomSleep()
	expected := 3
	actual := CalculatorSum(1, 1)
	if actual != expected {
		t.Fatalf("expected 1+1 = %d, got %d", expected, actual)
	}
}

func TestPanicInsideFunction(t *testing.T) {
	defer catchPanics(t)

	expected := 0
	actual := CalculatorDivide(1, 0)
	if actual != expected {
		t.Fatalf("expected 1/1 = %d, got %d", expected, actual)
	}
}

func TestPanicInsideTest(t *testing.T) {
	defer catchPanics(t)
	panic("bad stuff")
}

// Timeouts cause the entire test process to end - so we can't get good output for these
// func TestTimeout(t *testing.T) {
// 	time.Sleep(time.Second * 5)
// }

func TestSkipped(t *testing.T) {
	randomSleep()
	t.Skipf("skipping test")
}

func TestCases(t *testing.T) {
	for _, tc := range []struct {
		name    string
		a, b, c int
	}{
		{"1 + 2 = 3", 1, 2, 3},
		{"4 + 7 = 11", 4, 7, 11},
		{"2 + 3 = 4", 2, 3, 4},
	} {
		t.Run(tc.name, func(t *testing.T) {
			randomSleep()

			c := CalculatorSum(tc.a, tc.b)
			if c != tc.c {
				t.Fatalf("expected %s, got %d", tc.name, c)
			}
		})
	}
}

func catchPanics(t *testing.T) {
	err := recover()
	if err != nil {
		t.Fatalf("caught panic: %v", err)
	}
}

func randomSleep() {
	time.Sleep(time.Duration(rand.Int63n(int64(time.Second))))
}
