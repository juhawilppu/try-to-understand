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

    render() {

        const options = [
            { value: 'english', label: 'English' }
        ]

        const selectedOption = options.find(o => o.value === this.state.learning);

        const { results } = this.state;

        if (!this.state.loaded) {
            return <div>Loading...</div>
        }

        return (
            <div style={{ width: '500px' }} className="explain-view">
                <h2>User profile</h2>
                <div>
                    <p>Total words explained: {this.state.explanations.length}</p>
                    <h3>Explain</h3>
                    {this.row(`Understood`, results.explains_correct)}
                    {this.row(`Total guesses`, results.explains_all)}

                    <h3>Guess</h3>
                    {this.row(`Correct guesses from you`, results.guesses_correct)}
                    {this.row(`Total guesses`, results.guesses_all)}
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