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
      threadType: 'directMessageThread',
    }),
    getGrowth('messages', 'weekly', 'timestamp', {
      threadType: 'directMessageThread',
    }),
    getGrowth('messages', 'monthly', 'timestamp', {
      threadType: 'directMessageThread',
    }),
    getGrowth('messages', 'quarterly', 'timestamp', {
      threadType: 'directMessageThread',
    }),
  ]);

  return {
    dailyGrowth,
    weeklyGrowth,
    monthlyGrowth,
    quarterlyGrowth,
  };
};
