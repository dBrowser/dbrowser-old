import * as rpc from 'pauls-electron-rpc'
import browserManifest from '../../bg/web-apis/manifests/internal/browser'
import contactsManifest from '../../bg/web-apis/manifests/external/contacts'
import drivesManifest from '../../bg/web-apis/manifests/internal/drives'
import folderSyncManifest from '../../bg/web-apis/manifests/internal/folder-sync'
import hyperdriveManifest from '../../bg/web-apis/manifests/external/ddrive'
import modalsManifest from '../../bg/rpc-manifests/modals'
import beakerFsManifest from '../../bg/web-apis/manifests/internal/dbrowserx-filesystem'

export const dBrowserX = rpc.importAPI('dbrowser-x', browserManifest)
export const contacts = rpc.importAPI('contacts', contactsManifest)
export const drives = rpc.importAPI('drives', drivesManifest)
export const folderSync = rpc.importAPI('folder-sync', folderSyncManifest)
export const ddrive = rpc.importAPI('ddrive', hyperdriveManifest)
export const modals = rpc.importAPI('background-process-modals', modalsManifest)
export const beakerFs = rpc.importAPI('dbrowserx-filesystem', beakerFsManifest)