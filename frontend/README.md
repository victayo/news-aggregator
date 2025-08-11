# NextJS News Aggregator (Frontend)
## Overview
This a NextJS based News Aggregator project that displayes news from several sources. News can be viewed based on different categories. 

## Setup

1. Clone this repository:
```bash
git clone https://github.com/victor/news-aggregator.git
cd news-aggregator/frontend
```

2. Create a `.env` file in the project root with the required variables:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:{LARAVEL_PORT}
```

3. First, run the development server:

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