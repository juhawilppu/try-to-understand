import * as React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const styles = {
    leftIcon: {
        marginRight: '10px'
    }
}

class Explain extends React.Component {
    state = {
        loaded: false,
        error: null,
        assignment: null,
        content: '',
        allowed: true,
        time: 60
    }

    componentDidMount = () => {
        this.next();
    }

    next = async () => {
        try {
            const response = await axios.get(`/api/assignments/${this.props.auth.language}`);
            this.setState({ loaded: true, assignment: response.data, content: '', time: 60 }, this.startTimer);
        } catch (error) {
            this.setState({ error })
        }
    }

    startTimer = () => {
        const timer = setInterval(() => {
            const time = this.state.time - 1;
            this.setState({ time });
        }, 1000);
        this.setState({ timer });
    }

    sendAnswer = async () => {
        clearInterval(this.state.timer);
        const dto = {
            explanation: this.state.content,
            wordId: this.state.assignment.wordId,
            language: this.state.assignment.language
        }
        const response = await axios.post(`/api/assignments/${this.props.match.params.assignmentType}`, dto);
        if (response) {
            this.next();
        } else {
            alert('failed');
        }

    }

    cancelMessage = () => {
        this.props.history.push(`/center`);
    }

    change = (word) => {
        const wantedWord = this.state.assignment.word[this.state.assignment.language];

        const cheat = word
            .trim(' ')
            .trim('.')
            .trim('-')
            .trim('_')
            .includes(wantedWord);
        const allowed = !cheat;

        this.setState({ content: word, allowed })
    }

    onKeyDown = (event) => {
        // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            this.sendAnswer();
        }
    }

    render() {

        if (this.state.error) {
            return (
                <div style={{ width: '500px' }} className="explain-view">
                    <h2>Explain</h2>
                    <div>Unexpected error. Possibly no words created?</div>
                </div>
            )
        }

        if (!this.state.loaded) {
            return (
                <div style={{ width: '500px' }} className="explain-view">
                    <h2>Explain</h2>
                </div>
            )
        }

        return (
            <div style={{ width: '500px' }} className="explain-view">
                <h2>Explain</h2>
                <div>
                    <div className="header-for-word">
                        Please explain this word
                    </div>
                    <div className="word-to-explain">
                        {this.state.assignment.word[this.state.assignment.language]}
                    </div>
                    <div className="header-for-word">
                        in {this.state.assignment.language}
                    </div>
                </div>
                <div className="time-remaining">
                    Time remaining: {this.state.time}
                </div>
                {this.state.time < 0 &&
                    <div style={{ color: 'red' }}>
                        Time is up!
                    </div>
                }
                <div style={{ marginTop: '50px' }}>
                    <form noValidate autoComplete="off">
                        <TextField
                            id="standard-title"
                            label={`Explain (${this.state.content.length}/400)`}
                            variant="outlined"
                            multiline
                            rows="6"
                            value={this.state.content}
                            onChange={event => this.change(event.target.value)}
                            onKeyDown={this.onKeyDown}
                            margin="normal"
                            placeholder="Explain the given word so that another person can guess the word. It's not allowed to mention the given word."
                            autoFocus
                            fullWidth
                        />
                        {!this.state.allowed && <div style={{ color: 'red' }}>You are trying to cheat. Please stop.</div>}
                        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant="contained" color="primary" style={styles.leftIcon} onClick={this.sendAnswer}>
                                Send
                            </Button>
                            <Button variant="contained" onClick={this.cancelMessage}>
                                Quit
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (val) => {
    return { auth: val.auth };
}

export default withRouter(connect(mapStateToProps, actions)(Explain));