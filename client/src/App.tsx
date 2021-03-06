import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';
import CircularProgress from '@material-ui/core/CircularProgress';
import Header from 'views/Header';
import Landing from 'views/Landing';
import Explain from 'views/Explain';
import MainMenu from 'views/MainMenu';
import Explanations from 'views/Explanations';
import Admin from 'views/Admin';
import AdminAddWord from 'views/AdminAddWord';
import Guess from 'views/Guess';
import UserProfile from 'views/UserProfile';
import Leaderboards from 'views/Leaderboards';
import Username from 'views/Username';

interface Props {
  fetchUser: any;
  auth: any;
}
class App extends Component<Props> {

  componentDidMount = async () => {
    this.props.fetchUser();
  }

  render() {

    let routes;
    switch (this.props.auth) {
      case null: // Still fetching information.
        routes = (
          <div style={{marginTop: 100}}>
            <CircularProgress />
          </div>
        )
        break;
      case false: // User is not logged in
        routes = (
          <React.Fragment>
            <Route path="/" component={Landing} />
          </React.Fragment>
        )
        break;
      default: // User is logged in

          // If username has been set, proceed
          if (this.props.auth.username) {
            routes = (
              <React.Fragment>
                <Route path="/" exact component={MainMenu} />
                <Route path="/menu" exact component={MainMenu} />
                <Route path="/explain/:assignmentType" exact component={Explain} />
                <Route path="/guess" exact component={Guess} />
                <Route path="/explanations" exact component={Explanations} />
                <Route path="/leaderboards" exact component={Leaderboards} />
                <Route path="/admin" exact component={Admin} />
                <Route path="/admin/add-word" exact component={AdminAddWord} />
                <Route path="/user-profile" exact component={UserProfile} />
              </React.Fragment>
            )
          } else {
            routes = (
              <Route path="/" component={Username} />
            )
          }
    }

    return (
      <div className="container">
          <BrowserRouter>
            <React.Fragment>
              <Header />
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <Switch>
                  {routes}
                  <Redirect to="/" />
                </Switch>
              </div>
            </React.Fragment>
          </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (val : any) => {
  return { auth: val.auth };
}

export default connect(mapStateToProps, actions)(App);