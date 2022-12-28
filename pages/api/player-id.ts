import { NextApiRequest, NextApiResponse } from 'next';
import { getHash } from '../../utils.ts/hash-server.utils';

const generatePlayerId = async (req: NextApiRequest, res: NextApiResponse) =>
    res.send({ playerId: await getHash(), privatePlayerId: await getHash() });

export default generatePlayerId;
