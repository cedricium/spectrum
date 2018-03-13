// @flow
import { Router } from 'express';
import { db } from '../../models/db';
const dataRouter = Router();

// $FlowIssue
dataRouter.get('/coremetrics', async (req, res) => {
  console.log('getting core metrics');
  const json = await db.table('coreMetrics').run();
  res.send(JSON.stringify(json));
});

export default dataRouter;
