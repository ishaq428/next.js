// import '@/styles/globals.css'
// import type { AppProps } from 'next/app'
// import { ReactDOM } from 'react';
// import FormHelm from './forminputhelm';

// export default function ProfileForm() {
//   return (
//     <FormHelm />
//     )
 
// }

import '@/styles/globals.css'
import '@/styles/form.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
