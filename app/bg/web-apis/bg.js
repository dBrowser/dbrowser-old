import { BrowserView } from 'electron'
import * as rpc from 'pauls-electron-rpc'
import { findTab } from '../ui/tab-manager'

// TEMPORARY: dwebfs.network is trusted
const INTERNAL_ORIGIN_REGEX = /^(dbrowser:|https?:\/\/(.*\.)?dwebfs\.network(:|\/))/i
const SITE_ORIGIN_REGEX = /^(dbrowser:|hyper:|https?:|data:)/i
const IFRAME_WHITELIST = [
  'dwebfs.loadDrive',
  'dwebfs.getInfo',
  'dwebfs.diff',
  'dwebfs.stat',
  'dwebfs.readFile',
  'dwebfs.readdir',
  'dwebfs.query',
  'dwebfs.watch',
  'dwebfs.resolveName'
]

// internal manifests
import loggerManifest from './manifests/internal/logger'
import drivesManifest from './manifests/internal/drives'
import beakerBrowserManifest from './manifests/internal/browser'
import beakerFilesystemManifest from './manifests/internal/dbrowser-filesystem'
import bookmarksManifest from './manifests/internal/bookmarks'
import datLegacyManifest from './manifests/internal/dweb-legacy'
import downloadsManifest from './manifests/internal/downloads'
import folderSyncManifest from './manifests/internal/folder-sync'
import historyManifest from './manifests/internal/history'
import sitedataManifest from './manifests/internal/sitedata'
import watchlistManifest from './manifests/internal/watchlist'

// internal apis
import { WEBAPI as loggerAPI } from '../logger'
import { WEBAPI as auditLogAPI } from '../dbs/audit-log'
import drivesAPI from './bg/drives'
import * as bookmarksAPI from '../filesystem/bookmarks'
import beakerFilesystemAPI from './bg/dbrowser-filesystem'
import datLegacyAPI from './bg/dweb-legacy'
import folderSyncAPI from './bg/folder-sync'
import historyAPI from './bg/history'
import { WEBAPI as sitedataAPI } from '../dbs/sitedata'
import watchlistAPI from './bg/watchlist'
import { WEBAPI as downloadsAPI } from '../ui/downloads'
import { WEBAPI as beakerBrowserAPI } from '../browser'

// external manifests
import capabilitiesManifest from './manifests/external/capabilities'
import contactsManifest from './manifests/external/contacts'
import hyperdriveManifest from './manifests/external/dwebfs'
import markdownManifest from './manifests/external/markdown'
import peersocketsManifest from './manifests/external/peersockets'
import shellManifest from './manifests/external/shell'

// external apis
import capabilitiesAPI from './bg/capabilities'
import contactsAPI from './bg/contacts'
import hyperdriveAPI from './bg/dwebfs'
import markdownAPI from './bg/markdown'
import peersocketsAPI from './bg/peersockets'
import shellAPI from './bg/shell'

// experimental manifests
import experimentalCapturePageManifest from './manifests/external/experimental/capture-page'
import experimentalDatPeersManifest from './manifests/external/experimental/dweb-peers'
import experimentalGlobalFetchManifest from './manifests/external/experimental/global-fetch'

// experimental apis
import experimentalCapturePageAPI from './bg/experimental/capture-page'
import experimentalDatPeersAPI from './bg/experimental/dweb-peers'
import experimentalGlobalFetchAPI from './bg/experimental/global-fetch'

// exported api
// =

export const setup = function () {
  // internal apis
  rpc.exportAPI('logger', loggerManifest, Object.assign({}, auditLogAPI, loggerAPI), internalOnly)
  rpc.exportAPI('dbrowser-browser', beakerBrowserManifest, beakerBrowserAPI, internalOnly)
  rpc.exportAPI('dbrowser-filesystem', beakerFilesystemManifest, beakerFilesystemAPI, internalOnly)
  rpc.exportAPI('bookmarks', bookmarksManifest, bookmarksAPI, internalOnly)
  rpc.exportAPI('dweb-legacy', datLegacyManifest, datLegacyAPI, internalOnly)
  rpc.exportAPI('downloads', downloadsManifest, downloadsAPI, internalOnly)
  rpc.exportAPI('drives', drivesManifest, drivesAPI, internalOnly)
  rpc.exportAPI('folder-sync', folderSyncManifest, folderSyncAPI, internalOnly)
  rpc.exportAPI('history', historyManifest, historyAPI, internalOnly)
  rpc.exportAPI('sitedata', sitedataManifest, sitedataAPI, internalOnly)
  rpc.exportAPI('watchlist', watchlistManifest, watchlistAPI, internalOnly)

  // external apis
  rpc.exportAPI('capabilities', capabilitiesManifest, capabilitiesAPI, secureOnly('capabilities'))
  rpc.exportAPI('contacts', contactsManifest, contactsAPI, secureOnly('contacts'))
  rpc.exportAPI('dwebfs', hyperdriveManifest, hyperdriveAPI, secureOnly('dwebfs'))
  rpc.exportAPI('markdown', markdownManifest, markdownAPI)
  rpc.exportAPI('peersockets', peersocketsManifest, peersocketsAPI, secureOnly('peersockets'))
  rpc.exportAPI('shell', shellManifest, shellAPI, secureOnly('shell'))

  // experimental apis
  rpc.exportAPI('experimental-capture-page', experimentalCapturePageManifest, experimentalCapturePageAPI, secureOnly)
  rpc.exportAPI('experimental-dweb-peers', experimentalDatPeersManifest, experimentalDatPeersAPI, secureOnly)
  rpc.exportAPI('experimental-global-fetch', experimentalGlobalFetchManifest, experimentalGlobalFetchAPI, secureOnly)
}

function internalOnly (event, methodName, args) {
  if (!(event && event.sender)) {
    return false
  }
  var senderInfo = getSenderInfo(event)
  return senderInfo.isMainFrame && INTERNAL_ORIGIN_REGEX.test(senderInfo.url)
}

const secureOnly = apiName => (event, methodName, args) => {
  if (!(event && event.sender)) {
    return false
  }
  var senderInfo = getSenderInfo(event)
  if (!SITE_ORIGIN_REGEX.test(senderInfo.url)) {
    return false
  }
  if (!senderInfo.isMainFrame) {
    return IFRAME_WHITELIST.includes(`${apiName}.${methodName}`)
  }
  return true
}

function getSenderInfo (event) {
  var view = BrowserView.fromWebContents(event.sender)
  var tab = (view) ? findTab(view) : undefined
  if (tab) return tab.getIPCSenderInfo(event)
  return {isMainFrame: true, url: event.sender.getURL()}
}