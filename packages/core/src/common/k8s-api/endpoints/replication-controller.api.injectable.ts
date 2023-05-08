/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import { kubeApiInjectionToken, ReplicationControllerApi } from "@meniscus/kube-api";
import { loggerInjectionToken } from "@meniscus/logger";
import maybeKubeApiInjectable from "../maybe-kube-api.injectable";

const replicationControllerApiInjectable = getInjectable({
  id: "replication-controller-api",
  instantiate: (di) => {
    return new ReplicationControllerApi({
      logger: di.inject(loggerInjectionToken),
      maybeKubeApi: di.inject(maybeKubeApiInjectable),
    });
  },

  injectionToken: kubeApiInjectionToken,
});

export default replicationControllerApiInjectable;
