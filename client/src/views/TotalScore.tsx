import * as React from 'react';

interface Props {
    score: number;
}
class TotalScore extends React.Component<Props> {
    state = {
        score: null
    }

    static getDerivedStateFromProps = (props : Props) => {
        return { score: props.score }
    }

    render() {
        return (
            <span className="header-total-score">{this.state.score}</span>
        )
    }
}

export default TotalScore;