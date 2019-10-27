import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core'
import axios from 'axios';

class NewMessage extends React.Component {
    state = {
        loaded: false,
        explanations: []
    }

    componentDidMount() {
        axios.get('/api/explanations').then(response => {
            this.setState({ loaded: true, explanations: response.data });
        }).catch(error => alert(error));
    }

    gotoExplain = () => {
        this.props.history.push('/explain');
    }

    render() {
        return (
            <div style={{width: '500px'}} className="explain-view">
                <h2>Previous explanations</h2>

                {this.state.loaded && this.state.explanations.length === 0 &&
                    <div>
                        <div>No explanations.</div>
                        <Button variant="contained" color="primary" onClick={this.gotoExplain}>Go explain things</Button>
                    </div>
                }
                <table>
                    <thead>
                        <tr>
                            <th>Language</th>
                            <th>Word</th>
                            <th>Correctness</th>
                            <th>Guesses</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.explanations.map((exp) =>
                            <tr>
                                <td>{exp.language}</td>
                                <td>{exp.Word[exp.language]}</td>
                                <td>{exp.Guesses.filter(g => g.correct).length}</td>
                                <td>{exp.Guesses.length}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default withRouter(NewMessage);