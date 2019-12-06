const sanityClient = require("@sanity/client");
const { uniq } = require("lodash");
const accessControlToken = process.env.SANITY_TOKEN;
const config = require("../sanity.json");

if (!accessControlToken) {
  throw new Error("Could not find token from SANITY_TOKEN");
}
const client = sanityClient({
  projectId: config.api.projectId,
  dataset: config.api.dataset,
  token: accessControlToken,
  useCdn: false,
})

client.delete('_.groups.journalists').then((res) => {
  console.log(`Deleted system group`)
})
