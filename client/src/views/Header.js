import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Logo from '../common/Logo';

const theme = createMuiTheme({
    overrides: {
        MuiButton: {
            text: {
                color: 'white'
            }
        }
    },
    palette: {
      primary: {
          main: '#FFFFFF'
      }
    }
});

class Header extends React.Component {

    renderContent() {
        switch(this.props.auth) {
            case null:
                return '...';
            case false:
                return (
                    <MuiThemeProvider theme={theme}>
                        <Button href="/auth/google" color="primary">Login with Google</Button>
                    </MuiThemeProvider>
                )
            default:
                return (
                    <React.Fragment>
                        <span style={{marginRight: '20px'}} onClick={this.gotoProfile}>user-{this.props.auth.id}</span>
                        <MuiThemeProvider theme={theme}>
                            <Button color="primary" href="/api/logout">Logout</Button>
                        </MuiThemeProvider>
                    </React.Fragment>
                )
        }
    }

    gotoCenter = () => {
        this.props.history.push(`/center`);
    }

    gotoProfile = () => {
        this.props.history.push(`/user-profile`);
    }

    render() {

        return (
            <div className="header">
                <span className="product-name" onClick={this.gotoCenter}>
                    <Logo wrap />
                </span>
                <span className="profile">
                    {this.renderContent()}
                </span>
            </div>
        )
    }
}

const mapStateToProps = (val) => {
    return { auth: val.auth };
}

export default withRouter(connect(mapStateToProps)(Header));