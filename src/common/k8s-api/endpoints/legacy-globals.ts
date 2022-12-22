/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { asLegacyGlobalForExtensionApi } from "../../../extensions/as-legacy-globals-for-extension-api/as-legacy-global-object-for-extension-api";
import roleApiInjectable from "./role.api.injectable";

/**
 * @deprecated use `di.inject(roleApiInjectable)` instead
 */
export const roleApi = asLegacyGlobalForExtensionApi(roleApiInjectable);
