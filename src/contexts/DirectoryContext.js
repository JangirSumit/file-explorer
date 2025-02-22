import { createContext, useReducer } from "react";
import DirectoryReducer from "../reducers/DirectoryReducer";

const Default = {
  type: "Directory",
  name: "Root",
  data: [
    {
      type: "File",
      name: "File-1",
    },
    {
      type: "Directory",
      name: "Root-1",
      data: [
        {
          type: "Directory",
          name: "Root-2",
          data: [
            {
              type: "File",
              name: "File-21",
            },
          ],
        },
      ],
    },
    {
      type: "File",
      name: "File-2",
    },
  ],
};

const DirectoryContext = createContext();

const DirectoryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DirectoryReducer, Default);

  return (
    <DirectoryContext.Provider value={{ state, dispatch }}>
      {children}
    </DirectoryContext.Provider>
  );
};

export { DirectoryContext, DirectoryContextProvider };
