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
        learning: null
    }

    componentDidMount() {
        axios.get('/api/leaderboards/me').then(response => {
            this.setState({
                loaded: true,
                learning: this.props.auth.language,
                results: response.data
        })
        }).catch(error => alert(error));
    }

    handleChange = selectedOption => {
        this.setState({ learning: selectedOption.value })
    }

    save = () => {
        this.props.saveUser({language: this.state.learning});
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
                    {this.row(`Correct guesses for explanations`, results.explains_correct)}
                    {this.row(`Total guesses for explanations`, results.explains_all)}

                    {this.row(`Correct guesses for other's explanations`, results.guesses_correct)}
                    {this.row(`Total guesses made for other's explanations`, results.guesses_all)}
                </div>
                <Explanations />
                <div style={{marginTop: 30}}>
                    <strong>Learning:</strong> <Select
                        value={selectedOption}
                        onChange={this.handleChange}
                        options={options}
                    /> <br />
                    <TButton onClick={this.save}>Save</TButton>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (val) => {
    return { auth: val.auth };
}

export default withRouter(connect(mapStateToProps, actions)(UserProfile));