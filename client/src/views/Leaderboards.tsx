import * as React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Leaderboards extends React.Component<any, any> {
    state = {
        loaded: false,
        rows: []
    }

    componentDidMount() {
        axios.get('/api/leaderboards').then(response => {
            this.setState({ loaded: true, rows: response.data })
        }).catch(error => alert(error));
    }

    renderTable = (rows : any) => (
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
            {rows.map((row : any, index : number) => 
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

    render() {
        return (
            <div style={{width: '500px'}} className="explain-view">
                <h2>Leaderboards</h2>
                {this.state.loaded ? this.renderTable(this.state.rows) : <div>Loading...</div>}
             </div>
        )
    }
}

export default withRouter(Leaderboards);