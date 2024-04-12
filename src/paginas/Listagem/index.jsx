import { useState, useEffect } from "react";
import { Link  } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

import estilos from "./table.module.css";

const Listagem = ({history}) => {
  const [usuarios, setUsuarios] = useState([]);
  

  useEffect(() => {
    axios.get("http://localhost:8800").then((response) => {
      setUsuarios(response.data); 
    });
  }, []);

  const deletarUser = (id) => {
    console.log("deletar", id);
    axios
      .delete(`http://localhost:8800/del/${id}`)
      .then((res) => {
        const newList = usuarios.filter((user) => user.id !== id);

        setUsuarios(newList);
        toast.success(res.data);      
      })
      .catch((err) => {
        toast.error(err);
      });
        
      window.location.reload();
  };

  return (
    <>
      <ToastContainer />
      <div className={estilos.main}>
        <div className={estilos.tabela}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <h4>Nome</h4>{" "}
                  </TableCell>
                  <TableCell>
                    <h4>Email</h4>{" "}
                  </TableCell>
                  <TableCell>
                    <h4>Telefone</h4>
                  </TableCell>
                  <TableCell>
                    <h4>Data de nascimento</h4>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usuarios.map((usuario) => (
                  <TableRow key={usuario.id}>
                    <TableCell>{usuario.nome}</TableCell>
                    <TableCell>{usuario.email}</TableCell>
                    <TableCell>{usuario.fone}</TableCell>
                    <TableCell>{usuario.data_nascimento}</TableCell>
                    <TableCell>
                      <Link to={`/${usuario.id}`}>
                        <FaEdit className={estilos.iconeEdit} size={25} />
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link to={`/del/${usuario.id}`}>
                        <MdDelete
                          className={estilos.iconeDel}
                          size={25}
                          onClick={() => deletarUser(usuario.id)}
                        />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default Listagem;
