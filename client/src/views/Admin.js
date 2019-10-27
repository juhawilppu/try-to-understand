import * as React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class NewMessage extends React.Component {
    state = {
        loaded: false,
        words: []
    }

    componentDidMount() {
        this.load();
    }

    load = () => {
        axios.get('/api/admin/words').then(response => {
            this.setState({ loaded: true, words: response.data });
        }).catch(error => alert(error));
    }

    gotoAddWord = () => {
        this.props.history.push(`/admin/add-word`);
    }

    delete = (id) => {
        axios.delete(`/api/admin/words/${id}`).then(response => {
            this.load();
        });
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
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.loaded && this.state.words.map(exp => 
                            <tr key={exp.id}>
                                <td>{exp.english}</td>
                                <td>{exp.french}</td>
                                <td>{exp.finnish}</td>
                                <td><button onClick={() => this.delete(exp._id)}>Delete</button></td>
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