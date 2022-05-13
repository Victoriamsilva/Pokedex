import Context from "./context";

const StoreProvider = ({ children }) => {
    function getToken() {
        return localStorage.getItem('token')
    }

    function setToken(token) {
        localStorage.setItem('token', JSON.stringify(token));
    }

    function removeToken() {
        localStorage.removeItem('token');
    }

    return (
        <Context.Provider value={{
            token: getToken(),
            setToken,
            removeToken
        }}>
            {children}
        </Context.Provider>
    )
}

export default StoreProvider;