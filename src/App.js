import React, { useState, useEffect } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsExports from "./aws-exports";
import { createGif, updateGif, deleteGif } from "./graphql/mutations";
import { listGifs } from "./graphql/queries";

Amplify.configure(awsExports);

const App = () => {
  const [gifs, setGifs] = useState([]);

  const getGifs = async () => {
    const gifs = await API.graphql(graphqlOperation(listGifs));
    setGifs(gifs.data.listGifs.items);
  };

  useEffect(() => {
    getGifs();
    return () => {};
  }, [gifs]);

  const [createFormModal, setCreateFormModal] = useState(false);
  const handleOpenCreateFormModal = () => setCreateFormModal(true);
  const handleCloseCreateFormModal = () => setCreateFormModal(false);

  const [formState, setFormState] = useState({ altText: "", url: "" });

  const setInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormState((pre) => ({ ...pre, [name]: value }));
  };

  const handleCreateGif = async (e) => {
    e.preventDefault();
    try {
      await API.graphql(graphqlOperation(createGif, { input: formState }));
      setFormState({ altText: "", url: "" });
      handleCloseCreateFormModal();
    } catch (err) {
      console.error(err);
    }
  };

  const [editFormModal, setEditFormModal] = useState(false);
  const handleOpenEditFormModal = () => setEditFormModal(true);
  const handleCloseEditFormModal = () => setEditFormModal(false);

  const [editFormState, setEditFormState] = useState({ altText: "", url: "" });

  const setEditInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEditFormState((pre) => ({ ...pre, [name]: value }));
  };

  const handleEditGif = async (e) => {
    e.preventDefault();
    try {
      const gif = {
        id: editFormState.id,
        altText: editFormState.altText,
        url: editFormState.url,
      };
      await API.graphql(graphqlOperation(updateGif, { input: gif }));
      setEditFormModal({ altText: "", url: "" });
      handleCloseEditFormModal();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteGif = async (e) => {
    e.preventDefault();
    try {
      await API.graphql(
        graphqlOperation(deleteGif, { input: { id: editFormState.id } })
      );
      setEditFormState({ altText: "", url: "" });
      handleCloseEditFormModal();
      console.log(editFormState);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1>Giphlify</h1>

      <button
        id="plus-button"
        className="plus-button"
        onClick={handleOpenCreateFormModal}
      >
        +
      </button>

      <div className="container">
        {gifs.map((gif, index) => (
          <img
            key={gif.id ? gif.id : index}
            src={gif.url}
            alt={gif.altText}
            onClick={() => {
              setEditFormState(gif);
              handleOpenEditFormModal();
            }}
          />
        ))}
      </div>

      {createFormModal && (
        <div id="create-modal" className="modal">
          <button
            id="close-create-button"
            className="close-button"
            onClick={handleCloseCreateFormModal}
          >
            x
          </button>
          <h2>Add Gif</h2>
          <form id="create-form">
            <label htmlFor="altText">Alt Text</label>
            <input
              type="text"
              name="altText"
              id="altText"
              value={formState.altText}
              onChange={setInputs}
            />
            <label htmlFor="url">URL</label>
            <input
              type="text"
              name="url"
              id="url"
              value={formState.url}
              onChange={setInputs}
            />
            <input type="submit" value="Create" onClick={handleCreateGif} />
          </form>
        </div>
      )}

      {editFormModal && (
        <div id="edit-modal" className="modal">
          <div className="row">
            <button
              id="close-edit-button"
              className="close-button"
              onClick={() => {
                setEditFormState({ altText: "", url: "" });
                handleCloseEditFormModal();
              }}
            >
              x
            </button>
            <button
              id="delete-button"
              className="delete-button"
              onClick={handleDeleteGif}
            >
              Delete Gif
            </button>
          </div>
          <h2 id="edit-title">Update {editFormState.altText}</h2>
          <form id="edit-form">
            <label htmlFor="altText">Alt Text</label>
            <input
              type="text"
              name="altText"
              id="edit-altText"
              value={editFormState.altText}
              onChange={setEditInputs}
            />
            <label htmlFor="url">URL</label>
            <input
              type="text"
              name="url"
              id="edit-url"
              value={editFormState.url}
              onChange={setEditInputs}
            />
            <input type="submit" value="Edit" onClick={handleEditGif} />
          </form>
        </div>
      )}
    </>
  );
};

export default App;
