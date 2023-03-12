// import { useRouter } from 'next/router';

import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import Login from '@/components/login';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

export default function LogIn() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.replace('/');
    }
  }, [router, session]);

  if (!session) {
    return (
      <Main
        meta={
          <Meta
            title="Login with your spotify account"
            description="Login page for spotify playlist generator"
          />
        }
      >
        <Login />
      </Main>
    );
  }
  return <></>;
}
