const questionsAnswers = [
  {
    id: 1,
    question: "Who is the president of Russia?",
    answers: ["Vladimir Putin", "Dmitri Medvedev", "Nikolai II"],
    correctAnswer: "Vladimir Putin",
  },
  {
    id: 2,
    question: "When did the Second World War take place?",
    answers: ["1941-1945", "1939-1945", "1938-1941"],
    correctAnswer: "1939-1945",
  },
  {
    id: 3,
    question: "What was the name of the first man in space?",
    answers: ["Andrei", "Alexander", "Yuri"],
    correctAnswer: "Yuri",
  },
  {
    id: 4,
    question: "What is the tallest mountain on Earth?",
    answers: ["Everest", "Catmandou", "Rushmore"],
    correctAnswer: "Everest",
  },
  {
    id: 5,
    question: "Russian October revolution happened in",
    answers: ["1916", "1917", "1920"],
    correctAnswer: "1917",
  },
];

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userAnswer: "",
      currentQuestion: "",
      options: [],
      correctAnswer: "",
      questionNumber: 0,
      rightWrong: "",
      totalQuestions: "",
      btncontents: "Submit",
      correctCount: 0,
    };
  }

  loadQuiz = () => {
    //let q = questionsAnswers
    document.getElementById("next").className = "next";
    document.getElementById("submit").disabled = false;
    this.setState((state, props) => ({
      currentQuestion: questionsAnswers[this.state.questionNumber].question,
      options: questionsAnswers[this.state.questionNumber].answers,
      correctAnswer: questionsAnswers[this.state.questionNumber].correctAnswer,
      totalQuestions: questionsAnswers.length,
      btncontents: "Submit",
      rightWrong: "",
    }));
  };
  componentDidMount = () => {
    this.loadQuiz();
  };
  restartQuiz = () => {
    window.location.href = window.location.href;
  };

  clickHandler = (e) => {
    if (this.state.userAnswer == "") {
      document.getElementById(e).className = "highlight";
    } else {
      let btns = [
        ...document.getElementById("answers").getElementsByTagName("button"),
      ];
      console.log(btns);
      btns.map((e) => {
        e.className = "";
      });
      document.getElementById(e).className = "highlight";
    }
    this.setState({
      userAnswer: e,
    });
  };
  checkAnswer = () => {
    if (this.state.userAnswer == "") {
      this.setState({
        rightWrong: "Please choose of the options",
      });
      return;
    }
    let btns = [
      ...document.getElementById("answers").getElementsByTagName("button"),
    ];
    if (this.state.totalQuestions == this.state.questionNumber + 1) {
      document.getElementById("results").className = "visible";
      document.getElementById("next").disabled = true;
      btns.map((e) => {
        e.disabled = true;
      });
    }
    document.getElementById("submit").disabled = true;
    if (this.state.userAnswer == this.state.correctAnswer) {
      this.setState((state, props) => ({
        rightWrong: "Right",
        correctCount: this.state.correctCount + 1,
      }));
      this.setState((state, props) => ({
        questionNumber: this.state.questionNumber + 1,
        btncontents: "Next",
      }));

      //  console.log(document.getElementById('next').className)
      document.getElementById("next").className = "visible";
      //console.log(document.getElementById('next').className)
    } else {
      console.log(btns);
      document.getElementById("submit").disabled = true;
      btns.map((e) => {
        e.disabled = true;
        if (e.id == this.state.correctAnswer && e.className != "highlight") {
          e.className = "highlight";
        } else if (e.className == "highlight") {
          e.className = "wrong";
          btns.map((e) => (e.disabled = true));
        }
        this.setState((state, props) => ({
          questionNumber: this.state.questionNumber + 1,
          rightWrong: "Wrong",
        }));
        //this.loadQuiz();
        document.getElementById("next").className = "visible";
        console.log(this.state);
      });
    }
  };
  render() {
    return (
      <div>
        <div id="question">
          <h2>{this.state.currentQuestion}</h2>{" "}
        </div>
        <div id="rightwrong">
          <h1>{this.state.rightWrong}</h1>
        </div>
        <ul id="answers">
          {this.state.options.map((e) => {
            return (
              <li key={e}>
                <button
                  className="btn"
                  onClick={() => this.clickHandler(e)}
                  id={e}
                  c
                >
                  {e}
                </button>
              </li>
            );
          })}
        </ul>
        <button id="submit" className="btn control" onClick={this.checkAnswer}>
          Submit!
        </button>
        <button className="next btn control" id="next" onClick={this.loadQuiz}>
          Next!
        </button>
        <div id="results" className="results">
          You answered {this.state.correctCount} question
          {this.state.correctCount == 1 ? "" : "s"} out of{" "}
          {this.state.totalQuestions} correctly!
          <button onClick={this.restartQuiz}>Try again</button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Quiz />, document.getElementById("root"));
