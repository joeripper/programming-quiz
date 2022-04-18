import { useEffect } from 'react'


const Leaderboard = ({ 
    nextStep,
    serverUrl,
    leaderboard,
    setLeaderboard,
    leaderboardLoaded,
    setLeaderboardLoaded,
    fetchData
}) => {

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

    console.log('Leaderboard', leaderboard)


    return (
    <>
        <h1>Таблица лидеров</h1>

        { leaderboardLoaded &&
            Object.entries(leaderboard).map((username) => {
                return (
                    <div key={username} className="question-text" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p style={{ textAlign: 'left' }}>{ username[0] }</p><p style={{ textAlign: 'right' }}>{ username[1] }</p>
                    </div>
                )
            })
        }

        <button onClick={() => window.location.reload()}>
        🔄 Начать заново
        </button>
    </>
    )
}

export default Leaderboard