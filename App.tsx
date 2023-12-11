import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

import printer from './printer'

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [history, setHistory] = useState([]);
  const [isNewCalc, setIsNewCalc] = useState(false);
  const scrollViewRef = useRef();

  const handleNumberPress = number => {
    if (isNewCalc) {
      setDisplayValue(String(number));
      setIsNewCalc(false);
      return;
    }

    setDisplayValue(prevValue =>
      prevValue === '0' ? String(number) : prevValue + number,
    );
  };

  const handleOperatorPress = selectedOperator => {
    if (firstOperand === null) {
      setFirstOperand(parseFloat(displayValue));
      setOperator(selectedOperator);
      setDisplayValue('0');
    } else {
      const result = calculateResult();
      setFirstOperand(result);
      setOperator(selectedOperator);
      setDisplayValue('0');
    }
  };

  const handleEqualsPress = () => {
    if (firstOperand !== null && operator !== null) {
      const result = calculateResult();
      setDisplayValue(String(result));
      setFirstOperand(result);
      setOperator(null);
      setIsNewCalc(true);
      saveToHistory(
        `${firstOperand} ${operator} ${parseFloat(displayValue)} = ${result}`,
      );
    }
  };

  const handleClearPress = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
  };

  const handleDecimalPress = () => {
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const calculateResult = () => {
    const secondOperand = parseFloat(displayValue);
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  const handlePrintResult = async () => {
    console.log('history', history);

    await printer(history);
  };

  const saveToHistory = calculation => {
    setHistory([...history, calculation]);

    scrollViewRef.current.scrollToEnd({animated: true});
  };

  return (
    <View style={styles.container}>
      <ScrollView ref={scrollViewRef} style={styles.historyContainer}>
        {history.map((calculation, index) => (
          <Text key={index} style={styles.historyText}>
            {calculation}
          </Text>
        ))}
      </ScrollView>
      <Text style={styles.lastValue}>
        {firstOperand !== null ? firstOperand : ''}
      </Text>
      <Text style={styles.display}>{displayValue}</Text>
      <View style={styles.row}>
        {[7, 8, 9].map(number => (
          <TouchableOpacity
            key={number}
            style={styles.button}
            onPress={() => handleNumberPress(String(number))}>
            <Text style={styles.buttonText}>{number}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.operationButton}
          onPress={() => handleOperatorPress('+')}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        {[4, 5, 6].map(number => (
          <TouchableOpacity
            key={number}
            style={styles.button}
            onPress={() => handleNumberPress(String(number))}>
            <Text style={styles.buttonText}>{number}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.operationButton}
          onPress={() => handleOperatorPress('-')}>
          <Text style={styles.buttonText}> -</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        {[1, 2, 3].map(number => (
          <TouchableOpacity
            key={number}
            style={styles.button}
            onPress={() => handleNumberPress(String(number))}>
            <Text style={styles.buttonText}>{number}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.operationButton}
          onPress={() => handleOperatorPress('*')}>
          <Text style={styles.buttonText}>*</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNumberPress('0')}>
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleDecimalPress()}>
          <Text style={styles.buttonText}>. </Text>
        </TouchableOpacity>
        <View style={styles.buttonPlaceHolder} />
        <TouchableOpacity
          style={styles.operationButton}
          onPress={() => handleOperatorPress('/')}>
          <Text style={styles.buttonText}>/</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.equalsButton}
          onPress={() => handleEqualsPress()}>
          <Text style={styles.buttonText}>=</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => handleClearPress()}>
          <Text style={styles.buttonText}>c</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.historyButton}
          onPress={() => handlePrintResult()}>
          <Text style={styles.buttonText}> Imprimir </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#f0f0f0',
  },
  historyContainer: {
    maxHeight: 100,
    marginBottom: 10,
  },
  historyText: {
    fontSize: 16,
    color: '#777',
  },
  lastValue: {
    fontSize: 24,
    textAlign: 'right',
    margin: 10,
    color: '#777',
  },
  display: {
    fontSize: 40,
    textAlign: 'right',
    margin: 10,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 18,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 20,
    borderRadius: 8,
  },
  buttonPlaceHolder: {
    backgroundColor: 'transparent',
    width: 53,
    padding: 20,
    borderRadius: 8,
  },
  operationButton: {
    backgroundColor: '#2980b9',
    padding: 20,
    borderRadius: 8,
  },
  equalsButton: {
    backgroundColor: '#27ae60',
    padding: 20,
    borderRadius: 8,
  },
  clearButton: {
    backgroundColor: '#e74c3c',
    padding: 20,
    borderRadius: 8,
  },
  historyButton: {
    backgroundColor: '#34495e',
    padding: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
  },
});

export default Calculator;
