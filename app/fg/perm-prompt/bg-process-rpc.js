import * as rpc from 'pauls-electron-rpc'
import browserManifest from '../../bg/web-apis/manifests/internal/browser'
import hyperdriveManifest from '../../bg/web-apis/manifests/external/ddrive'
import permPromptManifest from '../../bg/rpc-manifests/perm-prompt'

export const dBrowserX = rpc.importAPI('dbrowser-x', browserManifest)
export const ddrive = rpc.importAPI('ddrive', hyperdriveManifest)
export const permPrompt = rpc.importAPI('background-process-perm-prompt', permPromptManifest)