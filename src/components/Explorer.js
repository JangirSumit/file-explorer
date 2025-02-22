import { useContext, memo, useState, useCallback, useRef } from "react";
import { DirectoryContext } from "../contexts/DirectoryContext";
import ICONS from "../common/Icons";

const Explorer = () => {
  const { state } = useContext(DirectoryContext);
  return <DirectoryExplorer root={state} />;
};

const File = memo(({ root, rootKey, name }) => {
  const onPathCopy = (path) => {
    navigator.clipboard.writeText(path);
  };
  return (
    <div className="file" key={`${rootKey}/${root.name}/${name}`}>
      {ICONS.File} {name}
      <span
        title="Copy path"
        className="icon-span"
        onClick={() => onPathCopy(`${rootKey}/${root.name}/${name}`)}
      >
        {ICONS.Copy}
      </span>
    </div>
  );
});

const Directory = ({ root, rootKey }) => {
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
    return root?.data?.some((d) => d.name == fileName);
  };

  const onExpandCollapse = () => {
    console.log(root, root.data);
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

    if (isDuplicateName(fileName)) {
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
      <span style={{ cursor: "pointer" }} onClick={onExpandCollapse}>
        {ICONS.Expanded}
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

const DirectoryExplorer = ({ root, rootKey = "", spacer = 0 }) => {
  //console.log(rootKey, root);

  return (
    <div
      style={{ paddingLeft: `${spacer}px` }}
      className={root == "" ? "directory-explorer-root" : "directory-explorer"}
    >
      <Directory root={root} rootKey={rootKey} />
      {root.data &&
        root.data.map((d) => {
          if (d.type == "File") {
            return (
              <File
                key={
                  rootKey
                    ? `${rootKey}/${root.name}/${d.name}`
                    : `${root.name}/${d.name}`
                }
                root={root}
                rootKey={rootKey}
                name={d.name}
              />
            );
          } else {
            return (
              <DirectoryExplorer
                key={rootKey ? `${rootKey}/${root.name}` : `${root.name}`}
                rootKey={rootKey ? `${rootKey}/${root.name}` : `${root.name}`}
                root={d}
                spacer={spacer + 10}
              />
            );
          }
        })}
    </div>
  );
};

export default Explorer;
