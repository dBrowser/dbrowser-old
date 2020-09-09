// exported
// =

export async function loadProfile () {
  try {
    var addressBook = await dbrowserx.ddrive.readFile('dweb://system/address-book.json').then(JSON.parse)
    return dbrowserx.ddrive.drive(addressBook.profiles[0].key).getInfo()
  } catch (e) {
    console.log('Failed to load profile', e)
  }
  return undefined
}
