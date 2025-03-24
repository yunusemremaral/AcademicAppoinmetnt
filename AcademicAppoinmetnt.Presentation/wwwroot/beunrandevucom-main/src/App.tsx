import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import Anasayfa from './pages/Anasayfa'
import NotFound from './pages/NotFound404'
import OgrenciGiris from './pages/OgrenciGiris'
import AkademisyenGiris from './pages/AkademisyenGiris'
import AkademisyenDetay from './pages/AkademisyenDetay'
import BolumDetay from './pages/BolumDetay'
import Randevular from './pages/Randevular'
import OgrenciDogrulama from './pages/OgrenciDogrulama'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Anasayfa />}/>
    <Route path="akademisyen">
      <Route path="giris" element={<AkademisyenGiris />} />
      <Route path=":id" element={<AkademisyenDetay />} />
    </Route>
    <Route path="ogrenci">
      <Route path="giris" element={<OgrenciGiris />} />
      <Route path="dogrulama" element={<OgrenciDogrulama />} />
    </Route>
    <Route path=":fakulteUrlPath/:bolumUrlPath" element={<BolumDetay />} />
    <Route path="randevular" element={<Randevular />} />
    <Route path="*" element={<NotFound />} />
  </Route>
))

function App() {
  return <RouterProvider router={router} />
}

export default App