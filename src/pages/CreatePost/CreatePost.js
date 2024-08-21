import styles from "./CreatePost.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// pegar o user e atrelar ele ao post
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const navigate = useNavigate();

  const { user } = useAuthValue();
  const { insertDocument, response } = useInsertDocument("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // validate image URL
    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma url");
    }

    // criar o array de tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // checar todos os valores
    if (!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todo os campos");
    }

    if (formError) return;

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    // redirect to homepage
    navigate("/");
  };

  return (
    <div className={styles.create_post}>
      <h2>Criar post</h2>
      <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            name="title"
            placeholder="Pense num bom título..."
            required
          />
        </label>
        <label>
          <span>URL da imagem:</span>
          <input
            onChange={(e) => setImage(e.target.value)}
            value={image}
            type="text"
            name="image"
            placeholder="Insira uma imagem que representa o seu post"
            required
          />
        </label>
        <label>
          <span>Conteúdo:</span>
          <textarea
            onChange={(e) => setBody(e.target.value)}
            value={body}
            name="body"
            placeholder="Insira o conteúdo do post"
            required
          ></textarea>
        </label>
        <label>
          <span>Tags:</span>
          <input
            onChange={(e) => setTags(e.target.value)}
            value={tags}
            type="text"
            name="tags"
            placeholder="Insira as tags separadas por vírgula"
            required
          />
        </label>

        {!response.loading && <button className="btn">Cadastrar</button>}
        {response.loading && <button className="btn">Aguarde...</button>}

        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
