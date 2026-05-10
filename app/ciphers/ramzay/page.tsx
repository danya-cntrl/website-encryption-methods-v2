"use client"

import { CipherPageLayout } from "@/components/cipher-page-layout"

function buildRamsayTable(keyword: string): Map<string, string> {
  const keywordUpper = keyword.toUpperCase().replace(/\s/g, "")
  const latinAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  
  let alphabet = ""
  for (const char of keywordUpper) {
    if (!alphabet.includes(char)) {
      alphabet += char
    }
  }
  for (const char of latinAlphabet) {
    if (!alphabet.includes(char)) {
      alphabet += char
    }
  }
  alphabet += "./"

  const columns: string[][] = [[], [], [], [], [], []]
  for (let i = 0; i < alphabet.length; i++) {
    columns[i % 6].push(alphabet[i])
  }

  const orderedChars: string[] = []
  for (const col of columns) {
    orderedChars.push(...col)
  }

  const frequentTargets = "ASINTOER"
  const asintoerOrdered = orderedChars.filter(c => frequentTargets.includes(c))
  const remainingOrdered = orderedChars.filter(c => !frequentTargets.includes(c))

  const mapping = new Map<string, string>()
  
  for (let i = 0; i < asintoerOrdered.length; i++) {
    mapping.set(asintoerOrdered[i], String(i))
  }

  for (let i = 0; i < remainingOrdered.length; i++) {
    if (i < 10) {
      mapping.set(remainingOrdered[i], "8" + String(i))
    } else if (i < 20) {
      mapping.set(remainingOrdered[i], "9" + String(i - 10))
    }
  }

  return mapping
}

function ramzayEncrypt(plaintext: string, key?: string): string {
  if (!key) {
    return "[Ошибка: Требуется ключ в формате: КЛЮЧЕВОЕ_СЛОВО,ГАММА]"
  }
  
  const parts = key.split(",").map(p => p.trim())
  if (parts.length < 2) {
    return "[Ошибка: Введите ключевое слово и гамму через запятую (например: SUBWAY,12345)]"
  }
  
  const [keyword, gamma] = parts
  
  if (!keyword || !gamma) {
    return "[Ошибка: Требуется и ключевое слово, и гамма]"
  }
  
  if (!/^\d+$/.test(gamma)) {
    return "[Ошибка: Гамма должна содержать только цифры]"
  }
  
  const mapping = buildRamsayTable(keyword)
  
  const preparedText = plaintext.toUpperCase().replace(/ /g, "/")
  
  let digitSequence = ""
  for (const char of preparedText) {
    if (mapping.has(char)) {
      digitSequence += mapping.get(char)
    }
  }
  
  digitSequence += "99"
  
  while (digitSequence.length % 5 !== 0) {
    digitSequence += "9"
  }
  
  const groups: string[] = []
  for (let i = 0; i < digitSequence.length; i += 5) {
    groups.push(digitSequence.slice(i, i + 5))
  }
  
  const result: string[] = []
  for (const group of groups) {
    let encryptedGroup = ""
    for (let i = 0; i < 5; i++) {
      const val = (parseInt(group[i]) + parseInt(gamma[i % gamma.length])) % 10
      encryptedGroup += String(val)
    }
    result.push(encryptedGroup)
  }
  
  return result.join(" ")
}

function buildRamsayReverseTable(keyword: string): Map<string, string> {
  const forwardTable = buildRamsayTable(keyword)
  const reverseTable = new Map<string, string>()
  
  for (const [char, code] of forwardTable.entries()) {
    reverseTable.set(code, char)
  }
  
  return reverseTable
}

function ramzayDecrypt(ciphertext: string, key?: string): string {
  if (!key) {
    return "[Ошибка: Требуется ключ в формате: КЛЮЧЕВОЕ_СЛОВО,ГАММА]"
  }
  
  const parts = key.split(",").map(p => p.trim())
  if (parts.length < 2) {
    return "[Ошибка: Введите ключевое слово и гамму через запятую (например: SUBWAY,12345)]"
  }
  
  const [keyword, gamma] = parts
  
  if (!keyword || !gamma) {
    return "[Ошибка: Требуется и ключевое слово, и гамма]"
  }
  
  if (!/^\d+$/.test(gamma)) {
    return "[Ошибка: Гамма должна содержать только цифры]"
  }
  
  const cleanedCipher = ciphertext.replace(/\s/g, "")
  if (!/^\d+$/.test(cleanedCipher)) {
    return "[Ошибка: Шифротекст должен содержать только цифры]"
  }
  
  let decryptedDigits = ""
  for (let i = 0; i < cleanedCipher.length; i++) {
    const val = (parseInt(cleanedCipher[i]) - parseInt(gamma[i % gamma.length]) + 10) % 10
    decryptedDigits += String(val)
  }
  
  const reverseMapping = buildRamsayReverseTable(keyword)
  
  const validSingleDigits = new Set<string>()
  for (const [code] of reverseMapping.entries()) {
    if (code.length === 1) {
      validSingleDigits.add(code)
    }
  }
  
  let result = ""
  let i = 0
  while (i < decryptedDigits.length) {
    const digit = decryptedDigits[i]
    
    if (digit === "9" && i + 1 < decryptedDigits.length) {
      const twoDigit = digit + decryptedDigits[i + 1]
      if (twoDigit === "99") {
        break
      }
      if (reverseMapping.has(twoDigit)) {
        result += reverseMapping.get(twoDigit)
        i += 2
        continue
      }
    }
    
    if (digit === "8" && i + 1 < decryptedDigits.length) {
      const twoDigit = digit + decryptedDigits[i + 1]
      if (reverseMapping.has(twoDigit)) {
        result += reverseMapping.get(twoDigit)
        i += 2
        continue
      }
    }
    
    if (validSingleDigits.has(digit) && reverseMapping.has(digit)) {
      result += reverseMapping.get(digit)
      i++
    } else {
      i++
    }
  }
  
  return result.replace(/\//g, " ").trim()
}

const pageData = {
  title: "Шифр Рэмзай",
  year: "1938-1940",
  subtitle: "Советская шифровальная машина М-100",
  imageSrc: "/images/soviet-cipher.jpg",
  imageAlt: "Советская шифровальная машина Рэмзай",
  description: [
    "Шифр Рэмзай — советская электромеханическая шифровальная машина М-100, разработанная в конце 1930-х годов. Она представляла собой полиалфавитную шифровальную систему, последовательно применявшую несколько моноалфавитных подстановок.",
    "Машина использовала принцип многократного шифрования: открытый текст проходил через несколько слоёв подстановки, каждый из которых использовал свой алфавит. Это создавало сложную зависимость между входными и выходными символами.",
    "В 1941 году один из образцов машины был захвачен немецкими войсками. Криптоаналитики Вермахта смогли взломать шифр, после чего машину перестали использовать для секретной переписки. Этот случай стал важным уроком о необходимости физической защиты криптографического оборудования.",
  ],
  principles: [
    {
      title: "Полиалфавитность",
      content:
        "Основной принцип работы — последовательное применение нескольких различных алфавитов подстановки. Каждая буква шифруется по-разному в зависимости от её позиции.",
    },
    {
      title: "Моноалфавитные слои",
      content:
        "Каждый слой шифрования представляет собой простую моноалфавитную замену. Но их комбинация создаёт сложную криптографическую систему.",
    },
    {
      title: "Ключевая система",
      content:
        "Ключ определял начальные настройки машины и последовательность применения алфавитов. Без знания ключа дешифровка требовала анализа статистики.",
    },
    {
      title: "Механизм вращения",
      content:
        "Роторы машины вращались после каждого символа, изменяя применяемую комбинацию подстановок. Это обеспечивало длинный период до повторения.",
    },
    {
      title: "Уязвимость захвата",
      content:
        "Главная слабость системы проявилась при физическом захвате машины противником. Знание устройства позволило криптоаналитикам взломать шифр.",
    },
    {
      title: "Урок безопасности",
      content:
        "История Рэмзай показала, что безопасность шифра не должна зависеть от секретности алгоритма — только от секретности ключа (принцип Керкгоффса).",
    },
  ],
}

export default function RamzayCipherPage() {
  return (
    <CipherPageLayout
      {...pageData}
      encryptFunction={ramzayEncrypt}
      decryptFunction={ramzayDecrypt}
      requiresKey={true}
      keyLabel="Ключевое слово и гамма"
      keyPlaceholder="Например: SUBWAY,12345"
    />
  )
}
