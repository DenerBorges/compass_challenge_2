import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserIcon,
        LockClosedIcon,
        FingerPrintIcon,
        CakeIcon,
        AtSymbolIcon,
        ShieldCheckIcon } from '@heroicons/react/24/outline';

import "./styles.css"

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [date, setDate] = useState("");
  const [dateType, setDateType] = useState("text");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const [dateError, setDateError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [check, setCheck] = useState("");
  
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  function valideData(){
    var data = date;
    data = data.replace(/\//g, "-");
    var data_array = data.split("-");
    
    if(data_array[0].length != 4){
      data = data_array[2]+"-"+data_array[1]+"-"+data_array[0];
    }
    
    var hoje = new Date();
    var nasc  = new Date(data);
    var idade = hoje.getFullYear() - nasc.getFullYear();
    var m = hoje.getMonth() - nasc.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
    
    if(idade < 18 || idade > 100){
      setDateError("Data inválida!");
      return;
    }
 
    if(idade >= 18){
      setCheck("Registrado com sucesso.");
      return;
    }
 }

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    

    if (!name || !user || !date || !email || !pass || !confirmPass) {
      setError("Preencha todos os campos!");
      return;
    }
    else if (date) {
      valideData();
      return;
    }
    else if (!emailRegex.test(email)) {
      setEmailError("Email inválido!");
      return;
    }
    else if (pass.length < 8) {
      setPassError("A senha deve ter no mínimo 8 caracteres!");
      return;
    }
    else if (pass !== confirmPass) {
      setError("As senhas não correspondem!");
      return;
    }
    else {
      setCheck("Registrado com sucesso.");
      return;
    }
  }

  return (
    <div className='Container'>

      <div className='Content'>

        <div className='LabelContainer'>
          <label className='LabelHello'>Olá,</label>
          <label className='Label'>Por favor, registre-se para continuar</label>
          <label className='LabelRegister'>Registro</label>
        </div>

        <form method='post' className='ContentForm' onSubmit={handleRegister}>
          <div className='ContainerIcon'>
            <input
              type="nome"
              placeholder='Nome'
              value={name}
              onChange={(e) => [setName(e.target.value), setError(""), setCheck("")]}
              className={error && !name ? "InputError" : "Input"}
            />
            <UserIcon />
          </div>
          <label className='LabelError'></label>
          <div className='ContainerIcon'>
            <input
              type="text"
              placeholder='Usuário'
              value={user}
              onChange={(e) => [setUser(e.target.value), setError(""), setCheck("")]}
              className={error && !user ? "InputError" : "Input"}
            />
            <FingerPrintIcon />
          </div>
          <label className='LabelError'></label>
          <div className='ContainerIcon'>
            <input
              type={dateType}
              onFocus={() => setDateType("date")}
              placeholder='Nascimento'
              value={date}
              onChange={(e) => [setDate(e.target.value), setError(""), setDateError(""), setCheck("")]}
              className={error && !date ? "InputError" : "Input"}
            />
            <CakeIcon />
          </div>
          <label className='LabelError'>{dateError}</label>
          <div className='ContainerIcon'>
            <input
              type="email"
              placeholder='Email'
              value={email}
              onChange={(e) => [setEmail(e.target.value), setError(""), setEmailError(""), setCheck("")]}
              className={error && !email || error && !emailRegex.test(email) 
                        ? "InputError" : "Input"}
            />
            <AtSymbolIcon />
          </div>
          <label className='LabelError'>{emailError}</label>
          <div className='ContainerIcon'>
            <input
              type="password"
              placeholder='Senha'
              value={pass}
              onChange={(e) => [setPass(e.target.value), setError(""), setPassError(""), setCheck("")]}
              className={error && !pass || error && pass !== confirmPass
                        || passError && pass.length < 8 ? "InputError" : "Input"}
            />
            <LockClosedIcon />
          </div>
          <label className='LabelError'>{passError}</label>
          <div className='ContainerIcon'>
            <input
              type="password"
              placeholder='Confirmar Senha'
              value={confirmPass}
              onChange={(e) => [setConfirmPass(e.target.value), setError(""), setCheck("")]}
              className={error && !confirmPass ? "InputError" : "Input"}
            />
            <ShieldCheckIcon />
          </div>
          <label className='LabelError'>{error}</label>
          <label className='LabelCheck'>{check}</label>
          <button className='button'>Registre-se</button>
        </form>

        <label className='LabelSignIn'>
          Já possui uma conta?
          <strong>
            <Link to="/">&nbsp;Faça Login</Link>
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

export default SignUp;