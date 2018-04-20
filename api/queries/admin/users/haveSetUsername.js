// @flow
import type { GraphQLContext } from '../../../';
import { isAdmin } from '../../../utils/permissions';
import { getUsersWhoHaveSetUsername } from '../../../models/admin/users';

export default async (_: any, __: any, { user }: GraphQLContext) => {
  if (!isAdmin(user.id)) return null;

  return await getUsersWhoHaveSetUsername();
};
