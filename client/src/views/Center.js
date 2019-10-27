import * as React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

class Dashboard extends React.Component {
    state = {
        loaded: false,
        messages: []
    }

    componentDidMount() {
        axios.get('/api/explanations')
        .then(response => {
            this.setState({ loaded: true, messages: response.data });
        });
    }

    render() {

        const content = this.state.loaded ? (
            <div className="list">
                <Button variant="contained" color="primary" onClick={() => this.props.history.push(`/explain`)}>
                    Explain
                </Button>
                <Button variant="contained" color="primary" onClick={() => this.props.history.push(`/understand`)}>
                    Guess
                </Button>
                <br />
                <Button variant="contained" color="primary" onClick={() => this.props.history.push(`/explanations`)}>
                    My previous explanations
                </Button>
                <Button variant="contained" color="primary" onClick={() => this.props.history.push(`/user-profile`)}>
                    User profile
                </Button>
                <br /><br />
                <Button variant="contained" color="primary" onClick={() => this.props.history.push(`/admin`)}>
                    Admin
                </Button>
            </div>
        ) : (
            <div style={{marginTop: '50px'}}>
                <CircularProgress />
            </div>
        )

        return (
            <div style={{width: '500px'}} className="center-page">
                <h2>Explain Center</h2>
                {content}
            </div>
        )
    }
}

const mapStateToProps = (val) => {
    return { auth: val.auth };
}

export default connect(mapStateToProps)(withRouter(Dashboard));