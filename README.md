This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## DEVELOPMENT CONVENTIONS

- Use of `ES6` for JavaScript.
- Use of `Ant-design component` library.
- Make `components` built as `reusable` as possible (DRY)
- Use `double quotes` for imports
- Ensure that `packages` being used are `secured` and `not subject to vulnerabilities`
- In cases where a suitable package cannot be found, there will be a need to re-engineer the process needed to achieve the task.
- Ensure that code(functions and co) written are optimized
- Ensure `images` to be used are `hosted on CDNs`
- The Next `<Image />` component should be used and not the conventional `<img />` tag.
- Ensure functions are memoised and cached.
- Ensure `alt, height, width` and every other prop needed by the next `<Image />` component are supplied.

## REPO INTERACTION (push and pull).

- When you pull from the `dev` branch, checkout a branch from dev where you can do your work locally, when done with your work, push the changes to remote origin `whose name is the same as your local branch first and check how the builds are faring`.
- When the said builds have been determined to be `successful`, merge the branch into dev, `then and only then`, should you push to the `dev` branch.
- After pushing to the dev branch and `checking that the builds on the dev branch are also passing`, you can then make a pull-request (PR) from the `dev` branch to `staging`.
