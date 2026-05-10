"use client"

import { CipherPageLayout } from "@/components/cipher-page-layout"

class KristallMachine {
  private alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ./ "
  private n: number
  private substitutionTables: string[]

  constructor(keywords: string[]) {
    this.n = keywords.length
    this.substitutionTables = keywords.map(key => this.buildSubstitutionTable(key))
  }

  private buildSubstitutionTable(key: string): string {
    const keyUpper = key.toUpperCase()
    const table: string[] = []
    
    for (const char of keyUpper) {
      if (this.alphabet.includes(char) && !table.includes(char)) {
        table.push(char)
      }
    }
    
    for (const char of this.alphabet) {
      if (!table.includes(char)) {
        table.push(char)
      }
    }
    
    return table.join("")
  }

  process(text: string, mode: "encrypt" | "decrypt" = "encrypt"): string {
    const textUpper = text.toUpperCase()
    let result = ""

    for (let i = 0; i < textUpper.length; i++) {
      const char = textUpper[i]
      
      if (!this.alphabet.includes(char)) {
        result += char
        continue
      }

      const currentTable = this.substitutionTables[i % this.n]

      if (mode === "encrypt") {
        const idx = this.alphabet.indexOf(char)
        result += currentTable[idx]
      } else {
        const idx = currentTable.indexOf(char)
        result += this.alphabet[idx]
      }
    }

    return result
  }
}

function crystalEncrypt(plaintext: string, key?: string): string {
  if (!key) {
    return "[Ошибка: Требуются ключевые слова (через запятую)]"
  }
  
  const keywords = key.split(",").map(k => k.trim()).filter(k => k.length > 0)
  
  if (keywords.length === 0) {
    return "[Ошибка: Введите хотя бы одно ключевое слово]"
  }
  
  const machine = new KristallMachine(keywords)
  return machine.process(plaintext, "encrypt")
}

function crystalDecrypt(ciphertext: string, key?: string): string {
  if (!key) {
    return "[Ошибка: Требуются ключевые слова (через запятую)]"
  }
  
  const keywords = key.split(",").map(k => k.trim()).filter(k => k.length > 0)
  
  if (keywords.length === 0) {
    return "[Ошибка: Введите хотя бы одно ключевое слово]"
  }
  
  const machine = new KristallMachine(keywords)
  return machine.process(ciphertext, "decrypt")
}

const pageData = {
  title: "Шифровальная машина К-37 «Кристалл»",
  year: "1941",
  subtitle: "Шифр Рихарда Зорге",
  imageSrc: "/images/crystal-k37.jpg",
  imageAlt: "Шифровальная машина К-37 Кристалл",
  description: [
    "Шифр К-37 «Кристалл» — это система шифрования, использовавшаяся советским разведчиком Рихардом Зорге для передачи секретной информации из Японии в Москву. Зорге считается одним из величайших разведчиков XX века.",
    "Система основывалась на комбинации шахматной таблицы (straddling checkerboard) и одноразовой гаммы. Сначала текст преобразовывался в числа с помощью таблицы, построенной на основе ключевого слова, затем числа складывались с одноразовым ключом по модулю 10.",
    "Ключевое слово (например, SUBWAY) определяло структуру таблицы преобразования. Текст разбивался на 5-значные группы для передачи по радио. Благодаря использованию одноразовой гаммы при правильном применении шифр обеспечивал высокую стойкость.",
  ],
  principles: [
    {
      title: "Шахматная таблица",
      content:
        "Ключевое слово определяет расположение букв в таблице. Частые буквы кодируются одной цифрой, редкие — двумя. Это сжимает сообщение и маскирует статистику.",
    },
    {
      title: "Числовое кодирование",
      content:
        "Каждая буква заменяется одной или двумя цифрами согласно таблице. Результат — последовательность цифр без пробелов между словами.",
    },
    {
      title: "Группировка по 5",
      content:
        "Числовая последовательность разбивается на группы по 5 цифр. Это стандартный формат для радиопередачи, скрывающий длину слов.",
    },
    {
      title: "Одноразовая гамма",
      content:
        "К каждой цифре сообщения прибавляется соответствующая цифра случайного ключа по модулю 10. Ключ используется только один раз.",
    },
    {
      title: "Радиопередача",
      content:
        "Зашифрованные группы цифр передавались азбукой Морзе. Числовой формат удобен для передачи и уменьшает вероятность ошибок.",
    },
    {
      title: "Безопасность агента",
      content:
        "Система была разработана для условий работы в тылу противника. Компактность ключей и простота процедуры позволяли работать без громоздкого оборудования.",
    },
  ],
}

export default function CrystalCipherPage() {
  return (
    <CipherPageLayout
      {...pageData}
      encryptFunction={crystalEncrypt}
      decryptFunction={crystalDecrypt}
      requiresKey={true}
      keyLabel="Ключевые слова (через запятую)"
      keyPlaceholder="Например: ALPHA,BETA,GAMMA"
    />
  )
}
