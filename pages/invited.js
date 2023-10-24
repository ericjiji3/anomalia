import styles from '@/styles/Invited.module.css'
import {useState,  useEffect, useRef} from 'react';
import macStyles from '@sakun/system.css';
import Image from 'next/image';
import im1 from '../public/images/dialogimg1.jpg';
import im2 from '../public/images/dialogimg2.png';
import im3 from '../public/images/dialogimg3.png';
import logoImage from '../public/logo.png';
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
        src: ['/music.mp3'],
        html5: true
      });
    
    // const audioRef = useRef();
    const form = useRef();
    
    function toggleIcon(e){
        e.preventDefault();
        setAudioIcon(!audioIcon);
        setMuted(!muted);
    }

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
            music.play()
       }

    }, [showDialog])

    useEffect(()=>{
        if(muted){
            Howler.volume(0);
        }else{
            Howler.volume(1);
        }
        console.log("Howler playing: ", Howler.volume())
    }, [muted])



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
            <div className={`${styles.vhsEffect}`}></div>
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
                            <Image className={styles.logoContainer} src={logoImage} width={150} alt="oops" priority={true}/>
                            <h1 className={`${styles.header} dialog-text`}>You&apos;re Invited!</h1>
                            <p className={`${styles.text} dialog-text`}>To De Anima,</p>
                            <p className={`${styles.text} dialog-text`}>When: December 31st, 2023.<br/>Where: Guanacaste, Costa Rica.<br/>Doors open 7pm<br/>+21</p>
                            <p className={`${styles.text} dialog-text`}>RSVP below to buy tickets.</p>
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
                                <Image src={im1} width={120} height={120} alt="oops" priority={true}/>
                            </div>
                            <div className={styles.imageContainer}>
                                <Image src={im2} width={120} height={120} alt="oops" priority={true}/>
                            </div>
                            <div className={styles.imageContainer}>
                                <Image src={im3} width={120} height={120} alt="oops" priority={true}/>
                            </div>
                        </div>
                    </div>
                    
                </div>
{/* } */}
            </div>

            
        </div>
    )
}