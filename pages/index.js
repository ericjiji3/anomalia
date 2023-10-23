import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import macStyles from '@sakun/system.css';
import styles from '@/styles/Home.module.css'
import {useState, useRef, useEffect} from 'react';
import Invited from './invited';
import {Howl, Howler} from 'howler';

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [mute, setMute] = useState(false);
  const audioRef = useRef();
  var ping = new Howl({
    src: ['/pingSound.mp3'],
    html5: true
  });


  const setModal = () => {
    setShowModal(!showModal); 

    if(ping){
      setTimeout(()=>{
        ping.play();

      }, 2500)

    }
  }


  return (
    <>
      <Head>
        <title>De Anima</title>
        <meta name="description" content="De Anima" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <audio ref={audioRef} src='/pingSound.mp3' />
      <div className={styles.homeContainer}>
        <div className={styles.overlay}></div>
        <div className={styles.screen}>
          <div className={styles.folderContainer} onClick={() => setModal()}>
            <div className={styles.folder}></div>
            <h1 className={`${styles.folderName} dialog-text`}>DE ANIMA</h1>
          </div>    

          
        </div>


      </div>
      <div className={showModal ? `${styles.modal} ${styles.active}` : `${styles.modal}`}>
            <Invited show={showModal} setMute={setMute}/>
          </div>
    </>
  )
}
