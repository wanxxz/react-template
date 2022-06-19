import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { App } from 'src/app'

export default () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
    </Routes>
  </BrowserRouter>
)
