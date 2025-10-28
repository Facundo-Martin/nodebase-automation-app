# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

### Notes

- We're gonna be using trpc prefetch and then passing it on to the client + the query state (otherwise you just have the data but you can't invalidate cache, use callbacks, or anything related to tanstack)
  => Note that Antonio does it in a certain way, but I'm sure that T3 team has a "better" way of doing it
  => Yeah they do, with the HydrateClient helper component
- Ok so code Rabbit in the trpc setup part seems pretty useful, especially for trpc endpoints where you might do smth like `findMany()` and you forget to either add a limit or pagination

### Features

- Clerk auth with webhook and protected procedure context
- Custom theming using tweakcn

### TODOs:

- Add Clerk webhooks
- Add Clerk custom sign in/up page (logo + project title without slugs)
- Add Cloudflared persisting tunnels (or ngrok with free tier, idk)
