# Dusk Bloods

> Official Website: [duskfloods.net](https://duskfloods.net)

Open source project for the Dusk Bloods official website, built with Next.js 15 and deployed on Cloudflare Pages.

## Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework
- [React 18](https://react.dev/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [next-intl](https://next-intl.dev/) - Internationalization
- [Cloudflare Pages](https://pages.cloudflare.com/) - Deployment platform
- [OpenNext](https://opennext.js.org/cloudflare/) - Cloudflare deployment toolkit

## Features

- Responsive design with mobile adaptation
- Multi-language support (English, 日本語, 中文, Español, Français, Deutsch, 한국어, Italiano, Português)
- SEO optimized (sitemap, robots.txt)
- Google Analytics integration

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (root)/            # Root routes (English)
│   └── [locale]/          # Localized routes
├── components/            # React components
├── i18n/                  # Internationalization config
├── lib/                   # Utility functions
└── messages/              # Translation files
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:3444
```

## Build & Deploy

```bash
# Build project
npm run build

# Preview Cloudflare deployment
npm run preview

# Deploy to Cloudflare Pages
npm run deploy
```

## Pages

- `/` - Home
- `/about` - About the game
- `/gameplay` - Gameplay
- `/characters` - Characters
- `/release-date` - Release date
- `/faq` - FAQ
- `/privacy` - Privacy policy
- `/terms` - Terms of service

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  # Google Analytics ID
```

## License

MIT License
