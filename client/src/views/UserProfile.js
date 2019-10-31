import * as React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import TButton from 'components/TButton';
import axios from 'axios';
import Explanations from './Explanations';

class UserProfile extends React.Component {
    state = {
        loaded: null,
        results: null,
        learning: null,
        explanations: null
    }

    componentDidMount() {
        Promise.all([
            axios.get('/api/leaderboards/me'),
            axios.get('/api/assignments/me')
        ]).then(response => {
            this.setState({
                loaded: true,
                learning: this.props.auth.language,
                results: response[0].data,
                explanations: response[1].data
            })
        }).catch(error => alert(error));
    }

    handleChange = selectedOption => {
        this.setState({ learning: selectedOption.value })
    }

    save = () => {
        this.props.saveUser({ username: this.props.auth.username, language: this.state.learning });
    }

    row = (header, value) => (
        <div className="row">
            <div className="row-header">{header}</div>
            <div className="value">{value}</div>
        </div>
    )

    percentage = (a, b) => {
        if (b != 0) {
            return (a*100/b).toFixed(2) + ' %';
        } else {
            return '-';
        }
    }

    render() {

        const options = [
            { value: 'english', label: 'English' }
        ]

        const selectedOption = options.find(o => o.value === this.state.learning);

        const { results } = this.state;

        if (!this.state.loaded) {
            return <div>Loading...</div>
        }

        const explainScore = results.explains_correct - (results.explains_all - results.explains_correct);
        const guessScore = results.guesses_correct - (results.guesses_all - results.guesses_correct);
        const totalScore = explainScore + guessScore;

        return (
            <div style={{ width: '500px' }} className="explain-view">
                <h2>User profile</h2>

                <div>Total score: {totalScore}</div>

                <div>
                    <h3>Explain</h3>
                    {this.row(`Words explained by you`, this.state.explanations.length)}
                    {this.row(`Understood by others`, this.percentage(results.explains_correct, results.explains_all))}
                    {this.row(`Guesses from others`, results.explains_all)}

                    <h3>Guess</h3>
                    {this.row(`Words guessed by you`, this.state.explanations.length)}
                    {this.row(`Understood by you`, this.percentage(results.guesses_correct, results.guesses_all))}
                    {this.row(`Guesses by you`, results.guesses_all)}
                </div>
                <Explanations explanations={this.state.explanations} />
                {false &&
                    <React.Fragment>
                        <div style={{marginTop: 30}}>
                            <strong>Learning:</strong> <Select
                                value={selectedOption}
                                onChange={this.handleChange}
                                options={options}
                            /> <br />
                            <TButton onClick={this.save}>Save</TButton>
                        </div>
                    </React.Fragment>
                }
            </div>
        )
    }
}

const mapStateToProps = (val) => {
    return { auth: val.auth };
}

export default withRouter(connect(mapStateToProps, actions)(UserProfile));