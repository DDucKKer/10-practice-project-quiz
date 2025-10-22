import { useEffect, useState } from "react";
import questions from "../questions";
import Results from "./Results";
import ProgressBar from "./ProgressBar";

const ANSWER_TIMER = 2000
const THINKING_TIMER = 1000
const RESULT_TIMER = 2000

const correctAnswers = [
  'A library to build user interfaces with help of declarative code.', // q1
  'Enabling the use of state and other React features in functional components.', // q2
  'A JavaScript extension that adds HTML-like syntax to JavaScript.', // q3
  'By defining a JavaScript function that returns a renderable value.', // q4
  'An object in a component that holds values and may cause the component to render on change.', // q5
  'By using the map() method to iterate over an array of data and returning JSX.', // q6
  'Using a the #if template syntax.', // q7 (the one that can NOT be used)
]

export default function Quiz() {
    const [timer, setTimer] = useState(ANSWER_TIMER);
    const [phase, setPhase] = useState("quiz");

    const [userAnswer, setUserAnswer] = useState('');

    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const currentQuestionIndex = selectedAnswers.length;

    const currentQuestion = currentQuestionIndex < questions.length ? questions[currentQuestionIndex].text : "Quiz Completed";
    const currentAnswers = currentQuestionIndex < questions.length ? questions[currentQuestionIndex].answers : [];


    function handleSelectAnswer(answer) {
        setUserAnswer(answer);
        setPhase("thinking");
        setTimer(THINKING_TIMER);
    }


    useEffect(() => {
        if (currentQuestionIndex >= questions.length) return;

        if (phase === "quiz") {
            const timerId = setTimeout(() => {
                setSelectedAnswers([...selectedAnswers, null])
                // setUserAnswer(null)
                // setPhase("thinking");
                setTimer(ANSWER_TIMER);
            }, ANSWER_TIMER);
            return () => clearTimeout(timerId);
        }
        if (phase === "thinking") {
            const timerId = setTimeout(() => {
                setPhase("result");
                setTimer(RESULT_TIMER);
            }, THINKING_TIMER);
            return () => clearTimeout(timerId);
        }
        if (phase === "result") {
            const timerId = setTimeout(() => {
                setPhase("quiz");
                setSelectedAnswers([...selectedAnswers, userAnswer])
                setUserAnswer('')
                setTimer(ANSWER_TIMER);
            }, RESULT_TIMER);
            return () => clearTimeout(timerId);
        }
    }, [phase, currentQuestionIndex]);

    function handleButtonStyle(answer){
        if(phase === "thinking" && userAnswer === answer){
            return "selected";
        }
        else if(phase === "result" && userAnswer === answer && userAnswer === correctAnswers[currentQuestionIndex]){
            console.log('correct answer')
            return "correct";
        }else if(phase === "result" && userAnswer === answer && userAnswer !== correctAnswers[currentQuestionIndex]){
            console.log('wrong answer')
            return "wrong";
        }else{
            return "";
        }

    }


    return (
        <>
            {
                currentQuestion !== "Quiz Completed"
                &&
                <div id="quiz">
                    <div id="question">
                        <ProgressBar key={phase + currentQuestionIndex} timer={timer} className={phase === "thinking" ? "answered" : ""} />
                        <h2>{currentQuestion}</h2>
                        <ul id="answers">
                            {currentAnswers.map((answer, index) => (
                                <li key={index} className="answer">
                                    <button
                                        onClick={() => handleSelectAnswer(answer)}
                                        className={handleButtonStyle(answer)}
                                        disabled={phase !== "quiz"}
                                    >
                                        {answer}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            }
            {
                currentQuestion === "Quiz Completed"
                &&
                <Results answers={selectedAnswers} correctAnswers={correctAnswers} />
            }
        </>
    )
}