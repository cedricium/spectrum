// @flow
import * as React from 'react';
import compose from 'recompose/compose';
import { ChartContainer } from './style';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import viewNetworkHandler, {
  type ViewNetworkHandlerType,
} from '../../../components/viewNetworkHandler';
import { Loading } from '../../../components/loading';
import ViewError from '../../../components/viewError';
import getAdminCoreMetrics from '../../../api/queries/coreMetrics';
import { convertTimestampToDate } from '../../../helpers/utils';

type Props = {
  data: {
    adminOverview: {
      coreMetrics: Array<Object>,
    },
  },
  fields: Array<string>,
  ...$Exact<ViewNetworkHandlerType>,
};

class ActivityChart extends React.Component<Props> {
  render() {
    const { data, isLoading, fields } = this.props;

    if (data.adminOverview) {
      const { coreMetrics } = data.adminOverview;
      const cleaned = coreMetrics.map(o => {
        return Object.assign({}, o, {
          date: convertTimestampToDate(o.date),
        });
      });

      return (
        <ChartContainer>
          <ResponsiveContainer width="100%" aspect={5.0 / 2.0}>
            <LineChart data={cleaned}>
              {fields.map(field => {
                return (
                  <Line
                    key={field}
                    dot={false}
                    activeDot={true}
                    name={field}
                    type="monotone"
                    dataKey={field}
                    animationDuration={800}
                  />
                );
              })}
              <YAxis hide={true} domain={['dataMin', 'dataMax']} />
              <XAxis dataKey={'date'} hide={true} />
              <Tooltip cursor={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      );
    }

    if (isLoading) {
      return (
        <ChartContainer>
          <Loading />
        </ChartContainer>
      );
    }

    return (
      <ChartContainer>
        <ViewError />
      </ChartContainer>
    );
  }
}
export default compose(getAdminCoreMetrics, viewNetworkHandler)(ActivityChart);
