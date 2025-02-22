import  { useState } from "react";
import Directory from "./Directory";
import File from "./File";

const DirectoryExplorer = ({ root, rootKey = "", spacer = 0 }) => {
    const [isExpanded, setIsExpanded] = useState(true);
  
    const onExpandCollapse = () => {
      setIsExpanded((prevState) => !prevState);
    };
  
    return (
      <div
        style={{ paddingLeft: `${spacer}px` }}
        className={root == "" ? "directory-explorer-root" : "directory-explorer"}
      >
        <Directory
          root={root}
          rootKey={rootKey}
          isExpanded={isExpanded}
          onExpandCollapse={onExpandCollapse}
        />
        {root.data &&
          isExpanded &&
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
                  spacer={spacer + 20}
                />
              );
            }
          })}
      </div>
    );
  };

  export default DirectoryExplorer;