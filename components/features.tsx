"use client"

import { Shield, Lock, Cpu, Binary } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Криптография в современной жизни",
    description:
      "Рассмотрите ключевые области использования криптографии в современном мире. Изучите, как ее применение ежедневно защищает нашу цифровую приватность.",
  },
  {
    icon: Lock,
    title: "Методы шифрования",
    description:
      "Познакомьтесь с различными методами шифрования, использовавшимися в первой половине 20 века: от простых до сложных механических устройств.",
  },
  {
    icon: Cpu,
    title: "Принципы работы алгоритмов",
    description:
      "Разберитесь в принципах работы криптографических алгоритмов. Узнайте, как происходит шифрование и дешифрование сообщений.",
  },
  {
    icon: Binary,
    title: "Интерактивное шифрование",
    description:
      "Попробуйте зашифровать и расшифровать сообщения самостоятельно, используя интерактивные инструменты на сайте.",
  },
]

export function Features() {
  return (
    <section
      id="learn"
      className="py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 md:mb-16">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Узнать новое
          </p>
          <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl lg:text-5xl">
            Что вы узнаете?
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border border-border/50 bg-card p-6 hover:border-primary/30 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-6 w-6" />
              </div>

              <h3 className="mb-2 font-serif text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
