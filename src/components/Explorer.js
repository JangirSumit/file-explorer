import { useContext, memo, useState, useCallback, useRef } from "react";
import { DirectoryContext } from "../contexts/DirectoryContext";
import DirectoryExplorer from "./DirectoryExplorer";

const Explorer = () => {
  const { state } = useContext(DirectoryContext);
  return <DirectoryExplorer root={state} />;
};

export default Explorer;
