/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { getGlobalOverride } from "@meniscus/test-utils";
import { getRandomIdInjectable } from "@meniscus/random";

export default getGlobalOverride(getRandomIdInjectable, () => () => "some-irrelevant-random-id");
