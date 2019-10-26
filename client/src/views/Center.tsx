import * as React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button } from '@material-ui/core';
import PlusIcon from '@material-ui/icons/Add';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
    leftIcon: {
        marginRight: '10px'
    }
}

export interface IMessage {
    _id: string;
    title: string;
    content: string;
    user: any;
    sent: Date;
}

interface ListOfMessages extends Array<IMessage>{}

interface Props extends RouteComponentProps {
    auth: any;
}
interface State {
    loaded: boolean;
    messages: Array<IMessage>;
}
class Dashboard extends React.Component<Props, State> {
    state = {
        loaded: false,
        messages: [] as ListOfMessages
    }

    componentDidMount() {
        axios.get('/api/explanations')
        .then(response => {
            this.setState({ loaded: true, messages: response.data as ListOfMessages });
        });
    }

    render() {

        const content = this.state.loaded ? (
            <div className="list">
                <Button variant="contained" color="primary" onClick={() => this.props.history.push(`/explain`)}>
                    <PlusIcon style={styles.leftIcon} /> Explain
                </Button>
                <Button variant="contained" color="primary" onClick={() => this.props.history.push(`/understand`)}>
                    <PlusIcon style={styles.leftIcon} /> Understand
                </Button>
                <Button variant="contained" color="primary" onClick={() => this.props.history.push(`/explanations`)}>
                    <PlusIcon style={styles.leftIcon} /> My previous explanations
                </Button>
                <Button variant="contained" color="primary" onClick={() => this.props.history.push(`/admin`)}>
                    <PlusIcon style={styles.leftIcon} /> Admin
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

const mapStateToProps = (val : any) => {
    return { auth: val.auth };
}

export default connect(mapStateToProps)(withRouter(Dashboard));