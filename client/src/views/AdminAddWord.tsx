import * as React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import TButton from 'components/TButton';
import TextField from '@material-ui/core/TextField';

class AdminAddWord extends React.Component<any, any> {
    state = {
        english: ''
    }

    sendMessage = async () => {
        try {
            const response = await axios.post('/api/words', this.state);
            this.props.history.push(`/admin`);
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
                <h2>Explain</h2>
                <div style={{marginTop: '50px'}}>
                    <form noValidate autoComplete="off">
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