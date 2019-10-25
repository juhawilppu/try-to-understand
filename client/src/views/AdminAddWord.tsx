import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import CancelIcon from '@material-ui/icons/Cancel';

const styles = {
    leftIcon: {
        marginRight: '10px'
    }
}

interface Props extends RouteComponentProps {

}
interface State {
    english: string;
    french: string;
    finnish: string;
}
class NewMessage extends React.Component<Props, State> {
    state = {
        english: '',
        french: '',
        finnish: ''
    }

    sendMessage = async () => {
        const response = await axios.post('/api/words', this.state) as any;
        this.props.history.push(`/admin`);
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
                        {['english', 'french', 'finnish'].map((lang: any) => (
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
                            <Button variant="contained" color="primary" style={styles.leftIcon} onClick={this.sendMessage}>
                                <SendIcon style={styles.leftIcon} /> Save
                            </Button>
                            <Button variant="contained" onClick={this.cancelMessage}>
                                <CancelIcon style={styles.leftIcon} /> Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(NewMessage);