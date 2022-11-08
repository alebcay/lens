/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import type { RequestInit, Response } from "node-fetch";
import nodeFetchModuleInjectable from "./fetch-module.injectable";
import { HttpsProxyAgent } from "hpagent";
import userStoreInjectable from "../user-store/user-store.injectable";

export type Fetch = (url: string, init?: RequestInit) => Promise<Response>;

const fetchInjectable = getInjectable({
  id: "fetch",
  instantiate: (di): Fetch => {
    const { default: fetch } = di.inject(nodeFetchModuleInjectable);
    const { httpsProxy, allowUntrustedCAs } = di.inject(userStoreInjectable);
    const agent = httpsProxy
      ? new HttpsProxyAgent({
        proxy: httpsProxy,
        rejectUnauthorized: !allowUntrustedCAs,
      })
      : undefined;

    return (url, init = {}) => fetch(url, {
      agent,
      ...init,
    });
  },
  causesSideEffects: true,
});

export default fetchInjectable;
