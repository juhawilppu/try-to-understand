import * as React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import TButton from 'components/TButton';

class Admin extends React.Component {
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
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.loaded && this.state.words.map(exp => 
                            <tr key={exp.id}>
                                <td>{exp.english}</td>
                                <td><TButton flat onClick={() => this.delete(exp._id)}>Delete</TButton></td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <TButton onClick={this.gotoAddWord}>Add word</TButton>
                {this.state.loaded && this.state.words.length === 0 && <div>No words.</div>}
                {!this.state.loaded && <div>Loading</div>}
            </div>
        )
    }
}

export default withRouter(Admin);