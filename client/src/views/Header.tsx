import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Logo from '../common/Logo';
import TButton from 'components/TButton';
import TotalScore from 'views/TotalScore';

class Header extends React.Component<any> {

    renderContent() {
        switch(this.props.auth) {
            case null:
                return '...';
            case false:
                return (
                    <div>
                        <TButton href="/auth/google" color="primary">Login with Google</TButton>
                    </div>
                )
            default:
                return (
                    <React.Fragment>
                        <TotalScore score={this.props.auth.totalScore as number} />
                        <span className="header-username" onClick={this.gotoProfile}>{this.props.auth.username}</span>
                        <TButton flat color="white" href="/api/logout">Logout</TButton>
                    </React.Fragment>
                )
        }
    }

    gotoMenu = () => {
        this.props.history.push(`/menu`);
    }

    gotoProfile = () => {
        this.props.history.push(`/user-profile`);
    }

    render() {

        return (
            <div className="header">
                <span className="product-name" onClick={this.gotoMenu}>
                    <Logo wrap />
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