This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## [Exercise](https://frontend-take-home.fetch.com/)

## Running it locally

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.


## Deployed URL
[https://fe-exercise-one.vercel.app/](https://fe-exercise-one.vercel.app/)

## What when wrong?
It was a bit tricky to get the authentication working. Because the cookies are being empty after a page reload, and when handling the cookies on the server I needed to parse the cookies string into an actual cookie and set it to the browse which still doesn't work.

My bandage solution was to have a context provider state that handles if the user has successfully hit the endpoint `/auth/login` then just switch to the search view.

## What could be improved?
- I used next-auth and Clerk for authentication with my past projects and I would say it would be easier to use those libraries when it comes to authentication. But I know the exercise indicates that I need to roll-up my own auth flow.
- Secondly, I think adding some minor animations like fade-in and fade-out would be nice.
- The UI for adding dog to favories can be improved. I just experimented with it a long the way.
- If I was able to used to cookies properly, I would have call the function endpoint e.g. the list of breeds or the initial dog search on the server component/page and then pass it to the client child component as initialData for the query hooks. That way the initial data would have been much faster to display.
- Saving the state of the params as URL query params. That way the user can share the URL with others and they can get the same results and every time the user refreshes the page the filters are already applied.

## What I learned?
I learned more about HttpOnly cookies.

## Features
- Light/Dark mode
- Form validation
- Loading states
- Search by breed
- Search by location
- Sorting
- Pagination
- Add dog to favorites
- Find a furfect companion
- Informative tooltips and toasts
- Responsive
- Modern UI

## Tech Stack Used
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tanstack Query](https://tanstack.com/query/latest)
- [React Hook Form](https://react-hook-form.com/)
- [Lucide](https://lucide.dev/)
- [Vercel](https://vercel.com/)
- [Shad/cn](https://ui.shadcn.com/)
- [Zod](https://zod.dev/)
