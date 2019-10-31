import * as React from 'react';

class TotalScore extends React.Component {
    state = {
        score: null
    }

    static getDerivedStateFromProps = props => {
        return { score: props.score }
    }

    render() {
        return (
            <span className="header-total-score">{this.state.score}</span>
        )
    }
}

export default TotalScore;