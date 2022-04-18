import { useState, useEffect } from 'react'

const Intro = ({ nextStep, leaderboard, username, setUsername }) => {
    
    const [usernameFree, setUsernameFree] = useState(true)

    const users = Object.keys(leaderboard)


    const checkUsername = (e) => {

        setUsername(e.target.value)

        if (users.includes(e.target.value)) {
            setUsernameFree(false)
        } else {
            setUsernameFree(true)
        }
    }
    
    return (
        <>
        <h1>Python Quiz</h1>
        <h2>Username:</h2>
        <input
            type="text"
            className="username"
            value={ username }
            onChange={ checkUsername }
        />

        { !usernameFree && <p>Имя пользователя используется</p> }

        { (usernameFree && username) && <button onClick={nextStep}>
            Далее
        </button> }
    </>
    )
}

export default Intro