# Progress Notes

## 2026-07-22 — Scaffold → Navbar → Hero

### Completed

- [x] Next.js 15 + TypeScript + Tailwind CSS 3 + Framer Motion scaffolded
- [x] Project folder structure created
- [x] Navbar component built per Figma + Design/Home/Navbar
- [x] Hero section built per Figma + Design/Home/Hero
- [x] Full Figma document parsed via API (token-based)
- [x] All images downloaded to public/img/

### Navbar — Final Specs

| Property | Value |
|---|---|
| Position | fixed, top-0, z-50 |
| Height | 72px |
| Text color | #111111 (static) |
| Logo | 150x92px, 10px top margin |
| Page padding | 260px left + right |
| Nav items | About, Portfolio, Research, Network |
| Item gap | 209px |
| Alignment | Logo left, items right (ml-auto) |
| Font | Inter, 13px, weight 400, 0.04em |
| Opacity | 80% normal → 100% hover |
| Hover effect | scale-125 + opacity-100, 250ms ease |

### Hero — Final Specs

| Property | Value |
|---|---|
| Height | 100vh, min 900px |
| BG image | bg-hero.png, right 2/3, right-top aligned |
| Headline | "BUILDING CLARITY, / IN COMPLEXITY." |
| Headline font | Cormorant Garamond 300, 64px, uppercase |
| Headline spacing | 0.16em tracking |
| Headline color | #111111 |
| Headline shadow | drop-shadow(0 -2px 4px rgba(0,0,0,0.12)) |
| Keywords | "Data • Logic • Insight" |
| Keywords font | Cormorant Garamond 300, 24px, #222222, 70% opacity |
| Bullets | Black 8x8 squares |
| Animation (headline) | 2s easeIn, fade + translateY 12px |
| Animation (keywords) | 2s easeIn, fade only, 3s delay |

### Next Up

- [ ] About (Sincerest Letter) section
- [ ] Philosophy section
- [ ] Works section
- [ ] Curriculum Vitae section
- [ ] Scroll-based section animations
- [ ] Mobile responsive
