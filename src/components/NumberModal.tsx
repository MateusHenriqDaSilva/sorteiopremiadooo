'use client'

import { useState } from 'react'
import { X, MessageCircle, Copy, Check, ExternalLink } from 'lucide-react'
import styles from '../styles/NumberModal.module.css'

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

  const whatsappNumber = "14981706898"
  const pixLink = "https://link.mercadopago.com.br/chicofinanceiro"
  const valorFixo = 10.00 // Mudado para número
  
  // Função para formatar o valor para exibição
  const formatarValor = (valor: number) => {
    return valor.toFixed(2).replace('.', ',')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.nomeCompleto || !formData.telefone) {
      alert('Preencha todos os campos.')
      return
    }

    const message = `INSCRIÇÃO NO SORTEIO\n\nNome: ${formData.nomeCompleto}\nTelefone: ${formData.telefone}\nNúmero: ${selectedNumber}\n\nPIX: R$ ${formatarValor(valorFixo)}\nLink: ${pixLink}`
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    
    window.open(whatsappUrl, '_blank')
    onClose()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const copyPixLink = async () => {
    try {
      await navigator.clipboard.writeText(pixLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      const textArea = document.createElement('textarea')
      textArea.value = pixLink
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const openPixLink = () => {
    window.open(pixLink, '_blank')
  }

  if (!isOpen) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Número {selectedNumber}</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={24} />
          </button>
        </div>

        <div className={styles.content}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Nome Completo *</label>
              <input
                type="text"
                name="nomeCompleto"
                required
                value={formData.nomeCompleto}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="Seu nome completo"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Telefone *</label>
              <input
                type="tel"
                name="telefone"
                required
                value={formData.telefone}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="(11) 99999-9999"
              />
            </div>

            <div className={styles.pixArea}>
              <div className={styles.pixHeader}>
                <h3>Pagamento PIX</h3>
                <p>Valor fixo: R$ {formatarValor(valorFixo)}</p>
              </div>
              
              <div className={styles.pixValue}>
                <strong>R$ {formatarValor(valorFixo)}</strong>
                <span>FIXO</span>
              </div>
              
              <div className={styles.pixLinkBox}>
                <span>Link PIX:</span>
                <code>{pixLink}</code>
                <div className={styles.buttons}>
                  <button type="button" onClick={copyPixLink} className={styles.copyBtn}>
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? 'Copiado!' : 'Copiar'}
                  </button>
                  <button type="button" onClick={openPixLink} className={styles.openBtn}>
                    <ExternalLink size={16} />
                    Abrir PIX
                  </button>
                </div>
              </div>

              <div className={styles.instructions}>
                <h4>Como pagar:</h4>
                <ol>
                  <li>Clique em "Abrir PIX"</li>
                  <li>Pague R$ {formatarValor(valorFixo)}</li>
                  <li>Salve o comprovante</li>
                  <li>Clique no botão verde abaixo</li>
                </ol>
              </div>
            </div>

            <div className={styles.alert}>
              <p><strong>Importante:</strong> Confirme o pagamento via WhatsApp.</p>
            </div>

            <button
              type="submit"
              className={styles.whatsappBtn}
              disabled={!formData.nomeCompleto || !formData.telefone}
            >
              <MessageCircle size={20} />
              Enviar para WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}