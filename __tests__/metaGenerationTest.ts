import {getDatafromDocs} from '../scripts/updateBlogMeta'


it('Verifies character toUpper works correctly', async () => {
  var res = await getDatafromDocs()
  expect(res.categories.length > 0 ).toEqual( true )
})
