const Score = ({ nextStep, score }) => {

    return (
        
        <>
            <h1>Вы набрали { score.score } из 10 баллов</h1>
            { score.questions.map((q, i) => {
                return (
                    <div key={q.id} className='question-section'>
                        
                        <h2>Вопрос {i + 1}</h2>
                        
                        <img 
                            src={ q.img_url }
                            className='question-image'
                        />
                            {  (q['correct'] === q['answer']) ?
                                <div className='question-text correct'>{ q['correct'] }</div> :
                                <>
                                    <div className='question-text incorrect'>{ q['answer'] }</div>
                                    <div className='question-text'>{ q['comment'] }</div>
                                </>
                            }
                    </div>
                )
            } ) }

            <button style={{ marginBottom: '20px' }} onClick={nextStep}>
                Таблица лидеров
            </button> 
        </>
        
    )

}


export default Score