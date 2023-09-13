import styles from '@/styles/Invited.module.css'
import macStyles from '@sakun/system.css';
import Image from 'next/image';
import im1 from '../public/images/testImage.jpg'

export default function Invited(){
    return(
        <div className={`${styles.invitedContainer} window`}>
            <div className={`title-bar`}>
                <button aria-label="Close" className={`close`}></button>
                <h1 className={`title`}>De Anima</h1>
                <button aria-label="Resize" className={`resize`}></button>
            </div>
            <div className={`separator`}></div>
            <div className={styles.bg}>
                <div className={`${styles.dialogContainer} standard-dialog`}>
                    
                    <div className={styles.flex}>
                        <div className={styles.textContainer}>
                        <h1 className={`${styles.header} dialog-text`}>Your Invited</h1>
                            <p className={`${styles.text} dialog-text`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus feugiat in ante metus dictum at. Accumsan in nisl nisi scelerisque eu ultrices vitae. Porttitor eget dolor morbi non. Pulvinar sapien et ligula ullamcorper malesuada proin libero. Euismod in pellentesque massa placerat duis ultricies lacus. Auctor neque vitae tempus quam pellentesque. Commodo elit at imperdiet dui accumsan sit amet nulla. Vel orci porta non pulvinar neque laoreet suspendisse interdum consectetur. Arcu ac tortor dignissim convallis aenean et tortor at risus. In arcu cursus euismod quis viverra nibh cras pulvinar mattis. Nulla facilisi morbi tempus iaculis.</p>
                            <div className={styles.inputContainer}>
                            <section className={`${styles.sectionContainer} field-row`} >
                                <label for="text_find" className={`${styles.inputHeader} dialog-text`}>Email:</label>
                                <input id="text_find" type="text" placeholder=""/>
                                <button className={`btn`}>Cancel</button>
                            </section>
                            </div>
                        </div>
                        <div className={styles.imagesContainer}>
                            <div className={styles.imageContainer}>
                                <Image src={im1} width={110} height={110} alt="oops"/>
                            </div>
                            <div className={styles.imageContainer}>
                                <Image src={im1} width={110} height={110} alt="oops"/>
                            </div>
                            <div className={styles.imageContainer}>
                                <Image src={im1} width={110} height={110} alt="oops"/>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>

            
        </div>
    )
}