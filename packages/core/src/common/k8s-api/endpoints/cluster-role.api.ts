/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import type { DerivedKubeApiOptions, KubeApiDependencies } from "../kube-api";
import { KubeApi } from "../kube-api";
import type { ClusterRoleData } from "@meniscus/kube-object";
import { ClusterRole } from "@meniscus/kube-object";

export class ClusterRoleApi extends KubeApi<ClusterRole, ClusterRoleData> {
  constructor(deps: KubeApiDependencies, opts: DerivedKubeApiOptions = {}) {
    super(deps, {
      ...opts,
      objectConstructor: ClusterRole,
    });
  }
}
