/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import assert from "assert";
import { storesAndApisCanBeCreatedInjectionToken } from "../stores-apis-can-be-created.token";
import { LeaseApi } from "@meniscus/kube-api";
import { kubeApiInjectionToken } from "@meniscus/kube-api-specifics";
import { loggerInjectionToken } from "@meniscus/logger";
import maybeKubeApiInjectable from "../maybe-kube-api.injectable";

const leaseApiInjectable = getInjectable({
  id: "lease-api",
  instantiate: (di) => {
    assert(di.inject(storesAndApisCanBeCreatedInjectionToken), "leaseApi is only available in certain environments");

    return new LeaseApi({
      logger: di.inject(loggerInjectionToken),
      maybeKubeApi: di.inject(maybeKubeApiInjectable),
    });
  },

  injectionToken: kubeApiInjectionToken,
});

export default leaseApiInjectable;
