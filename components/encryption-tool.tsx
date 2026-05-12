"use client"

import { useState, useCallback } from "react"
import { ArrowRight, ArrowLeft, Copy, Check, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EncryptionToolProps {
  encryptFunction: (plaintext: string, key?: string) => string
  decryptFunction?: (ciphertext: string, key?: string) => string
  keyPlaceholder?: string
  requiresKey?: boolean
  keyLabel?: string
  className?: string
  warningText?: string;
}

export function EncryptionTool({
  encryptFunction,
  decryptFunction,
  keyPlaceholder = "Введите ключ...",
  requiresKey = false,
  keyLabel = "Ключ шифрования",
  className,
  warningText,
}: EncryptionToolProps) {
  const [plaintext, setPlaintext] = useState("")
  const [key, setKey] = useState("")
  const [ciphertext, setCiphertext] = useState("")
  const [copied, setCopied] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt")

  const handleProcess = useCallback(() => {
    const inputText = mode === "encrypt" ? plaintext : ciphertext
    if (!inputText.trim()) return
    
    setIsProcessing(true)
    
    setTimeout(() => {
      if (mode === "encrypt") {
        const result = encryptFunction(plaintext, requiresKey ? key : undefined)
        setCiphertext(result)
      } else if (decryptFunction) {
        const result = decryptFunction(ciphertext, requiresKey ? key : undefined)
        setPlaintext(result)
      }
      setIsProcessing(false)
    }, 300)
  }, [plaintext, ciphertext, key, requiresKey, encryptFunction, decryptFunction, mode])

  const handleCopy = useCallback(async () => {
    if (!ciphertext) return
    await navigator.clipboard.writeText(ciphertext)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [ciphertext])

  const handleReset = useCallback(() => {
    setPlaintext("")
    setKey("")
    setCiphertext("")
    setMode("encrypt")
  }, [])

  return (
    <div className={cn("rounded-2xl border border-border bg-card p-6 md:p-8", className)}>
      <div className="mb-6">
        <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
          Интерактивное шифрование
        </h3>

        {warningText && (
          <div className="mb-4 text-base text-muted-foreground">
            {warningText}
          </div>
        )}
        
        {decryptFunction && (
          <div className="inline-flex rounded-lg border border-border bg-muted/50 p-1">
            <button
              onClick={() => setMode("encrypt")}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium",
                mode === "encrypt"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Шифрование
            </button>
            <button
              onClick={() => setMode("decrypt")}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium",
                mode === "decrypt"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Дешифровка
            </button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {requiresKey && (
          <div className="space-y-2">
            <label
              htmlFor="encryption-key"
              className="block text-sm font-medium text-foreground"
            >
              {keyLabel}
            </label>
            <input
              id="encryption-key"
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder={keyPlaceholder}
              className="w-full rounded-lg border border-input bg-background px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="plaintext-input"
              className="block text-sm font-medium text-foreground"
            >
              Исходный текст
              {mode === "decrypt" && (
                <span className="ml-2 text-xs text-muted-foreground">(результат)</span>
              )}
            </label>
            <div className="relative">
              <textarea
                id="plaintext-input"
                value={plaintext}
                onChange={(e) => setPlaintext(e.target.value)}
                placeholder={mode === "encrypt" ? "Введите текст для шифрования..." : "Результат дешифровки появится здесь..."}
                rows={6}
                readOnly={mode === "decrypt"}
                className={cn(
                  "w-full resize-none rounded-lg border border-input px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground",
                  mode === "encrypt" 
                    ? "bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    : "bg-muted/50"
                )}
              />
              {mode === "decrypt" && plaintext && (
                <button
                  onClick={async () => {
                    await navigator.clipboard.writeText(plaintext)
                    setCopied(true)
                    setTimeout(() => setCopied(false), 2000)
                  }}
                  className="absolute right-3 top-3 rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                  title="Копировать"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-primary" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {plaintext.length} символов
            </p>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="ciphertext-output"
              className="block text-sm font-medium text-foreground"
            >
              Зашифрованный текст
              {mode === "encrypt" && (
                <span className="ml-2 text-xs text-muted-foreground">(результат)</span>
              )}
            </label>
            <div className="relative">
              <textarea
                id="ciphertext-output"
                value={ciphertext}
                onChange={(e) => setCiphertext(e.target.value)}
                placeholder={mode === "decrypt" ? "Вставьте шифротекст для дешифровки..." : "Результат шифрования появится здесь..."}
                rows={6}
                readOnly={mode === "encrypt"}
                className={cn(
                  "w-full resize-none rounded-lg border border-input px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground",
                  mode === "decrypt" 
                    ? "bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    : "bg-muted/50"
                )}
              />
              {mode === "encrypt" && ciphertext && (
                <button
                  onClick={handleCopy}
                  className="absolute right-3 top-3 rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                  title="Копировать"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-primary" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {ciphertext.length} символов
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={handleProcess}
            disabled={
              (mode === "encrypt" ? !plaintext.trim() : !ciphertext.trim()) || 
              (requiresKey && !key.trim()) || 
              isProcessing ||
              (mode === "decrypt" && !decryptFunction)
            }
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isProcessing ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                {mode === "encrypt" ? "Шифрование..." : "Дешифровка..."}
              </>
            ) : mode === "encrypt" ? (
              <>
                Зашифровать
                <ArrowRight className="h-4 w-4" />
              </>
            ) : (
              <>
                <ArrowLeft className="h-4 w-4" />
                Расшифровать
              </>
            )}
          </Button>
          
          <Button
            onClick={handleReset}
            variant="outline"
            className="gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Сбросить
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Примечание: Данный инструмент предназначен для образовательных целей 
          и демонстрации принципов работы исторических шифров.
        </p>
      </div>
    </div>
  )
}
