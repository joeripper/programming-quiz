import React, { useState, useEffect } from 'react';

import Intro from './components/Intro';
import Quiz from './components/Quiz';
import Score from './components/Score';
import Leaderboard from './components/Leaderboard';


function App() {

    const serverUrl = 'http://185.128.106.29:30080'

    const [step, setStep] = useState(0)
    const [username, setUsername] = useState('')
   
    const [leaderboard, setLeaderboard] = useState(undefined)
    const [leaderboardLoaded, setLeaderboardLoaded] = useState(false)

    const [questions, setQuestions] = useState(undefined)
    const [questionsLoaded, setQuestionsLoaded] = useState(false)

    const [answers, setAnswers] = useState([])

    const [score, setScore] = useState(0)

    const nextStep = () => {
        setStep(step + 1)
    }

    const resetGame = () => {
        setStep(0)
        setUsername(undefined)
    }

    const fetchData = async (url) => {
        try {
            let response = await fetch(url);
            let json = await response.json();
            return { success: true, data: json }
        } catch (error) {
            console.log(error)
            return { success: false }
        }
    }

    useEffect(() =>{
        (async () => {
            let url = serverUrl + '/leaderboard'
            let result = await fetchData(url);
            if (result.success) {
                setLeaderboard(result.data)
                setLeaderboardLoaded(true)
            }
        })()
    }, [])

    useEffect(() =>{

        (async () => {
            let url = serverUrl + '/questions'
            let result = await fetchData(url);
            if (result.success) {
                setQuestions(result.data)
                setQuestionsLoaded(true)
            }
        })()
    }, [])

    if (leaderboardLoaded && questionsLoaded) {

        switch(step) {
            case 0:
                return <Intro
                    nextStep = { nextStep } 
                    leaderboard = { leaderboard }
                    username = { username }
                    setUsername = { setUsername }
                />

            case 1:
                return <Quiz
                    serverUrl = { serverUrl }
                    nextStep = { nextStep }
                    username = { username }
                    questions = { questions }
                    answers = { answers }
                    setAnswers = { setAnswers }
                    score = { score }
                    setScore = { setScore } 
                />

            case 2:
                return <Score
                    score = { score }
                    nextStep = { nextStep }
                />

            case 3:
                return <Leaderboard
                    nextStep = { nextStep }
                    serverUrl = { serverUrl }
                    leaderboard = { leaderboard }
                    setLeaderboard = { setLeaderboard }
                    leaderboardLoaded = { leaderboardLoaded }
                    setLeaderboardLoaded = { setLeaderboardLoaded }
                    fetchData = { fetchData }
                    />

            default:
                return <Intro nextStep={ nextStep } />
        }
    } else {

    }
  
}

export default App;
