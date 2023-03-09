import { signIn, useSession } from 'next-auth/react';

const Login = () => {
  const { status } = useSession();

  return (
    <div className="relative h-screen bg-gradient-to-br from-emerald-100 to-gray-200">
      <div className="">
        <div className="m-auto w-11/12 pt-20 md:w-8/12 lg:w-4/12 xl:w-4/12">
          <div className="rounded-xl bg-white shadow-xl">
            <div className="p-6 sm:p-16">
              <div className="space-y-4">
                <h2 className="mb-8 text-center text-2xl font-bold capitalize text-cyan-900">
                  Sign in to your spotify account
                </h2>
              </div>
              <div>{status}</div>
              <div className="mt-16 grid space-y-4">
                {status !== 'authenticated' && (
                  <>
                    <button
                      onClick={() => signIn()}
                      className="my-4 w-full rounded-lg bg-green-400 p-3 text-lg font-semibold text-white"
                    >
                      Continue with Spotify
                    </button>
                  </>
                )}
                {status === 'authenticated' && (
                  <>
                    <p>You are logged in!</p>
                  </>
                )}
              </div>
              <div className="mt-16 space-y-4 text-center text-gray-600 sm:-mb-8">
                <p className="text-xs">This site is protected by reCAPTCHA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
