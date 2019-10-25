import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';

interface Props extends RouteComponentProps {

}
interface State {
    loaded: boolean;
    explanations: any;
}
class NewMessage extends React.Component<Props, State> {
    state = {
        loaded: false,
        explanations: [] as any
    }

    componentDidMount() {
        axios.get('/api/explanations').then(response => {
            this.setState({ loaded: true, explanations: response.data });
        }).catch(error => alert(error));
    }

    render() {
        return (
            <div style={{width: '500px'}} className="explain-view">
                <h2>Previous explanations</h2>
                {this.state.loaded && this.state.explanations.length === 0 && <div>No explanations. Call to action!</div>}
                {this.state.loaded && this.state.explanations.map((exp : any) => <div>{exp.word}</div>)}
                {!this.state.loaded && <div>Loading</div>}
            </div>
        )
    }
}

export default withRouter(NewMessage);