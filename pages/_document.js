import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="SME SecuAware - Cybersecurity platform for Kenyan SMEs" />
        {/* Removed viewport meta tag as per Next.js best practices */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="bg-gray-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}