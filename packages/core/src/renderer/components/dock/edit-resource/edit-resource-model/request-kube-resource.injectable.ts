/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import type { KubeObjectMetadata, KubeObjectScope } from "../../../../../common/k8s-api/kube-object";
import { KubeObject } from "../../../../../common/k8s-api/kube-object";
import type { AsyncResult } from "@k8slens/utilities";
import { getErrorMessage } from "../../../../../common/utils/get-error-message";
import apiKubeInjectable from "../../../../k8s/api-kube.injectable";
import type { Writable } from "type-fest";
import type { KubeJsonApiData } from "../../../../../common/k8s-api/kube-json-api";
import { parseKubeApi } from "../../../../../common/k8s-api/kube-api-parse";

export type RequestKubeResource = (selfLink: string) => AsyncResult<KubeObject | undefined>;

const requestKubeResourceInjectable = getInjectable({
  id: "request-kube-resource",

  instantiate: (di): RequestKubeResource => {
    const apiKube = di.inject(apiKubeInjectable);

    return async (selfLink) => {
      const parsed = parseKubeApi(selfLink);

      if (!parsed?.name) {
        return { callWasSuccessful: false, error: "Invalid API path" };
      }

      try {
        const rawData = await apiKube.get(selfLink) as KubeJsonApiData<KubeObjectMetadata<KubeObjectScope>, unknown, unknown>;

        (rawData.metadata as Writable<typeof rawData.metadata>).selfLink = selfLink;

        return {
          callWasSuccessful: true,
          response: new KubeObject(rawData),
        };
      } catch (e) {
        return { callWasSuccessful: false, error: getErrorMessage(e) };
      }
    };
  },

  causesSideEffects: true,
});

export default requestKubeResourceInjectable;
