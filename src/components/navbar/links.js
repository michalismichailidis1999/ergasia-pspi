import { logOut } from '../../actions/userActions'
import store from '../../store'

export const links = [
    {
        id: "link-1",
        to: "/register",
        icon: "fas fa-user-plus",
        action: null
    },
    {
        id: "link-2",
        to: "/login",
        icon: "fas fa-user-check",
        action: null
    }
]

export const authenticatedLinks = [
    {
        id: "authenticated-link-1",
        to: "/profile",
        icon: "far fa-id-badge",
        action: null
    },
    {
        id: "authenticated-link-2",
        to: "/",
        icon: "fas fa-power-off",
        action: () => store.dispatch(logOut())
    }
]