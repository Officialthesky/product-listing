import Head from 'next/head';
import Header from '../Header';

export default function Layout({ children, title, description }) {
  return (
    <>
      <Head>
        <title>{title || 'THE SKY STORE'}</title>
        <meta name="description" content={description || 'Browse our products'} />
      </Head>
      <Header />
      <div className="pt-16 h-[calc(100vh-2rem)] flex flex-col bg-gray-100">
        <main className="flex-1 overflow-auto p-6 md:p-0 bg-white">
          {children}
        </main>
      </div>
    </>
  );
}
