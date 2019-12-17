import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

class MainMenu extends React.Component<any, any> {
    state = {
        loaded: true
    }

    renderUi = () => {

        const option = (header : string, description : string, link : string) => {
            return { header, description, link }
        }

        const rows = [
            [
                option('Explain', 'Try to explain words', '/explain/TEXT_OPTIONS'),
                option('Guess', 'Guess what others tried to explain', '/guess'),
            ],
            [
                option('Profile', 'See your profile', '/user-profile'),
                option('Leaderboards', 'See the champions', '/leaderboards')
            ],
            [
                option('Admin', 'Modify words', '/admin')
            ]
        ];

        return (
            <React.Fragment>
                    {rows.map(rowOptions => (
                         <div className="block-list top">
                            {rowOptions.map(option => (
                                <div key={option.header} className={`t-block ${option.header}`} onClick={() => this.props.history.push(option.link)}>
                                    <div className="block-header">{option.header}</div>
                                    <div className="block-description">{option.description}</div>
                                </div>
                            ))}
                        </div>
                    ))}
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
                <h2>Main Menu</h2>
                {content}
            </div>
        )
    }
}

const mapStateToProps = (val : any) => {
    return { auth: val.auth };
}

export default connect(mapStateToProps)(withRouter(MainMenu));