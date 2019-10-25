import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';

interface Props extends RouteComponentProps {

}
interface State {
    loaded: boolean;
    words: any;
}
class NewMessage extends React.Component<Props, State> {
    state = {
        loaded: false,
        words: [] as any
    }

    componentDidMount() {
        axios.get('/api/words').then(response => {
            this.setState({ loaded: true, words: response.data });
        }).catch(error => alert(error));
    }

    gotoAddWord = () => {
        this.props.history.push(`/admin/add-word`);
    }

    render() {
        return (
            <div style={{width: '500px'}} className="explain-view">
                <h2>Words</h2>
                <table>
                    <thead>
                        <tr>
                            <th>English</th>
                            <th>French</th>
                            <th>Finnish</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.loaded && this.state.words.map((exp : any) => 
                            <tr>
                                <td>{exp.english}</td>
                                <td>{exp.french}</td>
                                <td>{exp.finnish}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <button onClick={this.gotoAddWord}>Add word</button>
                {this.state.loaded && this.state.words.length === 0 && <div>No words.</div>}
                {!this.state.loaded && <div>Loading</div>}
            </div>
        )
    }
}

export default withRouter(NewMessage);