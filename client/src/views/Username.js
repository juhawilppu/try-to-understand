import * as React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { withRouter } from 'react-router-dom';
import TButton from 'components/TButton';
import TTextfield from 'components/TTextfield';

class Username extends React.Component {
    state = {
        username: ''
    }

    change = value => {
        this.setState({ username: value });
    }

    save = () => {
        this.props.saveUser({ username: this.state.username, language: this.props.auth.language });
    }

    render() {

        return (
            <div style={{ width: '500px' }} className="explain-view">
                <h2>Select username</h2>
                <TTextfield
                    rows={1}
                    value={this.state.username}
                    onChange={event => this.change(event.target.value)}
                    autoFocus
                />
                <div style={{marginTop: 30}}>
                    <TButton onClick={this.save}>Save</TButton>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (val) => {
    return { auth: val.auth };
}

export default withRouter(connect(mapStateToProps, actions)(Username));