import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

interface Row {
    username: string;
    explains_correct: number;
    explains_all: number;
    guesses_correct: number;
    guesses_all: number;
    total_score: number;
}

const Leaderboards = () => {
    const [ rows, setRows ] = useState(null)

    useEffect(() => {
        axios.get('/api/leaderboards').then(response => {
            setRows(response.data)
        })
    }, []); // empty array -> Runs similar to componentDidMount

    const renderTable = (rows : Row[]) => (
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Player</th>
                    <th>As explainer</th>
                    <th>As guesser</th>
                    <th>Total score</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((row, index) => 
                    <tr key={row.username}>
                        <td>{index+1}</td>
                        <td>{row.username}</td>
                        <td>{row.explains_correct}/{row.explains_all}</td>
                        <td>{row.guesses_correct}/{row.guesses_all}</td>
                        <td>{row.total_score}</td>
                    </tr>
                )}
            </tbody>
        </table>
    )

    return (
        <div style={{width: '500px'}} className="explain-view">
            <h2>Leaderboards</h2>
            {rows ? renderTable(rows!) : <div>Loading...</div>}
            </div>
    )
}

export default withRouter(Leaderboards);