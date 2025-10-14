'use client'

import { useState, useEffect } from 'react'
import NumberModal from './NumberModal'
import styles from '../styles/NumberGrid.module.css'

interface NumberGridProps {}

export default function NumberGrid({}: NumberGridProps) {
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
    return { animationDelay: `${index * 0.05}s` }
  }

  // Função para gerar animação baseada na posição
  const getPositionAnimation = (index: number) => {
    const row = Math.floor(index / 5)
    const col = index % 5
    
    if (row % 2 === 0) {
      return col % 2 === 0 ? styles.float : styles.wave
    } else {
      return col % 2 === 0 ? styles.wave : styles.float
    }
  }

  return (
    <>
      <div className={styles.container}>
        <h1 className={`${styles.title} ${isVisible ? styles.fadeInDown : ''}`}>
          Escolha seu número da sorte!
        </h1>
        
        <div className={styles.gridContainer}>
          <div className={styles.grid}>
            {numbers.map((number, index) => (
              <button
                key={number}
                onClick={() => handleNumberClick(number)}
                className={`${styles.numberButton} ${getPositionAnimation(index)} ${styles.stagger}`}
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