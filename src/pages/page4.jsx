import Head from 'next/head';
import Google_logo from '../../public/img/google_logo.png'
import ios_logo from '../../public/img/apple-logo-transparent.png'
import Image from 'next/image';

const Page4 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Head>
        <title>Sign In</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Let’s you in</h1>
        
        <div className="space-y-4">
          <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            <span className="sr-only">Continue with Google</span>
            <Image src={Google_logo} width={20}/>
            Continue with Google
          </button>
          <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            <span className="sr-only">Continue with Apple</span>
            <Image src={ios_logo} width={20}/>
            Continue with Apple
          </button>
        </div>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">( Or )</span>
          </div>
        </div>

        <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Sign In with Your Account
        </button>

        <p className="mt-8 text-center text-sm text-gray-600">
          Don’t have an Account?{' '}
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
            SIGN UP
          </a>
        </p>
      </main>
    </div>
  );
}

export default Page4;