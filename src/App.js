import React from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
// import awsExports from "./aws-exports";
// Amplify.configure(awsExports);
// import {} from "./graphql/mutations";
// import {} from "./graphql/queries";

const App = () => {
  return (
    <>
      <button id="plus-button" class="plus-button">
        +
      </button>
      <div class="container"></div>

      <div id="create-modal" class="modal">
        <button id="close-create-button" class="close-button">
          x
        </button>
        <h2>Add Gif</h2>
        <form id="create-form">
          <label for="altText">Alt Text</label>
          <input type="text" name="altText" id="altText" />
          <label for="url">URL</label>
          <input type="text" name="url" id="url" />
          <input type="submit" value="Create" />
        </form>
      </div>

      <div id="edit-modal" class="modal">
        <div class="row">
          <button id="close-edit-button" class="close-button">
            x
          </button>
          <button id="delete-button" class="delete-button">
            Delete Gif
          </button>
        </div>
        <h2 id="edit-title">Update</h2>
        <form id="edit-form">
          <label for="altText">Alt Text</label>
          <input type="text" name="altText" id="edit-altText" />
          <label for="url">URL</label>
          <input type="text" name="url" id="edit-url" />
          <input type="submit" value="Edit" />
        </form>
      </div>
    </>
  );
};

export default App;
