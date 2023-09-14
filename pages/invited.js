import styles from '@/styles/Invited.module.css'
import {useState,  useEffect, useRef} from 'react';
import macStyles from '@sakun/system.css';
import Image from 'next/image';
import im1 from '../public/images/dialogimg1.jpg';
import im2 from '../public/images/dialogimg2.png';
import im3 from '../public/images/dialogimg3.png';
import emailjs from '@emailjs/browser';

export default function Invited(){
    const [showDialog, setShowDialog] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [nameErr, setNameErr] = useState(false);
    const [emailErr, setEmailErr] = useState(false);

    const form = useRef();
    
    useEffect(()=>{
        let setDialog = setTimeout(()=>{
            setShowDialog(true);
        }, 2500)
        return ()=>{
            clearTimeout(setDialog);
        }
    })

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
                e.target.reset();
            }, (error) => {
                console.log(error.text);
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
            <div className={`title-bar`}>
                <button aria-label="Close" className={`close`}></button>
                <h1 className={`title`}>De Anima</h1>
                <button aria-label="Resize" className={`resize`}></button>
            </div>
            <div className={`separator`}></div>
            <div className={styles.bg}>
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
                            </form>
                        </div>
                        <div className={styles.imagesContainer}>
                            <div className={styles.imageContainer}>
                                <Image src={im1} width={110} height={110} alt="oops"/>
                            </div>
                            <div className={styles.imageContainer}>
                                <Image src={im2} width={110} height={110} alt="oops"/>
                            </div>
                            <div className={styles.imageContainer}>
                                <Image src={im3} width={110} height={110} alt="oops"/>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>

            
        </div>
    )
}