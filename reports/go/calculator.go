package main

import "errors"

func CalculatorSum(a, b int) int {
	return a + b
}

func CalculatorDivide(a, b int) int {
	return a / b
}

var ErrDivideByZero = errors.New("divide by zero")

func CalculatorSafeDivide(a, b int) (int, error) {
	if b == 0 {
		return 0, ErrDivideByZero
	}
	return a / b, nil
}
