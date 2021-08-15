import './App.css';
import React from "react";

function App() {
    return (
        <div className="App">
            <Calculator/>
        </div>
    );
}

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.addCharacter = this.addCharacter.bind(this);
    }

    bracketCheck(str) {
        let count = 0;
        for (let i = 0; i < str.length; i++) {
            if (str.charAt(i) === '(') {
                count++;
            } else if (str.charAt(i) === ')') {
                count--;
            }
            if (count < 0) {
                return false;
            }
        }
        return count === 0;
    }

    addCharacter() {
        let textOutput = document.getElementById('output').value;
        if (textOutput === 'undefined' || textOutput === 'Infinity') {
            document.getElementById('output').value = '';
            textOutput = '';
        }

        if (this.props.dataFromParent === '<') {
            document.getElementById('output').value = textOutput.substring(0, textOutput.length - 1);
        } else if (this.props.dataFromParent === '<<') {
            document.getElementById('output').value = '';
        } else if (this.props.dataFromParent === '=') {
            let fixedInput = textOutput.replace('÷', '/').replace('x', '*');
            let regExp = '(\\d*\\.?\\d*[+\\-*\\/])*(\\d*\\.?\\d*)'
            if (fixedInput.match(regExp) && this.bracketCheck(fixedInput)) {
                document.getElementById('output').value = eval(fixedInput);
            } else {
                document.getElementById('output').value = 'undefined';
            }
        } else {
            document.getElementById('output').value = textOutput.concat(this.props.dataFromParent);
        }
    }

    render() {
        return (
            <button className={this.props.buttonType} onClick={this.addCharacter}>
                {this.props.dataFromParent}
            </button>
        )
    }
}

class Grid extends React.Component {
    renderButton(str, type) {
        return <Button dataFromParent={str} buttonType={type}/>;
    }

    render() {
        return (
            <div>
                <div className="display">
                    <input type="text" value="" id={'output'} readOnly/>
                </div>
                <div className="grid">
                    {this.renderButton('(', 'ope')}
                    {this.renderButton(')', 'ope')}
                    {this.renderButton('<', 'ope')}
                    {this.renderButton('<<', 'ope')}

                    {this.renderButton('7', 'num')}
                    {this.renderButton('8', 'num')}
                    {this.renderButton('9', 'num')}
                    {this.renderButton('÷', 'ope')}

                    {this.renderButton('4', 'num')}
                    {this.renderButton('5', 'num')}
                    {this.renderButton('6', 'num')}
                    {this.renderButton('x', 'ope')}

                    {this.renderButton('1', 'num')}
                    {this.renderButton('2', 'num')}
                    {this.renderButton('3', 'num')}
                    {this.renderButton('-', 'ope')}

                    {this.renderButton('0', 'num')}
                    {this.renderButton('.', 'num')}
                    {this.renderButton('=', 'ope')}
                    {this.renderButton('+', 'ope')}
                </div>
            </div>
        );
    }
}

class Calculator extends React.Component {
    render() {
        return (
            <div className="calculator">
                <Grid/>
            </div>
        );
    }
}

export default App;
