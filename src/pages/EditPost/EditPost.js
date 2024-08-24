import styles from "./EditPost.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// pegar o user e atrelar ele ao post
import { useAuthValue } from "../../context/AuthContext";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

import { useFetchDocument } from "../../hooks/useFetchDocument";

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);

      const textTags = post.tagsArray.join(",");
      setTags(textTags);
    }
  }, [post]);

  const navigate = useNavigate();

  const { user } = useAuthValue();
  const { updateDocument, response } = useUpdateDocument("posts");

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

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    };

    updateDocument(id, data);

    // redirect to homepage
    navigate("/dashboard");
  };

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editando post: {post.title}</h2>
          <p>Altere os dados do post como desejar</p>
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
            <p className={styles.preview_title}>Preview da imagem atual:</p>
            <img
              src={post.image}
              className={styles.image_preview}
              alt={post.title}
            />
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
        </>
      )}
    </div>
  );
};

export default EditPost;
