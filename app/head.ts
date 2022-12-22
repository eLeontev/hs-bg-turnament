import { iniUrl } from '../constants/urls';

const RootHead = async () => {
  await fetch(`http://localhost:3000${iniUrl}`);
  return null;
};

export default RootHead;
