/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import React, { JSXElementConstructor } from "react";
import { isObject } from "./type-narrowing";

// ref: https://changelog.com/posts/the-react-reactnode-type-is-a-black-hole

export type StrictReactFragment =
  | {
      key: string | null;
      ref?: null;
      props: {};
      children: StrictReactNode;
      type: string | JSXElementConstructor<any>;
    };

export type StrictReactNode =
  | React.ReactElement
  | React.ReactText
  | StrictReactFragment
  | React.ReactPortal
  | Iterable<StrictReactNode>
  | boolean
  | null
  | undefined;

export function isReactNode(node: unknown): node is StrictReactNode {
  return (isObject(node) && React.isValidElement(node))
    || Array.isArray(node) && node.every(isReactNode)
    || node == null
    || typeof node !== "object";
}
