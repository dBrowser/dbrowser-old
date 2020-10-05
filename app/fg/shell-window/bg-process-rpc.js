import * as rpc from 'pauls-electron-rpc'
import browserManifest from '../../bg/web-apis/manifests/internal/browser'
import watchlistManifest from '../../bg/web-apis/manifests/internal/watchlist'
import folderSyncManifest from '../../bg/web-apis/manifests/internal/folder-sync'
import viewsManifest from '../../bg/rpc-manifests/views'
import toolbarManifest from '../../bg/rpc-manifests/toolbar'
import hyperdriveManifest from '../../bg/web-apis/manifests/external/ddrive'

export const dBrowserX = rpc.importAPI('dbrowser-x', browserManifest)
export const watchlist = rpc.importAPI('watchlist', watchlistManifest)
export const folderSync = rpc.importAPI('folder-sync', folderSyncManifest)
export const views = rpc.importAPI('background-process-views', viewsManifest)
export const toolbar = rpc.importAPI('background-process-toolbar', toolbarManifest)
export const ddrive = rpc.importAPI('ddrive', hyperdriveManifest)
