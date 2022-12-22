import { NextApiRequest, NextApiResponse } from 'next';

let isRunning = false;
const sendOkStatus = (res: NextApiResponse) => res.send('ok');

const initServerHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (isRunning) {
    return sendOkStatus(res);
  }

  isRunning = true;

  // sockets
  sendOkStatus(res);
};

export default initServerHandler;
