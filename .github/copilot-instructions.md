# Backend Engineering Standards
- **Framework:** Node.js with Express and TypeScript.
- **Data Layer:** Use Prisma ORM. Never use raw SQL to avoid injection.
- **Error Handling:** All endpoints must use a centralized `ErrorHandler` middleware. Do not use local try/catch blocks in controllers.
- **Security:** Use JWT for authentication. Password hashing must use Argon2.
- **Pattern:** Follow the 'Controller-Service' pattern to decouple logic from routes.


# Project Execution Standards
- **Scripts:** Always include a `package.json` with a `"demo": "ts-node src/server.ts"` script.
- **Dependencies:** Include `express`, `better-sqlite3`, `bcryptjs`, and `express-session`.
- **Dev Dependencies:** Include `typescript`, `ts-node`, and `@types/node`.
- **TypeScript:** Always generate a `tsconfig.json` with `esModuleInterop: true` and `strict: true`.