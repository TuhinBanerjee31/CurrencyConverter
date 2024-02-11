import React, {useState} from 'react';
import {
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {currencyByRupee} from './constants';
import CurrencyButton from './components/CurrencyButton';
import Snackbar from 'react-native-snackbar';

function App(): React.JSX.Element {
  //To store input feild value
  const [inputValue, setInputValue] = useState('');
  //To store resultent value
  const [resultValue, setResetValue] = useState('');
  //To store which currency is been selected my user
  const [targetCurrency, setTargetCurrency] = useState('');

  //On pressing any currency button this function is called
  const buttonPressed = (targetValue: Currency) => {
    //If there is no value in input feild, we display this snackbar message
    if (!inputValue) {
      return Snackbar.show({
        text: 'Enter a value to convert',
        backgroundColor: '#000000',
        textColor: '#FFFFFF',
      });
    }

    //If there is value present in input feild, we convert it to float and store it
    const inputAmount = parseFloat(inputValue);
    //If converted value is a number, then only we perform the following operation to store result
    if (!isNaN(inputAmount)) {
      const convertedValue = inputAmount * targetValue.value;
      const result = `${targetValue.symbol} ${convertedValue.toFixed(2)}`;
      setResetValue(result);
      setTargetCurrency(targetValue.name);
    }
    //If not a number then we display a snackbar message telling user to input a valid number
    else {
      return Snackbar.show({
        text: 'Enter a valid value',
        backgroundColor: '#000000',
        textColor: '#FFFFFF',
      });
    }
  };

  return (
    <>
      <StatusBar backgroundColor="#3B3B98" />
      <View style={styles.mainContainer}>
        {/* HEADING TEXT */}
        <Text style={styles.headerText}>Indian Currency Converter</Text>
        {/* TOP CONTAINER */}
        <View style={styles.topContainer}>
          <Text style={styles.rupeeSymbol}>₹</Text>
          <TextInput
            style={styles.inputStyle}
            value={inputValue}
            maxLength={14}
            keyboardType="number-pad"
            clearButtonMode="always" //only for IOS
            placeholder="Enter the amount"
            onChangeText={setInputValue}
          />
        </View>

        {/* RESULT AREA WHICH IS RENDERED CONDITIONALLY */}
        {resultValue && <Text style={styles.resultText}>{resultValue}</Text>}

        {/* BOTTOM CONTAINER */}
        <View style={styles.bottomContainer}>
          <FlatList
            numColumns={2}
            data={currencyByRupee}
            keyExtractor={item => item.name}
            renderItem={({item}) => (
              <Pressable
                style={[
                  styles.buttonStyle,
                  targetCurrency === item.name && styles.selectedBtn,
                ]}
                onPress={() => buttonPressed(item)}>
                <CurrencyButton {...item} />
              </Pressable>
            )}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    backgroundColor: '#3B3B98',
    paddingBottom: 50,
  },
  headerText: {
    fontSize: 25,
    fontWeight: '500',
    color: '#FFFFFF',
    paddingTop: 10,
    paddingBottom: 50,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderColor: '#FFFFFF',
  },
  rupeeSymbol: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  inputStyle: {
    fontSize: 22,
    color: '#FFFFFF',
  },
  resultText: {
    fontSize: 25,
    paddingVertical: 15,
    paddingHorizontal: 90,
    marginVertical: 40,
    textAlign: 'center',
    color: '#000000',
    backgroundColor: '#FFFFFF',
    borderRadius: 45,
  },
  bottomContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 7,
    marginVertical: '5%',
  },
  buttonStyle: {
    width: '50%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    zIndex: 10,
  },
});

export default App;
