This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Development Tools

This project uses several development tools to ensure code quality:

### Code Quality

- **ESLint**: Code linting with Next.js and TypeScript rules
- **Prettier**: Code formatting with import sorting
- **TypeScript**: Static type checking

### Git Hooks (Husky)

- **Pre-commit**: Runs linting, formatting, and build checks
- **Commit-msg**: Validates commit messages using conventional commits

### Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run ESLint
pnpm lint:fix     # Run ESLint with auto-fix
pnpm format       # Format code with Prettier
pnpm format:check # Check code formatting
pnpm type-check   # Run TypeScript type checking
```

### Commit Message Format

This project follows [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**

- `feat`: 새로운 기능 추가
- `fix`: 오류 수정 - 기능 상 변경(개선or수정), 롤백의 단위
- `bug`: 기능상의 오류
- `docs`: 문서 관련 수정
- `style`: CSS 관련
- `refactor`: 코드의 리팩터링(기능 상 변경 x)
- `chore`: 잡다한 수정사항
- `build`: 빌드 혹은 패키지 매니저 수정사항
- `test`: test 코드 삽입 및 수정
- `comment`: 필요한 주석 추가 및 변경

**Breaking Changes:**

- `fix!`: breaking change가 포함된 수정
- `BREAKING CHANGE:` 메시지 본문에 포함하여 상세 설명

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
