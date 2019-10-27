import * as React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import { Button } from '@material-ui/core';

class UserProfile extends React.Component {
    state = {
        learning: null
    }

    componentDidMount() {
        this.setState({ learning: this.props.auth.language })
    }

    handleChange = selectedOption => {
        this.setState({ learning: selectedOption.value })
    }

    save = () => {
        console.log('saving...')
        console.log(this.state)
        this.props.saveUser({language: this.state.learning});
    }

    render() {

        const options = [
            { value: 'english', label: 'English' },
            { value: 'finnish', label: 'Finnish' }
        ]

        const selectedOption = options.find(o => o.value === this.state.learning);

        return (
            <div style={{ width: '500px' }} className="explain-view">
                <h2>User profile</h2>
                <div>
                    <strong>Learning:</strong> <Select
                        value={selectedOption}
                        onChange={this.handleChange}
                        options={options}
                    /> <br />
                    <Button variant="contained" onClick={this.save}>Save</Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (val) => {
    return { auth: val.auth };
}

export default withRouter(connect(mapStateToProps, actions)(UserProfile));