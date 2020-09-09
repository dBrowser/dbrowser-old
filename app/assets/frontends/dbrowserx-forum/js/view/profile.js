import { LitElement, html } from '../../vendor/lit-element/lit-element.js'
import { repeat } from '../../vendor/lit-element/lit-html/directives/repeat.js'
import * as uwg from '../lib/uwg.js'
import '../com/profiles/aside.js'
import '../com/posts/feed.js'
import '../com/comments/feed.js'
import '../com/profiles/list.js'

export class ProfileView extends LitElement {
  static get properties () {
    return {
      showAdminCtrls: {type: Boolean, attribute: 'admin-ctrls'},
      user: {type: Object},
      profileId: {type: String, attribute: 'profile-id'},
      subview: {type: String}
    }
  }
 
  createRenderRoot () {
    return this // no shadow dom
  }

  constructor () {
    super()
    this.showAdminCtrls = false
    this.user = undefined
    this.profileId = undefined
    this.subview = 'posts'
  }

  async load () {
    await this.requestUpdate()
    // Array.from(this.querySelectorAll('[loadable]'), el => el.load())
  }

  render () {
    const navItem = (id, label) => html`
      <a
        class=${this.subview === id ? 'selected' : ''}
        href="/users/${this.profileId}/${id}"
      >${label}</a>
    `
    return html`
      <div class="layout three-col">
        <nav>
          <dbrowserx-profile-aside loadable .user=${this.user} id=${this.profileId} ?admin-ctrls=${this.showAdminCtrls}></dbrowserx-profile-aside>
        </nav>
        <main>
          <nav class="pills">
            ${navItem('posts', 'Posts')}
            ${navItem('comments', 'Comments')}
          </nav>
          ${this.renderSubview()}
        </main>
        <nav>
          <dbrowserx-about loadable></dbrowserx-about>
        </nav>
      </div>
    `
  }

  renderSubview () {
    if (this.subview === 'posts') {
      return html`<dbrowserx-posts-feed loadable .user=${this.user} author=${this.profileId}></dbrowserx-posts-feed>`
    }
    if (this.subview === 'comments') {
      return html`<dbrowserx-comments-feed loadable .user=${this.user} author=${this.profileId}></dbrowserx-comments-feed>`
    }
  }

  // events
  // =

}

customElements.define('dbrowserx-profile-view', ProfileView)
