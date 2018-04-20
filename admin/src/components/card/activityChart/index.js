// @flow
import * as React from 'react';
import TabBar from '../../../components/card/tabBar';
import ActivityChart from './chart';

type Props = {
  labels?: Array<Label>,
  timeframes: Array<Timeframe>,
  fields: Array<string>,
};

type Label = {
  key: string,
  value: string,
};

type Timeframe = {
  key: string,
  value: number,
};

type State = {
  labels: ?Array<Label>,
  timeframes: Array<Timeframe>,
  activeLabel: ?Label,
  activeTimeframe: Timeframe,
};

class Activity extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      labels: props.labels ? props.labels : null,
      timeframes: props.timeframes,
      activeLabel: props.labels ? props.labels[0] : null,
      activeTimeframe: props.timeframes[0],
    };
  }

  selectLabel = (label: string) => {
    if (!this.state.labels) return;
    return this.setState({
      activeLabel: this.state.labels.find(o => o.key === label),
    });
  };

  selectTimeframe = (timeframe: string) => {
    return this.setState({
      activeTimeframe: this.state.timeframes.find(o => o.key === timeframe),
    });
  };

  render() {
    const { labels, timeframes, activeLabel, activeTimeframe } = this.state;
    const { fields } = this.props;

    return (
      <React.Fragment>
        {labels && (
          <TabBar
            type={'tabs'}
            labels={labels.map(o => o.key)}
            active={activeLabel ? activeLabel.key : ''}
            onLabelSelect={label => this.selectLabel(label)}
          />
        )}

        <TabBar
          type={'pills'}
          labels={timeframes.map(o => o.key)}
          active={activeTimeframe.key}
          onLabelSelect={label => this.selectTimeframe(label)}
        />

        <ActivityChart
          fields={activeLabel ? [activeLabel.value] : [...fields]}
          timeframe={activeTimeframe.value}
        />
      </React.Fragment>
    );
  }
}

export default Activity;
