import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core'
import axios from 'axios';

class Explanations extends React.Component {
    state = {
        loaded: false,
        explanations: []
    }

    componentDidMount() {
        axios.get('/api/assignments').then(response => {
            this.setState({ loaded: true, explanations: response.data });
        }).catch(error => alert(error));
    }

    gotoExplain = () => {
        this.props.history.push('/explain');
    }

    renderCallToAction = () => (
        <div>
            <div className="common-info-box">You have no explanations.</div>
            <Button variant="contained" color="primary" onClick={this.gotoExplain}>Go explain things!</Button>
        </div>
    )

    renderTable = () => (
        <table>
            <thead>
                <tr>
                    <th>Language</th>
                    <th>Word</th>
                    <th>Understood</th>
                </tr>
            </thead>
            <tbody>
                {this.state.explanations.map((exp) => {
                    const guesses = exp.Guesses.length;
                    const correct = exp.Guesses.filter(g => g.correct).length;
                    return (
                        <tr key={exp.id}>
                            <td>{exp.language}</td>
                            <td>{exp.Word[exp.language]}</td>
                            <td>
                                {correct}/{guesses} ({guesses === 0 ? <span>-</span> : <span>{(correct*100/guesses).toFixed(2)} %</span>})
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )

    render() {
        if (!this.state.loaded) {
            return <span>...</span>
        }

        return (
            <div style={{width: '500px'}} className="explain-view">
                <h2>My explanations</h2>

                {this.state.explanations.length === 0 ?
                    this.renderCallToAction() :
                    this.renderTable()}
            </div>
        )
    }
}

export default withRouter(Explanations);