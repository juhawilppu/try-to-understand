import * as React from 'react';
import { withRouter } from 'react-router-dom';
import TButton from 'components/TButton';

class Explanations extends React.Component {
    
    gotoExplain = () => {
        this.props.history.push('/explain');
    }

    renderCallToAction = () => (
        <div>
            <div className="common-info-box">You have no explanations.</div>
            <TButton onClick={this.gotoExplain}>Go explain things!</TButton>
        </div>
    )

    renderTable = () => (
        <table>
            <thead>
                <tr>
                    <th>Word</th>
                    <th>Understood</th>
                </tr>
            </thead>
            <tbody>
                {this.props.explanations.map((exp) => {
                    const guesses = exp.Guesses.length;
                    const correct = exp.Guesses.filter(g => g.correct).length;
                    return (
                        <tr key={exp.id}>
                            <td>{exp.Word.word}</td>
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
        return (
            <div className="explain-view">
                <h2>My explanations</h2>

                {this.props.explanations.length === 0 ?
                    this.renderCallToAction() :
                    this.renderTable()}
            </div>
        )
    }
}

export default withRouter(Explanations);