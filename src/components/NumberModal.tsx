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
    telefone: '',
    email: ''
  })
  const [copied, setCopied] = useState(false)

  const pixLink = "https://link.mercadopago.com.br/chicofinanceiro"
  const valorFixo = 10.00
  
  // Função para formatar o valor para exibição
  const formatarValor = (valor: number) => {
    return valor.toFixed(2).replace('.', ',')
  }

  // Função para validar email
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Função para validar telefone (formato brasileiro)
  const isValidPhone = (phone: string) => {
    const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/
    return phoneRegex.test(phone)
  }

  // Função para formatar telefone
  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
    } else {
      return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.nomeCompleto || !formData.telefone || !formData.email) {
      alert('Preencha todos os campos obrigatórios.')
      return
    }

    if (!isValidEmail(formData.email)) {
      alert('Por favor, insira um e-mail válido.')
      return
    }

    if (!isValidPhone(formData.telefone)) {
      alert('Por favor, insira um telefone válido com DDD.')
      return
    }

    // Aqui você pode adicionar a lógica para salvar os dados
    // ou enviar para um backend, sem abrir o WhatsApp
    
    alert('Inscrição realizada com sucesso! Faça o pagamento PIX para confirmar sua participação.')
    onClose()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    if (name === 'telefone') {
      setFormData(prev => ({
        ...prev,
        [name]: formatPhone(value)
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const copyPixLink = async () => {
    try {
      await navigator.clipboard.writeText(pixLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback para navegadores mais antigos
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

  // Verificar se todos os campos estão preenchidos e válidos
  const isFormValid = formData.nomeCompleto && 
                     formData.telefone && 
                     formData.email && 
                     isValidEmail(formData.email) && 
                     isValidPhone(formData.telefone)

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
                maxLength={100}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Telefone com DDD *</label>
              <input
                type="tel"
                name="telefone"
                required
                value={formData.telefone}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="(11) 99999-9999"
                maxLength={15}
              />
              {formData.telefone && !isValidPhone(formData.telefone) && (
                <span className={styles.errorText}>Formato: (DDD) 9XXXX-XXXX</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>E-mail *</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="seu.email@exemplo.com"
                maxLength={100}
              />
              {formData.email && !isValidEmail(formData.email) && (
                <span className={styles.errorText}>Digite um e-mail válido</span>
              )}
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
                <h4>Como participar:</h4>
                <ol>
                  <li>Preencha seus dados acima</li>
                  <li>Clique em &quot;Abrir PIX&quot;</li>
                  <li>Pague R$ {formatarValor(valorFixo)}</li>
                  <li>Salve o comprovante</li>
                  <li>Clique em &quot;Finalizar Compra&quot;</li>
                </ol>
              </div>
            </div>

            <div className={styles.alert}>
              <p><strong>Importante:</strong> Sua inscrição só será confirmada após o pagamento.</p>
            </div>

            <button
              type="submit"
              className={styles.finishButton}
              disabled={!isFormValid}
            >
              <MessageCircle size={20} />
              Finalizar Compra
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}