// @flow
import * as React from 'react';
import {
  CardListItem,
  CardListItemCount,
  CardListItemLabel,
  Percent,
} from './index';

type Props = {
  label: string,
  count: number,
  total?: number,
  comparison?: number,
  noPercent?: boolean,
};

class GrowthRow extends React.Component<Props> {
  render() {
    const { count, total, comparison, label, noPercent = false } = this.props;

    const percent = comparison
      ? Math.round((count - comparison) / comparison * 100)
      : total ? Math.round(count / total * 100) : 0;

    const percentString =
      percent > 0 && comparison
        ? `+${percent.toLocaleString()}`
        : percent.toLocaleString();

    const tipText = comparison
      ? `Prev ${comparison.toLocaleString()}`
      : total ? `Total ${total.toLocaleString()}` : `Total`;

    return (
      <CardListItem noPercent={noPercent}>
        <CardListItemLabel>{label}</CardListItemLabel>
        <CardListItemCount>{count.toLocaleString()}</CardListItemCount>
        {!noPercent && (
          <Percent tipLocation={'left'} tipText={tipText} percent={percent}>
            {percentString}%
          </Percent>
        )}
      </CardListItem>
    );
  }
}

export default GrowthRow;
