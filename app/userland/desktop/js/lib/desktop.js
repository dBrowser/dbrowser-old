import { getAvailableName } from 'dbrowser://app-stdlib/js/fs.js'

// exported
// =

// const EXPLORER_APP = 'https://dwebfs.network/'
// export const FIXED_FILES = [
//   makeFixedLink('.home-drive.goto', `${EXPLORER_APP}system`, 'Home Drive'),
//   makeFixedLink('.library.goto', 'dbrowser://library/', 'My Library'),
// ]

export async function load () {
  var userFiles = []
  try {
    userFiles = await dbrowser.dwebfs.readdir('hyper://system/bookmarks', {includeStats: true})
    userFiles = userFiles.filter(file => file.stat.metadata.pinned)
    userFiles.sort((a, b) => a.name.localeCompare(b.name))
    userFiles.forEach(b => { b.path = `/bookmarks/${b.name}` })
  } catch (e) {
    console.log('Failed to load bookmarks files', e)
  }
  return userFiles
}

export async function createLink ({href, title}, pinned) {
  await dbrowser.bookmarks.add({href, title, pinned})
  // var name = await getAvailableName('/bookmarks', title, dbrowser.dwebfs.drive('hyper://system/'), 'goto')
  // await dbrowser.dwebfs.drive('hyper://system/').writeFile(`/bookmarks/${name}`, '', {metadata: {href, title}})
}

export async function remove (file) {
  await dbrowser.dwebfs.unlink(`hyper://system/bookmarks/${file.name}`)
}

// internal
// =

function makeFixedLink (name, href, title) {
  return {
    name,
    stat: {
      isDirectory: () => false,
      isFile: () => true,
      mount: undefined,
      metadata: {href, title}
    },
    isFixed: true
  }
}