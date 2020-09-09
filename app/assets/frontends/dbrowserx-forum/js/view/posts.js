import { LitElement, html } from '../../vendor/lit-element/lit-element.js'
import '../com/posts/feed.js'
import '../com/about.js'
import '../com/pinned-message.js'

export class PostsView extends LitElement {
  static get properties () {
    return {
      user: {type: Object}
    }
  }
 
  createRenderRoot () {
    return this // no shadow dom
  }

  constructor () {
    super()
    this.user = undefined
  }

  async load () {
    await this.requestUpdate()
    // Array.from(this.querySelectorAll('[loadable]'), el => el.load())
  }

  render () {
    return html`
      <div class="layout right-col">
        <main>
          <nav class="pills">
            <a class="selected" href="/" title="Posts">Posts</a>
            <a href="/comments" title="Comments">Comments</a>
            <a href="/users" title="Users">Users</a>
          </nav>
          <dbrowserx-pinned-message loadable></dbrowserx-pinned-message>
          <dbrowserx-posts-feed loadable .user=${this.user}></dbrowserx-posts-feed>
        </main>
        <nav>
          <dbrowserx-about loadable></dbrowserx-about>
        </nav>
      </div>
    `
  }

  // events
  // =

}

customElements.define('dbrowserx-posts-view', PostsView)
