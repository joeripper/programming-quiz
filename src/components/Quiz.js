import { useState, useEffect } from "react"

import useCountDown from 'react-countdown-hook'


const Quiz = ({ 
    serverUrl,
    nextStep,
    username,
    questions,
    answers,
    setAnswers,
    score,
    setScore
}) => {

    function msToTime(s) {
        // Pad to 2 or 3 digits, default is 2
      var pad = (n, z = 2) => ('00' + n).slice(-z);
      return pad((s%3.6e6)/6e4 | 0) + ':' + pad((s%6e4)/1000|0);
    }

    //const initialTime = 5 * 60 * 1000;
    const initialTime = 60 * 1000;
    const interval = 1000;

    const [timeLeft, actions] = useCountDown(initialTime, interval)

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [completed, setCompleted] = useState(false)


    const handleAnswerOptionClick = ( answer, questionId ) => {

        setAnswers(answers => [...answers, {
            questionId,
            answer
        }])
    
        const nextQuestion = currentQuestion + 1;
    
        if (nextQuestion < questions.length) {
          setCurrentQuestion(nextQuestion);
        } else {
          actions.reset();
          setCompleted(true);
        }
    
      }

    useEffect(() => {
        actions.start()
    }, [])

    useEffect(() => {
        if (timeLeft === 0 && currentQuestion !== 0) {
            setCompleted(true)
        } else if (timeLeft !== 0) {
            setCompleted(false)
        }

    }, [timeLeft, currentQuestion])

    useEffect(() => {

        if (!completed) {
            return
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                username,
                answers
            })
        }

        fetch(`${ serverUrl }/score`, requestOptions)
            .then(response => response.json())
            .then(result => setScore(result))

    }, [completed])

    useEffect(() => {
        if (score) {
            nextStep()
        }
    })

    return (
        <>

        <h1>Quiz</h1>
        <h2 id='time-left'>{ msToTime(timeLeft) }</h2>

        {
            !completed ? 
            <>
                <div className='question-section'>
                    <div className='question-count'>
                        <span>Вопрос { currentQuestion + 1 }</span>/{ questions.length }
                    </div>
                    <img 
                        width="500"
                        src={ questions[currentQuestion].img_url }
                        className='question-image'
                    />
                    <div className='answer-section'>
                        {questions[currentQuestion].answers.map((answerOption, i) => (
                        <button key={i} onClick={() => handleAnswerOptionClick(answerOption, questions[currentQuestion].id)}>{answerOption}</button>
                        ))}
                    </div>
                </div>   
            </> :  
            
            <button onClick={nextStep}>
                Результат
            </button> 

             }

        </>
    )
}

// TODO: присвоить id вопросам, не давать ответы в веб-версию
// проверять на стороне сервера
// берем вопрос из пула, сверям ответ с корректным
// отдаем на фронт результат после post запроса
// рендерим в score
// добавляем в лидерборд (отсортированный) наш результат
// рендерим наш результат сверху, отдельным цветом

export default Quiz