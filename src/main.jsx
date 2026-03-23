import { createRoot } from 'react-dom/client'
import App from '@/app/App'
import '@/styles/global.css'

const root = createRoot(document.querySelector('#root'))

function render() {
  root.render(<App />)
}

render()

if (module.hot) {
  module.hot.accept('@/app/App', render)
}
