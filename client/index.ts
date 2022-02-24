import { Context, store } from '@koishijs/client'
import type {} from '../src'

function addFooter() {
  // Check if config exists
  if (!store.beian?.links) {
    removeFooter()
    return
  }

  // Check if element exists
  if (!document.getElementById('beian')) {
    // Add element
    const footer = document.createElement('footer')
    footer.id = 'beian'
    footer.style.cssText =
      'position:fixed;left:0;right:0;bottom:0;margin-left:var(--aside-width);padding:.3rem .5rem;font-size:.8rem;color:var(--fg3);background:var(--page-bg);border-top:1px solid var(--border);transition:background-color .3s ease,border-color .3s ease'

    // Add links
    let flag = false
    for (const link of store.beian.links) {
      if (!link.name || !link.href) continue
      const linkElement = document.createElement('a')
      linkElement.innerText = link.name
      linkElement.href = link.href
      linkElement.target = '_blank'
      linkElement.rel = 'noopener noreferrer'
      linkElement.style.cssText = flag
        ? 'margin-left:0.4rem;padding-left:0.4rem;border-left: 1px solid var(--fg3t)'
        : 'margin:0;padding:0'
      footer.appendChild(linkElement)
      flag = true
    }

    // Add footer
    if (flag) document.body.appendChild(footer)
    else removeFooter()
  }
}

function removeFooter() {
  if (document.getElementById('beian')) {
    document.body.removeChild(document.getElementById('beian'))
  }
}

export default (ctx: Context) => {
  addFooter()

  // Set timer
  const timer = setInterval(() => {
    addFooter()
  }, 5000)

  ctx.disposables.push(() => {
    // Clear timer
    window.clearInterval(timer)
    // Remove element
    removeFooter()
  })
}
