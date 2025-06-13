# safe

- Install dependencies

    ```bash
    pnpm install
    ```

- Follow these [steps](https://supabase.com/docs/guides/database/prisma?queryGroups=migrate&migrate=pnpm_migrate) to setup prisma with supabase

- Run the following on updating prisma schema to regenerate client build code

    ```bash
    npx prisma db push
    npx prisma generate
    ```

- Copy over example .env

    ```bash
    cp .env.example .env
    ```

  - Set the back-end URL, supabase URL and anon key

- Run the development server:

    ```bash
    pnpm dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
