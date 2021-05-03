import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

console.clear();
/* to do:
 handle subtraction after equal sign
 add string limit on top and bottom display
*/

const buttons = [
  { sign: "AC", id: "clear" },
  { sign: "7", id: "seven" },
  { sign: "8", id: "eight" },
  { sign: "9", id: "nine" },
  { sign: "÷", id: "divide" },
  { sign: "4", id: "four" },
  { sign: "5", id: "five" },
  { sign: "6", id: "six" },
  { sign: "x", id: "multiply" },
  { sign: "1", id: "one" },
  { sign: "2", id: "two" },
  { sign: "3", id: "three" },
  { sign: "-", id: "subtract" },
  { sign: "0", id: "zero" },
  { sign: ".", id: "decimal" },
  { sign: "=", id: "equals" },
  { sign: "+", id: "add" }
];

const regNumSym = /[1-9-+]/;
const regMD = /[÷x]/;
const regNum = /[1-9]/;
const regZero = /[+0-]/;
const regAllNum = /[0-9]/;
const regAllSym = /[-÷x+]/;
const regNoSub = /[÷x+]/;
//console.log(regNum.test("3"))

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      smallDip: 0,
      bigDip: 0,
      answer: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const sDip = document.getElementById("small-display");
    //clears states and displays 0
    if (e.target.innerHTML === "AC") {
      sDip.style.color = "rgba(45, 52, 54,1.0)";
      this.setState({
        smallDip: 0,
        bigDip: 0,
        answer: []
      });
      //if 1-9, + or - is pressed first, shows in both displays
    } else if (
      regNumSym.test(e.target.innerHTML) === true &&
      this.state.answer.length === 0
    ) {
      sDip.style.color = "whitesmoke";
      this.setState({
        smallDip: e.target.innerHTML,
        bigDip: e.target.innerHTML,
        answer: [0]
      });
      //handle 0 in bigDisplay
    } else if (e.target.innerHTML === "0" && this.state.answer.length === 0) {
      sDip.style.color = "whitesmoke";
      this.setState({
        smallDip: e.target.innerHTML,
        bigDip: e.target.innerHTML,
        answer: [0]
      });
      //if division or multiplication, add 0 and a space as well as a space after
    } else if (
      regMD.test(e.target.innerHTML) === true &&
      (this.state.answer.length === 0 || this.state.smallDip === "0")
    ) {
      sDip.style.color = "whitesmoke";
      this.setState({
        smallDip: 0 + " " + e.target.innerHTML + " ",
        bigDip: e.target.innerHTML,
        answer: [0, e.target.innerHTML]
      });
      //if "." then add 0 before it
    } else if (e.target.innerHTML === "." && this.state.answer.length === 0) {
      sDip.style.color = "whitesmoke";
      this.setState({
        smallDip: 0 + e.target.innerHTML,
        bigDip: 0 + e.target.innerHTML,
        answer: [0]
      });
      //when 1-9 is pressed not at beginning, display and store
    } else if (
      regNum.test(e.target.innerHTML) === true &&
      this.state.bigDip.length !== 0
    ) {
      sDip.style.color = "whitesmoke";
      if (this.state.smallDip === "0") {
        this.setState({
          smallDip: e.target.innerHTML,
          bigDip: e.target.innerHTML
        });
      } else if(this.state.smallDip.includes("=")===true){
        this.setState({
          smallDip: e.target.innerHTML,
          bigDip: e.target.innerHTML,
          answer: [0]
        })
      }else if (
        this.state.smallDip === "0 x " ||
        this.state.smallDip === "0 ÷ "
      ) {
        this.setState({
          smallDip: this.state.smallDip + e.target.innerHTML,
          bigDip: e.target.innerHTML
        });
      } else if (
        this.state.bigDip === "x" ||
        this.state.bigDip === "+" ||
        this.state.bigDip === "÷"
      ) {
        this.setState({
          smallDip: this.state.smallDip + e.target.innerHTML,
          bigDip: e.target.innerHTML
        });
      } else if (
        this.state.smallDip.endsWith("÷ -") === true ||
        this.state.smallDip.endsWith("+ -") === true ||
        this.state.smallDip.endsWith("x -") === true ||
        this.state.smallDip.endsWith("- -") === true
      ) {
        this.setState({
          smallDip: this.state.smallDip + e.target.innerHTML,
          bigDip: this.state.bigDip + e.target.innerHTML
        });
      } else if (this.state.bigDip === "-") {
        this.setState({
          smallDip: this.state.smallDip + e.target.innerHTML,
          bigDip: e.target.innerHTML
        });
      } else {
        this.setState({
          smallDip: this.state.smallDip + e.target.innerHTML,
          bigDip: this.state.bigDip + e.target.innerHTML
        });
      }
      //pressing 0 after other numbers
    } else if (e.target.innerHTML === "0" && this.state.answer.length !== 0) {
      sDip.style.color = "whitesmoke";
      if (this.state.smallDip === "0 x " || this.state.smallDip === "0 ÷ ") {
        this.setState({
          smallDip: this.state.smallDip + e.target.innerHTML,
          bigDip: e.target.innerHTML
        });
      } else if (this.state.bigDip === "0") {
      } else if (
        this.state.bigDip === "x" ||
        this.state.bigDip === "+" ||
        this.state.bigDip === "÷"
      ) {
        this.setState({
          smallDip: this.state.smallDip + e.target.innerHTML,
          bigDip: e.target.innerHTML
        });
      } else if (this.state.smallDip.includes("=")===true){
        this.setState({
          smallDip: e.target.innerHTML,
          bigDip: e.target.innerHTML,
          answer:[0]
        })
      }else {
        this.setState({
          smallDip: this.state.smallDip + e.target.innerHTML,
          bigDip: this.state.bigDip + e.target.innerHTML
        });
      }
      //handles "." not at the beginning
    } else if (
      e.target.innerHTML === "." &&
      this.state.answer.length !== 0 &&
      this.state.bigDip.includes(".") === false &&
      regAllSym.test(this.state.bigDip[this.state.bigDip.length - 1]) === false
    ) {
      sDip.style.color = "whitesmoke";
      this.setState({
        smallDip: this.state.smallDip + e.target.innerHTML,
        bigDip: this.state.bigDip + e.target.innerHTML
      });

      //handling symbols except "-"
    } else if (
      (e.target.innerHTML === "+" ||
        e.target.innerHTML === "x" ||
        e.target.innerHTML === "÷") &&
      this.state.answer.length !== 0
    ) {
      if (
        regAllNum.test(this.state.bigDip[this.state.bigDip.length - 1]) === true
      ) {
        if (
          this.state.bigDip.includes(".") === true &&
          this.state.smallDip.includes("=") === false
        ) {
          this.state.answer.push(parseFloat(this.state.bigDip));
        } else {
          this.state.answer.push(parseInt(this.state.bigDip));
        }
        this.state.answer.push(e.target.innerHTML);

        this.setState({
          smallDip: this.state.smallDip + " " + e.target.innerHTML + " ",
          bigDip: e.target.innerHTML
        });
      } else if (this.state.smallDip.includes("=") === true) {
        this.state.answer.push(e.target.innerHTML);
        this.setState({
          smallDip: this.state.bigDip + " " + e.target.innerHTML + " ",
          bigDip: e.target.innerHTML
        });
      } else if (
        this.state.bigDip === "x" ||
        this.state.bigDip === "+" ||
        this.state.bigDip === "÷" ||
        this.state.smallDip.endsWith("-")
      ) {
        this.state.answer.pop();
        this.state.answer.push(e.target.innerHTML);
        this.setState({
          smallDip:
            this.state.smallDip.slice(0, this.state.smallDip.length - 3) +
            " " +
            e.target.innerHTML +
            " ",
          bigDip: e.target.innerHTML
        });
        //handling '-' not at beginning
      }
    } else if (e.target.innerHTML === "-" && this.state.answer.length !== 0) {
      if(this.state.smallDip.includes("=")===true){
               console.log('yes')
        this.state.answer.push(e.target.innerHTML);
        this.setState({
          smallDip: this.state.bigDip + " " + e.target.innerHTML + " ",
          bigDip: e.target.innerHTML
          
        });
      }
      if (
        regAllNum.test(this.state.smallDip[this.state.smallDip.length - 1]) ===
        true
      ) {
        if (this.state.bigDip.includes(".")) {
          this.state.answer.push(parseFloat(this.state.bigDip));
          this.state.answer.push(e.target.innerHTML);
        } else {
          this.state.answer.push(parseInt(this.state.bigDip));
          this.state.answer.push(e.target.innerHTML);
        }
        this.setState({
          smallDip: this.state.smallDip + " " + e.target.innerHTML + " ",
          bigDip: e.target.innerHTML
        });
      } else if (
        this.state.bigDip === "-" ||
        this.state.bigDip === "+" ||
        this.state.bigDip === "x" ||
        this.state.bigDip === "÷"
      ) {
        if (
          this.state.smallDip.endsWith("÷ -") === true ||
          this.state.smallDip.endsWith("+ -") === true ||
          this.state.smallDip.endsWith("x -") === true ||
          this.state.smallDip.endsWith("- -") === true
        ) {
          this.setState({
            smallDip:
              this.state.smallDip.slice(0, this.state.smallDip.length - 3) +
              " " +
              e.target.innerHTML +
              " ",
            bigDip: e.target.innerHTML
          });
        } else {
          this.setState({
            smallDip: this.state.smallDip + e.target.innerHTML,
            bigDip: e.target.innerHTML
          });
        }
      }
      //handling equals *here we go...
    } else if (e.target.innerHTML === "=" && this.state.answer.length !== 0) {
      if (
        regAllNum.test(this.state.bigDip[this.state.bigDip.length - 1]) === true
      ) {
        this.state.answer.shift();
        if (this.state.answer[0] === "x" || this.state.answer[0] === "÷") {
          this.state.answer.unshift(0);
        }
        if (this.state.bigDip.includes(".")) {
          this.state.answer.push(parseFloat(this.state.bigDip));
        } else {
          this.state.answer.push(parseInt(this.state.bigDip));
        }

        let ans = this.state.answer;

        while (ans.includes("+") === true || ans.includes("-")) {
          if (ans.includes("+") === true) {
            ans.splice(ans.indexOf("+"), 1);
          }
          if (ans.includes("-") === true) {
            let ssym = ans.indexOf("-");
            if (ans[ssym + 1] < 0) {
              ans[ssym + 1] *= -1;
              ans.splice(ssym, 1);
            } else {
              ans[ssym + 1] *= -1;
              ans.splice(ssym, 1);
            }
          }
          //console.log('before mult',ans)
        }

        while (ans.includes("x") === true || ans.includes("÷") === true) {
          if (ans.includes("x") === true && ans.includes("÷") === true) {
            if (ans.indexOf("x") < ans.indexOf("÷")) {
              let msym = ans.indexOf("x");
              let mult = ans[msym - 1] * ans[msym + 1];
              ans[msym - 1] = mult;
              ans.splice(msym, 2);
            } else {
              let dsym = ans.indexOf("÷");
              let div = ans[dsym - 1] / ans[dsym + 1];
              ans[dsym - 1] = div;
              ans.splice(dsym, 2);
            }
            console.log("while loop", ans);
          }

          if (ans.includes("x") === true && ans.includes("÷") === false) {
            let msym = ans.indexOf("x");
            ans[msym - 1] = ans[msym - 1] * ans[msym + 1];
            ans.splice(msym, 2);
          }
          if (ans.includes("x") === false && ans.includes("÷") === true) {
            let dsym = ans.indexOf("÷");
            ans[dsym - 1] = ans[dsym - 1] / ans[dsym + 1];
            ans.splice(dsym, 2);
          }
          //console.log(ans)
        }

        const reducer = (accumulator, currentValue) =>
          accumulator + currentValue;

        ans = ans.reduce(reducer);

        this.setState({
          smallDip: this.state.smallDip + " " + e.target.innerHTML + ans,
          bigDip: ans,
          answer: [0, ans]
        });
      }
    }
    console.log(this.state.answer);
  }

  render() {
    return (
      <div id="box">
        <Display
          smallDisplay={this.state.smallDip}
          bigDisplay={this.state.bigDip}
        />
        <div id="buttons">
          {buttons.map((button, idx) => (
            <Buttons
              click={this.handleClick}
              text={button.sign}
              id={button.id}
            />
          ))}
        </div>
      </div>
    );
  }
}

class Display extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="main-display">
        <p id="small-display">{this.props.smallDisplay}</p>
        <div id="display">{this.props.bigDisplay}</div>
      </div>
    );
  }
}

class Buttons extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { text, id } = this.props;

    return (
      <div onClick={this.props.click} id={id} className="button">
        {text}
      </div>
    );
  }
}

ReactDOM.render(<Calculator />, document.getElementById("root"));


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
