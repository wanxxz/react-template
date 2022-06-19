import 'whatwg-fetch'
import { RecoilRoot } from 'recoil'
import { render } from 'react-dom'

import Routes from 'src/routes'
import 'src/index.css'

function Root() {
  return (
    <RecoilRoot>
      <Routes />
    </RecoilRoot>
  )
}

render(<Root />, document.querySelector('.root'))
