import * as React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import TButton from 'components/TButton';
import axios from 'axios';
import Explanations from './Explanations';
import TotalScore from 'views/TotalScore';

class UserProfile extends React.Component<any, any> {
    state = {
        loaded: false,
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

    handleChange = (selectedOption : any) => {
        this.setState({ learning: selectedOption.value })
    }

    save = () => {
        this.props.saveUser({ username: this.props.auth.username, language: this.state.learning });
    }

    row = (header : string, value : string) => (
        <div className="row">
            <div className="row-header">{header}</div>
            <div className="value">{value}</div>
        </div>
    )

    percentage = (a : number, b : number) => {
        if (b !== 0) {
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

        if (!this.state.loaded) {
            return <div>Loading...</div>
        }

        const results = this.state.results as any;
        const explanations = this.state.explanations as any;
        const score = this.props.auth.totalScore as number;

        return (
            <div className="explain-view page">
                <h2>User profile</h2>

                <div>Total score: <TotalScore score={score} /></div>

                <div>
                    <h3>Explain</h3>
                    {this.row(`Words explained by you`, explanations.length)}
                    {this.row(`Understood by others`, this.percentage(results.explains_correct, results.explains_all))}
                    {this.row(`Guesses from others`, results.explains_all)}

                    <h3>Guess</h3>
                    {this.row(`Words guessed by you`, explanations.length)}
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

const mapStateToProps = (val : any) => {
    return { auth: val.auth };
}

export default withRouter(connect(mapStateToProps, actions)(UserProfile));