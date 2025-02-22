import  { memo } from "react";
import ICONS from "../common/Icons";

const File = memo(({ root, rootKey, name }) => {
    const onPathCopy = (path) => {
      navigator.clipboard.writeText(path);
    };
    return (
      <div
        className="file"
        key={`${rootKey}/${root.name}/${name}`}
        style={{ paddingLeft: "30px" }}
      >
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

  export default File;