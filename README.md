# safe

- Install dependencies

    ```bash
    pnpm install
    ```

- Follow these [steps](https://supabase.com/docs/guides/database/prisma?queryGroups=migrate&migrate=pnpm_migrate) to setup prisma with supabase

- Run `npx prisma generate` on updating schema to update prisma client

- Copy over example .env

```bash
cp .env.example .env
```

    - Set the back-end URL

- Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
