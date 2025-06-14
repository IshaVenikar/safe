# safe

Helping paws find people.

A cozy space to share and find loving homes for stray and adoptable furry friends.

### Setup

- Install dependencies

    ```bash
    pnpm install
    ```

- Follow these [steps](https://supabase.com/docs/guides/database/prisma?queryGroups=migrate&migrate=pnpm_migrate) to setup prisma with supabase

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

### Update schema

- On updating [schema.prisma](./prisma/schema.prisma), run the following to apply the migration to your DB and generate the Prisma Client:

    ```bash
    npx prisma migrate dev --name <migration-name>
    ```

- Create a bucket and run the following scripts to store images:

    ```bash
    -- Replace 'images' with your bucket name, allows anyone with the image URL to view it
    update storage.buckets
    set public = true
    where id = 'images';

    -- Add a policy to allow uploads by authenticated users
    create policy "Authenticated users can upload"
    on storage.objects
    for insert
    to authenticated
    with check (
    bucket_id = 'furbaby-images'
    );
    ```
