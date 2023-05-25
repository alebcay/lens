/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import assert from "assert";
import { storesAndApisCanBeCreatedInjectionToken } from "../stores-apis-can-be-created.token";
import { PodDisruptionBudgetApi } from "@meniscus/kube-api";
import { kubeApiInjectionToken } from "@meniscus/kube-api-specifics";
import { loggerInjectionToken } from "@meniscus/logger";
import maybeKubeApiInjectable from "../maybe-kube-api.injectable";

const podDisruptionBudgetApiInjectable = getInjectable({
  id: "pod-disruption-budget-api",
  instantiate: (di) => {
    assert(di.inject(storesAndApisCanBeCreatedInjectionToken), "podDisruptionBudgetApi is only available in certain environments");

    return new PodDisruptionBudgetApi({
      logger: di.inject(loggerInjectionToken),
      maybeKubeApi: di.inject(maybeKubeApiInjectable),
    }, {
      checkPreferredVersion: true,
      allowedUsableVersions: {
        policy: [
          "v1",
          "v1beta1",
        ],
      },
    });
  },

  injectionToken: kubeApiInjectionToken,
});

export default podDisruptionBudgetApiInjectable;
