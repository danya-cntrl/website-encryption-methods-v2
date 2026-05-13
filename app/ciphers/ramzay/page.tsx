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

function validateText1(text: string): string | null {
  const upperText = text.toUpperCase();
  if (!/^[A-Z./ ]*$/.test(upperText)) {
    return "[Ошибка: Текст содержит недопустимые символы. Разрешены только латинские буквы.]";
  }
  return null;
}

function validateText2(text: string): string | null {
  const upperText = text.toUpperCase();
  if (!/^[A-Z./ ]*$/.test(upperText)) {
    return "[Ошибка: Текст содержит недопустимые символы. Разрешены только десятичные цифры.]";
  }
  return null;
}

function ramzayEncrypt(plaintext: string, key?: string): string {
  if (!key) {
    return "[Ошибка: Требуется ключ в формате: КЛЮЧЕВОЕ_СЛОВО,ГАММА]"
  }

  const validationError = validateText1(plaintext);
  if (validationError) return validationError;
  
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

  const validationError = validateText2(ciphertext);
  if (validationError) return validationError;
  
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
  title: "Шифр Рамзай",
  year: "1938-1940",
  subtitle: "Один из шифров спецслужб",
  imageSrc: "/images/soviet-cipher.jpg",
  imageAlt: "Советская шифровальная машина Рамзай",
  description: [
    "Шифр Рамзай —  это система шифрования, использовавшаяся советским разведчиком Рихардом Зорге, руководителем японской резидентуры ГРУ «Рамзай»,  для передачи секретной информации из Японии в Москву.",
    "Система основывалась на комбинации шахматной таблицы и одноразовой гаммы. Сначала текст преобразовывался в числа с помощью таблицы, построенной на основе ключевого слова, затем числа складывались с одноразовой гаммой по модулю 10.",
    "Ключевое слово определяло структуру таблицы преобразования. Текст разбивался на 5-значные группы для передачи по радио. Благодаря использованию одноразовой гаммы при правильном применении шифр обеспечивал высокую стойкость.",
  ],
  principles: [
    {
      title: "Выбор ключа и начальная сетка",
      content:
        "В качестве основы используется ключевое слово (например, SUBWAY). На его базе строится первая таблица, где первая строка — это сам ключ, а остальные ячейки последовательно заполняются буквами алфавита, не вошедшими в ключ.",
    },
    {
      title: "Служебные символы",
      content:
        "Для структурирования сообщения в таблицу добавляются специальные знаки: точка «.» служит разделителем слов, а косая черта «/» указывает на переход к вводу цифрового текста.",
    },
    {
      title: "Индексация частых букв (ASINTOER)",
      content:
        "Восемь наиболее часто используемых букв английского языка (A, S, I, N, T, O, E, R) нумеруются цифрами от 0 до 7. Порядок нумерации определяется путем вертикального сканирования столбцов начальной таблицы сверху вниз.",
    },
    {
      title: "Создание итоговой таблицы",
      content:
        "Формируется новая таблица из десяти столбцов (0–9). Буквы ASINTOER занимают ячейки в первой строке и получают однозначные индексы, а все остальные символы распределяются в последующие строки.",
    },
    {
      title: "Оцифровка и группировка",
      content:
        "Исходный текст переводится в числовой код согласно итоговой таблице. Полученная длинная последовательность цифр разбивается на стандартные блоки по 5 знаков, что упрощает дальнейшую обработку и передачу.",
    },
    {
      title: "Наложение одноразовой гаммы",
      content:
        "Для достижения максимальной стойкости каждая цифра сообщения складывается по модулю 10 с цифрой из псевдослучайной последовательности — гаммы. Только после этого зашифрованные группы чисел становятся готовы к отправке.",
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
      warningText="Шифр поддерживает только символы латинского алфавита и './'"
    />
  )
}
