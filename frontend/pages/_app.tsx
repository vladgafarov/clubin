import NProgress from 'nprogress'
import Router from 'next/router'
import Page from '../components/Page'
import '../components/styles/nprogress.css'
import { ApolloProvider } from '@apollo/client'
import withData from '../lib/withData'
import { MobileStateProvider } from '../lib/mobileState'
import { MenuStateProvider } from '../lib/menuState'
import { UseUserProvider } from '../lib/useUser'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const MyApp = ({ Component, pageProps, apollo }) => {
   return (
      <ApolloProvider client={apollo}>
         <MobileStateProvider>
            <UseUserProvider>
               <MenuStateProvider>
                  <Page>
                     <Component {...pageProps} />
                  </Page>
               </MenuStateProvider>
            </UseUserProvider>
         </MobileStateProvider>
      </ApolloProvider>
   )
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
   let pageProps = {}
   if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
   }
   pageProps.query = ctx.query
   return { pageProps }
}

export default withData(MyApp)
