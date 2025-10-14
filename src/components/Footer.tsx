import styles from '../styles/Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} Sorteio Premiadooo - Todos os direitos reservados
        </p>
        <p className={styles.credits}>
          Criado por mahends
        </p>
      </div>
    </footer>
  )
}