const getRoot = (state, path) => {
  //console.log(path);
  if (!path) return state; // If path is empty, return the root state.

  const parts = path.split("/"); // Split the path into segments
  let current = state;

  for (const part of parts) {
    //console.log(part, current);
    if (current?.name == part) continue;
    if (!current || !current.data) return null; // If path doesn't exist, return null

    current = current.data.find((item) => item.name === part); // Find the next level
  }
  //console.log(current);
  return current; // Return reference to the found object
};

const DirectoryReducer = (state, action) => {
  /// console.log(action, state);

  switch (action.type) {
    case "ADD_FILE": {
      const reference = getRoot(state, action.payload.path); // Get reference
      if (!reference || reference.type !== "Directory") return state; // Ensure it's a directory
      //console.log("Adding file", action.payload);

      reference.data.push({ type: "File", name: action.payload.fileName });
      //console.log(reference);
      return { ...state }; // Return new state to trigger re-render
    }

    case "ADD_DIRECTORY": {
      //console.log("Adding directory", action.payload);

      const reference = getRoot(state, action.payload.path);
      if (!reference || reference.type !== "Directory") return state;

      reference.data.push({
        type: "Directory",
        name: action.payload.directoryName,
        data: [],
      });
      //console.log(reference);
      return { ...state };
    }

    default:
      return state;
  }
};

export default DirectoryReducer;
