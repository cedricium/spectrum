// @flow
import * as React from 'react';
import { TabBarContainer, TabBarList, TabBarListItem } from './index';

type Props = {
  labels: Array<string>,
  onLabelSelect: Function,
  type: 'tabs' | 'pills',
  active: string,
};

type State = {
  activeLabel: string,
};

class TabBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      activeLabel: props.active,
    };
  }

  setActiveLabel = (label: string) => {
    this.setState({
      activeLabel: label,
    });
    this.props.onLabelSelect(label);
  };

  render() {
    const { activeLabel } = this.state;
    const { labels, type = 'tabs' } = this.props;

    return (
      <TabBarContainer>
        <TabBarList type={type}>
          {labels.map(label => {
            return (
              <TabBarListItem
                key={label}
                type={type}
                active={activeLabel === label}
                onClick={() => this.setActiveLabel(label)}
              >
                {label}
              </TabBarListItem>
            );
          })}
        </TabBarList>
      </TabBarContainer>
    );
  }
}

export default TabBar;
