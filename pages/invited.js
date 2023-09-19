import styles from '@/styles/Invited.module.css'
import {useState,  useEffect, useRef} from 'react';
import macStyles from '@sakun/system.css';
import Image from 'next/image';
import im1 from '../public/images/dialogimg1.jpg';
import im2 from '../public/images/dialogimg2.png';
import im3 from '../public/images/dialogimg3.png';
import emailjs from '@emailjs/browser';
import {Howl, Howler} from 'howler';

export default function Invited(props){
    const [showDialog, setShowDialog] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [nameErr, setNameErr] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const [apiErr, setApiErr] = useState(false);
    const [success, setSuccess] = useState(false);
    const [audioIcon, setAudioIcon] = useState(true);
    const [muted, setMuted] = useState(false);
    // const [music, setMusic] = useState(null);
    var music = new Howl({
        src: ['/music.mp3']
      });
    
    // const audioRef = useRef();
    const form = useRef();
    
    useEffect(()=>{
        if(props.show){
            let setDialog = setTimeout(()=>{
                setShowDialog(true);
            }, 2500)
            return ()=>{
                clearTimeout(setDialog);
            }
        }
    },[props.show])

    useEffect(()=>{
        
        if(showDialog){
            
            // let musicAudio = setTimeout(()=>{
            //     // music.setVolume(0.05);
            //     // music.play();
            //     playMusic();
            //     // let fadeIn = setInterval(()=>{
            //       if(mute){
            //         muteMusic();
            //       }else{
            //         unMuteMusic();
            //       }
            //     // })
            //     // setMusic(null);
            //   }, 5000)
            music.play();
            if(muted){
                music.volume = 0;
            }else{
                music.volume = 1;
            }
        }

    }, [showDialog, muted])

    // useEffect(()=>{
    //     if(music != null){
    //         if(muted){
    //             music.volume = 0;
    //         }else{
    //             music.volume = 1;
    //         }
    //     }
    // }, [muted])

    function toggleIcon(e){
        e.preventDefault();
        setAudioIcon(!audioIcon);
        setMuted(!muted);
        console.log("muteval: ", muted)
    }

    function validateFields(data){
        var validate = true;
        Object.keys(data).forEach(function(field, index){
            if(field == 'name'){
                if(!data[field]){
                    validate = false;
                    setNameErr(true);
                }
            }
            if(field == 'email'){
                var emailData = data[field];
                emailData.toLowerCase();
                if(!emailData.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) || !email){
                    validate = false;
                    setEmailErr(true);
                }
            }
        })
        return validate;
    }
    function submitForm(e){
        e.preventDefault();
        setNameErr(false);
        setEmailErr(false);
        setApiErr(false);
        console.log("name", name)
        console.log("email", email);
        if(name == ''){
            setNameErr(true);
            console.log("name err");
        }
        if(!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) || !email){
            setEmailErr(true);
            console.log("email err");
        }
        var data = {
            'name' : name,
            'email' : email
        }

        if(validateFields(data)){
            emailjs.sendForm('service_029dz8q', 'template_xtdv1r7', e.target, '3TfhFL9kwSBycbVYV')
            .then((result) => {
                console.log(result.text);
                setSuccess(true);
                e.target.reset();
            }, (error) => {
                console.log(error.text);
                setApiErr(true);
                e.target.reset();
            });
            console.log('success!!!!');
        }else{
            console.log('loser');
        }

        // if(!emailErr && !nameErr){

            

    }

    return(
        <div className={`${styles.invitedContainer} window`}>
            {/* <audio ref={audioRef} src='/music.mp3' /> */}
            <div className={`title-bar`}>
                <button aria-label="Close" onClick={toggleIcon} className={audioIcon ? `${styles.iconContainer} close` : `${styles.iconContainer} close ${styles.muted}`}></button>
                <h1 className={`title`}>De Anima</h1>
                {/* <button aria-label="Resize" className={`resize`}></button> */}
            </div>
            <div className={`separator`}></div>
            <div className={styles.bg}>
                {/* {showDialog &&  */}
                <div className={showDialog ? `${styles.dialogContainer} ${styles.active} standard-dialog` : `${styles.dialogContainer} standard-dialog`}>
                    
                    <div className={styles.flex}>
                        <div className={styles.textContainer}>
                            <h1 className={`${styles.header} dialog-text`}>Your Invited</h1>
                            <p className={`${styles.text} dialog-text`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus feugiat in ante metus dictum at. Accumsan in nisl nisi scelerisque eu ultrices vitae. Porttitor eget dolor morbi non. Pulvinar sapien et ligula ullamcorper malesuada proin libero. Euismod in pellentesque massa placerat duis ultricies lacus. Auctor neque vitae tempus quam pellentesque. Commodo elit at imperdiet dui accumsan sit amet nulla. Vel orci porta non pulvinar neque laoreet suspendisse interdum consectetur. Arcu ac tortor dignissim convallis aenean et tortor at risus. In arcu cursus euismod quis viverra nibh cras pulvinar mattis. Nulla facilisi morbi tempus iaculis.</p>
                            <form className={styles.inputContainer} ref={form} onSubmit={submitForm}>
                                <div className={styles.labelInput}>
                                    <label for="name" className={`dialog-text`}>Full Name:</label>
                                    <input id="name" name="name" type="text" placeholder="" value={name} onChange={(e) => setName(e.target.value)}/>
                                </div>
                                <div className={styles.labelInput}>
                                    <label for="email" className={`dialog-text`}>Email:</label>
                                    <input id="email" name="email" type="text" placeholder="" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                                <input className={`${styles.submitButt} btn`} type="submit" valaue="Submit"/>
                                <div className={styles.resultContainer}>
                                    <div className={nameErr ? `${styles.nameInvalid} ${styles.active}` : `${styles.nameInvalid}`}>
                                        <p>Full Name is empty.</p>
                                    </div>
                                    <div className={emailErr ? `${styles.emailInvalid} ${styles.active}` : `${styles.emailInvalid}`}>
                                        <p>Email is invalid.</p>
                                    </div>
                                    <div className={apiErr ? `${styles.apiInvalid} ${styles.active}` : `${styles.apiInvalid}`}>
                                        <p>An error occurred.</p>
                                    </div>
                                    <div className={success ? `${styles.success} ${styles.active}` : `${styles.success}`}>
                                        <p>Check your email;)</p>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className={styles.imagesContainer}>
                            <div className={styles.imageContainer}>
                                <Image src={im1} width={120} height={120} alt="oops"/>
                            </div>
                            <div className={styles.imageContainer}>
                                <Image src={im2} width={120} height={120} alt="oops"/>
                            </div>
                            <div className={styles.imageContainer}>
                                <Image src={im3} width={120} height={120} alt="oops"/>
                            </div>
                        </div>
                    </div>
                    
                </div>
{/* } */}
            </div>

            
        </div>
    )
}