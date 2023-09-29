---
title: Methodology
description: Install Fortify js.
---

When it comes to authentication there are dozens of differet concerns

1. Logging in users
2. Identifying logged in users
3. Registering users
4. Connecting accounts
5. And much more...

This is why Fortify provides primitives for you to build your own authentication system, we are not trying to be a drop in replacement for something like passport or similar auth libraries but rather another way of approaching authentication all together

### The request object

Fortify does not touch the request object at all, the auth methods expect you to get the information from the request yourself, for example if you're usnig Bearer authentication in express you would get the token like this

```ts
request.headers.get("Authorization");
```

Same goes for setting sessions etc

### Databases

When it comes to databases we are taking a similar but different approach, instead of forcing you to create a user object in a aspecific shape, you instead pass a callback to save users, retrieve users etc...

There are two use cases where Fortify does interact with databases directly and those are sessions and blocklists, for those we recommend redis but you can also opt out of this and instead pass a callback to handle it yourself, the reason is that in most cases you wouldn't have a need to access the sessions or blocklists outside of the aithentication but if for any reason you do want to do it you can

### Recipes

The same modular approach also applies to recipes, you create an isolated recipe class and pass it to the main auth instance, the main entry for an auth flow will usually be on the recipe and the recipe will return a user
