import * as React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import CancelIcon from '@material-ui/icons/Cancel';

const styles = {
    leftIcon: {
        marginRight: '10px'
    }
}

class Guess extends React.Component {
    state = {
        loaded: false,
        understand: null,
        content: '',
        answered: false,
        correct: false,
        correctAnswer: null,
        error: null
    }

    componentDidMount = async () => {
        this.next();
    }

    sendMessage = async () => {
        const dto = {
            assignmentId: this.state.understand.id,
            guess: this.state.content
        }
        const response = await axios.post('/api/guess', dto);

        this.setState({ answered: true, correct: response.data.correct, correctAnswer: response.data.correctAnswer });
    }

    cancelMessage = () => {
        this.props.history.push(`/center`);
    }

    renderResult = () => (
        <div>
            Your answer is {this.state.correct ? 'Correct' : 'Wrong. It tried to describe a ' + this.state.correctAnswer + '.' }
            <div>
                <Button variant="contained" color="primary" onClick={this.next}>Next</Button>
            </div>
        </div>
    )

    report = () => {
        axios.post('/api/guess/report/' + this.state.understand._id);
        this.next();
    }

    next = async () => {
        try {
            const response = await axios.get('/api/guess');
            this.setState({ loaded: true, understand: response.data, answered: false, content: '' });
        } catch (error) {
            this.setState({ error })
        }
    }


    renderGuess = () => (
        <div style={{marginTop: '50px'}}>
            <form noValidate autoComplete="off">
                <TextField
                    id="standard-title"
                    label={`Your guess`}
                    variant="outlined"
                    multiline
                    rows="1"
                    value={this.state.content}
                    onChange={event => this.setState({ content: event.target.value })}
                    margin="normal"
                    placeholder="Guess goes here"
                    autoFocus
                    fullWidth
                />
                <div style={{marginTop: '20px', display: 'flex', justifyContent: 'flex-end'}}>
                <Button variant="flat" color="primary" style={styles.leftIcon} onClick={() => alert('not implemented')}>
                        Report
                    </Button>
                    <Button variant="contained" color="primary" style={styles.leftIcon} onClick={this.sendMessage}>
                        Send
                    </Button>
                    <Button variant="contained" onClick={this.cancelMessage}>
                        Skip
                    </Button>
                </div>
            </form>
        </div>
    )

    render() {

        if (this.state.error) {
            return (
                <div style={{width: '500px'}} className="explain-view">
                    <h2>Guess</h2>
                    <div>No explanations found. You need to wait a bit for other users to write them.</div>
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
                        Guess what this is explaining
                    </div>
                    <div className="word">
                        {this.state.understand.explanation}
                    </div>
                    <div className="footer-for-word">
                        as explained by user-{this.state.understand.user_id}
                    </div>
                </div>
                {this.state.answered ? <this.renderResult /> : <this.renderGuess />}
            </div>
        )
    }
}

export default withRouter(Guess);