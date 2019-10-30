import * as React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../actions';
import TButton from 'components/TButton';
import TTextfield from 'components/TTextfield';

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
            answer: this.state.content,
            word_id: this.state.assignment.word.id,
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
                        <TTextfield
                            label={`Explain (${this.state.content.length}/400)`}
                            rows={6}
                            value={this.state.content}
                            onChange={event => this.change(event.target.value)}
                            onKeyDown={this.onKeyDown}
                            placeholder="Explain the given word so that another person can guess the word. It's not allowed to mention the given word."
                            autoFocus
                        />
                        {!this.state.allowed && <div style={{ color: 'red' }}>You are trying to cheat. Please stop.</div>}
                        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                            <TButton onClick={this.sendAnswer}>
                                Send
                            </TButton>
                            <TButton flat onClick={this.cancelMessage}>
                                Quit
                            </TButton>
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