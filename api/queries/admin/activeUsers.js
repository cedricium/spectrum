// @flow
import type { GraphQLContext } from '../../';
import { isAdmin } from '../../utils/permissions';
import { getAu } from '../../models/utils';

export default async (_: any, __: any, { user }: GraphQLContext) => {
  if (!isAdmin(user.id)) return null;

  const [
    dailyActive,
    weeklyActive,
    monthlyActive,
    quarterlyActive,
  ] = await Promise.all([
    getAu('daily'),
    getAu('weekly'),
    getAu('monthly'),
    getAu('quarterly'),
  ]);

  return {
    dailyActive,
    weeklyActive,
    monthlyActive,
    quarterlyActive,
  };
};
