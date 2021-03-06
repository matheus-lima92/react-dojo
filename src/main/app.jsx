/* eslint linebreak-style: ["error", "windows"] */
/* eslint-disable import/no-extraneous-dependencies */

import React, { Component } from 'react';
import Display from '../display/display';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../css/custom.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { displayContent: '0' };
    this.renderCalculatorLineElements = this.renderCalculatorLineElements.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
  }

  componentWillMount() {
    console.log('lifeCycle componente App: componentWillMount!');
  }

  componentDidMount() {
    console.log('lifeCycle componente App: componentDidMount!');
  }

  componentWillReceiveProps() {
    console.log('lifeCycle componente App: componentWillReceiveProps!');
  }

  componentWillUpdate() {
    console.log('lifeCycle componente App: componentWillUpdate!');
  }

  componentWillUnmount() {
    console.log('lifeCycle componente App: componentWillUnmount');
  }

  buttonClick(button) {
    console.log(`Click on ${button}`);
    if (this.state.displayContent === 'error' && button !== 'C') {
      return;
    }
    if (button !== 'C' && button !== '=') {
      const displayContent = this.state.displayContent === '0' ? button : this.state.displayContent + button;
      this.setState({ ...this.state, displayContent });
    } else if (button === 'C') {
      this.setState({ ...this.state, displayContent: '0'});
    } else if (button === '=') {
      let ans = 'error';
      try {
        ans = eval(this.state.displayContent).toFixed(4).toString();
      } catch(error) {
        this.setState({ ...this.state, displayContent: ans });
        return;
      }
      this.setState({ ...this.state, displayContent: ans });
      return;
    }
  }

  renderCalculatorLineElements(elementsArray) {
    const elementsToRender = elementsArray.map((element, index) => {
      return (
        <div className="calculator-btn" key={`first-line-element-${index}`} onClick={ () => this.buttonClick(element)}>
          <span>{element}</span>
        </div>
      )
    });
    return elementsToRender;
  }

  render() {
    const firstLineElements = ['1', '2', '3', '+'];
    const secondLineElements = ['4', '5', '6', '-'];
    const thirdLineElements = ['7', '8', '9', '*'];
    const fourthLineElements = ['.', '0', 'C', '='];
    const { displayContent } = this.state;
    return (
      <div className="app-container">
        <h1>Dojo React - Calculadora</h1>
        <div className="calculator">
          <Display content= { displayContent } />
          <div id="calculator-line-0" className="calculator-line">
            { this.renderCalculatorLineElements(firstLineElements) }
          </div>
          <div id="calculator-line-1" className="calculator-line">
            { this.renderCalculatorLineElements(secondLineElements) }
          </div>
          <div id="calculator-line-2" className="calculator-line">
            { this.renderCalculatorLineElements(thirdLineElements) }
          </div>
          <div id="calculator-line-3" className="calculator-line">
            { this.renderCalculatorLineElements(fourthLineElements) }
          </div>
        </div>
      </div>
    );
  }
};

export default Home;
