/**
 * @license
 * Copyright Andrey Chalkin <L2jLiga@gmail.com> (https://github.com/L2jLiga). All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/L2jLiga/fastify-decorators/blob/master/LICENSE
 */

import { CREATOR, INJECTABLES } from '../symbols';

/**
 * Property decorator to inject dependencies
 * @param name of service to inject
 *
 * @example
 * class Service {
 *     @Inject('instance')
 *     private instance: FastifyInstance;
 * }
 */
export function Inject(name: string | Object | symbol): PropertyDecorator {
    return (target, propertyKey) => {
        Object.defineProperty(target, propertyKey, {
            get(): any {
                return this[INJECTABLES].get(name)
                    ?.[CREATOR]
                    ?.register(this[INJECTABLES]);
            },
            enumerable: true,
            configurable: true,
        });
    };
}
