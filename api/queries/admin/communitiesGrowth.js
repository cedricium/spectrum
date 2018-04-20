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
    getGrowth('communities', 'daily', 'createdAt'),
    getGrowth('communities', 'weekly', 'createdAt'),
    getGrowth('communities', 'monthly', 'createdAt'),
    getGrowth('communities', 'quarterly', 'createdAt'),
  ]);

  return {
    dailyGrowth,
    weeklyGrowth,
    monthlyGrowth,
    quarterlyGrowth,
  };
};
