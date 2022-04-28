export default function ({ store, redirect, route }) {
  if ((route.name === 'auth-login' || route.name === 'auth-signup') && store.state.auth.loggedIn) {
    return redirect('/')
  }
}
