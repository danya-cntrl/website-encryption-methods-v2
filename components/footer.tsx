"use client"



const footerLinks = [
  { label: "Что вы узнаете", href: "#learn" },
  { label: "История", href: "#history" },
  { label: "Криптография", href: "#cryptography" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        {/* Main Content */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-3xl font-semibold md:text-4xl lg:text-5xl">
            <span className="block">Сделано</span>
            <span className="block">студентами ИТМО</span>
          </h2>
          <p className="mx-auto max-w-md text-sm text-background/60">
            Образовательный проект о методах шифрования первой половины 20 века
          </p>
        </div>

        {/* Links */}
        <div className="mb-12 flex flex-wrap justify-center gap-6 text-sm">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-background/60 transition-colors hover:text-background"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="mb-8 h-px bg-background/10" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 text-xs text-background/40 md:flex-row">
          <p>2026</p>
          <div className="flex gap-4">
            <a href="#" className="transition-colors hover:text-background/60">
              
            </a>
            <a href="#" className="transition-colors hover:text-background/60">
              Проект сделан в образовательных целях.
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
