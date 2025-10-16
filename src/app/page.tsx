import Header from '@/components/Header'
import NumberGrid from '@/components/NumberGrid'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(to bottom, #dbeafe, #f3e8ff)',
      justifyContent: 'space-between' // Distribui o espaço uniformemente
    }}>
      <Header />
      <main style={{ 
        flex: '1 0 auto', // Cresce mas não encolhe abaixo do conteúdo
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // Centraliza verticalmente
        alignItems: 'center',
        width: '100%',
        padding: '1rem 0' // Padding reduzido
      }}>
        <NumberGrid />
      </main>
      <Footer />
    </div>
  )
}