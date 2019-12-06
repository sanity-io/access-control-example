# Custom Access Control Basic Example

This is a simple example for how members of a system group `journalists` can create news articles in a dataset, with
no rights prior (except reading for public datasets).

We will invite a new user to the project with no predefined access, and then add this user to the `journalists` system group, where it will be able to create posts of type `newsArticle`.

## Setting up

- Make sure you have access control enabled on your project's plan or this example will not work.
- Make a new token that has "Create Session" capabilities at manage.sanity.io under your project's "Settings > API > Tokens"
- Run `sanity init` and select your project from the list, or create a new one.
- Invite a user with role "Custom (none)" from the "Team" page at manage.sanity.io for the project.
- Start the studio `sanity start`. Try logging into the Studio with the newly invited user. The user will not be able to create anything.
- Edit [`./scripts/addAccessControl.js`](https://github.com/sanity-io/access-control-test-studio/blob/master/scripts/addAccessControl.js#L17) to match your test user's project member id.
  You can find the project member id at https://api.sanity.io/v1/projects/[PROJECT_ID] under `.members.id`.
- Run `SANITY_TOKEN=xxx npm add-access-control` to setup the access rule for journalists
  (replace xxx with your token from the second step).
- Logged in as the journalist, you are now able to create a new `newsArticle`.
- Remove the journalists system group by running `SANITY_TOKEN=xxx npm run remove-access-control`.
- The user will no longer be able to create anything.

## Documentation

* https://www.sanity.io/docs/access-control
* https://www.sanity.io/docs/js-client
