/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { KubeObjectStore } from "../../../common/k8s-api/kube-object.store";
import type { LeaseApi } from "@meniscus/kube-api";
import type { Lease } from "@meniscus/kube-object";

export class LeaseStore extends KubeObjectStore<Lease, LeaseApi> {
}
