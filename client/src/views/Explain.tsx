import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
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

interface Props extends RouteComponentProps {

}
interface State {
    loaded: boolean;
    error: any;
    content: string;
    time: number;
    assignment: any;
}
class NewMessage extends React.Component<Props, State> {
    state = {
        loaded: false,
        error: null,
        assignment: null,
        content: '',
        time: 60
    }

    componentDidMount = async () => {
        try {
            const response = await axios.get('/api/assignment');
            this.setState({ loaded: true, assignment: response.data }, this.startTimer);
        } catch (error) {
            this.setState({ error })
        }
    }

    startTimer = () => {
        const timer = setInterval(() => {
            const time = this.state.time - 1;
            this.setState({ time });
        }, 1000);
    }

    sendMessage = async () => {
        const dto = {
            explanation: this.state.content,
            word: this.state.assignment.word.id,
            language: this.state.assignment.language
        }
        const response = await axios.post('/api/explanations', dto) as any;
        this.props.history.push(`/center`);
    }

    cancelMessage = () => {
        this.props.history.push(`/center`);
    }

    render() {

        if (this.state.error) {
            return (
                <div style={{width: '500px'}} className="explain-view">
                    <h2>Explain</h2>
                    <div>Unexpected error. Possible no words created?</div>
                </div>
            )
        }

        if (!this.state.loaded) {
            return (
                <div style={{width: '500px'}} className="explain-view">
                    <h2>Explain</h2>
                </div>
            )
        }

        return (
            <div style={{width: '500px'}} className="explain-view">
                <h2>Explain</h2>
                <div>
                    <div className="header-for-word">
                        Please explain
                    </div>
                    <div className="word-to-explain">
                        {this.state.assignment.word[this.state.assignment.language]} ({this.state.assignment.word.english})
                    </div>
                    <div className="header-for-word">
                        in {this.state.assignment.languageUi}
                    </div>
                </div>
                <div className="time-remaining">
                    Time remaining: {this.state.time}
                </div>
                {this.state.time < 0 && 
                    <div style={{color: 'red'}}>
                        Time is up!
                    </div>
                }
                <div style={{marginTop: '50px'}}>
                    <form noValidate autoComplete="off">
                        <TextField
                            id="standard-title"
                            label={`Explanation in ${this.state.assignment.languageUi}`}
                            variant="outlined"
                            multiline
                            rows="6"
                            value={this.state.content}
                            onChange={event => this.setState({ content: event.target.value })}
                            margin="normal"
                            placeholder="Explain the given word in a clear manner so that a person can understand it. It's not allowed to mention the given word."
                            autoFocus
                            fullWidth
                        />
                        <div style={{marginTop: '20px', display: 'flex', justifyContent: 'flex-end'}}>
                            <Button variant="contained" color="primary" style={styles.leftIcon} disabled={this.state.time < 0} onClick={this.sendMessage}>
                                <SendIcon style={styles.leftIcon} /> Send
                            </Button>
                            <Button variant="contained" onClick={this.cancelMessage}>
                                <CancelIcon style={styles.leftIcon} /> Skip
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(NewMessage);