export function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-6">
      <a
        href="/"
        className="text-sm font-semibold tracking-[0.2em] uppercase text-white/50 hover:text-white/80 transition-colors"
      >
        NoMusic
      </a>
      <a
        href="/admin"
        className="text-xs tracking-widest uppercase text-white/30 hover:text-white/70 transition-colors"
      >
        Admin
      </a>
    </header>
  )
}
