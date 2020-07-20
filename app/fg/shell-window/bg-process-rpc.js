import * as rpc from 'pauls-electron-rpc'
import browserManifest from '../../bg/web-apis/manifests/internal/browser'
import watchlistManifest from '../../bg/web-apis/manifests/internal/watchlist'
import viewsManifest from '../../bg/rpc-manifests/views'
import hyperdriveManifest from '../../bg/web-apis/manifests/external/dwebfs'

export const dBrowserX = rpc.importAPI('dbrowser-browser', browserManifest)
export const watchlist = rpc.importAPI('watchlist', watchlistManifest)
export const views = rpc.importAPI('background-process-views', viewsManifest)
export const dwebfs = rpc.importAPI('dwebfs', hyperdriveManifest)