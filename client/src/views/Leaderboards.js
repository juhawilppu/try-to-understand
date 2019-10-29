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
                            <th>User</th>
                            <th>As explainer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.loaded && this.state.rows.map(row => 
                            <tr key={row.username}>
                                <td>{row.username}</td>
                                <td>{row.explainer_correct_guesses}/{row.explainer_all_guesses}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default withRouter(Leaderboards);