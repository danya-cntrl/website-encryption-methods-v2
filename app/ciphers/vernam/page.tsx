"use client"

import { CipherPageLayout } from "@/components/cipher-page-layout"

function validateText(text: string): string | null {
  const upperText = text.toUpperCase();
  if (!/^[A-Z 0-9]*$/.test(upperText)) {
    return "[Ошибка: Текст содержит недопустимые символы. Разрешены только латинские буквы.]";
  }
  return null;
}

function vernamEncrypt(plaintext: string, key?: string): string {
  if (!key) {
    return "[Ошибка: Требуется ключ (гамма) для шифрования]"
  }

  const validationError = validateText(plaintext);
  if (validationError) return validationError;
  
  if (key.length < plaintext.length) {
    return `[Ошибка: Гамма должна быть не короче сообщения (${plaintext.length} символов)]`
  }
  
  const textEncoder = new TextEncoder()
  const textBytes = textEncoder.encode(plaintext)
  const keyBytes = textEncoder.encode(key)
  
  const encryptedBytes: number[] = []
  
  for (let i = 0; i < textBytes.length; i++) {
    const resultByte = textBytes[i] ^ keyBytes[i]
    encryptedBytes.push(resultByte)
  }
  
  return encryptedBytes.map(b => b.toString(16).padStart(2, "0")).join("")
}

function vernamDecrypt(ciphertext: string, key?: string): string {
  if (!key) {
    return "[Ошибка: Требуется ключ (гамма) для дешифровки]"
  }

  const validationError = validateText(ciphertext);
  if (validationError) return validationError;
  
  const hexString = ciphertext.replace(/\s/g, "")
  
  if (!/^[0-9a-fA-F]*$/.test(hexString)) {
    return "[Ошибка: Шифротекст должен быть в шестнадцатеричном формате]"
  }
  
  if (hexString.length % 2 !== 0) {
    return "[Ошибка: Некорректная длина шестнадцатеричной строки]"
  }
  
  const encryptedBytes: number[] = []
  for (let i = 0; i < hexString.length; i += 2) {
    encryptedBytes.push(parseInt(hexString.slice(i, i + 2), 16))
  }
  
  const textEncoder = new TextEncoder()
  const keyBytes = textEncoder.encode(key)
  
  if (keyBytes.length < encryptedBytes.length) {
    return `[Ошибка: Гамма должна быть не короче сообщения (${encryptedBytes.length} байт)]`
  }
  
  const decryptedBytes: number[] = []
  for (let i = 0; i < encryptedBytes.length; i++) {
    const resultByte = encryptedBytes[i] ^ keyBytes[i]
    decryptedBytes.push(resultByte)
  }
  
  const textDecoder = new TextDecoder()
  return textDecoder.decode(new Uint8Array(decryptedBytes))
}

const pageData = {
  title: "Шифр Вернама",
  year: "1917",
  subtitle: "Абсолютно стойкий шифр",
  imageSrc: "/images/vernam-cipher.jpg",
  imageAlt: "Шифр Вернама - историческое фото телетайпной машины",
  description: [
    "Шифр Вернама, также известный как одноразовый блокнот (One-Time Pad), был изобретён американским инженером Гилбертом Вернамом в 1917 году. Это единственный шифр, математически доказанная абсолютная криптографическая стойкость которого подтверждена Клодом Шенноном.",
    "Принцип работы основан на сложении битов открытого текста с битами случайной гаммы (ключа) по модулю 2 (операция XOR). При соблюдении трёх условий — истинная случайность ключа, его длина не меньше длины сообщения, и однократное использование — шифр невозможно взломать даже при неограниченных вычислительных ресурсах.",
    "Исторически шифр использовался для защиты дипломатической переписки между Москвой и Вашингтоном во время Холодной войны. Главный недостаток — сложность безопасного распределения ключей, равных по длине сообщениям.",
  ],
  principles: [
    {
      title: "Генерация ключа",
      content:
        "Создаётся истинно случайная последовательность символов (гамма), длина которой равна или превышает длину сообщения. Ключ должен быть по-настоящему случайным, не псевдослучайным.",
    },
    {
      title: "Операция XOR",
      content:
        "Каждый бит открытого текста складывается с соответствующим битом ключа по модулю 2. Если биты совпадают — результат 0, если различаются — результат 1.",
    },
    {
      title: "Передача шифротекста",
      content:
        "Полученный шифротекст передаётся получателю по открытому каналу. Без знания ключа расшифровка невозможна — любой текст равновероятен.",
    },
    {
      title: "Расшифровка",
      content:
        "Получатель применяет ту же операцию XOR к шифротексту с использованием идентичного ключа. Свойство XOR: A ⊕ K ⊕ K = A.",
    },
    {
      title: "Уничтожение ключа",
      content:
        "После однократного использования ключ уничтожается. Повторное использование ключа полностью компрометирует безопасность системы.",
    },
    {
      title: "Абсолютная стойкость",
      content:
        "При соблюдении всех условий злоумышленник не получает никакой информации о сообщении, даже имея бесконечные вычислительные ресурсы.",
    },
  ],
}

export default function VernamCipherPage() {
  return (
    <CipherPageLayout
      {...pageData}
      encryptFunction={vernamEncrypt}
      decryptFunction={vernamDecrypt}
      requiresKey={true}
      keyLabel="Ключ (гамма)"
      keyPlaceholder="Введите случайный ключ..."
      warningText="Шифр поддерживает только латиницу и выводит результат в HEX"
    />
  )
}
