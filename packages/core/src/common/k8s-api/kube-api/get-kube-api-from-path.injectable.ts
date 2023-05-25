/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import { parseKubeApi } from "@meniscus/kube-api";
import { kubeApiInjectionToken } from "@meniscus/kube-api-specifics";
import type { KubeApi } from "@meniscus/kube-api";

export type GetKubeApiFromPath = (apiPath: string) => KubeApi | undefined;

const getKubeApiFromPathInjectable = getInjectable({
  id: "get-kube-api-from-path",

  instantiate: (di): GetKubeApiFromPath => {
    const kubeApis = di.injectMany(kubeApiInjectionToken);

    return (apiPath: string) => {
      const parsed = parseKubeApi(apiPath);

      return kubeApis.find((api) => api.apiBase === parsed?.apiBase);
    };
  },
});

export default getKubeApiFromPathInjectable;
