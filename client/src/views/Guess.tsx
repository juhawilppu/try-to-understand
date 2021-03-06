import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from 'actions';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import TButton from 'components/TButton';

class Guess extends React.Component<any, any> {
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

    sendGuess = (option : any) => {
        this.setState({ guess: option }, this.sendMessage);
    }

    sendMessage = async () => {
        const assignment = this.state.assignment as any;
        const dto = {
            assignment_id: assignment.explanation.id,
            guess: this.state.guess
        }
        const response = await axios.post('/api/guess', dto);
        this.props.fetchUser();

        this.setState({ answered: true, correct: response.data.correct, correctAnswer: response.data.correctAnswer });
    }

    cancelMessage = () => {
        this.props.history.push(`/menuxs`);
    }

    renderResult = () => (
        <div>
            <div className="common-info-box">
                Your answer is {this.state.correct ?
                <span className="common-correct">Correct</span> :
                <span>Wrong. It tried to describe <span className="guess-correct-word">{this.state.correctAnswer}</span>.</span> }
            </div>
            <div className="margin-top-m">
                <TButton onClick={this.next}>Next</TButton>
            </div>
        </div>
    )

    report = (assignment : any) => {
        axios.post('/api/guess/report/' + assignment.explanation.id);
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

    renderInputUi = (assignment : any) => {
        if (assignment.explanation.options) {
            return this.renderOptionsInput(assignment);
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
            <div style={{marginTop: '20px', display: 'flex', justifyContent: 'flex-end'}}>
                <TButton flat onClick={this.report}>
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

    getOptions = (index : number, assignment : any) => {
        return assignment.explanation.options.split(',').slice(index*3, index*3+3);
    }

    renderOptionsInput = (assignment : any) => (
        <React.Fragment>
            <div className="options-list">
                {this.getOptions(0, assignment).map((option : any) => (
                    <TButton key={option} onClick={() => this.sendGuess(option)}>{option}</TButton>
                ))}
            </div>
            <div className="options-list">
                {this.getOptions(1, assignment).map((option : any) => (
                    <TButton key={option} onClick={() => this.sendGuess(option)}>{option}</TButton>
                ))}
            </div>
            <div className="options-list">
                {this.getOptions(2, assignment).map((option : any) => (
                    <TButton key={option} onClick={() => this.sendGuess(option)}>{option}</TButton>
                ))}
            </div>
            <div style={{marginTop: '200px', display: 'flex', justifyContent: 'flex-end'}}>
                <TButton flat onClick={this.report}>
                    Report
                </TButton>
                <TButton flat onClick={this.next}>
                    Skip
                </TButton>
            </div>
        </React.Fragment>
    )


    renderGuess = (assignment : any) => (
        <div style={{marginTop: '50px'}}>
            {this.renderInputUi(assignment)}
        </div>
    )

    gotoExplain = () => {
        this.props.history.push('/explain/TEXT_OPTIONS');
    }

    render() {
        console.log('render');

        if (this.state.error) {
            return (
                <div className="explain-view page">
                    <h2>Guess</h2>
                    <div className="common-info-box">
                        <p>No explanations found. You need to wait a bit for other users to write them.</p>
                        <p>While waiting, you can explain some words yourself.</p>
                        <TButton onClick={this.gotoExplain}>Explain</TButton>
                    </div>
                </div>
            )
        }

        if (!this.state.loaded) {
            return (
                <div className="explain-view page">
                    <h2>Guess</h2>
                </div>
            )
        }

        const assignment = this.state.assignment as any;

        return (
            <div className="guess-view page">
                <h2>Guess</h2>
                <div>
                    <div className="header-for-word">
                        Guess what this means
                    </div>
                    <div className="word-to-explain">
                        {assignment.explanation.answer}
                    </div>
                    <div className="footer-for-word">
                        Explained by: {assignment.user.username}
                    </div>
                </div>
                {this.state.answered ? this.renderResult() : this.renderGuess(assignment) }
            </div>
        )
    }
}

const mapStateToProps = (val : any) => {
    return { auth: val.auth };
  }

export default connect(mapStateToProps, actions)(withRouter(Guess));