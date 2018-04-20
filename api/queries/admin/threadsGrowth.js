// @flow
import type { GraphQLContext } from '../../';
import { isAdmin } from '../../utils/permissions';
import { getGrowth } from '../../models/utils';

export default async (_: any, __: any, { user }: GraphQLContext) => {
  if (!isAdmin(user.id)) return null;

  const [
    dailyGrowth,
    weeklyGrowth,
    monthlyGrowth,
    quarterlyGrowth,
  ] = await Promise.all([
    getGrowth('threads', 'daily', 'createdAt'),
    getGrowth('threads', 'weekly', 'createdAt'),
    getGrowth('threads', 'monthly', 'createdAt'),
    getGrowth('threads', 'quarterly', 'createdAt'),
  ]);

  return {
    dailyGrowth,
    weeklyGrowth,
    monthlyGrowth,
    quarterlyGrowth,
  };
};
