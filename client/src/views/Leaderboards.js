import * as React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Leaderboards extends React.Component {
    state = {
        loaded: false,
        rows: []
    }

    componentDidMount() {
        axios.get('/api/leaderboards').then(response => {
            this.setState({ loaded: true, rows: response.data })
        }).catch(error => alert(error));
    }

    render() {
        return (
            <div style={{width: '500px'}} className="explain-view">
                <h2>Leaderboards</h2>
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
                        {this.state.loaded && this.state.rows.map((row, index) => 
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
            </div>
        )
    }
}

export default withRouter(Leaderboards);