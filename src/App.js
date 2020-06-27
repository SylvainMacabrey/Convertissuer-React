import React from 'react';
import './App.css';

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
}

function toCelsius (fahrenheit) {
  return (fahrenheit - 32) * (5/9)
}

function toFahrenheit (celsius) {
  return celsius * (9/5) + 32
}

function tryConvert (temperature, convert) {
  const value = parseFloat(temperature)
  if(Number.isNaN(value)) return ''
  return (Math.round(convert(value) * 100) / 100).toString()
}

function BoillingVerdict({celsius}) {
  if (celsius >= 100) {
    return (
      <div className="alert alert-success"> L'eau bout. </div>
    );
  }
  return (
    <div className="alert alert-info"> L'eau ne bout pas. </div>
  );
}

class TemperatureInput extends React.Component {

  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.props.onTemperatureChange(e.target.value)
  }

  render () {
    const { temperature } = this.props
    const name = "scale" + this.props.scale
    const scaleName = scaleNames[this.props.scale]
    return <div>
      <label htmlFor={ name }>Température (en { scaleName })</label>
      <input type="text" id={ name } className="form-control mb-4" value={temperature} onChange={this.handleChange}/>
    </div>
  }

}

class Calculator extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      scale: 'c',
      temperature: 20
    }
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this)
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this)
  }

  handleCelsiusChange (temperature) {
    this.setState({ temperature, scale: 'c' })
  }

  handleFahrenheitChange (temperature) {
    this.setState({ temperature, scale: 'f' })
  }

  render () {
    const { temperature, scale } = this.state
    const celsius = scale === 'c' ? temperature : tryConvert(temperature, toCelsius)
    const fahrenheit = scale === 'f' ? temperature : tryConvert(temperature,toFahrenheit)
    return <div>
      <form className="text-center border border-light p-5">
        <p className="h4 mb-4">Convertisseur</p>
        <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange}/>
        <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange}/>
      </form>
      <BoillingVerdict celsius={celsius}/>
    </div>
  }

}

function App() {
  return (
    <div className="App">
      <Calculator/>
    </div>
  );
}

export default App;
