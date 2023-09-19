import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import macStyles from '@sakun/system.css';
import styles from '@/styles/Home.module.css'
import {useState, useRef, useEffect} from 'react';
import Invited from './invited';
import {Howl, Howler} from 'howler';
// import Ping from '../public/pingSound.mp3';

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const [showModal, setShowModal] = useState(false);
  // const [ping, setPing] = useState(null);
  const [mute, setMute] = useState(false);
  const audioRef = useRef();
  var ping = new Howl({
    src: ['/pingSound.mp3']
  });


  // useEffect(()=>{
  //   setPing(new Audio('/pingSound.mp3'));
  // }, [])

  const setModal = () => {
    setShowModal(!showModal); 
    // if(showModal){
    //   if (ping) {
    //     // let pingAudio = setTimeout(()=>{
    //     //   ping.play()
    //     //   setPing(null);
    //     // }, 2500)

    //     // return ()=>{
    //     //   clearTimeout(pingAudio);
    //     // }
    //     ping.play();
    //   } else {
       
    //     console.log('ERR')
    //   }

    // }
    if(ping){
      setTimeout(()=>{
        ping.play();
        // setPing(null);
      }, 2500)

    }
  }


  // useEffect(()=>{
  //   setPing(new Audio('/pingSound.mp3'));
  //   // setMusic(new Audio('/music.mp3'));
    
  //   if(showModal){
  //     if (ping) {
  //       let pingAudio = setTimeout(()=>{
  //         ping.play()
  //         setPing(null);
  //       }, 2500)

  //       return ()=>{
  //         clearTimeout(pingAudio);
  //       }
  //     } else {
       
  //       console.log('ERR')
  //     }

  //   }
  // }, [showModal, mute])


  // useEffect(()=>{
  //   console.log(music)
  //   if(music != null){
  //     if(mute){
  //       muteMusic();
  //     }else{
  //       unMuteMusic();
  //     }
  //   }
  // }, [mute, music])

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <audio ref={audioRef} src='/pingSound.mp3' />
      <div className={styles.homeContainer}>
        <div className={styles.overlay}></div>
        <div className={styles.screen}>
          <div className={styles.folderContainer} onClick={() => setModal()}>
            <div className={styles.folder}></div>
            <h1 className={`${styles.folderName} dialog-text`}>DE ANIMA</h1>
          </div>    
          <div className={showModal ? `${styles.modal} ${styles.active}` : `${styles.modal}`}>
            <Invited show={showModal} setMute={setMute}/>
          </div>
          
        </div>


      </div>
    </>
  )
}
