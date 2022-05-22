import Head from 'next/head';
import Image from 'next/image';


export default function Edit() {
  return (
    <div>
      <Head>
        <title>Edit Article</title>
        <meta
          name="description"
          content="Edit"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>
          Edit article
        </h1>
        <div>
           here is how to edit article
        </div>
      </main>


    </div>
  );
}
