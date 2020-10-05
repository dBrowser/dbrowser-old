import { h } from './util.js'

export class DriveAdmin extends HTMLElement {
  constructor () {
    super()
    this.load()
  }

  async load () {
    this.info = await ddrive.self.getInfo()
    this.render()
  }

  render () {
    var links = h('div', {className: 'links'})
    var key = (/[0-9a-f]{64}/i).exec(ddrive.self.url)[0]
    links.append(h('a', {className: 'btn primary', href: `https://dbrowserx.network/${key}`}, 'View on DBrowserX.Network'))
    if (this.info.writable) {
      let editProfile = h('a', {className: 'btn'}, 'Edit Profile')
      editProfile.addEventListener('click', this.onClickEditProfile.bind(this))
      links.prepend(editProfile)

      let newPost = h('a', {className: 'btn', href: `https://dbrowserx.network/compose`}, 'New Post')
      links.prepend(newPost)
    }
    this.append(links)
  }

  async onClickEditProfile (e) {
    e.preventDefault()
    await navigator.drivePropertiesDialog(location.origin)
    location.reload()
  }
}
customElements.define('drive-admin', DriveAdmin)