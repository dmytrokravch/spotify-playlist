// import { useRouter } from 'next/router';

import Login from '@/components/login';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
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
};

export default Index;
