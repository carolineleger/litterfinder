// middleware/auth.js
import Cookies from 'universal-cookie'

const cookies = new Cookies(null, { path: '/' })

export default function ({ app, route, redirect }) {
  // Check if the user is authenticated
  const token = cookies.get('token')
  console.log(token)

  if (!token) {
    // If the token doesn't exist, the user is not authenticated
    // Redirect them to the login page or any other appropriate page
    //return redirect('/login')
  }
}
