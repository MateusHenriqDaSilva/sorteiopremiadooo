import Header from '@/components/Header'
import NumberGrid from '@/components/NumberGrid'
import Footer from '@/components/Footer'
import styles from '../styles/Page.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.threeColumnLayout}>
          <div className={styles.centerColumn}>
            <div className={styles.gridContainer}>
              <NumberGrid />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}