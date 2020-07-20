import * as rpc from 'pauls-electron-rpc'
import promptsManifest from '../../bg/rpc-manifests/prompts'
import hyperdriveManifest from '../../bg/web-apis/manifests/external/dwebfs'

export const prompts = rpc.importAPI('background-process-prompts', promptsManifest)
export const dwebfs = rpc.importAPI('dwebfs', hyperdriveManifest)