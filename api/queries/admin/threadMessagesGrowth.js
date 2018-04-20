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
    getGrowth('messages', 'daily', 'timestamp', {
      threadType: 'story',
    }),
    getGrowth('messages', 'weekly', 'timestamp', {
      threadType: 'story',
    }),
    getGrowth('messages', 'monthly', 'timestamp', {
      threadType: 'story',
    }),
    getGrowth('messages', 'quarterly', 'timestamp', {
      threadType: 'story',
    }),
  ]);

  return {
    dailyGrowth,
    weeklyGrowth,
    monthlyGrowth,
    quarterlyGrowth,
  };
};
