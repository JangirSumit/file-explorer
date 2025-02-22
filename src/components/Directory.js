import React, { useContext, useState, useRef, useCallback } from "react";
import { DirectoryContext } from "../contexts/DirectoryContext";
import ICONS from "../common/Icons";

const Directory = ({ root, rootKey, onExpandCollapse, isExpanded }) => {
    const { state, dispatch } = useContext(DirectoryContext);
    const [showAddFile, setShowAddFile] = useState(false);
    const [fileName, setFileName] = useState("");
    const [showAddDirectory, setShowAddDirectory] = useState(false);
    const [directoryName, setDirectoryName] = useState("");
    const [error, setError] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const fileRef = useRef(null);
    const directoryRef = useRef(null);
  
    const isDuplicateName = (name) => {
      return root?.data?.some((d) => d.name == name);
    };
  
    const onFileAdd = () => {
      setShowAddDirectory(false);
      setShowAddFile(true);
      setError("");
      setDirectoryName("");
      setFileName("");
      setTimeout(() => {
        fileRef.current?.focus(); // Use optional chaining to avoid errors
      }, 0);
    };
  
    const onAddFile = useCallback(() => {
      console.log(isAdding);
      if (isAdding) return;
  
      setIsAdding(true);
  
      if (!fileName) {
        setIsAdding(false);
        setError("File Name is required");
        return;
      }
  
      if (isDuplicateName(fileName)) {
        setIsAdding(false);
        setError("File or directory already exists with same name");
        return;
      }
  
      dispatch({
        type: "ADD_FILE",
        payload: {
          fileName: fileName,
          path: `${rootKey}/${root.name}`,
        },
      });
      setShowAddFile(false);
      setFileName("");
      setError("");
      setIsAdding(false);
    }, [fileName, rootKey, root.name, isAdding]);
  
    const onDirectoryAdd = () => {
      setShowAddFile(false);
      setShowAddDirectory(true);
      setError("");
      setDirectoryName("");
      setFileName("");
      setTimeout(() => {
        directoryRef.current?.focus(); // Use optional chaining to avoid errors
      }, 0);
    };
  
    const onAddDirectory = useCallback(() => {
      if (isAdding) return;
  
      setIsAdding(true);
  
      if (!directoryName) {
        setIsAdding(false);
  
        setError("Directory Name is required");
        return;
      }
  
      if (isDuplicateName(directoryName)) {
        setIsAdding(false);
        setError("File or directory already exists with same name");
        return;
      }
  
      dispatch({
        type: "ADD_DIRECTORY",
        payload: {
          directoryName: directoryName,
          path: `${rootKey}/${root.name}`,
        },
      });
      setShowAddDirectory(false);
      setDirectoryName("");
      setError("");
      setIsAdding(false);
    }, [directoryName, rootKey, root.name, isAdding]);
  
    const onCancelAdding = () => {
      setShowAddDirectory(false);
      setShowAddFile(false);
      setError("");
    };
  
    return (
      <div className="directory">
        <span
          style={{ cursor: "pointer", marginRight: "5px" }}
          onClick={onExpandCollapse}
        >
          {isExpanded ? ICONS.Expanded : ICONS.Collapsed}
        </span>
        <span>
          {ICONS.Directory} {root.name}{" "}
        </span>
        <span onClick={onFileAdd} className="icon-span">
          {ICONS.Plus}
          {ICONS.File}
        </span>
        <span onClick={onDirectoryAdd} className="icon-span">
          {ICONS.Plus}
          {ICONS.Directory}
        </span>
        <div>
          {showAddFile && (
            <>
              {ICONS.File}
              <input
                ref={fileRef}
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
              />
              <button className="margin-left-10" onClick={onAddFile}>
                Add
              </button>
              <button className="margin-left-10" onClick={onCancelAdding}>
                Cancel
              </button>
            </>
          )}
          {showAddDirectory && (
            <>
              {ICONS.Directory}
              <input
                ref={directoryRef}
                type="text"
                value={directoryName}
                onChange={(e) => setDirectoryName(e.target.value)}
              />
              <button className="margin-left-10" onClick={onAddDirectory}>
                Add
              </button>
              <button className="margin-left-10" onClick={onCancelAdding}>
                Cancel
              </button>
            </>
          )}
          {(showAddFile || showAddDirectory) && error && (
            <div className="error">{error}</div>
          )}
        </div>
      </div>
    );
  };

  export default Directory;