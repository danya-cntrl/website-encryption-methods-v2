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

function validateText(text: string): string | null {
  const upperText = text.toUpperCase();
  if (!/^[A-Z ]*$/.test(upperText)) {
    return "[Ошибка: Текст содержит недопустимые символы. Разрешены только латинские буквы.]";
  }
  return null;
}

function crystalEncrypt(plaintext: string, key?: string): string {
  if (!key) {
    return "[Ошибка: Требуются ключевые слова (через запятую)]"
  }
  
  const keywords = key.split(",").map(k => k.trim()).filter(k => k.length > 0)
  
  if (keywords.length === 0) {
    return "[Ошибка: Введите хотя бы одно ключевое слово]"
  }

  const validationError = validateText(plaintext);
  if (validationError) return validationError;
  
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
  subtitle: "Полиалфавитное шифрование СССР",
  imageSrc: "/images/crystal-k37.jpg",
  imageAlt: "Шифровальная машина К-37 Кристалл",
  description: [
    "Шифровальная машина К-37 «Кристалл» — это советская портативная шифровальная система, разработанная в 1939 году на основе предшествующей модели М-100 «Спектр». Она использовалась для защиты секретной связи. Масса устройства составляла всего 19 кг, что делало его одним из самых лёгких шифровальных аппаратов своего времени.",
    "Система основывалась на полиалфавитном шифре — методе, использующем последовательную смену нескольких моноалфавитных шифров замены. Это позволяло скрыть статистические закономерности открытого текста и противостоять частотному анализу.",
  ],
  principles: [
    {
      title: "Исходное сообщение",
      content:
        "Открытый текст представляется в виде последовательности символов x_1,x_2,…,x_n,x_(n+1),….",
    },
    {
      title: "Набор моноалфавитных шифров",
      content:
        "Заранее задаётся n различных таблиц (алфавитов) замены. В каждой таблице каждому символу открытого текста соответствует строго определённый символ шифротекста.",
    },
    {
      title: "Циклическое шифрование",
      content:
        "Первый символ сообщения шифруется с помощью 1-го алфавита, второй — с помощью 2-го, …, n-й символ — с помощью n-го алфавита. Затем (n+1)-й символ снова шифруется первым алфавитом, и процесс повторяется циклически.",
    },
    {
      title: "Полиалфавитная замена",
      content:
        "В результате каждый символ исходного текста оказывается зашифрован разными моноалфавитными шифрами в зависимости от его позиции. Это значительно усложняет зависимость между буквами открытого и закрытого текстов.",
    },
    {
      title: "Скрытие частотных характеристик",
      content:
        "Поскольку один и тот же символ открытого текста в разных позициях может заменяться на разные символы шифротекста, частотное распределение букв в шифротексте становится близким к равномерному, что делает классический частотный анализ бесполезным.",
    },
    {
      title: "Безопасность и уязвимость",
      content:
        "Благодаря полиалфавитности К-37 «Кристалл» была значительно устойчивее простых шифров замены. Однако в 1941 году один из образцов машины был захвачен немецкими войсками и передан криптоаналитикам. В результате шифр был взломан, и дальнейшее использование К-37 стало невозможным.",
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
      warningText="Шифр поддерживает только символы латинского алфавита"
    />
  )
}
