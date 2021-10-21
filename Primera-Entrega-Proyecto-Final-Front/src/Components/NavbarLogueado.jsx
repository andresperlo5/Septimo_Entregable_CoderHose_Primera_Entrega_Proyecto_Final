import React from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'

function NavbarLogueado() {

    const history = useHistory()
    const idUser = localStorage.getItem('idUser')
   

    const handleSubmitLogout = () => {
        axios.get(`http://localhost:3001/api/usuarios/logout/${idUser}`)
        localStorage.removeItem('idUser')
        localStorage.removeItem('idCart')
        history.push('/')
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <div>
                    <a className="navbar-brand" href="/loginUser">E-Commerce</a>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <div>
                            <a className="nav-link active" href="/loginUser">Inicio</a>
                        </div>
                        <div>
                            <a className="nav-link active" href="/carrito" >Carrito</a>
                        </div>
                        <div>
                            <button type="submit" className='btn btn-dark' onClick={handleSubmitLogout}>Deslogueo</button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavbarLogueado;