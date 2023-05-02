import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserIcon, LockClosedIcon } from '@heroicons/react/24/outline';

import "./styles.css";

interface userType {
  name: string,
  user: string,
  birthdate: Date | string,
  email: string,
  password: string,
  profile_photo: string
}

const SignIn: React.FC = () => {
  const [users, setUsers] = useState<userType[]>([]);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [check, setCheck] = useState("");

  const navigate = useNavigate()

  const fetchUsers = async () => {
    const response = await fetch(`http://localhost:5000/api/v1/user`);
    const data = await response.json();
    setUsers(data.users);
    console.log(data.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    
    const userLogged = users.filter((userArray) => {
      return userArray.user === user && userArray.password === pass;
    })

    if (!users || !pass) {
      setError("Preencha todos os campos!");
      return;
    }
    else if (userLogged.length === 0) {
      setError("Usuário ou senha inválidos!");
      return;
    }
    else if (userLogged.length !== 0) {
      localStorage.setItem('userAuth', JSON.stringify(userLogged))
      navigate("/home");
      return;
    }
  }

  return (
   <div className='Container'>

    <div className='ContentLogin'>

      <div className='LabelContainer'>
        <label className='LabelHello'>Olá,</label>
        <label className='Label'>Para continuar navegando de forma segura, efetue o login</label>
        <label className='LabelLogin'>Login</label>
      </div>

      <form method='post' className='ContentForm' onSubmit={handleLogin}>
        <div className='ContainerIcon'>
          <input
            type="text"
            placeholder='Usuário'
            value={user}
            onChange={(e) => [setUser(e.target.value), setError(""), setCheck("")]}
            className={error && !user ? "InputError" : "Input"}
          />
          <UserIcon />
        </div>
        <div className='ContainerIcon'>
          <input
            type="password"
            placeholder='Senha'
            value={pass}
            onChange={(e) => [setPass(e.target.value), setError(""), setCheck("")]}
            className={error && !pass ? "InputError" : "Input"}
          />
          <LockClosedIcon />
        </div>
        <label className='LabelError'>{error}</label>
        <label className='LabelCheck'>{check}</label>
        <button className='button'>Logar-se</button>
      </form>

      <label className='LabelSignUp'>
        Novo por aqui?
        <strong>
          <Link to="/signup">&nbsp;Registre-se</Link>
        </strong>
      </label>

    </div>

    <div className='ImageContent'>
      <img
        src={require('../../assets/img/side_image.png')}
        alt="Imagem da Compasso"
      />
    </div>
    
   </div>
  );
}

export default SignIn;