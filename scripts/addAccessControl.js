const sanityClient = require('@sanity/client')
const {uniq} = require('lodash')
const accessControlToken = process.env.SANITY_TOKEN
const config = require('../sanity.json')

if (!accessControlToken) {
  throw new Error('Could not find token from SANITY_TOKEN')
}
const client = sanityClient({
  projectId: config.api.projectId,
  dataset: config.api.dataset,
  token: accessControlToken,
  useCdn: false
})

const journalistMemberIds = [
  'someId' // Replace this with actual project member ids
]

function createJournalistGroup() {
  return {
    _id: `_.groups.journalists`,
    _type: 'system.group',
    grants: [
      {
        filter: "(_type == 'newsArticle')",
        permissions: [
          'create',
          'update',
          'read'
        ]
      }
    ],
    members: journalistMemberIds
  }
}

function createOrReplaceGroup(groupDoc) {
  client.createOrReplace(groupDoc).then(res => {
    console.log(`Created or replaced system group ${res._id}`)
  })
}

createOrReplaceGroup(createJournalistGroup())
