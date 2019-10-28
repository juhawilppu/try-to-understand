import * as React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import TButton from 'components/TButton';

class Guess extends React.Component {
    state = {
        loaded: false,
        assignment: null,
        guess: '',
        answered: false,
        correct: false,
        correctAnswer: null,
        error: null
    }

    componentDidMount = async () => {
        this.next();
    }

    sendGuess = (option) => {
        this.setState({ guess: option}, this.sendMessage);
    }

    sendMessage = async () => {
        const dto = {
            assignment_id: this.state.assignment.id,
            guess: this.state.guess
        }
        const response = await axios.post('/api/guess', dto);

        this.setState({ answered: true, correct: response.data.correct, correctAnswer: response.data.correctAnswer });
    }

    cancelMessage = () => {
        this.props.history.push(`/center`);
    }

    renderResult = () => (
        <div>
            <div className="common-info-box">
                Your answer is {this.state.correct ?
                <span className="common-correct">Correct</span> :
                <span>Wrong. It tried to describe a {this.state.correctAnswer}.</span> }
            </div>
            <Button variant="contained" color="primary" onClick={this.next}>Next</Button>
        </div>
    )

    report = () => {
        axios.post('/api/guess/report/' + this.state.assignment._id);
        this.next();
    }

    next = async () => {
        try {
            const response = await axios.get('/api/guess');
            this.setState({ loaded: true, assignment: response.data, answered: false, guess: '' });
        } catch (error) {
            this.setState({ error })
        }
    }

    renderInputUi = () => {
        if (this.state.assignment.options) {
            return this.renderOptionsInput();
        } else {
            return this.renderTextInput();
        }
    }

    renderTextInput = () => (
        <React.Fragment>
            <TextField
                id="standard-title"
                label={`Your guess`}
                variant="outlined"
                multiline
                rows="1"
                value={this.state.guess}
                onChange={event => this.setState({ guess: event.target.value })}
                margin="normal"
                placeholder="Guess goes here"
                autoFocus
                fullWidth
            />
            <div style={{marginTop: '20px', display: 'flex', justifyguess: 'flex-end'}}>
                <TButton onClick={() => alert('not implemented')}>
                    Report
                </TButton>
                <TButton onClick={this.sendMessage}>
                    Send
                </TButton>
                <TButton onClick={this.cancelMessage}>
                    Skip
                </TButton>
            </div>
        </React.Fragment>
    )

    getOptions = firstHalf => {
        const splitted = this.state.assignment.options.split(',');
        return splitted.filter((o, index) => index < splitted.length/2 === firstHalf);
    }

    renderOptionsInput = () => (
        <React.Fragment>
            <div className="options-list">
                {this.getOptions(true).map(option => (
                    <TButton onClick={() => this.sendGuess(option)}>{option}</TButton>
                ))}
            </div>
            <div className="options-list">
                {this.getOptions(false).map(option => (
                    <TButton onClick={() => this.sendGuess(option)}>{option}</TButton>
                ))}
            </div>
            <div style={{marginTop: '20px', display: 'flex', justifyguess: 'flex-end'}}>
            <TButton flat onClick={() => alert('not implemented')}>
                Report
            </TButton>
            <TButton flat onClick={this.cancelMessage}>
                Skip
            </TButton>
        </div>
    </React.Fragment>
    )


    renderGuess = () => (
        <div style={{marginTop: '50px'}}>
            <form noValidate autoComplete="off">
                {this.renderInputUi()}
            </form>
        </div>
    )

    render() {

        if (this.state.error) {
            return (
                <div style={{width: '500px'}} className="explain-view">
                    <h2>Guess</h2>
                    <div className="common-info-box">No explanations found. You need to wait a bit for other users to write them.</div>
                </div>
            )
        }

        if (!this.state.loaded) {
            return (
                <div style={{width: '500px'}} className="explain-view">
                    <h2>Guess</h2>
                </div>
            )
        }

        return (
            <div style={{width: '500px'}} className="guess-view">
                <h2>Guess</h2>
                <div>
                    <div className="header-for-word">
                        Guess what this means:
                    </div>
                    <div className="word">
                        {this.state.assignment.answer}
                    </div>
                    <div className="footer-for-word">
                        as explained by user-{this.state.assignment.user_id}
                    </div>
                </div>
                {this.state.answered ? this.renderResult() : this.renderGuess() }
            </div>
        )
    }
}

export default withRouter(Guess);