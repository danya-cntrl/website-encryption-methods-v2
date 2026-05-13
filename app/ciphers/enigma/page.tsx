"use client"

import { CipherPageLayout } from "@/components/cipher-page-layout"

class EnigmaRotor {
  private alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  private wiring: string
  private turnoverChar: string
  public position: number = 0

  constructor(wiring: string, turnoverChar: string) {
    this.wiring = wiring
    this.turnoverChar = turnoverChar
  }

  step(): boolean {
    this.position = (this.position + 1) % 26
    return this.alphabet[this.position] === this.turnoverChar
  }

  forward(charIdx: number): number {
    const idx = (charIdx + this.position) % 26
    const char = this.wiring[idx]
    return (this.alphabet.indexOf(char) - this.position + 26) % 26
  }

  backward(charIdx: number): number {
    const idx = (charIdx + this.position) % 26
    const char = this.alphabet[idx]
    return (this.wiring.indexOf(char) - this.position + 26) % 26
  }

  reset(): void {
    this.position = 0
  }

  setPosition(pos: number): void {
    this.position = pos % 26
  }
}

class EnigmaMachine {
  private rotors: EnigmaRotor[]
  private reflector: string
  private alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

  constructor(rotors: EnigmaRotor[], reflectorWiring: string) {
    this.rotors = rotors
    this.reflector = reflectorWiring
  }

  private rotate(): void {
    if (this.rotors[0].step()) {
      if (this.rotors[1].step()) {
        this.rotors[2].step()
      }
    }
  }

  processChar(char: string): string {
    const upperChar = char.toUpperCase()
    if (!this.alphabet.includes(upperChar)) {
      return char
    }

    this.rotate()

    let idx = this.alphabet.indexOf(upperChar)
    for (const rotor of this.rotors) {
      idx = rotor.forward(idx)
    }

    const reflectedChar = this.reflector[idx]
    idx = this.alphabet.indexOf(reflectedChar)

    for (let i = this.rotors.length - 1; i >= 0; i--) {
      idx = this.rotors[i].backward(idx)
    }

    return this.alphabet[idx]
  }

  processText(text: string): string {
    return text.split("").map(c => this.processChar(c)).join("")
  }

  setPositions(positions: number[]): void {
    for (let i = 0; i < this.rotors.length && i < positions.length; i++) {
      this.rotors[i].setPosition(positions[i])
    }
  }

  resetPositions(): void {
    for (const rotor of this.rotors) {
      rotor.reset()
    }
  }
}

const ROTOR_I_WIRING = "EKMFLGDQVZNTOWYHXUSPAIBRCJ"
const ROTOR_II_WIRING = "AJDKSIRUXBLHWTMCQGZNPYFVOE"
const ROTOR_III_WIRING = "BDFHJLCPRTXVZNYEIWGAKMUSQO"
const REFLECTOR_B = "YRUHQSLDPXNGOKMIEBFZCWVJAT"

function parseKey(key: string): number[] | null {
  const keyUpper = key.toUpperCase().replace(/[^A-Z]/g, "")
  if (keyUpper.length < 3) return null
  
  return [
    keyUpper.charCodeAt(0) - 65,
    keyUpper.charCodeAt(1) - 65,
    keyUpper.charCodeAt(2) - 65
  ]
}

function createEnigmaMachine(): EnigmaMachine {
  const rotor1 = new EnigmaRotor(ROTOR_I_WIRING, "Q")
  const rotor2 = new EnigmaRotor(ROTOR_II_WIRING, "E")
  const rotor3 = new EnigmaRotor(ROTOR_III_WIRING, "V")
  return new EnigmaMachine([rotor1, rotor2, rotor3], REFLECTOR_B)
}

function validateText(text: string): string | null {
  const upperText = text.toUpperCase();
  if (!/^[A-Z ]*$/.test(upperText)) {
    return "[Ошибка: Текст содержит недопустимые символы. Разрешены только латинские буквы.]";
  }
  return null;
}

function enigmaEncrypt(plaintext: string, key?: string): string {
  if (!key || key.length < 3) {
    return "[Ошибка: Требуется ключ (3 буквы для позиций роторов, например: ABC)]"
  }
  
  const positions = parseKey(key)
  if (!positions) {
    return "[Ошибка: Ключ должен содержать 3 латинские буквы (A-Z)]"
  }

  const validationError = validateText(plaintext);
  if (validationError) return validationError;
  
  const machine = createEnigmaMachine()
  machine.setPositions(positions)
  
  return machine.processText(plaintext)
}

function enigmaDecrypt(ciphertext: string, key?: string): string {
  return enigmaEncrypt(ciphertext, key)
}

const pageData = {
  title: "Шифровальная машина Энигма",
  year: "1926",
  subtitle: "Немецкая электромеханическая роторная машина",
  imageSrc: "/images/enigma-machine.jpg",
  imageAlt: "Шифровальная машина Энигма",
  description: [
    "Энигма — электромеханическая роторная шифровальная машина, использовавшаяся нацистской Германией во время Второй мировой войны. Изобретённая немецким инженером Артуром Шербиусом в 1918 году, она стала основой военной криптографии Третьего рейха.",
    "Машина состояла из клавиатуры, набора вращающихся роторов (обычно 3-4), отражателя и коммутационной панели (штекерной доски). При нажатии клавиши электрический сигнал проходил через все компоненты, многократно шифруя букву по различным алфавитам.",
    "Таким образом, шифрование работало по принципу полиалфавитной подстановки, при этом меняя алфавиты (за которые, фактически, отвечали роторы и их положение для текущего символа) для каждого нового символа",
    "Главной особенностью и одновременно слабостью Энигмы было то, что буква никогда не могла быть зашифрована сама в себя. Это свойство помогло британским криптоаналитикам в Блетчли-парке, включая Алана Тьюринга, взломать шифр.",
  ],
  principles: [
    {
      title: "Штекерная доска",
      content:
        "Первый этап шифрования. До 13 пар букв соединяются проводами, меняясь местами. Это добавляет дополнительный уровень перестановки к основному роторному шифрованию.",
    },
    {
      title: "Система роторов",
      content:
        "Три или четыре ротора, каждый с 26 контактами. Ротор выполняет моноалфавитную замену. После каждого нажатия клавиши правый ротор поворачивается на одну позицию.",
    },
    {
      title: "Механизм вращения",
      content:
        "При достижении определённой позиции правый ротор поворачивает средний, средний — левый.",
    },
    {
      title: "Отражатель",
      content:
        "Неподвижный компонент, который отправляет сигнал обратно через роторы по другому пути. Именно он гарантирует, что буква не может зашифроваться сама в себя.",
    },
    {
      title: "Полиалфавитность",
      content:
        "Благодаря вращению роторов каждая следующая буква шифруется по-новому. Это создаёт период в миллионы символов до повторения ключевой последовательности.",
    },
    {
      title: "Симметричность",
      content:
        "Шифрование и дешифрование выполняются одинаково: если A→B, то при тех же настройках B→A. Получатель просто вводит шифротекст с идентичными настройками.",
    },
  ],
}

export default function EnigmaCipherPage() {
  return (
    <CipherPageLayout
      {...pageData}
      encryptFunction={enigmaEncrypt}
      decryptFunction={enigmaDecrypt}
      requiresKey={true}
      keyLabel="Позиции роторов (3 буквы)"
      keyPlaceholder="Например: ABC"
      warningText="Шифр поддерживает только символы латинского алфавита"
    />
  )
}
