export default function ({ store, redirect }) {
  console.log(store.getters['global/token'])
  if (!store.getters['global/token']) {
    //redirect('/login')
  }
}
