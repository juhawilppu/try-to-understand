import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

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

interface Props extends RouteComponentProps {
    auth: any;
}
class Header extends React.Component<Props> {

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
                        <span style={{marginRight: '20px'}}>{this.props.auth.email}</span>
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

    render() {

        return (
            <div className="header">
                <span className="product-name" onClick={this.gotoCenter}>
                    DontLetMeBeMisunderstood
                </span>
                <span className="profile">
                    {this.renderContent()}
                </span>
            </div>
        )
    }
}

const mapStateToProps = (val : any) => {
    return { auth: val.auth };
}


export default withRouter(connect(mapStateToProps)(Header));