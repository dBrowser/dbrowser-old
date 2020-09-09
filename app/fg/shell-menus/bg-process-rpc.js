import * as rpc from 'pauls-electron-rpc'
import browserManifest from '../../bg/web-apis/manifests/internal/browser'
import drivesManifest from '../../bg/web-apis/manifests/internal/drives'
import bookmarksManifest from '../../bg/web-apis/manifests/internal/bookmarks'
import folderSyncManifest from '../../bg/web-apis/manifests/internal/folder-sync'
import historyManifest from '../../bg/web-apis/manifests/internal/history'
import sitedataManifest from '../../bg/web-apis/manifests/internal/sitedata'
import downloadsManifest from '../../bg/web-apis/manifests/internal/downloads'
import hyperdriveManifest from '../../bg/web-apis/manifests/external/ddrive'
import shellManifest from '../../bg/web-apis/manifests/external/shell'
import beakerFsManifest from '../../bg/web-apis/manifests/internal/dbrowserx-filesystem'
import shellMenusManifest from '../../bg/rpc-manifests/shell-menus'
import viewsManifest from '../../bg/rpc-manifests/views'

export const dBrowserX = rpc.importAPI('dbrowser-x', browserManifest)
export const drives = rpc.importAPI('drives', drivesManifest)
export const bookmarks = rpc.importAPI('bookmarks', bookmarksManifest)
export const folderSync = rpc.importAPI('folder-sync', folderSyncManifest)
export const history = rpc.importAPI('history', historyManifest)
export const sitedata = rpc.importAPI('sitedata', sitedataManifest)
export const downloads = rpc.importAPI('downloads', downloadsManifest)
export const ddrive = rpc.importAPI('ddrive', hyperdriveManifest)
export const shell = rpc.importAPI('shell', shellManifest)
export const beakerFs = rpc.importAPI('dbrowserx-filesystem', beakerFsManifest)
export const shellMenus = rpc.importAPI('background-process-shell-menus', shellMenusManifest)
export const views = rpc.importAPI('background-process-views', viewsManifest)