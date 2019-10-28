import * as React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import TButton from 'components/TButton';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import CancelIcon from '@material-ui/icons/Cancel';


class AdminAddWord extends React.Component {
    state = {
        english: ''
    }

    sendMessage = async () => {
        const response = await axios.post('/api/words', this.state);
        if (response) {
            this.props.history.push(`/admin`);
        }
    }

    cancelMessage = () => {
        this.props.history.push(`/admin`);
    }

    change = (lang, value) => {
        const state = {...this.state};
        state[lang] = value;
        this.setState({ ...state });
    }

    render() {
        return (
            <div style={{width: '500px'}} className="explain-view">
                <h2>Explain</h2>
                <div style={{marginTop: '50px'}}>
                    <form noValidate autoComplete="off">
                        {['english'].map(lang => (
                            <TextField
                                id="standard-title"
                                label={lang}
                                variant="outlined"
                                multiline
                                rows="1"
                                value={this.state[lang]}
                                onChange={event => this.change(lang, event.target.value)}
                                margin="normal"
                                placeholder=""
                                autoFocus={lang === 'english'}
                                fullWidth
                            />
                        ))}
                        <div style={{marginTop: '20px', display: 'flex', justifyContent: 'flex-end'}}>
                            <TButton onClick={this.sendMessage}>
                                Save
                            </TButton>
                            <TButton onClick={this.cancelMessage}>
                                Cancel
                            </TButton>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(AdminAddWord);