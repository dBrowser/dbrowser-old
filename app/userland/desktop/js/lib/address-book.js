// exported
// =

export async function loadProfile () {
  try {
    var addressBook = await dbrowser.dwebfs.readFile('hyper://system/address-book.json').then(JSON.parse)
    return dbrowser.dwebfs.drive(addressBook.profiles[0].key).getInfo()
  } catch (e) {
    console.log('Failed to load profile', e)
  }
  return undefined
}
