import styles from "./Register.module.css";
// import { useState, useEffect } from "react";

const Register = () => {
  return (
    <div>
      <h1>Cadastre-se para postar</h1>
      <p>Crie seu usuário e compartilhe suas histórias</p>
      <form>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            name="displayName"
            placeholder="Nome do usuário"
            required
          />
        </label>

        <label>
          <span>Email:</span>
          <input
            type="email"
            name="email"
            placeholder="E-mail do usuário"
            required
          />
        </label>

        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            placeholder="Nome do usuário"
            required
          />
        </label>

        <label>
          <span>Confirmação de senha:</span>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirme sua senha"
            required
          />
        </label>

        <button className="btn">Cadastrar</button>
      </form>
    </div>
  );
};

export default Register;
