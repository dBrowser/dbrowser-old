import yo from 'yo-yo'

// exported api
// =

export default function render (currentUrl, currentPage) {
  return yo`
    <div class="builtin-pages-nav">
      <div>
        <img src=${`dbrowserx-favicon:${currentUrl}`}>
        ${currentPage}
      </div>
    </div>`
}
