import * as rpc from 'pauls-electron-rpc'
import * as ddrive from './fg/ddrive'
import * as internal from './fg/internal'
import * as external from './fg/external'
import * as experimental from './fg/experimental'
import { contextBridge } from 'electron'

export const setup = function () {
  // setup APIs
  var dbrowserx = {}
  if (['dbrowser:', 'dweb:', 'https:', 'http:', 'data:'].includes(window.location.protocol) ||
      window.location.hostname.endsWith('ddrive.network') /* TEMPRARY */) {
    dbrowserx.ddrive = ddrive.setup(rpc)
    Object.assign(dbrowserx, external.setup(rpc))
  }
  if (['dbrowser:', 'dweb:'].includes(window.location.protocol)) {
    contextBridge.exposeInMainWorld('experimental', experimental.setup(rpc)) // TODO remove?
  }
  if (window.location.protocol === 'dbrowser:' || /* TEMPRARY */ window.location.hostname.endsWith('ddrive.network')) {
    Object.assign(dbrowserx, internal.setup(rpc))
  }
  if (Object.keys(dbrowserx).length > 0) {
    contextBridge.exposeInMainWorld('dbrowserx', dbrowserx)
  }
}