/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import assert from "assert";
import { storesAndApisCanBeCreatedInjectionToken } from "../stores-apis-can-be-created.token";
import { kubeApiInjectionToken, ReplicaSetApi } from "@meniscus/kube-api";
import { loggerInjectionToken } from "@meniscus/logger";
import maybeKubeApiInjectable from "../maybe-kube-api.injectable";

const replicaSetApiInjectable = getInjectable({
  id: "replica-set-api",
  instantiate: (di) => {
    assert(di.inject(storesAndApisCanBeCreatedInjectionToken), "replicaSetApi is only available in certain environments");

    return new ReplicaSetApi({
      logger: di.inject(loggerInjectionToken),
      maybeKubeApi: di.inject(maybeKubeApiInjectable),
    });
  },

  injectionToken: kubeApiInjectionToken,
});

export default replicaSetApiInjectable;
