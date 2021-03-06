import * as React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../actions';
import TButton from 'components/TButton';
import TTextfield from 'components/TTextfield';

const MAX_TIME = 120;

class Explain extends React.Component<any, any> {
    state = {
        loaded: false,
        error: null,
        assignment: null,
        content: '',
        allowed: true,
        timer: null,
        time: MAX_TIME
    }

    componentDidMount = () => {
        this.next();
    }

    next = async () => {
        try {
            if (this.state.timer) {
                clearInterval(this.state.timer as unknown as number);
            }
            const response = await axios.get(`/api/assignments/${this.props.auth.language}`);
            this.setState({ loaded: true, assignment: response.data, content: '', time: MAX_TIME }, this.startTimer);
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
        const timer = this.state.timer as unknown as number;
        const assignment = this.state.assignment as any;
        clearInterval(timer);
        const dto = {
            answer: this.state.content,
            word_id: assignment.word.id,
            language: assignment.language
        }
        const response = await axios.post(`/api/assignments/${this.props.match.params.assignmentType}`, dto);
        if (response) {
            this.next();
        } else {
            alert('failed');
        }

    }

    change = (word : any) => {
        const assignment = this.state.assignment as any;
        const wantedWord = assignment.word[assignment.language];

        const cheat = word
            .trim(' ')
            .trim('.')
            .trim('-')
            .trim('_')
            .includes(wantedWord);
        const allowed = !cheat;

        this.setState({ content: word, allowed })
    }

    onKeyDown = (event : any) => {
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

        const assignment = this.state.assignment as any | null;
        if (!this.state.loaded || this.state.assignment == null) {
            return (
                <div style={{ width: '500px' }} className="explain-view">
                    <h2>Explain</h2>
                </div>
            )
        }

        return (
            <div className="explain-view page">
                <h2>Explain</h2>
                <div>
                    <div className="header-for-word">
                        Try to explain...
                    </div>
                    <div className="word-to-explain">
                        {assignment.word.word}
                    </div>
                </div>
                <div style={{ marginTop: '50px' }}>
                    <TTextfield
                        rows={6}
                        value={this.state.content}
                        onChange={(event : any) => this.change(event.target.value)}
                        onKeyDown={this.onKeyDown}
                        maxLength={400}
                        autoFocus
                    />
                    {!this.state.allowed && <div className="common-red">You are trying to cheat. Please stop.</div>}
                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                        <div className="time-remaining">
                            Time remaining: {this.state.time > 0 ?
                                <span>{this.state.time}</span> :
                                <span className="common-red">Time is up</span>
                            }
                        </div>
                        <span>
                            <TButton flat onClick={this.next}>
                                Skip
                            </TButton>
                            <TButton onClick={this.sendAnswer}>
                                Send
                            </TButton>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (val : any) => {
    return { auth: val.auth };
}

export default withRouter(connect(mapStateToProps, actions)(Explain));