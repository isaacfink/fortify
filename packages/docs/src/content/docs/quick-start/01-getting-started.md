---
title: What is Fortify?
description: A quick overview of the fortify js library, and what's useful for.
---

Fortify js uses a unique apaproach to authentication, Fortify js provides a collection of classes and methods for you to integrate into your backedn applications, Fortify js is platform agnostic and runs anywhere js does.

Here is an example Auth js implementation.

`auth.ts`

```ts
import { Auth as AuthClass } from "fortify";
import type { User } from "./types";

export const Auth = new Auth<User>();
```

And just like that we are ready to add authentication to our application

Let's see how we can authenticate a user, in your route do this

```ts
import { Auth } from "./auth.ts";

async function routeHandler(request:Request){
    const user = await Auth.getUser().with('jwt', {token:})

    // this will return a user without checking it against the database, we can check if it's in a block list form within the user object itself
    await user.checkIfBlocked()

    // Now let's check if the user is still authenticated
    const isAuthenticated = user.isAuthenticated
}
```

As you can see everything in Auth.js consists of getting a user object and all methods are on that object

The reason for doing it this way is because this allows you to bypass some checks for specific routes, the idea behind Fortify is simple single responsibility functions, this way it is easy for you the developer to see what is happeneing, and while we try to abstract away the complexities of authentication we also want to leave the door wide open for you to see what is happening behind the scenes

in our example the `.with('jwt',{})` function simply returns the information from the decoded token, in a lot of cases this might not be enough so you would want to take it a step further by checking against a list of blocked tokens, we achieve that by calling the `checkIfBlocked` function, this function like all other methods on the user object this returns the user object so you can also chain those methods like this

```ts
(await user.checkIfBlocked()).isAuthenticated;
```

Or even like this

```ts
(await user.checkIfBlocked()).(await getFromDb).isAdmin
```

The parantheses might look weird but it's so we are able to await the promises, this is also a valid approach

```ts
await Promise.all([user.checkIfBlocked(), user.getFromDb()]);

console.log(user.isAuthenticated);
```

there are a lot of built in receipes to choose from and you can create your own, a recipe has the following signature

```ts
class Recipe {
  constructor() {}

  async signIn() {}
  async getUser() {}
}
```

When creating a user the recipe get's injected into the user object which allows the user object to utilize recipe functionality, for example the `JWT` recipe injects a class that could

## Further reading

- Read [about reference](https://diataxis.fr/reference/) in the Diátaxis framework
