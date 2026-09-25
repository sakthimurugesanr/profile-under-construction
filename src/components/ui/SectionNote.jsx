const notes = {
  "top": {
    "text": "Start here",
    "path": "M18 12 C70 0 108 24 88 48 C70 68 52 42 74 36 C101 27 120 63 108 88",
    "tip": "M99 77 L108 88 L118 77"
  },
  "about": {
    "text": "Meet Sakthi",
    "path": "M20 10 C108 3 121 52 84 56 C48 60 64 22 86 38 C111 59 79 85 51 88",
    "tip": "M63 78 L51 88 L65 94"
  },
  "work": {
    "text": "My journey",
    "path": "M20 14 C62 10 38 48 72 43 C110 37 95 12 76 30 C54 54 92 73 118 88",
    "tip": "M103 87 L118 88 L113 74"
  },
  "stack": {
    "text": "My toolkit",
    "path": "M20 18 C65 4 111 24 100 49 C91 70 62 53 78 42 C99 28 112 65 104 90",
    "tip": "M96 78 L104 90 L114 80"
  },
  "projects": {
    "text": "Made by me",
    "path": "M20 12 C110 -2 126 58 91 62 C64 66 62 35 83 42 C105 50 78 83 48 88",
    "tip": "M59 77 L48 88 L63 93"
  },
  "background": {
    "text": "Keep learning",
    "path": "M20 12 C48 56 95 1 108 32 C124 67 65 40 76 67 C82 79 103 84 119 88",
    "tip": "M107 77 L119 88 L104 93"
  },
  "contact": {
    "text": "Say hello",
    "path": "M18 10 C87 10 121 30 102 51 C80 77 53 42 80 38 C116 33 94 84 62 89",
    "tip": "M73 78 L62 89 L77 94"
  }
}

export function SectionNote({ section }) {
 const note = notes[section]
 if (!note) return null
 return <div className={'section-note section-note--' + section} aria-hidden="true">
   <span>{note.text}</span>
   <svg viewBox="0 0 140 108" fill="none" focusable="false"><path d={note.path} /><path d={note.tip} /></svg>
 </div>
}
