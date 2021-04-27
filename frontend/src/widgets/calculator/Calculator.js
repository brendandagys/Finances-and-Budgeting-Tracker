import React, { useRef, useEffect, useState } from 'react'
import './style.css'

class Calc {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear() // Instead of initializing properties here...
  }

  clear() {
    this.previousOperand = ''
    this.currentOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }

    // const floatNumber = parseFloat(number)
    // if (isNaN(floatNumber)) return ''
    // return floatNumber.toLocaleString('en')
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    )
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}

const Calculator = () => {
  const clearRef = useRef(null)
  const deleteRef = useRef(null)
  const divideRef = useRef(null)
  const multiplyRef = useRef(null)
  const addRef = useRef(null)
  const subtractRef = useRef(null)
  const decimalRef = useRef(null)
  const equalsRef = useRef(null)

  const previousOperandRef = useRef(null)
  const currentOperandRef = useRef(null)

  const [calculator, setCalculator] = useState(null)

  useEffect(() => {
    setCalculator(
      new Calc(previousOperandRef.current, currentOperandRef.current)
    )
  }, [])

  return (
    <div className='calculatorbody'>
      <div className='calculator-grid'>
        <div className='output'>
          <div
            ref={previousOperandRef}
            data-previous-operand
            className='previous-operand'
          ></div>
          <div
            ref={currentOperandRef}
            data-current-operand
            className='current-operand'
          ></div>
        </div>
        <button
          ref={clearRef}
          data-all-clear
          className='span-two'
          onClick={() => {
            calculator.clear()
            calculator.updateDisplay()
          }}
        >
          AC
        </button>
        <button
          ref={deleteRef}
          style={{ fontSize: '1.4rem' }}
          data-delete
          onClick={(e) => {
            calculator.delete()
            calculator.updateDisplay()
          }}
        >
          DEL
        </button>
        <button
          ref={divideRef}
          data-operation
          onClick={(e) => {
            calculator.chooseOperation(e.target.innerText)
            calculator.updateDisplay()
          }}
        >
          ÷
        </button>
        {[1, 2, 3].map((v) => (
          <button
            key={v}
            data-number
            onClick={(e) => {
              calculator.appendNumber(e.target.innerText)
              calculator.updateDisplay()
            }}
          >
            {v}
          </button>
        ))}
        <button
          ref={multiplyRef}
          data-operation
          onClick={(e) => {
            calculator.chooseOperation(e.target.innerText)
            calculator.updateDisplay()
          }}
        >
          *
        </button>
        {[4, 5, 6].map((v) => (
          <button
            key={v}
            data-number
            onClick={(e) => {
              calculator.appendNumber(e.target.innerText)
              calculator.updateDisplay()
            }}
          >
            {v}
          </button>
        ))}
        <button
          ref={addRef}
          data-operation
          onClick={(e) => {
            calculator.chooseOperation(e.target.innerText)
            calculator.updateDisplay()
          }}
        >
          +
        </button>
        {[7, 8, 9].map((v) => (
          <button
            key={v}
            data-number
            onClick={(e) => {
              calculator.appendNumber(e.target.innerText)
              calculator.updateDisplay()
            }}
          >
            {v}
          </button>
        ))}
        <button
          ref={subtractRef}
          data-operation
          onClick={(e) => {
            calculator.chooseOperation(e.target.innerText)
            calculator.updateDisplay()
          }}
        >
          -
        </button>
        <button
          ref={decimalRef}
          data-numberonClick={(e) => {
            calculator.appendNumber(e.target.innerText)
            calculator.updateDisplay()
          }}
        >
          .
        </button>
        <button
          data-number
          onClick={(e) => {
            calculator.appendNumber(e.target.innerText)
            calculator.updateDisplay()
          }}
        >
          0
        </button>
        <button
          ref={equalsRef}
          data-equals
          className='span-two'
          onClick={() => {
            calculator.compute()
            calculator.updateDisplay()
          }}
        >
          =
        </button>
      </div>
    </div>
  )
}

export default Calculator
