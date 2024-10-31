import { useEffect } from 'react';
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router';

import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/bridge');
}, [router]);

  return (
    <>
      <Header />  
      <main className={`${styles.main} ${inter.className}`}>
       
      </main>
    </>
  )
}
