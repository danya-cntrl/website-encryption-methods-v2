"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const timelineItems = [
  {
    year: "1917",
    title: "Шифр Вернама",
    description:
      "Шифрование путём сложения битов сообщения и случайной гаммы по модулю 2 (XOR). При соблюдении трёх условий (уничтожение ключа после использования, истинная случайность гаммы, её длина не меньше длины сообщения) обеспечивает абсолютную стойкость.",
    image: "/images/vernam-cipher.jpg",
    imageAlt: "Шифр Вернама - историческое фото шифровальной машины",
    href: "/ciphers/vernam",
  },
  {
    year: "1926",
    title: "Шифровальная машина Энигма",
    description:
      "Немецкая шифровальная машина на основе роторов и отражателя. При нажатии клавиши сигнал проходит через вращающиеся роторы, затем возвращается по другому пути, обеспечивая полиалфавитную подстановку. Недостаток: символ не мог зашифроваться сам в себя.",
    image: "/images/enigma-machine.jpg",
    imageAlt: "Шифровальная машина Энигма",
    href: "/ciphers/enigma",
  },
  {
    year: "1939",
    title: "Шифровальная машина PURPLE",
    description:
      "Японская шифровальная машина, использовавшая шаговые переключатели вместо роторов. Была взломана американцами после того, как Лео Розен догадался о конструкции переключателей.",
    image: "/images/purple-machine.jpg",
    imageAlt: "Шифровальная машина PURPLE",
    href: "/ciphers/purple",
  },
  {
    year: "1938-1940",
    title: "Шифр Рэмзай",
    subtitle: "Советская шифровальная машина",
    description:
      "Советская шифровальная машина на основе полиалфавитного шифра (последовательное применение нескольких моноалфавитных шифров). В 1941 году образец был захвачен немцами, после чего шифр взломан и машину перестали использовать.",
    image: "/images/soviet-cipher.jpg",
    imageAlt: "Шифр Рэмзай",
    href: "/ciphers/ramzay",
  },
  {
    year: "1941",
    title: "Шифровальная машина К-37 «Кристалл»",
    description:
      "Шифр, использовавшийся Рихардом Зорге. Составлялась таблица на основе ключевого слова (например, SUBWAY), текст разбивался на 5-значные группы и преобразовывался в числа, которые затем складывались с одноразовой гаммой по модулю 10.",
    image: "/images/crystal-k37.jpg",
    imageAlt: "Шифровальная машина К-37 Кристалл",
    href: "/ciphers/crystal",
  },
]

export function Timeline() {
  return (
    <section id="history" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border md:block" />

          <div className="space-y-12 md:space-y-24">
            {timelineItems.map((item, index) => (
              <div
                key={item.year + item.title}
                className="relative"
              >
                <div
                  className={`hidden items-center gap-12 md:flex ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div className="flex-1 space-y-4">
                    <div
                      className={`space-y-2 ${
                        index % 2 === 0 ? "text-right" : "text-left"
                      }`}
                    >
                      <p className="font-mono text-sm text-muted-foreground">
                        {item.year}
                      </p>
                      <Link href={item.href} className="group inline-block">
                        <h3 className="font-serif text-2xl font-semibold text-foreground group-hover:text-primary">
                          {item.title}
                          <ArrowRight className="ml-2 inline-block h-5 w-5 opacity-0 group-hover:opacity-100" />
                        </h3>
                      </Link>
                      {item.subtitle && (
                        <p className="text-sm text-muted-foreground">
                          {item.subtitle}
                        </p>
                      )}
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 flex h-4 w-4 shrink-0 items-center justify-center">
                    <div className="h-4 w-4 rounded-full border-2 border-primary bg-background" />
                    <div className="absolute h-2 w-2 rounded-full bg-primary" />
                  </div>

                  <div className="flex-1">
                    <Link href={item.href}>
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-muted hover:shadow-lg">
                        <Image
                          src={item.image}
                          alt={item.imageAlt}
                          fill
                          className="object-cover grayscale hover:grayscale-0"
                        />
                      </div>
                    </Link>
                  </div>
                </div>

                <div className="space-y-4 md:hidden">
                  <div className="flex items-center gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {index + 1}
                    </div>
                    <p className="font-mono text-sm text-muted-foreground">
                      {item.year}
                    </p>
                  </div>
                  <Link href={item.href} className="group block">
                    <h3 className="font-serif text-xl font-semibold text-foreground group-hover:text-primary">
                      {item.title}
                      <ArrowRight className="ml-2 inline-block h-4 w-4 opacity-0 group-hover:opacity-100" />
                    </h3>
                  </Link>
                  {item.subtitle && (
                    <p className="text-sm text-muted-foreground">
                      {item.subtitle}
                    </p>
                  )}
                  <Link href={item.href} className="block">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-muted hover:shadow-lg">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        className="object-cover grayscale hover:grayscale-0"
                      />
                    </div>
                  </Link>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
