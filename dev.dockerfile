FROM node:18

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci

COPY src ./src
COPY public ./public
COPY next.config.mjs .
COPY tsconfig.json .
COPY tailwind.config.ts .
COPY drizzle.config.ts .
COPY postcss.config.js .
COPY components.json .
COPY next-env.d.ts .

CMD npm run dev
