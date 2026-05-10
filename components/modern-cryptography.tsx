"use client"

import Image from "next/image"
import { Shield, CreditCard, Globe } from "lucide-react"

const applications = [
  {
    icon: Shield,
    title: "Цифровая приватность",
    description: "Защита личных данных и конфиденциальности в цифровом мире",
  },
  {
    icon: CreditCard,
    title: "Банковские платежи",
    description: "Безопасные финансовые транзакции и защита банковских операций",
  },
  {
    icon: Globe,
    title: "Информационная инфраструктура",
    description: "Защита критически важной информационной инфраструктуры",
  },
]

export function ModernCryptography() {
  return (
    <section
      id="cryptography"
      className="relative overflow-hidden py-16 md:py-24"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-background" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <h2 className="mb-4 font-serif text-3xl font-semibold text-foreground md:text-4xl lg:text-5xl">
            <span className="block">Криптография в</span>
            <span className="block">современной жизни</span>
          </h2>
          <p className="text-base text-muted-foreground md:text-lg">
            Каждый день мы используемся что-то, что было разработано благодаря
            достижениям криптографии. Вот примеры использования криптографии в
            современной жизни.
          </p>
        </div>

        <div className="mb-16 grid gap-6 md:grid-cols-3">
          {applications.map((app) => (
            <div
              key={app.title}
              className="group rounded-2xl border border-border/50 bg-card p-6 text-center hover:border-primary/30 hover:shadow-lg"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                <app.icon className="h-7 w-7" />
              </div>
              <h3 className="mb-2 font-serif text-lg font-semibold text-foreground">
                {app.title}
              </h3>
              <p className="text-sm text-muted-foreground">{app.description}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl bg-secondary p-8 md:p-12">
            <div className="flex flex-col items-center gap-8 md:flex-row">
              <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-xl bg-muted md:h-48 md:w-48">
                <Image
                  src="/images/bill-gates.jpg"
                  alt="Билл Гейтс"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 text-center md:text-left">
                <blockquote className="mb-4 font-serif text-lg italic leading-relaxed text-foreground md:text-xl">
                  &ldquo;Криптография — это математический замок, который защищает
                  информацию. Любой человек или организация, обладающие
                  способностью взломать эти замки, смогут подделывать деньги,
                  проникать в любые личные, корпоративные или правительственные
                  файлы и даже подрывать безопасность наций.&rdquo;
                </blockquote>
                <footer className="text-sm text-muted-foreground">
                  <cite className="not-italic">
                    <strong className="font-semibold text-foreground">
                      Билл Гейтс
                    </strong>
                    <span className="mx-2">•</span>
                    <span>Сооснователь Microsoft</span>
                  </cite>
                </footer>
              </div>
            </div>

            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5" />
            <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-primary/5" />
          </div>
        </div>
      </div>
    </section>
  )
}
