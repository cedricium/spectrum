// @flow
import type { GraphQLContext } from '../../';
import { isAdmin } from '../../utils/permissions';
import { getCoreMetrics } from '../../models/utils';

type CoreMetricsArgs = { timeframe: number };

export default async (
  _: any,
  { timeframe }: CoreMetricsArgs,
  { user }: GraphQLContext
) => {
  if (!isAdmin(user.id)) return [];

  return await getCoreMetrics(timeframe);
};
