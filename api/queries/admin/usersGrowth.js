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
    getGrowth('users', 'daily', 'createdAt'),
    getGrowth('users', 'weekly', 'createdAt'),
    getGrowth('users', 'monthly', 'createdAt'),
    getGrowth('users', 'quarterly', 'createdAt'),
  ]);

  return {
    dailyGrowth,
    weeklyGrowth,
    monthlyGrowth,
    quarterlyGrowth,
  };
};
