import * as React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import TButton from 'components/TButton';
import TextField from '@material-ui/core/TextField';
import { RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps {

}
interface State {
    english: string;
    swedish: string;
}
class AdminAddWord extends React.Component<Props, State> {
    state = {
        english: '',
        swedish: ''
    }

    saveWord = async () => {
        try {
            const response = await axios.post('/api/words', this.state);
            if (response) {
                this.props.history.push(`/admin`);
            } else {
                alert('Something went wrong: ' + err);                
            }
        } catch (err) {
            alert('Something went wrong: ' + err);
        }
    }

    cancelMessage = () => {
        this.props.history.push(`/admin`);
    }

    change = (lang : string, value : string) => {
        const state = {...this.state} as any;
        state[lang] = value;
        this.setState({ ...state });
    }

    render() {
        return (
            <div style={{width: '500px'}} className="explain-view">
                <h2>Add word</h2>
                <div style={{marginTop: '50px'}}>
                        {['english'].map((lang : string) => {
                            const state = this.state as any;
                            const value = state[lang] as any;
                            return (
                                <TextField
                                    id="standard-title"
                                    label={lang}
                                    variant="outlined"
                                    multiline
                                    rows="1"
                                    value={value}
                                    onChange={event => this.change(lang, event.target.value)}
                                    margin="normal"
                                    placeholder=""
                                    autoFocus={lang === 'english'}
                                    fullWidth
                                />
                            )
                        })}
                        <div style={{marginTop: '20px', display: 'flex', justifyContent: 'flex-end'}}>
                            <TButton onClick={this.saveWord}>
                                Save
                            </TButton>
                            <TButton onClick={this.cancelMessage}>
                                Cancel
                            </TButton>
                        </div>
                </div>
            </div>
        )
    }
}

export default withRouter(AdminAddWord);