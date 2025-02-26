import RedesSociais from "@/components/redesSociais/RedesSociais";
import styles from './style.module.css'

export default function Rodape() {
    return (
        <footer className={styles.rodape}>
            <p>
                Produzido no Colégio Estadual Miguel Dias pela Manu 🤪💓
            </p>
            <RedesSociais></RedesSociais>
        </footer>
    )
}