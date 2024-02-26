/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import type { Subject } from "@meniscus/kube-object";
import { createHash } from "crypto";

export function hashSubject(subject: Subject): string {
  const jsonString = JSON.stringify([
    ["kind", subject.kind],
    ["name", subject.name],
    ["namespace", subject.namespace],
    ["apiGroup", subject.apiGroup],
  ]);

  const h = createHash("md5");
  h.update(jsonString);
  return h.digest("hex");
}
