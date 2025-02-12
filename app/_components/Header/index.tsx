import Image from "next/image";
import styles from "./index.module.css";

export default function Header() {
    return (
        <header className = {styles.header}>
            <a href= "/" className = {styles.logoLink}>
                <Image
                    src = "/logo.svg"
                    alt = "logo"
                    className = {styles.logo}
                    width = {348}
                    height = {123}
                    priority
                />
            </a>
        </header>
    );
}