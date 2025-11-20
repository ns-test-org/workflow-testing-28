'use client';

import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

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

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${
      isDarkMode ? 'bg-black' : 'bg-gray-100'
    }`}>
      <div className="relative">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className={`absolute -top-16 right-0 p-3 rounded-full transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' 
              : 'bg-white hover:bg-gray-50 text-gray-800 shadow-lg'
          }`}
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>

        <div className={`rounded-3xl p-6 shadow-2xl ${
          isDarkMode 
            ? 'bg-gray-900 border border-gray-800' 
            : 'bg-white border border-gray-200'
        }`}>
          {/* Display */}
          <div className={`rounded-2xl p-6 mb-4 text-right ${
            isDarkMode ? 'bg-black' : 'bg-gray-50'
          }`}>
            <div className={`text-5xl font-light tracking-tight min-h-[60px] flex items-center justify-end overflow-hidden ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {formatDisplay(display)}
            </div>
          </div>

          {/* Button Grid */}
          <div className="grid grid-cols-4 gap-3">
            {/* Row 1 */}
            <button
              onClick={clear}
              className={`text-xl font-medium rounded-full h-16 w-16 transition-colors duration-150 active:scale-95 ${
                isDarkMode 
                  ? 'bg-gray-500 hover:bg-gray-400 text-black' 
                  : 'bg-gray-300 hover:bg-gray-200 text-black'
              }`}
            >
              AC
            </button>
            <button
              onClick={toggleSign}
              className={`text-xl font-medium rounded-full h-16 w-16 transition-colors duration-150 active:scale-95 ${
                isDarkMode 
                  ? 'bg-gray-500 hover:bg-gray-400 text-black' 
                  : 'bg-gray-300 hover:bg-gray-200 text-black'
              }`}
            >
              ±
            </button>
            <button
              onClick={percentage}
              className={`text-xl font-medium rounded-full h-16 w-16 transition-colors duration-150 active:scale-95 ${
                isDarkMode 
                  ? 'bg-gray-500 hover:bg-gray-400 text-black' 
                  : 'bg-gray-300 hover:bg-gray-200 text-black'
              }`}
            >
              %
            </button>
            <button
              onClick={() => performOperation('÷')}
              className={`text-2xl font-light rounded-full h-16 w-16 transition-colors duration-150 active:scale-95 ${
                operation === '÷' 
                  ? (isDarkMode ? 'bg-white text-orange-500' : 'bg-gray-100 text-orange-600')
                  : 'bg-orange-500 hover:bg-orange-400 text-white'
              }`}
            >
              ÷
            </button>

            {/* Row 2 */}
            <button
              onClick={() => inputNumber('7')}
              className={`text-2xl font-light rounded-full h-16 w-16 transition-colors duration-150 active:scale-95 ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-100 text-gray-900'
              }`}
            >
              7
            </button>
            <button
              onClick={() => inputNumber('8')}
              className={`text-2xl font-light rounded-full h-16 w-16 transition-colors duration-150 active:scale-95 ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-100 text-gray-900'
              }`}
            >
              8
            </button>
            <button
              onClick={() => inputNumber('9')}
              className={`text-2xl font-light rounded-full h-16 w-16 transition-colors duration-150 active:scale-95 ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-100 text-gray-900'
              }`}
            >
              9
            </button>
            <button
              onClick={() => performOperation('×')}
              className={`text-2xl font-light rounded-full h-16 w-16 transition-colors duration-150 active:scale-95 ${
                operation === '×' 
                  ? (isDarkMode ? 'bg-white text-orange-500' : 'bg-gray-100 text-orange-600')
                  : 'bg-orange-500 hover:bg-orange-400 text-white'
              }`}
            >
              ×
            </button>

            {/* Row 3 */}
            <button
              onClick={() => inputNumber('4')}
              className={`text-2xl font-light rounded-full h-16 w-16 transition-colors duration-150 active:scale-95 ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-100 text-gray-900'
              }`}
            >
              4
            </button>
            <button
              onClick={() => inputNumber('5')}
              className={`text-2xl font-light rounded-full h-16 w-16 transition-colors duration-150 active:scale-95 ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-100 text-gray-900'
              }`}
            >
              5
            </button>
            <button
              onClick={() => inputNumber('6')}
              className={`text-2xl font-light rounded-full h-16 w-16 transition-colors duration-150 active:scale-95 ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-100 text-gray-900'
              }`}
            >
              6
            </button>
            <button
              onClick={() => performOperation('-')}
              className={`text-2xl font-light rounded-full h-16 w-16 transition-colors duration-150 active:scale-95 ${
                operation === '-' 
                  ? (isDarkMode ? 'bg-white text-orange-500' : 'bg-gray-100 text-orange-600')
                  : 'bg-orange-500 hover:bg-orange-400 text-white'
              }`}
            >
              −
            </button>

            {/* Row 4 */}
            <button
              onClick={() => inputNumber('1')}
              className={`text-2xl font-light rounded-full h-16 w-16 transition-colors duration-150 active:scale-95 ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-100 text-gray-900'
              }`}
            >
              1
            </button>
            <button
              onClick={() => inputNumber('2')}
              className={`text-2xl font-light rounded-full h-16 w-16 transition-colors duration-150 active:scale-95 ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-100 text-gray-900'
              }`}
            >
              2
            </button>
            <button
              onClick={() => inputNumber('3')}
              className={`text-2xl font-light rounded-full h-16 w-16 transition-colors duration-150 active:scale-95 ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-100 text-gray-900'
              }`}
            >
              3
            </button>
            <button
              onClick={() => performOperation('+')}
              className={`text-2xl font-light rounded-full h-16 w-16 transition-colors duration-150 active:scale-95 ${
                operation === '+' 
                  ? (isDarkMode ? 'bg-white text-orange-500' : 'bg-gray-100 text-orange-600')
                  : 'bg-orange-500 hover:bg-orange-400 text-white'
              }`}
            >
              +
            </button>

            {/* Row 5 */}
            <button
              onClick={() => inputNumber('0')}
              className={`text-2xl font-light rounded-full h-16 w-32 col-span-2 transition-colors duration-150 active:scale-95 ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-100 text-gray-900'
              }`}
            >
              0
            </button>
            <button
              onClick={inputDecimal}
              className={`text-2xl font-light rounded-full h-16 w-16 transition-colors duration-150 active:scale-95 ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-100 text-gray-900'
              }`}
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
    </div>
  );
}









