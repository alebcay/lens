/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { getInjectable } from "@ogre-tools/injectable";
import { createHash } from "crypto";

const getHashInjectable = getInjectable({
  id: "get-hash",

  instantiate: () => (text: string) => {
    const h = createHash("sha256");
    h.update(text);
    return h.digest("hex");
  },
});

export default getHashInjectable;
