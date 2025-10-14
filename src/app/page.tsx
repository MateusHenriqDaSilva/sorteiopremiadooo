import Header from '@/components/Header'
import NumberGrid from '@/components/NumberGrid'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(to bottom, #dbeafe, #f3e8ff)'
    }}>
      <Header />
      <main style={{ flex: '1', padding: '2rem 0' }}>
        <NumberGrid />
      </main>
      <Footer />
    </div>
  )
}