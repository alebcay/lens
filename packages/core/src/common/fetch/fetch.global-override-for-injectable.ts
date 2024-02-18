/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { getGlobalOverrideForFunction } from "@meniscus/test-utils";
import fetchInjectable from "./fetch.injectable";

export default getGlobalOverrideForFunction(fetchInjectable);
