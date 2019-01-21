import IndexPage from './routes/index'
import LoginPage from './routes/login'
import RegistrationPage from './routes/registration'
import PresentationPage from './routes/presentation'
import EditPage from './routes/edit'
import PollPage from './routes/poll'
import VerifyRegPage from './routes/verifyReg'
import VerifyLoginPage from './routes/verifyLogin'
import UserPage from './routes/user'
import VueRouter from 'vue-router'

const routes = [
  { path: '/', component: IndexPage, name: "main" },
  { path: '/registration', component: RegistrationPage, name: "registration" },
  { path: '/login', component: LoginPage, name: "login" },
  { path: '/presentation', component: PresentationPage, name: "presentation" },
  { path: '/poll', component: PollPage, name: "poll" },
  { path: '/edit/:id', name: "edit", component: EditPage },
  { path: '/verify_reg', component: VerifyRegPage, name: "verify_reg" },
  { path: '/verify_login', component: VerifyLoginPage, name: "verify_login" },
  { path: '/user', component: UserPage, name: "user" }
]
export default new VueRouter({
  routes,
  mode: "history"
})
