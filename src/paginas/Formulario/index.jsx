import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

import estilos from "./form.module.css";

const Form = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [data, setData] = useState("");
  const parametros = useParams();

  useEffect(() => {
    if (parametros.id) {
      axios.get(`http://localhost:8800/${parametros.id}`).then((res) => {
        if(res.data && res.data.length > 0){

          setNome(res.data[0].nome);
          setEmail(res.data[0].email);
          setTelefone(res.data[0].fone);
          setData(res.data[0].data_nascimento);
        }
      });
    }
  }, [parametros]);

  const salvar = () => {
    if (nome === "" || email === "" || telefone === "" || data === "")
      return toast.warning("Preencha todos os campos");

    if (parametros.id) {
      axios
        .put(`http://localhost:8800/${parametros.id}`, {
          nome,
          email,
          fone: telefone,
          data,
        })
        .then(() => {
          window.location.reload();
        });
    } else {
      axios
        .post("http://localhost:8800", {
          nome,
          fone: telefone,
          email,
          data,
        })
        .then(() => {
          window.location.reload();
        });
    }
    setNome("");
    setEmail("");
    setTelefone("");
    setData("");
  };

  return (
    <>
      <ToastContainer />
      <div className={estilos.main}>
        <div className={estilos.container}>
          <form
            className={estilos.form}
            onSubmit={(e) => {
              e.preventDefault();
              salvar();
            }}
          >
            <TextField
              
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              label="Usuario"
            />
            <TextField
              
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
            />
            <TextField
              
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              label="Telefone"
            />
            <input              
              value={data}
              type="date"
              onChange={(e) => setData(e.target.value)}
            />
            <Button
              type="submit"
              className={estilos.btnEnviarw}
              variant="outlined"
            >
              Salvar
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
