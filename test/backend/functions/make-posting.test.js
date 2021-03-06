let { assert } = require('chai')

let dbFunctions = require('../../../database/wrapper')
let { DEFAULT_DB, POST_COLLECTION } = require('../../../database/wrapper-impl')

const makePosting = require('../../../backend/functions/make-posting')

describe('Make Posting', function () {
  let db

  before(async function () {
    db = await dbFunctions.connect()
  })

  describe('#make-posting', function () {
    it('should make a post with the given data', async function () {
      const USER_ID = 'testID'
      await makePosting({ _id: USER_ID }, {
        description: 'desciprtion',
        title: 'default',
        contactInfo: { 'email': 'test@gmail.com' },
        skills: ['Python'],
        fields: []
      })
      let post = await db.db(`${DEFAULT_DB}-test`).collection(POST_COLLECTION).findOne({
        title: 'default'
      })
      assert(post)
      assert.include(post, { ownerId: USER_ID })
    })

    it('should throw unauthorized', async function () {
      let errStr = ''
      try {
        await makePosting(undefined, {
          description: 'description',
          title: 'default',
          contactInfo: { 'email': 'test@gmail.com' },
          skills: ['Python'],
          fields: []
        })
      } catch (err) {
        errStr = err.toString()
      }
      assert.strictEqual(errStr, 'Error: not authorized')
    })

    it('should return w/ error for missing parameters', async function () {
      const USER_ID = 'testID'
      let errStr = ''
      try {
        await makePosting({ _id: USER_ID }, {
          description: '',
          title: 'default',
          contactInfo: { 'email': 'test@gmail.com' },
          skills: ['Python'],
          fields: []
        })
      } catch (err) {
        errStr = err.toString()
      }
      assert.strictEqual(errStr, 'Error: missing post parameters')
    })
  })

  after(async function () {
    await db.db(`${DEFAULT_DB}-test`).collection(POST_COLLECTION).drop()
    dbFunctions.close()
  })
})
