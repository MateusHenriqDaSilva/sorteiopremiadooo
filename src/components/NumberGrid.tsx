'use client'

import { useState, useEffect } from 'react'
import NumberModal from './NumberModal'
import styles from '../styles/NumberGrid.module.css'

export default function NumberGrid() {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const numbers = Array.from({ length: 50 }, (_, i) => i + 1)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleNumberClick = (number: number) => {
    setSelectedNumber(number)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedNumber(null)
  }

  // Função para gerar delay escalonado
  const getStaggerDelay = (index: number) => {
    return { animationDelay: `${index * 0.01}s` }
  }

  return (
    <>
      <div className={styles.container}>
        <h1 className={`${styles.title} ${isVisible ? styles.fadeInDown : ''}`}>
          Escolha seu número da sorte!
        </h1>
        
        <div className={styles.threeColumnLayout}>
          {/* Coluna Esquerda - Banner */}
          <div className={styles.leftColumn}>
            <div className={styles.bannerContainer}>
              <img 
                src="/banner.jpg" 
                alt="Premiação" 
                className={styles.banner}
              />
            </div>
          </div>

          {/* Coluna Central - Jogo (maior) */}
          <div className={styles.centerColumn}>
            <div className={styles.gridContainer}>
              <div className={styles.grid}>
                {numbers.map((number, index) => (
                  <button
                    key={number}
                    onClick={() => handleNumberClick(number)}
                    className={`${styles.numberButton} ${styles.stagger}`}
                    style={getStaggerDelay(index)}
                  >
                    <span className={styles.numberContent}>
                      {number}
                    </span>
                    <div className={styles.glowEffect}></div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Coluna Direita - Premiação */}
          <div className={styles.rightColumn}>
            <div className={styles.prizesContainer}>
              <h3 className={styles.prizesTitle}>🏆 Premiação</h3>
              <div className={styles.prizeItem}>
                <span className={styles.medal}>🥇</span>
                <div className={styles.prizeInfo}>
                  <span className={styles.prizePlace}>1º Lugar</span>
                  <span className={styles.prizeValue}>R$ 150,00</span>
                </div>
              </div>
              <div className={styles.prizeItem}>
                <span className={styles.medal}>🥈</span>
                <div className={styles.prizeInfo}>
                  <span className={styles.prizePlace}>2º Lugar</span>
                  <span className={styles.prizeValue}>R$ 75,00</span>
                </div>
              </div>
              <div className={styles.prizeItem}>
                <span className={styles.medal}>🥉</span>
                <div className={styles.prizeInfo}>
                  <span className={styles.prizePlace}>3º Lugar</span>
                  <span className={styles.prizeValue}>R$ 75,00</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className={`${styles.description} ${isVisible ? styles.fadeInUp : ''}`}>
          Clique em um número para participar do sorteio!
        </p>
      </div>

      <NumberModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedNumber={selectedNumber}
      />
    </>
  )
}