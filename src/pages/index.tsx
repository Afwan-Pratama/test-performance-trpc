import styles from './index.module.css'
import { type NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name='description' content='Generated by create-t3-app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <button>get</button>
          <p className={styles.showcaseText}></p>
        </div>
      </main>
    </>
  )
}

export default Home
