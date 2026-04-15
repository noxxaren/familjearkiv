"use client";

import { memo } from "react";
import { Handle, Position } from "@xyflow/react";

/** Invisible midpoint node connecting two partners to their children. */
function TreeCoupleNodeInner() {
  return (
    <div style={{ width: 1, height: 1, position: "relative" }}>
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        style={{ background: "transparent", border: "none", opacity: 0 }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="right"
        style={{ background: "transparent", border: "none", opacity: 0 }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "transparent", border: "none", opacity: 0 }}
      />
    </div>
  );
}

export const TreeCoupleNode = memo(TreeCoupleNodeInner);
