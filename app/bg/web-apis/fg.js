import * as rpc from 'pauls-electron-rpc'
import * as dwebfs from './fg/dwebfs'
import * as internal from './fg/internal'
import * as external from './fg/external'
import * as experimental from './fg/experimental'
import { ipcRenderer, contextBridge } from 'electron'

export const setup = function () {
  // setup APIs
  var dbrowser = {}
  if (['dbrowser:', 'hyper:', 'https:', 'http:', 'data:'].includes(window.location.protocol) ||
      window.location.hostname.endsWith('dwebfs.network') /* TEMPRARY */) {
    dbrowser.dwebfs = dwebfs.setup(rpc)
    Object.assign(dbrowser, external.setup(rpc))
  }
  if (['dbrowser:', 'hyper:'].includes(window.location.protocol)) {
    contextBridge.exposeInMainWorld('experimental', experimental.setup(rpc)) // TODO remove?
    // TEMPORARY
    contextBridge.exposeInMainWorld('__internalBeakerEditor', {
      open: () => ipcRenderer.send('temp-open-editor-sidebar')
    })
  }
  if (window.location.protocol === 'dbrowser:' || /* TEMPRARY */ window.location.hostname.endsWith('dwebfs.network')) {
    Object.assign(dbrowser, internal.setup(rpc))
  }
  contextBridge.exposeInMainWorld('dbrowser', dbrowser)
}