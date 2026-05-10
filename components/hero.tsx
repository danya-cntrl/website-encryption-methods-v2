"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  const cipherRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cipherText = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0123456789"
    const element = cipherRef.current
    if (!element) return

    const generateCipherLine = () => {
      let line = ""
      for (let i = 0; i < 80; i++) {
        line += cipherText[Math.floor(Math.random() * cipherText.length)]
        if (i % 5 === 4) line += " "
      }
      return line
    }

    const lines: string[] = []
    for (let i = 0; i < 16; i++) {
      lines.push(generateCipherLine())
    }
    element.innerText = lines.join("\n")
  }, [])

  return (
    <section className="relative overflow-hidden pb-16 pt-24 md:pb-24 md:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="relative mx-auto mb-8 max-w-4xl overflow-hidden rounded-2xl">
            <div className="relative aspect-[16/9] md:aspect-[2/1]">
              <Image
                src="/images/hero-cipher.jpg"
                alt="Историческая шифровальная машина"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-foreground/80" />
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <div
                  ref={cipherRef}
                  className="absolute inset-0 font-mono text-[6px] leading-relaxed text-background/20 opacity-50 md:text-[10px]"
                  style={{ wordBreak: "break-all", padding: "1rem" }}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <h1 className="font-serif text-3xl font-semibold leading-tight text-background text-center md:text-5xl lg:text-6xl">
                  <span className="block text-balance">Методы шифрования</span>
                  <span className="block text-balance">начала 20 века</span>
                </h1>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-3xl">
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Цель сайта:
            </p>
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg text-balance">
              Продемонстрировать эволюцию и актуальность методов криптографии. 
              Предоставить посетителям сайта возможность интерактивно ознакомиться 
              с несколькими методами шифрования первой половины 20 века.
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <Button
              size="lg"
              className="group rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/90"
              asChild
            >
              <a href="#learn">
                Начать изучение
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
