// @flow
import * as React from 'react';
import { CardListItem, CardListItemCount, CardListItemLabel } from './index';

type Props = {
  label: string,
  count: number,
};

class GrowthRow extends React.Component<Props> {
  render() {
    const { count, label } = this.props;

    return (
      <CardListItem noPercent={true}>
        <CardListItemLabel>{label}</CardListItemLabel>
        <CardListItemCount>{count.toLocaleString()}</CardListItemCount>
      </CardListItem>
    );
  }
}

export default GrowthRow;
