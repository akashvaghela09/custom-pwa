import React from 'react';
import styles from "../Styles/Header.module.css";

const Header = () => {
    return (
        <div className={styles.wrapper}>
            <p className={styles.title}>Employee Data</p>
        </div>
    )
}

export { Header }