'use client';

import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const toggleSign = () => {
    if (display !== '0') {
      setDisplay(display.charAt(0) === '-' ? display.slice(1) : '-' + display);
    }
  };

  const percentage = () => {
    const value = parseFloat(display) / 100;
    setDisplay(String(value));
  };

  const formatDisplay = (value: string) => {
    if (value.length > 9) {
      return parseFloat(value).toExponential(3);
    }
    return value;
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-3xl p-6 shadow-2xl border border-gray-800">
        {/* Display */}
        <div className="bg-black rounded-2xl p-6 mb-4 text-right">
          <div className="text-white text-5xl font-light tracking-tight min-h-[60px] flex items-center justify-end overflow-hidden">
            {formatDisplay(display)}
          </div>
        </div>

        {/* Button Grid */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <button
            onClick={clear}
            className="bg-gray-500 hover:bg-gray-400 text-black text-xl font-medium rounded-full h-16 w-16 transition-colors duration-150 active:scale-95"
          >
            AC
          </button>
          <button
            onClick={toggleSign}
            className="bg-gray-500 hover:bg-gray-400 text-black text-xl font-medium rounded-full h-16 w-16 transition-colors duration-150 active:scale-95"
          >
            ±
          </button>
          <button
            onClick={percentage}
            className="bg-gray-500 hover:bg-gray-400 text-black text-xl font-medium rounded-full h-16 w-16 transition-colors duration-150 active:scale-95"
          >
            %
          </button>
          <button
            onClick={() => performOperation('÷')}
            className={`${
              operation === '÷' ? 'bg-white text-orange-500' : 'bg-orange-500 hover:bg-orange-400 text-white'
            } text-2xl font-light rounded-full h-16 w-16 transition-colors duration-150 active:scale-95`}
          >
            ÷
          </button>

          {/* Row 2 */}
          <button
            onClick={() => inputNumber('7')}
            className="bg-gray-700 hover:bg-gray-600 text-white text-2xl font-light rounded-full h-16 w-16 transition-colors duration-150 active:scale-95"
          >
            7
          </button>
          <button
            onClick={() => inputNumber('8')}
            className="bg-gray-700 hover:bg-gray-600 text-white text-2xl font-light rounded-full h-16 w-16 transition-colors duration-150 active:scale-95"
          >
            8
          </button>
          <button
            onClick={() => inputNumber('9')}
            className="bg-gray-700 hover:bg-gray-600 text-white text-2xl font-light rounded-full h-16 w-16 transition-colors duration-150 active:scale-95"
          >
            9
          </button>
          <button
            onClick={() => performOperation('×')}
            className={`${
              operation === '×' ? 'bg-white text-orange-500' : 'bg-orange-500 hover:bg-orange-400 text-white'
            } text-2xl font-light rounded-full h-16 w-16 transition-colors duration-150 active:scale-95`}
          >
            ×
          </button>

          {/* Row 3 */}
          <button
            onClick={() => inputNumber('4')}
            className="bg-gray-700 hover:bg-gray-600 text-white text-2xl font-light rounded-full h-16 w-16 transition-colors duration-150 active:scale-95"
          >
            4
          </button>
          <button
            onClick={() => inputNumber('5')}
            className="bg-gray-700 hover:bg-gray-600 text-white text-2xl font-light rounded-full h-16 w-16 transition-colors duration-150 active:scale-95"
          >
            5
          </button>
          <button
            onClick={() => inputNumber('6')}
            className="bg-gray-700 hover:bg-gray-600 text-white text-2xl font-light rounded-full h-16 w-16 transition-colors duration-150 active:scale-95"
          >
            6
          </button>
          <button
            onClick={() => performOperation('-')}
            className={`${
              operation === '-' ? 'bg-white text-orange-500' : 'bg-orange-500 hover:bg-orange-400 text-white'
            } text-2xl font-light rounded-full h-16 w-16 transition-colors duration-150 active:scale-95`}
          >
            −
          </button>

          {/* Row 4 */}
          <button
            onClick={() => inputNumber('1')}
            className="bg-gray-700 hover:bg-gray-600 text-white text-2xl font-light rounded-full h-16 w-16 transition-colors duration-150 active:scale-95"
          >
            1
          </button>
          <button
            onClick={() => inputNumber('2')}
            className="bg-gray-700 hover:bg-gray-600 text-white text-2xl font-light rounded-full h-16 w-16 transition-colors duration-150 active:scale-95"
          >
            2
          </button>
          <button
            onClick={() => inputNumber('3')}
            className="bg-gray-700 hover:bg-gray-600 text-white text-2xl font-light rounded-full h-16 w-16 transition-colors duration-150 active:scale-95"
          >
            3
          </button>
          <button
            onClick={() => performOperation('+')}
            className={`${
              operation === '+' ? 'bg-white text-orange-500' : 'bg-orange-500 hover:bg-orange-400 text-white'
            } text-2xl font-light rounded-full h-16 w-16 transition-colors duration-150 active:scale-95`}
          >
            +
          </button>

          {/* Row 5 */}
          <button
            onClick={() => inputNumber('0')}
            className="bg-gray-700 hover:bg-gray-600 text-white text-2xl font-light rounded-full h-16 w-32 col-span-2 transition-colors duration-150 active:scale-95"
          >
            0
          </button>
          <button
            onClick={inputDecimal}
            className="bg-gray-700 hover:bg-gray-600 text-white text-2xl font-light rounded-full h-16 w-16 transition-colors duration-150 active:scale-95"
          >
            .
          </button>
          <button
            onClick={handleEquals}
            className="bg-orange-500 hover:bg-orange-400 text-white text-2xl font-light rounded-full h-16 w-16 transition-colors duration-150 active:scale-95"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}

