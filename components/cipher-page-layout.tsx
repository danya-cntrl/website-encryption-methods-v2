"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EncryptionTool } from "@/components/encryption-tool"

interface CipherPageLayoutProps {
  title: string
  year: string
  subtitle?: string
  imageSrc: string
  imageAlt: string
  description: string[]
  principles: {
    title: string
    content: string
  }[]
  encryptFunction: (plaintext: string, key?: string) => string
  decryptFunction?: (ciphertext: string, key?: string) => string
  requiresKey?: boolean
  keyLabel?: string
  keyPlaceholder?: string
  warningText?: string
}

export function CipherPageLayout({
  title,
  year,
  subtitle,
  imageSrc,
  imageAlt,
  description,
  principles,
  encryptFunction,
  decryptFunction,
  requiresKey = false,
  keyLabel,
  keyPlaceholder,
  warningText,
}: CipherPageLayoutProps) {
  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 font-serif text-lg font-semibold text-foreground hover:text-primary"
          >
            <span>История</span>
          </Link>
          
          <Link href="/#history">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Назад к истории
            </Button>
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span className="font-mono">{year}</span>
                </div>
                <h1 className="text-balance font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-lg text-muted-foreground">{subtitle}</p>
                )}
              </div>
              
              <div className="h-px w-20 bg-primary" />
              
              <div className="space-y-4">
                {description.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-pretty leading-relaxed text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted lg:aspect-square">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-primary" />
              <h2 className="font-serif text-2xl font-semibold text-foreground">
                Принцип работы
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {principles.map((principle, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-border bg-card p-6 hover:shadow-md"
                >
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 font-mono text-sm font-bold text-primary">
                    {index + 1}
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">
                    {principle.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {principle.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30 py-12 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <EncryptionTool
            encryptFunction={encryptFunction}
            decryptFunction={decryptFunction}
            requiresKey={requiresKey}
            keyLabel={keyLabel}
            keyPlaceholder={keyPlaceholder}
            warningText={warningText}
          />
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Link href="/#history">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Вернуться к истории шифров
              </Button>
            </Link>
            
            <p className="text-sm text-muted-foreground">
              Сделано студентами ИТМО
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
