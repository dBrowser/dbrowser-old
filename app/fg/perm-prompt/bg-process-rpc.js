import * as rpc from 'pauls-electron-rpc'
import browserManifest from '../../bg/web-apis/manifests/internal/browser'
import hyperdriveManifest from '../../bg/web-apis/manifests/external/dwebfs'
import permPromptManifest from '../../bg/rpc-manifests/perm-prompt'

export const dBrowserX = rpc.importAPI('dbrowser-browser', browserManifest)
export const dwebfs = rpc.importAPI('dwebfs', hyperdriveManifest)
export const permPrompt = rpc.importAPI('background-process-perm-prompt', permPromptManifest)