import login from "../../assets/login2.png";
import logo from "../../assets/logo.png";
import RedfoxLogo from "../../assets/redfox-logo.svg";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import StoreContext from "../../store/context";
import api from "../../services/api";
import arrow from "../../assets/arrow-left.svg";
import elipse from "../../assets/elipse.svg";

export function Cadastro() {
    const navigate = useNavigate();
    const [values, setValues] = useState({ email: "", senha: "", confirmacao: "" });
    const [error, setError] = useState("");
    const { setToken } = useContext(StoreContext)

    function onChange(event) {
        const { value, name } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    }

    function cadastroUser({ email, senha, confirmacao }) {
        if (senha !== confirmacao) {
            setError("As senhas não correspondem");
            return
        }
        api.post("http://localhost:3100/cadastro", { email, senha })
            .then(({ data }) => {
                if (data.token) {
                    setError("")
                    setToken(data.token)
                    navigate('/home')
                }
            })
            .catch((err) => {
                console.log(err);
                if (err?.response?.data?.message) {
                    return setError(err.response.data.message);
                }
                if (err?.message) {
                    setError(err.message);
                }
            });
    }

    function onSubmit(event) {
        event.preventDefault();
        cadastroUser(values);
    }

    function handleClick() {
        navigate('/');
    }
    return (
        <div className="row">
            <div className="col-12 col-sm-6 col-md-4 autentication">
                <img className="logo" src={logo} alt="" />
                <img className="vector" src={RedfoxLogo} alt="" />
                <form className="form" onSubmit={onSubmit}>
                    <div className="arrow">
                        <img src={arrow} alt="" />
                        <a className="link" onClick={handleClick}>Login</a>
                    </div>

                    <div className="mb-3 input">
                        <label htmlFor="inputEmail" className="form-label">Usuário</label>
                        <input type="email" name="email" onChange={onChange} className="form-control" id="inputEmail" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3 input">
                        <label htmlFor="inputPassword" className="form-label">Senha</label>
                        <input type="password" name="senha" onChange={onChange} className="form-control" id="inputPassword" />
                    </div>
                    <div className="mb-3 input">
                        <label htmlFor="inputPassword" className="form-label">Confirme sua senha</label>
                        <input type="password" name="confirmacao" onChange={onChange} className="form-control" id="inputPassword2" />
                    </div>
                    {error
                        ? <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                        : null}
                    <button type="submit" className="btn btn-blue w-100 mt-2">Entrar</button>
                </form>

            </div>
            <div className="col-sm-6 col-md-8 p-0 image" style={{ backgroundImage: `url(${login})` }}>
                <img className="elipse" src={elipse} alt="" />
            </div>
        </div>
    )
}