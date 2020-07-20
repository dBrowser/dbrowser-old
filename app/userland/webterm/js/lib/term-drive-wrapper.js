/*
This wrapper provides a DWebFs interface for non-dweb sites
so that errors can be smoothly generated
*/

export function createDrive (url) {
  if (url.startsWith('hyper:')) {
    return dbrowser.dwebfs.drive(url)
  }
  return new Proxy({}, {
    get (obj, k) {
      if (k === 'url') return url
      if (k === 'stat') {
        return () => {
          // fake response to just let stat() callers pass through
          return {
            isUnsupportedProtocol: true,
            isDirectory: () => true,
            isFile: () => true
          }
        }
      }
      return () => {
        let urlp = new URL(url)
        throw new Error(`${urlp.protocol} does not support this command`)
      }
    }
  })
}
