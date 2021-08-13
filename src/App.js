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

    addCharacter() {
        let textOutput = document.getElementById('output').value;
        if (this.props.dataFromParent === '<') {
            document.getElementById('output').value = textOutput.substring(0, textOutput.length - 1);
        }
        else if(this.props.dataFromParent === '<<'){
            document.getElementById('output').value = '';
        }
        else if(this.props.dataFromParent === '='){
            document.getElementById('output').value = eval(textOutput.replace('÷','/').replace('x','*'));
        }
        else {
            document.getElementById('output').value = textOutput.concat(this.props.dataFromParent);
        }
    }

    render() {
        return (
            <button className="press" onClick={this.addCharacter}>
                {this.props.dataFromParent}
            </button>
        )
    }
}

class Grid extends React.Component {
    renderButton(str) {
        return <Button dataFromParent={str}/>;
    }

    render() {
        return (
            <div>
                <div className="display">
                    <input type="text" value="" id={'output'} readOnly/>
                </div>
                <div className="grid">
                    {this.renderButton('(')}
                    {this.renderButton(')')}
                    {this.renderButton('<')}
                    {this.renderButton('<<')}

                    {this.renderButton('7')}
                    {this.renderButton('8')}
                    {this.renderButton('9')}
                    {this.renderButton('÷')}

                    {this.renderButton('4')}
                    {this.renderButton('5')}
                    {this.renderButton('6')}
                    {this.renderButton('x')}

                    {this.renderButton('1')}
                    {this.renderButton('2')}
                    {this.renderButton('3')}
                    {this.renderButton('-')}

                    {this.renderButton('0')}
                    {this.renderButton('.')}
                    {this.renderButton('=')}
                    {this.renderButton('+')}
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
