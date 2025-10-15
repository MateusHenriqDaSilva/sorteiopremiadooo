'use client'

import { useState } from 'react'
import { X, MessageCircle, Copy, Check } from 'lucide-react'
import styles from '../styles/NumberModal.module.css'
import Image from 'next/image'

interface NumberModalProps {
  isOpen: boolean
  onClose: () => void
  selectedNumber: number | null
}

export default function NumberModal({ isOpen, onClose, selectedNumber }: NumberModalProps) {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    telefone: ''
  })
  const [copied, setCopied] = useState(false)

  const whatsappNumber = "14981706898";
  const pixKey = "00020126580014BR.GOV.BCB.PIX01368b89d9e9-872f-4bc1-8604-0668d77608b95204000053039865802BR5925Jose Francisco de Souza F6009SAO PAULO62140510MrnoLZWEZT63042E50";
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.nomeCompleto || !formData.telefone) {
      alert('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    const message = `🎯 *INSCRIÇÃO NO SORTEIO* 🎯\n\n*Dados da Inscrição:*\n• Nome: ${formData.nomeCompleto}\n• Telefone: ${formData.telefone}\n• Número da Sorte: ${selectedNumber}\n\n💰 *Pagamento via PIX:*\n• Chave: ${pixKey}\n• Valor: R$ 10,00\n\n📎 Estou enviando o comprovante do PIX em anexo. Por favor, confirme o recebimento!`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    onClose();
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const copyPixKey = async () => {
    try {
      await navigator.clipboard.writeText(pixKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Falha ao copiar a chave PIX:', err)
      // Fallback para dispositivos mais antigos
      const textArea = document.createElement('textarea')
      textArea.value = pixKey
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!isOpen) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Cabeçalho do Modal */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            Número {selectedNumber}
          </h2>
          <button
            onClick={onClose}
            className={styles.closeButton}
          >
            <X size={24} />
          </button>
        </div>

        {/* Conteúdo do Modal */}
        <div className={styles.content}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="nomeCompleto" className={styles.label}>
                Nome Completo *
              </label>
              <input
                type="text"
                id="nomeCompleto"
                name="nomeCompleto"
                required
                value={formData.nomeCompleto}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="Digite seu nome completo"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="telefone" className={styles.label}>
                Número de Telefone *
              </label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                required
                value={formData.telefone}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="(11) 99999-9999"
              />
            </div>

            {/* Área da imagem do PIX */}
            <div className={styles.pixArea}>
              <div className={styles.pixTitle}>
                <div className={styles.pixMainText}>Pagamento via PIX</div>
                <div className={styles.pixSubText}>Escaneie o QR Code abaixo</div>
              </div>
              
              {/* QR Code */}
              <div className={styles.qrCodeContainer}>
                <div className={styles.qrCodeImage}>
                  <Image 
                    src="/qrcode.png" 
                    alt="QR Code PIX" 
                    width={200}
                    height={200}
                    className={styles.qrCode}
                  />
                </div>
                <p className={styles.qrCodeLabel}>Escaneie com seu app bancário</p>
              </div>

              <div className={styles.pixInfo}>
                <div className={styles.pixKeySection}>
                  <span className={styles.pixKeyLabel}>Chave PIX:</span>
                  <div className={styles.pixKeyContainer}>
                    <code className={styles.pixKey}>
                      {pixKey}
                    </code>
                    <button
                      type="button"
                      onClick={copyPixKey}
                      className={`${styles.copyButton} ${copied ? styles.copied : ''}`}
                      title="Copiar chave PIX"
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                      <span className={styles.copyText}>
                        {copied ? 'Copiado!' : 'Copiar'}
                      </span>
                    </button>
                  </div>
                </div>
                <div className={styles.pixValue}>
                  <strong>Valor: R$ 10,00</strong>
                </div>
              </div>
            </div>

            <div className={styles.alert}>
              <p className={styles.alertText}>
                <strong>Importante:</strong> Após o pagamento PIX, clique no botão abaixo para enviar o comprovante pelo WhatsApp.
                Sua inscrição só será confirmada após a validação do pagamento.
              </p>
            </div>

            {/* Botão do WhatsApp */}
            <button
              type="submit"
              className={styles.whatsappButton}
              disabled={!formData.nomeCompleto || !formData.telefone}
            >
              <MessageCircle size={20} />
              Confirmar Inscrição e Enviar para WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}