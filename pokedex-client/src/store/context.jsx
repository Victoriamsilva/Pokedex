import { createContext } from "react";

const StoreContext = createContext({
    token: null,
    setToken: () => { },
    removeToken: () => { }
})
export default StoreContext;