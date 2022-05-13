import login from "../../assets/login.png";
import logo from "../../assets/logo.png";
import RedfoxLogo from "../../assets/redfox-logo.svg";
import "./login.scss";
import elipse from "../../assets/elipse.svg";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import StoreContext from "../../store/context";
import api from "../../services/api";


export function Login() {
    const navigate = useNavigate();
    const [values, setValues] = useState({ email: "", senha: "" });
    const [error, setError] = useState("");
    const { setToken } = useContext(StoreContext)

    function onChange(event) {
        const { value, name } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    }

    function loginUser({ email, senha }) {
        api.post("http://localhost:3100/login", { email, senha })
            .then(({ data }) => {
                if (data.token) {
                    setError("")
                    setToken(data.token)
                    navigate('/home')
                }
            })
            .catch((err) => {
                if (err.response.data.message) {
                    setError(err.response.data.message);
                }
            });
    }

    function onSubmit(event) {
        event.preventDefault();
        loginUser(values);
    }


    function handleClick() {
        navigate('/cadastro');
    }

    return (
        <div className="row">
            <div className="col-12 col-sm-6 col-md-4 autentication">
                <img className="logo" src={logo} alt="" />
                <img className="vector" src={RedfoxLogo} alt="" />
                <form className="form" onSubmit={onSubmit}>
                    <div className="mb-3 input">
                        <label htmlFor="inputEmail" className="form-label">Usuário</label>
                        <input name="email" onChange={onChange} type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" value={values.email} />
                    </div>
                    <div className="mb-3 input">
                        <label htmlFor="inputPassword" className="form-label">Senha</label>
                        <input name="senha" onChange={onChange} type="password" className="form-control" id="inputPassword" value={values.senha} />
                    </div>
                    {error
                        ? <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                        : null}
                    <button type="submit" className="btn btn-blue w-100 mt-2">Entrar</button>
                </form>
                <a className="link mt-3" onClick={handleClick}>
                    Fazer Cadastro
                </a>
            </div>
            <div className="col-sm-6 col-md-8 p-0 image" style={{ backgroundImage: `url(${login})` }}>
                <img className="elipse" src={elipse} alt="" />
            </div>
        </div>

    )
}
