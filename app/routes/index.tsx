import type { LoaderFunction } from '@remix-run/node';
import { useEffect } from 'react';
import api from '~/utils/api';

export const loader: LoaderFunction = async () => {
  // const user = await api.createAccount('kokot@pica.com', 'jebekREBEK', 'kokot');
  // console.log(user);
  // await api.createSession('kokot@pica.com', 'jebekREBEK');
  // const user = await api.getAccount();
  // console.log(user);
  return {};
};

export default function Index() {
  useEffect(() => {
    const lplp = async () => {
      await api.createSession('kokot@pica.com', 'jebekREBEK');
      const user = await api.getAccount();
      console.log(user);
    };
    lplp();
  }, []);

  const handleSignup = async (e: any) => {
    e.preventDefault();
    try {
      const user = await api.createAccount('kokot@pica.com', 'jebek', 'kokot');
      console.log(user);
      await api.createSession('kokot@pica.com', 'jebek');
    } catch (e) {}
  };
  return (
    <div>
      <button onClick={handleSignup}>Create acc</button>
    </div>
  );
}
