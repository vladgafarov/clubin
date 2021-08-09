import NProgress from 'nprogress'
import Router from 'next/router'
import Page from '../components/Page'
import '../components/styles/nprogress.css'
import { ApolloClient, ApolloProvider } from '@apollo/client'
import withData from '../lib/withData'
import { MobileStateProvider } from '../lib/mobileState'
import { MenuStateProvider } from '../lib/menuState'
import { UseUserProvider } from '../lib/useUser'
import { NotificationsStateProvider } from '../lib/useNotifications'
import Notifications from '../components/Notifications'
import { NextPageContext } from 'next'
import { AppContext, AppProps } from 'next/app'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

type ApolloProps = {
   apollo: ApolloClient<any>
}
type ApolloAppProps = ApolloProps & AppProps

const MyApp = ({ Component, pageProps, apollo }: ApolloAppProps) => {
   return (
      <ApolloProvider client={apollo}>
         <MobileStateProvider>
            <NotificationsStateProvider>
               <UseUserProvider>
                  <MenuStateProvider>
                     <Page>
                        <Component {...pageProps} />
                        <Notifications />
                     </Page>
                  </MenuStateProvider>
               </UseUserProvider>
            </NotificationsStateProvider>
         </MobileStateProvider>
      </ApolloProvider>
   )
}

type MyAppProps = AppContext & NextPageContext

MyApp.getInitialProps = async function ({ Component, ctx }: MyAppProps) {
   let pageProps: { query?: NextPageContext['query'] } = {}
   if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
   }
   pageProps.query = ctx.query
   return { pageProps }
}

export default withData(MyApp)
