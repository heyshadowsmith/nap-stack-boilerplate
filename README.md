# NAP Stack Boilerplate

This is a boilerplate repository to quickly get set up using Nuxt, Apollo, and Prisma.

![NAP Stack](https://github.com/TheShadowSmith/nap-stack/blob/master/nap-stack-logo.png "NAP Stack")

## Initialize the project
```
git clone https://github.com/heyshadowsmith/nap-stack-boilerplate.git
cd nap-stack-boilerplate && npm i
cd nuxt && npm i
```

## Add Prisma
Create a Prisma Service on [Prisma Cloud](https://www.prisma.io/cloud) and then create an `.env` file in your root like the following:
```
PRISMA_ENDPOINT=https://eu1.prisma.sh/dummy-account/demo/dev
PRISMA_SECRET=supersecrettext
```
The PRISMA_ENDPOINT will be the endpoint for your Prisma Service in Prisma Cloud.

The PRISMA_SECRET is yours to create; the stronger the better.

Now, run `npm run prisma:deploy` from the root, and Prisma will update your database and generate Prisma Client based on your `datamodel.graphql` file.

## Start the NAP Stack
In your terminal, run `npm run apollo` from your Root to start Apollo.

In another terminal, run `cd nuxt && npm run dev` from your Root to start Nuxt.

## Deploy the NAP Stack to Vercel
Create an account with Vercel and link it to your GitHub account then run `npm i -g vercel` to install the Vercel CLI.

After you authenticate, run the following commands to store your env variables in Vercel for your deployment.
```
now secrets add prisma_endpoint YOUR_ENDPOINT
now secrets add prisma_secret YOUR_SECRET
```
Delete the hidden `.git` directory in the Root to detach the repo from this repository.

Rename the project and push the project to your GitHub account.

After that, Vercel will automatically begin building your NAP Stack app with your Nuxt frontend located at `/` and your Apollo GraphQL API located at `/api`.