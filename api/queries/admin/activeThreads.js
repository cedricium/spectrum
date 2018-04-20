// @flow
import type { GraphQLContext } from '../../';
import { isAdmin } from '../../utils/permissions';
import { getAt } from '../../models/utils';

export default async (_: any, __: any, { user }: GraphQLContext) => {
  if (!isAdmin(user.id)) return null;

  const [
    dailyActive,
    weeklyActive,
    monthlyActive,
    quarterlyActive,
  ] = await Promise.all([
    getAt('daily'),
    getAt('weekly'),
    getAt('monthly'),
    getAt('quarterly'),
  ]);

  return {
    dailyActive,
    weeklyActive,
    monthlyActive,
    quarterlyActive,
  };
};
