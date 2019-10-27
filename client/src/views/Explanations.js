import * as React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class NewMessage extends React.Component {
    state = {
        loaded: false,
        explanations: []
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
                {this.state.loaded && this.state.explanations.map((exp) =>
                    <div>{exp.Word[exp.language]}</div>
                )}
                {!this.state.loaded && <div>Loading</div>}
            </div>
        )
    }
}

export default withRouter(NewMessage);