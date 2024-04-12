import { Link } from 'react-router-dom'
import Form from "../Formulario";
import Listagem from "../Listagem";
import "./home.module.css";

const Home = () => {
  return (
    <>
      <main>
        <Link className="title" to={"/"}>
          <h1>Usuários</h1>
        </Link>
        <Form />
        <Listagem />
      </main>
    </>
  );
};

export default Home;
