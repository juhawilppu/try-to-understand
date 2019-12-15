import * as React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import TButton from 'components/TButton';
import { RouteComponentProps } from "react-router-dom";

interface Word {
    id: number;
    language: string;
    word: "english" | "swedish";
}

interface Props extends RouteComponentProps {

}
interface State {
    loaded: boolean;
    words: Word[] | null;
}
class Admin extends React.Component<Props, State> {
    state = {
        loaded: false,
        words: null
    }

    componentDidMount() {
        this.load();
    }

    load = () => {
        axios.get('/api/admin/words').then(response => {
            this.setState({
                loaded: true,
                words: response.data
            });
        }).catch(error => alert(error));
    }

    gotoAddWord = () => {
        this.props.history.push(`/admin/add-word`);
    }

    delete = (id : number) => {
        axios.delete(`/api/admin/words/${id}`).then(response => {
            this.load();
        }).catch(error => alert(error));
    }

    renderTable = (words : Word[]) => (
        <table>
            <thead>
                <tr>
                    <th>Language</th>
                    <th>Word</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {words.map(exp =>
                    <tr key={exp.id}>
                        <td>{exp.language}</td>
                        <td>{exp.word}</td>
                        <td><TButton flat onClick={() => this.delete(exp.id)}>Delete</TButton></td>
                    </tr>
                )}
            </tbody>
        </table>
    )

    render() {

        if (!this.state.loaded) {
            return <div>Loading...</div>
        }
        
        const words = this.state.words! as Word[];

        return (
            <div style={{width: '500px'}} className="explain-view">
                <h2>Words</h2>
                {this.state.loaded && this.renderTable(words)}
                <TButton onClick={this.gotoAddWord}>Add word</TButton>
                {this.state.loaded && words.length === 0 && <div>No words.</div>}
                {!this.state.loaded && <div>Loading</div>}
            </div>
        )
    }
}

export default withRouter(Admin);