import styles from './Header.module.css';
import Image from './Image';
import HeaderButton from './HeaderButton';


export default function Header(props){
    return (
        <>
           <header className={styles.header}>
               <h1>Zwiggy</h1>
               <HeaderButton onClick={props.onShow} />
           </header>
           <Image />
        </>
    )
};