import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const Index = () => {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.replace('/login');
    }
  }, [router, session]);

  const userMail = session?.user?.email;
  const [list, setList] = useState([]);

  const getMyPlaylists = async () => {
    const res = await fetch('/api/spotify/playlist/get');
    const { items } = await res.json();
    setList(items);
  };

  if (session) {
    return (
      <>
        Signed in as {userMail} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <hr />
        <button onClick={() => getMyPlaylists()}>Get all my playlists</button>
        {list &&
          list.map((item: any) => (
            <div key={item.id}>
              <h1>{item.name}</h1>
              <img src={item.images[0]?.url} width="100" />
            </div>
          ))}
      </>
    );
  }
  return <></>;
};

export default Index;
