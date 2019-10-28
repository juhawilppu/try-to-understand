import * as React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

class Dashboard extends React.Component {
    state = {
        loaded: true
    }

    renderUi = () => {

        const option = (header, description, link) => {
            return { header, description, link }
        }

        const options = [
            option('Explain', 'Try to explain words', '/explain/TEXT_OPTIONS'),
            option('Guess', 'Guess what others tried to explain', '/guess'),
            option('Results', 'See results for your explanations', '/explanations'),
            option('Profile', 'See your profile', '/user-profile'),
            option('Leaderboard', 'See the champions', '/leaderboards'),
            option('Admin', 'Modify words', '/admin')
        ]

        return (
            <React.Fragment>
                <div className="block-list">
                    {options.filter((k,i) => i < 3).map(option => (
                        <div className="t-block" onClick={() => this.props.history.push(option.link)}>
                            <div className="block-header">{option.header}</div>
                            <div className="block-description">{option.description}</div>
                        </div>
                    ))}
                </div>
                <div className="block-list">
                    {options.filter((k,i) => i >= 3).map(option => (
                        <div className="t-block" onClick={() => this.props.history.push(option.link)}>
                            <div className="block-header">{option.header}</div>
                            <div className="block-description">{option.description}</div>
                        </div>
                    ))}
                </div>
            </React.Fragment>
        )
    }

    render() {
        const content = this.state.loaded ? (
            this.renderUi()
        ) : (
            <div style={{marginTop: '50px'}}>
                <CircularProgress />
            </div>
        )

        return (
            <div className="page center-page page">
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