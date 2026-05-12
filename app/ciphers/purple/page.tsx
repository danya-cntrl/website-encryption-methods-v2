"use client"

import { CipherPageLayout } from "@/components/cipher-page-layout"

class PurpleMachine {
  private switches: number[]
  private vowels = "AEIOUY"
  private alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  private group6: string[]
  private group20: string[]

  constructor(switchPositions: number[]) {
    this.switches = [...switchPositions]
    this.group6 = this.alphabet.split("").filter(c => this.vowels.includes(c))
    this.group20 = this.alphabet.split("").filter(c => !this.vowels.includes(c))
  }

  private step(): void {
    this.switches[0] = (this.switches[0] + 1) % 25
    if (this.switches[0] === 0) {
      this.switches[1] = (this.switches[1] + 1) % 25
      if (this.switches[1] === 0) {
        this.switches[2] = (this.switches[2] + 1) % 25
      }
    }
  }

  processChar(char: string, mode: "encrypt" | "decrypt" = "encrypt"): string {
    const charUpper = char.toUpperCase()
    if (!this.alphabet.includes(charUpper)) {
      return char
    }

    let targetGroup: string[]
    let shift: number

    if (this.group6.includes(charUpper)) {
      targetGroup = this.group6
      shift = this.switches[0] % 6
    } else {
      targetGroup = this.group20
      shift = (this.switches[0] + this.switches[1] + this.switches[2]) % 20
    }

    const idx = targetGroup.indexOf(charUpper)
    let newIdx: number

    if (mode === "encrypt") {
      newIdx = (idx + shift) % targetGroup.length
    } else {
      newIdx = (idx - shift + targetGroup.length) % targetGroup.length
    }

    const result = targetGroup[newIdx]
    this.step()
    return result
  }

  processText(text: string, mode: "encrypt" | "decrypt" = "encrypt"): string {
    return text.split("").map(c => this.processChar(c, mode)).join("")
  }
}

function purpleEncrypt(plaintext: string, key?: string): string {
  if (!key) {
    return "[Ошибка: Требуются позиции переключателей (через запятую)]"
  }
  
  const positions = key.split(",").map(p => parseInt(p.trim()))
  
  if (positions.length < 3 || positions.some(p => isNaN(p))) {
    return "[Ошибка: Введите 3 позиции переключателей (0-24), например: 1,5,10]"
  }
  
  if (positions.some(p => p < 0 || p > 24)) {
    return "[Ошибка: Позиции должны быть от 0 до 24]"
  }
  
  const machine = new PurpleMachine(positions)
  return machine.processText(plaintext, "encrypt")
}

function purpleDecrypt(ciphertext: string, key?: string): string {
  if (!key) {
    return "[Ошибка: Требуются позиции переключателей (через запятую)]"
  }
  
  const positions = key.split(",").map(p => parseInt(p.trim()))
  
  if (positions.length < 3 || positions.some(p => isNaN(p))) {
    return "[Ошибка: Введите 3 позиции переключателей (0-24), например: 1,5,10]"
  }
  
  if (positions.some(p => p < 0 || p > 24)) {
    return "[Ошибка: Позиции должны быть от 0 до 24]"
  }
  
  const machine = new PurpleMachine(positions)
  return machine.processText(ciphertext, "decrypt")
}

const pageData = {
  title: "Шифровальная машина PURPLE",
  year: "1939",
  subtitle: "Японская дипломатическая шифровальная система",
  imageSrc: "/images/purple-machine.jpg",
  imageAlt: "Шифровальная машина PURPLE",
  description: [
    "PURPLE — японская шифровальная машина, использовавшаяся для защиты дипломатической переписки с 1939 года. Название «PURPLE» (фиолетовый) дали американские криптоаналитики, присваивавшие цветовые коды японским шифрам (помимо PURPLE были: RED, GREEN, ORANGE, JADE и пр.).",
    "В отличие от немецкой Энигмы, PURPLE использовала шаговые переключатели телефонного типа вместо механических роторов. Алфавит разделялся на две группы: шесть гласных и двадцать согласных, каждая шифровалась отдельно.",
    "Машина была взломана американской группой в 1940 году. Для исследователей США ее взлом оказался непростой задачей –команде талантливых исследователей потребовался месяц чтобы получить минимальные результаты. Ни у кого из команды не получалось восстановить механизм шифрования PURPLE для получения нужного результата, пока в 1940 году не пришел в команду новичок Лео Розен. Он предположил, что Японцы могли в строении PURPLE использовать шаговые переключатели и оказался совершенно прав. Это дало толчок исследованию и вскоре удалось реконструировать PURPLE.",
  ],
  principles: [
    {
      title: "Разделение алфавита",
      content:
        "Алфавит делится на «шестёрку» (6 букв, обычно гласные AEIOUY) и «двадцатку» (остальные 20 букв). Каждая группа шифруется независимо своим механизмом.",
    },
    {
      title: "Шаговые переключатели",
      content:
        "Вместо роторов используются электромеханические шаговые переключатели с 25 позициями. Они обеспечивают более сложную и менее предсказуемую схему вращения.",
    },
    {
      title: "Шифрование шестёрки",
      content:
        "Шесть гласных букв проходят через один 25-позиционный переключатель. Простая, но быстро изменяющаяся подстановка внутри маленькой группы.",
    },
    {
      title: "Шифрование двадцатки",
      content:
        "Двадцать согласных проходят через три взаимосвязанных 25-позиционных переключателя, создавая очень сложную схему подстановки.",
    },
    {
      title: "Механизм шага",
      content:
        "После каждой зашифрованной буквы переключатели продвигаются по сложному алгоритму. Паттерн зависит от текущих позиций всех переключателей.",
    },
    {
      title: "Историческое значение",
      content:
        "Взлом PURPLE позволил США читать японскую дипломатическую переписку до Перл-Харбора. Операция называлась «MAGIC» и была строго засекречена.",
    },
  ],
}

export default function PurpleCipherPage() {
  return (
    <CipherPageLayout
      {...pageData}
      encryptFunction={purpleEncrypt}
      decryptFunction={purpleDecrypt}
      requiresKey={true}
      keyLabel="Позиции переключателей (0-24)"
      keyPlaceholder="Например: 1,5,10"
      warningText="Шифр поддерживает только символы латинского алфавита"
    />
  )
}
