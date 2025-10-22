import quizCompleteImg from "../assets/quiz-complete.png";
import questions from "../questions";




export default function Results({answers, correctAnswers}) {


    function calculateSkipped(){
        const skipped = answers.filter(answer => answer === null).length;
        return (skipped / questions.length * 100).toFixed(0);
    }
    function calculateCorrect(){
        const correct = answers.filter((answer, index) => answer === correctAnswers[index]).length;
        return (correct/questions.length *100).toFixed(0);
    }
    function calculateIncorrect(){
        const incorrect = answers.filter((answer, index) => answer !== null && answer !== correctAnswers[index]).length;
        return (incorrect/questions.length *100).toFixed(0);
    }

    function answerStyle(index){
        if(answers[index] === correctAnswers[index]){
            return "user-answer correct"
        }else if(answers[index] === null){
            return "user-answer skipped"
        }else{
            return "user-answer wrong"
        }
    }
    return(
        <div id="summary">
            <img src={quizCompleteImg} alt="Quiz Completed" />
            <h2>QUIZ COMPLETED</h2>
            <div id="summary-stats">
                <div>
                    <p className="number">{calculateSkipped()}%</p>
                    <p className="text">Skipped</p>
                </div>
                <div>
                    <p className="number">{calculateCorrect()}%</p>
                    <p className="text">Answered correctly</p>
                </div>
                <div>
                    <p className="number">{calculateIncorrect()}%</p>
                    <p className="text">Answered incorrectly</p>
                </div>
            </div>
            <ol>
                {
                    questions.map((question, index) => (
                        <li key={index}>
                            <h3>{index+1}</h3>
                            <p className="question">{question.text}</p>
                            <p className={answerStyle(index)}>{correctAnswers[index]}</p>
                        </li>
                    ))
                }
            </ol>
        </div>
    )
}