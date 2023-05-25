/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import assert from "assert";
import { storesAndApisCanBeCreatedInjectionToken } from "../stores-apis-can-be-created.token";
import { PersistentVolumeClaimApi } from "@meniscus/kube-api";
import { kubeApiInjectionToken } from "@meniscus/kube-api-specifics";
import { loggerInjectionToken } from "@meniscus/logger";
import maybeKubeApiInjectable from "../maybe-kube-api.injectable";

const persistentVolumeClaimApiInjectable = getInjectable({
  id: "persistent-volume-claim-api",
  instantiate: (di) => {
    assert(di.inject(storesAndApisCanBeCreatedInjectionToken), "persistentVolumeClaimApi is only available in certain environments");

    return new PersistentVolumeClaimApi({
      logger: di.inject(loggerInjectionToken),
      maybeKubeApi: di.inject(maybeKubeApiInjectable),
    });
  },

  injectionToken: kubeApiInjectionToken,
});

export default persistentVolumeClaimApiInjectable;
