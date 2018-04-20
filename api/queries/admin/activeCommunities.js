// @flow
import type { GraphQLContext } from '../../';
import { isAdmin } from '../../utils/permissions';
import { getAc } from '../../models/utils';

export default async (_: any, __: any, { user }: GraphQLContext) => {
  if (!isAdmin(user.id)) return null;

  const [
    dailyActive,
    weeklyActive,
    monthlyActive,
    quarterlyActive,
  ] = await Promise.all([
    getAc('daily'),
    getAc('weekly'),
    getAc('monthly'),
    getAc('quarterly'),
  ]);

  return {
    dailyActive,
    weeklyActive,
    monthlyActive,
    quarterlyActive,
  };
};
