import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

class Dashboard extends React.Component<any, any> {
    state = {
        loaded: true
    }

    renderUi = () => {

        const option = (header : string, description : string, link : string) => {
            return { header, description, link }
        }

        const row1 = [
            option('Explain', 'Try to explain words', '/explain/TEXT_OPTIONS'),
            option('Guess', 'Guess what others tried to explain', '/guess'),
        ]
        const row2 = [
            option('Profile', 'See your profile', '/user-profile'),
            option('Leaderboards', 'See the champions', '/leaderboards')
        ]
        const row3 = [
            option('Admin', 'Modify words', '/admin')
        ]

        return (
            <React.Fragment>
                <div className="block-list top">
                    {row1.map(option => (
                        <div key={option.header} className="t-block" onClick={() => this.props.history.push(option.link)}>
                            <div className="block-header">{option.header}</div>
                            <div className="block-description">{option.description}</div>
                        </div>
                    ))}
                </div>
                <div className="block-list top">
                    {row2.map(option => (
                        <div key={option.header} className="t-block" onClick={() => this.props.history.push(option.link)}>
                            <div className="block-header">{option.header}</div>
                            <div className="block-description">{option.description}</div>
                        </div>
                    ))}
                </div>
                <div className="block-list top">
                    {row3.map(option => (
                        <div key={option.header} className="t-block" onClick={() => this.props.history.push(option.link)}>
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

const mapStateToProps = (val : any) => {
    return { auth: val.auth };
}

export default connect(mapStateToProps)(withRouter(Dashboard));