/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { KubeObjectStore } from "../../../common/k8s-api/kube-object.store";
import type { ServiceApi } from "@meniscus/kube-api";
import type { Service } from "@meniscus/kube-object";

export class ServiceStore extends KubeObjectStore<Service, ServiceApi> {
}
