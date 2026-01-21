/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const qyh = $root.qyh = (() => {

    /**
     * Namespace qyh.
     * @exports qyh
     * @namespace
     */
    const qyh = {};

    qyh.dataplane = (function() {

        /**
         * Namespace dataplane.
         * @memberof qyh
         * @namespace
         */
        const dataplane = {};

        dataplane.Timestamp = (function() {

            /**
             * Properties of a Timestamp.
             * @memberof qyh.dataplane
             * @interface ITimestamp
             * @property {number|Long|null} [seconds] Timestamp seconds
             * @property {number|null} [nanos] Timestamp nanos
             */

            /**
             * Constructs a new Timestamp.
             * @memberof qyh.dataplane
             * @classdesc Represents a Timestamp.
             * @implements ITimestamp
             * @constructor
             * @param {qyh.dataplane.ITimestamp=} [properties] Properties to set
             */
            function Timestamp(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Timestamp seconds.
             * @member {number|Long} seconds
             * @memberof qyh.dataplane.Timestamp
             * @instance
             */
            Timestamp.prototype.seconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Timestamp nanos.
             * @member {number} nanos
             * @memberof qyh.dataplane.Timestamp
             * @instance
             */
            Timestamp.prototype.nanos = 0;

            /**
             * Creates a new Timestamp instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.Timestamp
             * @static
             * @param {qyh.dataplane.ITimestamp=} [properties] Properties to set
             * @returns {qyh.dataplane.Timestamp} Timestamp instance
             */
            Timestamp.create = function create(properties) {
                return new Timestamp(properties);
            };

            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link qyh.dataplane.Timestamp.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.Timestamp
             * @static
             * @param {qyh.dataplane.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.seconds != null && Object.hasOwnProperty.call(message, "seconds"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.seconds);
                if (message.nanos != null && Object.hasOwnProperty.call(message, "nanos"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.nanos);
                return writer;
            };

            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link qyh.dataplane.Timestamp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.Timestamp
             * @static
             * @param {qyh.dataplane.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.Timestamp();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.seconds = reader.int64();
                            break;
                        }
                    case 2: {
                            message.nanos = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Timestamp message.
             * @function verify
             * @memberof qyh.dataplane.Timestamp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Timestamp.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (!$util.isInteger(message.seconds) && !(message.seconds && $util.isInteger(message.seconds.low) && $util.isInteger(message.seconds.high)))
                        return "seconds: integer|Long expected";
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    if (!$util.isInteger(message.nanos))
                        return "nanos: integer expected";
                return null;
            };

            /**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.Timestamp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.Timestamp} Timestamp
             */
            Timestamp.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.Timestamp)
                    return object;
                let message = new $root.qyh.dataplane.Timestamp();
                if (object.seconds != null)
                    if ($util.Long)
                        (message.seconds = $util.Long.fromValue(object.seconds)).unsigned = false;
                    else if (typeof object.seconds === "string")
                        message.seconds = parseInt(object.seconds, 10);
                    else if (typeof object.seconds === "number")
                        message.seconds = object.seconds;
                    else if (typeof object.seconds === "object")
                        message.seconds = new $util.LongBits(object.seconds.low >>> 0, object.seconds.high >>> 0).toNumber();
                if (object.nanos != null)
                    message.nanos = object.nanos | 0;
                return message;
            };

            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.Timestamp
             * @static
             * @param {qyh.dataplane.Timestamp} message Timestamp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Timestamp.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.seconds = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.seconds = options.longs === String ? "0" : 0;
                    object.nanos = 0;
                }
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (typeof message.seconds === "number")
                        object.seconds = options.longs === String ? String(message.seconds) : message.seconds;
                    else
                        object.seconds = options.longs === String ? $util.Long.prototype.toString.call(message.seconds) : options.longs === Number ? new $util.LongBits(message.seconds.low >>> 0, message.seconds.high >>> 0).toNumber() : message.seconds;
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    object.nanos = message.nanos;
                return object;
            };

            /**
             * Converts this Timestamp to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.Timestamp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Timestamp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Timestamp
             * @function getTypeUrl
             * @memberof qyh.dataplane.Timestamp
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Timestamp.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.Timestamp";
            };

            return Timestamp;
        })();

        dataplane.Vector3 = (function() {

            /**
             * Properties of a Vector3.
             * @memberof qyh.dataplane
             * @interface IVector3
             * @property {number|null} [x] Vector3 x
             * @property {number|null} [y] Vector3 y
             * @property {number|null} [z] Vector3 z
             */

            /**
             * Constructs a new Vector3.
             * @memberof qyh.dataplane
             * @classdesc Represents a Vector3.
             * @implements IVector3
             * @constructor
             * @param {qyh.dataplane.IVector3=} [properties] Properties to set
             */
            function Vector3(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Vector3 x.
             * @member {number} x
             * @memberof qyh.dataplane.Vector3
             * @instance
             */
            Vector3.prototype.x = 0;

            /**
             * Vector3 y.
             * @member {number} y
             * @memberof qyh.dataplane.Vector3
             * @instance
             */
            Vector3.prototype.y = 0;

            /**
             * Vector3 z.
             * @member {number} z
             * @memberof qyh.dataplane.Vector3
             * @instance
             */
            Vector3.prototype.z = 0;

            /**
             * Creates a new Vector3 instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.Vector3
             * @static
             * @param {qyh.dataplane.IVector3=} [properties] Properties to set
             * @returns {qyh.dataplane.Vector3} Vector3 instance
             */
            Vector3.create = function create(properties) {
                return new Vector3(properties);
            };

            /**
             * Encodes the specified Vector3 message. Does not implicitly {@link qyh.dataplane.Vector3.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.Vector3
             * @static
             * @param {qyh.dataplane.IVector3} message Vector3 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Vector3.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                    writer.uint32(/* id 1, wireType 1 =*/9).double(message.x);
                if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                    writer.uint32(/* id 2, wireType 1 =*/17).double(message.y);
                if (message.z != null && Object.hasOwnProperty.call(message, "z"))
                    writer.uint32(/* id 3, wireType 1 =*/25).double(message.z);
                return writer;
            };

            /**
             * Encodes the specified Vector3 message, length delimited. Does not implicitly {@link qyh.dataplane.Vector3.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.Vector3
             * @static
             * @param {qyh.dataplane.IVector3} message Vector3 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Vector3.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Vector3 message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.Vector3
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.Vector3} Vector3
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Vector3.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.Vector3();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.x = reader.double();
                            break;
                        }
                    case 2: {
                            message.y = reader.double();
                            break;
                        }
                    case 3: {
                            message.z = reader.double();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Vector3 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.Vector3
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.Vector3} Vector3
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Vector3.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Vector3 message.
             * @function verify
             * @memberof qyh.dataplane.Vector3
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Vector3.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.x != null && message.hasOwnProperty("x"))
                    if (typeof message.x !== "number")
                        return "x: number expected";
                if (message.y != null && message.hasOwnProperty("y"))
                    if (typeof message.y !== "number")
                        return "y: number expected";
                if (message.z != null && message.hasOwnProperty("z"))
                    if (typeof message.z !== "number")
                        return "z: number expected";
                return null;
            };

            /**
             * Creates a Vector3 message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.Vector3
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.Vector3} Vector3
             */
            Vector3.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.Vector3)
                    return object;
                let message = new $root.qyh.dataplane.Vector3();
                if (object.x != null)
                    message.x = Number(object.x);
                if (object.y != null)
                    message.y = Number(object.y);
                if (object.z != null)
                    message.z = Number(object.z);
                return message;
            };

            /**
             * Creates a plain object from a Vector3 message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.Vector3
             * @static
             * @param {qyh.dataplane.Vector3} message Vector3
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Vector3.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.x = 0;
                    object.y = 0;
                    object.z = 0;
                }
                if (message.x != null && message.hasOwnProperty("x"))
                    object.x = options.json && !isFinite(message.x) ? String(message.x) : message.x;
                if (message.y != null && message.hasOwnProperty("y"))
                    object.y = options.json && !isFinite(message.y) ? String(message.y) : message.y;
                if (message.z != null && message.hasOwnProperty("z"))
                    object.z = options.json && !isFinite(message.z) ? String(message.z) : message.z;
                return object;
            };

            /**
             * Converts this Vector3 to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.Vector3
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Vector3.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Vector3
             * @function getTypeUrl
             * @memberof qyh.dataplane.Vector3
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Vector3.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.Vector3";
            };

            return Vector3;
        })();

        dataplane.Quaternion = (function() {

            /**
             * Properties of a Quaternion.
             * @memberof qyh.dataplane
             * @interface IQuaternion
             * @property {number|null} [x] Quaternion x
             * @property {number|null} [y] Quaternion y
             * @property {number|null} [z] Quaternion z
             * @property {number|null} [w] Quaternion w
             */

            /**
             * Constructs a new Quaternion.
             * @memberof qyh.dataplane
             * @classdesc Represents a Quaternion.
             * @implements IQuaternion
             * @constructor
             * @param {qyh.dataplane.IQuaternion=} [properties] Properties to set
             */
            function Quaternion(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Quaternion x.
             * @member {number} x
             * @memberof qyh.dataplane.Quaternion
             * @instance
             */
            Quaternion.prototype.x = 0;

            /**
             * Quaternion y.
             * @member {number} y
             * @memberof qyh.dataplane.Quaternion
             * @instance
             */
            Quaternion.prototype.y = 0;

            /**
             * Quaternion z.
             * @member {number} z
             * @memberof qyh.dataplane.Quaternion
             * @instance
             */
            Quaternion.prototype.z = 0;

            /**
             * Quaternion w.
             * @member {number} w
             * @memberof qyh.dataplane.Quaternion
             * @instance
             */
            Quaternion.prototype.w = 0;

            /**
             * Creates a new Quaternion instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.Quaternion
             * @static
             * @param {qyh.dataplane.IQuaternion=} [properties] Properties to set
             * @returns {qyh.dataplane.Quaternion} Quaternion instance
             */
            Quaternion.create = function create(properties) {
                return new Quaternion(properties);
            };

            /**
             * Encodes the specified Quaternion message. Does not implicitly {@link qyh.dataplane.Quaternion.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.Quaternion
             * @static
             * @param {qyh.dataplane.IQuaternion} message Quaternion message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Quaternion.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                    writer.uint32(/* id 1, wireType 1 =*/9).double(message.x);
                if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                    writer.uint32(/* id 2, wireType 1 =*/17).double(message.y);
                if (message.z != null && Object.hasOwnProperty.call(message, "z"))
                    writer.uint32(/* id 3, wireType 1 =*/25).double(message.z);
                if (message.w != null && Object.hasOwnProperty.call(message, "w"))
                    writer.uint32(/* id 4, wireType 1 =*/33).double(message.w);
                return writer;
            };

            /**
             * Encodes the specified Quaternion message, length delimited. Does not implicitly {@link qyh.dataplane.Quaternion.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.Quaternion
             * @static
             * @param {qyh.dataplane.IQuaternion} message Quaternion message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Quaternion.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Quaternion message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.Quaternion
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.Quaternion} Quaternion
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Quaternion.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.Quaternion();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.x = reader.double();
                            break;
                        }
                    case 2: {
                            message.y = reader.double();
                            break;
                        }
                    case 3: {
                            message.z = reader.double();
                            break;
                        }
                    case 4: {
                            message.w = reader.double();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Quaternion message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.Quaternion
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.Quaternion} Quaternion
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Quaternion.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Quaternion message.
             * @function verify
             * @memberof qyh.dataplane.Quaternion
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Quaternion.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.x != null && message.hasOwnProperty("x"))
                    if (typeof message.x !== "number")
                        return "x: number expected";
                if (message.y != null && message.hasOwnProperty("y"))
                    if (typeof message.y !== "number")
                        return "y: number expected";
                if (message.z != null && message.hasOwnProperty("z"))
                    if (typeof message.z !== "number")
                        return "z: number expected";
                if (message.w != null && message.hasOwnProperty("w"))
                    if (typeof message.w !== "number")
                        return "w: number expected";
                return null;
            };

            /**
             * Creates a Quaternion message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.Quaternion
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.Quaternion} Quaternion
             */
            Quaternion.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.Quaternion)
                    return object;
                let message = new $root.qyh.dataplane.Quaternion();
                if (object.x != null)
                    message.x = Number(object.x);
                if (object.y != null)
                    message.y = Number(object.y);
                if (object.z != null)
                    message.z = Number(object.z);
                if (object.w != null)
                    message.w = Number(object.w);
                return message;
            };

            /**
             * Creates a plain object from a Quaternion message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.Quaternion
             * @static
             * @param {qyh.dataplane.Quaternion} message Quaternion
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Quaternion.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.x = 0;
                    object.y = 0;
                    object.z = 0;
                    object.w = 0;
                }
                if (message.x != null && message.hasOwnProperty("x"))
                    object.x = options.json && !isFinite(message.x) ? String(message.x) : message.x;
                if (message.y != null && message.hasOwnProperty("y"))
                    object.y = options.json && !isFinite(message.y) ? String(message.y) : message.y;
                if (message.z != null && message.hasOwnProperty("z"))
                    object.z = options.json && !isFinite(message.z) ? String(message.z) : message.z;
                if (message.w != null && message.hasOwnProperty("w"))
                    object.w = options.json && !isFinite(message.w) ? String(message.w) : message.w;
                return object;
            };

            /**
             * Converts this Quaternion to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.Quaternion
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Quaternion.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Quaternion
             * @function getTypeUrl
             * @memberof qyh.dataplane.Quaternion
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Quaternion.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.Quaternion";
            };

            return Quaternion;
        })();

        dataplane.Pose = (function() {

            /**
             * Properties of a Pose.
             * @memberof qyh.dataplane
             * @interface IPose
             * @property {qyh.dataplane.IVector3|null} [position] Pose position
             * @property {qyh.dataplane.IQuaternion|null} [orientation] Pose orientation
             */

            /**
             * Constructs a new Pose.
             * @memberof qyh.dataplane
             * @classdesc Represents a Pose.
             * @implements IPose
             * @constructor
             * @param {qyh.dataplane.IPose=} [properties] Properties to set
             */
            function Pose(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Pose position.
             * @member {qyh.dataplane.IVector3|null|undefined} position
             * @memberof qyh.dataplane.Pose
             * @instance
             */
            Pose.prototype.position = null;

            /**
             * Pose orientation.
             * @member {qyh.dataplane.IQuaternion|null|undefined} orientation
             * @memberof qyh.dataplane.Pose
             * @instance
             */
            Pose.prototype.orientation = null;

            /**
             * Creates a new Pose instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.Pose
             * @static
             * @param {qyh.dataplane.IPose=} [properties] Properties to set
             * @returns {qyh.dataplane.Pose} Pose instance
             */
            Pose.create = function create(properties) {
                return new Pose(properties);
            };

            /**
             * Encodes the specified Pose message. Does not implicitly {@link qyh.dataplane.Pose.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.Pose
             * @static
             * @param {qyh.dataplane.IPose} message Pose message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Pose.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.position != null && Object.hasOwnProperty.call(message, "position"))
                    $root.qyh.dataplane.Vector3.encode(message.position, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.orientation != null && Object.hasOwnProperty.call(message, "orientation"))
                    $root.qyh.dataplane.Quaternion.encode(message.orientation, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Pose message, length delimited. Does not implicitly {@link qyh.dataplane.Pose.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.Pose
             * @static
             * @param {qyh.dataplane.IPose} message Pose message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Pose.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Pose message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.Pose
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.Pose} Pose
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Pose.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.Pose();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.position = $root.qyh.dataplane.Vector3.decode(reader, reader.uint32());
                            break;
                        }
                    case 2: {
                            message.orientation = $root.qyh.dataplane.Quaternion.decode(reader, reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Pose message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.Pose
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.Pose} Pose
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Pose.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Pose message.
             * @function verify
             * @memberof qyh.dataplane.Pose
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Pose.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.position != null && message.hasOwnProperty("position")) {
                    let error = $root.qyh.dataplane.Vector3.verify(message.position);
                    if (error)
                        return "position." + error;
                }
                if (message.orientation != null && message.hasOwnProperty("orientation")) {
                    let error = $root.qyh.dataplane.Quaternion.verify(message.orientation);
                    if (error)
                        return "orientation." + error;
                }
                return null;
            };

            /**
             * Creates a Pose message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.Pose
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.Pose} Pose
             */
            Pose.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.Pose)
                    return object;
                let message = new $root.qyh.dataplane.Pose();
                if (object.position != null) {
                    if (typeof object.position !== "object")
                        throw TypeError(".qyh.dataplane.Pose.position: object expected");
                    message.position = $root.qyh.dataplane.Vector3.fromObject(object.position);
                }
                if (object.orientation != null) {
                    if (typeof object.orientation !== "object")
                        throw TypeError(".qyh.dataplane.Pose.orientation: object expected");
                    message.orientation = $root.qyh.dataplane.Quaternion.fromObject(object.orientation);
                }
                return message;
            };

            /**
             * Creates a plain object from a Pose message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.Pose
             * @static
             * @param {qyh.dataplane.Pose} message Pose
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Pose.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.position = null;
                    object.orientation = null;
                }
                if (message.position != null && message.hasOwnProperty("position"))
                    object.position = $root.qyh.dataplane.Vector3.toObject(message.position, options);
                if (message.orientation != null && message.hasOwnProperty("orientation"))
                    object.orientation = $root.qyh.dataplane.Quaternion.toObject(message.orientation, options);
                return object;
            };

            /**
             * Converts this Pose to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.Pose
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Pose.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Pose
             * @function getTypeUrl
             * @memberof qyh.dataplane.Pose
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Pose.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.Pose";
            };

            return Pose;
        })();

        dataplane.Twist = (function() {

            /**
             * Properties of a Twist.
             * @memberof qyh.dataplane
             * @interface ITwist
             * @property {qyh.dataplane.IVector3|null} [linear] Twist linear
             * @property {qyh.dataplane.IVector3|null} [angular] Twist angular
             */

            /**
             * Constructs a new Twist.
             * @memberof qyh.dataplane
             * @classdesc Represents a Twist.
             * @implements ITwist
             * @constructor
             * @param {qyh.dataplane.ITwist=} [properties] Properties to set
             */
            function Twist(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Twist linear.
             * @member {qyh.dataplane.IVector3|null|undefined} linear
             * @memberof qyh.dataplane.Twist
             * @instance
             */
            Twist.prototype.linear = null;

            /**
             * Twist angular.
             * @member {qyh.dataplane.IVector3|null|undefined} angular
             * @memberof qyh.dataplane.Twist
             * @instance
             */
            Twist.prototype.angular = null;

            /**
             * Creates a new Twist instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.Twist
             * @static
             * @param {qyh.dataplane.ITwist=} [properties] Properties to set
             * @returns {qyh.dataplane.Twist} Twist instance
             */
            Twist.create = function create(properties) {
                return new Twist(properties);
            };

            /**
             * Encodes the specified Twist message. Does not implicitly {@link qyh.dataplane.Twist.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.Twist
             * @static
             * @param {qyh.dataplane.ITwist} message Twist message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Twist.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.linear != null && Object.hasOwnProperty.call(message, "linear"))
                    $root.qyh.dataplane.Vector3.encode(message.linear, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.angular != null && Object.hasOwnProperty.call(message, "angular"))
                    $root.qyh.dataplane.Vector3.encode(message.angular, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Twist message, length delimited. Does not implicitly {@link qyh.dataplane.Twist.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.Twist
             * @static
             * @param {qyh.dataplane.ITwist} message Twist message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Twist.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Twist message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.Twist
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.Twist} Twist
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Twist.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.Twist();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.linear = $root.qyh.dataplane.Vector3.decode(reader, reader.uint32());
                            break;
                        }
                    case 2: {
                            message.angular = $root.qyh.dataplane.Vector3.decode(reader, reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Twist message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.Twist
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.Twist} Twist
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Twist.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Twist message.
             * @function verify
             * @memberof qyh.dataplane.Twist
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Twist.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.linear != null && message.hasOwnProperty("linear")) {
                    let error = $root.qyh.dataplane.Vector3.verify(message.linear);
                    if (error)
                        return "linear." + error;
                }
                if (message.angular != null && message.hasOwnProperty("angular")) {
                    let error = $root.qyh.dataplane.Vector3.verify(message.angular);
                    if (error)
                        return "angular." + error;
                }
                return null;
            };

            /**
             * Creates a Twist message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.Twist
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.Twist} Twist
             */
            Twist.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.Twist)
                    return object;
                let message = new $root.qyh.dataplane.Twist();
                if (object.linear != null) {
                    if (typeof object.linear !== "object")
                        throw TypeError(".qyh.dataplane.Twist.linear: object expected");
                    message.linear = $root.qyh.dataplane.Vector3.fromObject(object.linear);
                }
                if (object.angular != null) {
                    if (typeof object.angular !== "object")
                        throw TypeError(".qyh.dataplane.Twist.angular: object expected");
                    message.angular = $root.qyh.dataplane.Vector3.fromObject(object.angular);
                }
                return message;
            };

            /**
             * Creates a plain object from a Twist message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.Twist
             * @static
             * @param {qyh.dataplane.Twist} message Twist
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Twist.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.linear = null;
                    object.angular = null;
                }
                if (message.linear != null && message.hasOwnProperty("linear"))
                    object.linear = $root.qyh.dataplane.Vector3.toObject(message.linear, options);
                if (message.angular != null && message.hasOwnProperty("angular"))
                    object.angular = $root.qyh.dataplane.Vector3.toObject(message.angular, options);
                return object;
            };

            /**
             * Converts this Twist to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.Twist
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Twist.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Twist
             * @function getTypeUrl
             * @memberof qyh.dataplane.Twist
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Twist.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.Twist";
            };

            return Twist;
        })();

        dataplane.Header = (function() {

            /**
             * Properties of a Header.
             * @memberof qyh.dataplane
             * @interface IHeader
             * @property {qyh.dataplane.ITimestamp|null} [stamp] Header stamp
             * @property {string|null} [frameId] Header frameId
             * @property {number|Long|null} [sequence] Header sequence
             */

            /**
             * Constructs a new Header.
             * @memberof qyh.dataplane
             * @classdesc Represents a Header.
             * @implements IHeader
             * @constructor
             * @param {qyh.dataplane.IHeader=} [properties] Properties to set
             */
            function Header(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Header stamp.
             * @member {qyh.dataplane.ITimestamp|null|undefined} stamp
             * @memberof qyh.dataplane.Header
             * @instance
             */
            Header.prototype.stamp = null;

            /**
             * Header frameId.
             * @member {string} frameId
             * @memberof qyh.dataplane.Header
             * @instance
             */
            Header.prototype.frameId = "";

            /**
             * Header sequence.
             * @member {number|Long} sequence
             * @memberof qyh.dataplane.Header
             * @instance
             */
            Header.prototype.sequence = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * Creates a new Header instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.Header
             * @static
             * @param {qyh.dataplane.IHeader=} [properties] Properties to set
             * @returns {qyh.dataplane.Header} Header instance
             */
            Header.create = function create(properties) {
                return new Header(properties);
            };

            /**
             * Encodes the specified Header message. Does not implicitly {@link qyh.dataplane.Header.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.Header
             * @static
             * @param {qyh.dataplane.IHeader} message Header message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Header.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.stamp != null && Object.hasOwnProperty.call(message, "stamp"))
                    $root.qyh.dataplane.Timestamp.encode(message.stamp, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.frameId != null && Object.hasOwnProperty.call(message, "frameId"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.frameId);
                if (message.sequence != null && Object.hasOwnProperty.call(message, "sequence"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.sequence);
                return writer;
            };

            /**
             * Encodes the specified Header message, length delimited. Does not implicitly {@link qyh.dataplane.Header.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.Header
             * @static
             * @param {qyh.dataplane.IHeader} message Header message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Header.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Header message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.Header
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.Header} Header
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Header.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.Header();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.stamp = $root.qyh.dataplane.Timestamp.decode(reader, reader.uint32());
                            break;
                        }
                    case 2: {
                            message.frameId = reader.string();
                            break;
                        }
                    case 3: {
                            message.sequence = reader.uint64();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Header message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.Header
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.Header} Header
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Header.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Header message.
             * @function verify
             * @memberof qyh.dataplane.Header
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Header.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.stamp != null && message.hasOwnProperty("stamp")) {
                    let error = $root.qyh.dataplane.Timestamp.verify(message.stamp);
                    if (error)
                        return "stamp." + error;
                }
                if (message.frameId != null && message.hasOwnProperty("frameId"))
                    if (!$util.isString(message.frameId))
                        return "frameId: string expected";
                if (message.sequence != null && message.hasOwnProperty("sequence"))
                    if (!$util.isInteger(message.sequence) && !(message.sequence && $util.isInteger(message.sequence.low) && $util.isInteger(message.sequence.high)))
                        return "sequence: integer|Long expected";
                return null;
            };

            /**
             * Creates a Header message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.Header
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.Header} Header
             */
            Header.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.Header)
                    return object;
                let message = new $root.qyh.dataplane.Header();
                if (object.stamp != null) {
                    if (typeof object.stamp !== "object")
                        throw TypeError(".qyh.dataplane.Header.stamp: object expected");
                    message.stamp = $root.qyh.dataplane.Timestamp.fromObject(object.stamp);
                }
                if (object.frameId != null)
                    message.frameId = String(object.frameId);
                if (object.sequence != null)
                    if ($util.Long)
                        (message.sequence = $util.Long.fromValue(object.sequence)).unsigned = true;
                    else if (typeof object.sequence === "string")
                        message.sequence = parseInt(object.sequence, 10);
                    else if (typeof object.sequence === "number")
                        message.sequence = object.sequence;
                    else if (typeof object.sequence === "object")
                        message.sequence = new $util.LongBits(object.sequence.low >>> 0, object.sequence.high >>> 0).toNumber(true);
                return message;
            };

            /**
             * Creates a plain object from a Header message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.Header
             * @static
             * @param {qyh.dataplane.Header} message Header
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Header.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.stamp = null;
                    object.frameId = "";
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, true);
                        object.sequence = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.sequence = options.longs === String ? "0" : 0;
                }
                if (message.stamp != null && message.hasOwnProperty("stamp"))
                    object.stamp = $root.qyh.dataplane.Timestamp.toObject(message.stamp, options);
                if (message.frameId != null && message.hasOwnProperty("frameId"))
                    object.frameId = message.frameId;
                if (message.sequence != null && message.hasOwnProperty("sequence"))
                    if (typeof message.sequence === "number")
                        object.sequence = options.longs === String ? String(message.sequence) : message.sequence;
                    else
                        object.sequence = options.longs === String ? $util.Long.prototype.toString.call(message.sequence) : options.longs === Number ? new $util.LongBits(message.sequence.low >>> 0, message.sequence.high >>> 0).toNumber(true) : message.sequence;
                return object;
            };

            /**
             * Converts this Header to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.Header
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Header.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Header
             * @function getTypeUrl
             * @memberof qyh.dataplane.Header
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Header.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.Header";
            };

            return Header;
        })();

        dataplane.UserInfo = (function() {

            /**
             * Properties of a UserInfo.
             * @memberof qyh.dataplane
             * @interface IUserInfo
             * @property {number|Long|null} [userId] UserInfo userId
             * @property {string|null} [username] UserInfo username
             * @property {string|null} [role] UserInfo role
             * @property {Array.<string>|null} [permissions] UserInfo permissions
             */

            /**
             * Constructs a new UserInfo.
             * @memberof qyh.dataplane
             * @classdesc Represents a UserInfo.
             * @implements IUserInfo
             * @constructor
             * @param {qyh.dataplane.IUserInfo=} [properties] Properties to set
             */
            function UserInfo(properties) {
                this.permissions = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * UserInfo userId.
             * @member {number|Long} userId
             * @memberof qyh.dataplane.UserInfo
             * @instance
             */
            UserInfo.prototype.userId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * UserInfo username.
             * @member {string} username
             * @memberof qyh.dataplane.UserInfo
             * @instance
             */
            UserInfo.prototype.username = "";

            /**
             * UserInfo role.
             * @member {string} role
             * @memberof qyh.dataplane.UserInfo
             * @instance
             */
            UserInfo.prototype.role = "";

            /**
             * UserInfo permissions.
             * @member {Array.<string>} permissions
             * @memberof qyh.dataplane.UserInfo
             * @instance
             */
            UserInfo.prototype.permissions = $util.emptyArray;

            /**
             * Creates a new UserInfo instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.UserInfo
             * @static
             * @param {qyh.dataplane.IUserInfo=} [properties] Properties to set
             * @returns {qyh.dataplane.UserInfo} UserInfo instance
             */
            UserInfo.create = function create(properties) {
                return new UserInfo(properties);
            };

            /**
             * Encodes the specified UserInfo message. Does not implicitly {@link qyh.dataplane.UserInfo.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.UserInfo
             * @static
             * @param {qyh.dataplane.IUserInfo} message UserInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UserInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.userId);
                if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.username);
                if (message.role != null && Object.hasOwnProperty.call(message, "role"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.role);
                if (message.permissions != null && message.permissions.length)
                    for (let i = 0; i < message.permissions.length; ++i)
                        writer.uint32(/* id 4, wireType 2 =*/34).string(message.permissions[i]);
                return writer;
            };

            /**
             * Encodes the specified UserInfo message, length delimited. Does not implicitly {@link qyh.dataplane.UserInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.UserInfo
             * @static
             * @param {qyh.dataplane.IUserInfo} message UserInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UserInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a UserInfo message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.UserInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.UserInfo} UserInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UserInfo.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.UserInfo();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.userId = reader.int64();
                            break;
                        }
                    case 2: {
                            message.username = reader.string();
                            break;
                        }
                    case 3: {
                            message.role = reader.string();
                            break;
                        }
                    case 4: {
                            if (!(message.permissions && message.permissions.length))
                                message.permissions = [];
                            message.permissions.push(reader.string());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a UserInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.UserInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.UserInfo} UserInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UserInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a UserInfo message.
             * @function verify
             * @memberof qyh.dataplane.UserInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            UserInfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.userId != null && message.hasOwnProperty("userId"))
                    if (!$util.isInteger(message.userId) && !(message.userId && $util.isInteger(message.userId.low) && $util.isInteger(message.userId.high)))
                        return "userId: integer|Long expected";
                if (message.username != null && message.hasOwnProperty("username"))
                    if (!$util.isString(message.username))
                        return "username: string expected";
                if (message.role != null && message.hasOwnProperty("role"))
                    if (!$util.isString(message.role))
                        return "role: string expected";
                if (message.permissions != null && message.hasOwnProperty("permissions")) {
                    if (!Array.isArray(message.permissions))
                        return "permissions: array expected";
                    for (let i = 0; i < message.permissions.length; ++i)
                        if (!$util.isString(message.permissions[i]))
                            return "permissions: string[] expected";
                }
                return null;
            };

            /**
             * Creates a UserInfo message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.UserInfo
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.UserInfo} UserInfo
             */
            UserInfo.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.UserInfo)
                    return object;
                let message = new $root.qyh.dataplane.UserInfo();
                if (object.userId != null)
                    if ($util.Long)
                        (message.userId = $util.Long.fromValue(object.userId)).unsigned = false;
                    else if (typeof object.userId === "string")
                        message.userId = parseInt(object.userId, 10);
                    else if (typeof object.userId === "number")
                        message.userId = object.userId;
                    else if (typeof object.userId === "object")
                        message.userId = new $util.LongBits(object.userId.low >>> 0, object.userId.high >>> 0).toNumber();
                if (object.username != null)
                    message.username = String(object.username);
                if (object.role != null)
                    message.role = String(object.role);
                if (object.permissions) {
                    if (!Array.isArray(object.permissions))
                        throw TypeError(".qyh.dataplane.UserInfo.permissions: array expected");
                    message.permissions = [];
                    for (let i = 0; i < object.permissions.length; ++i)
                        message.permissions[i] = String(object.permissions[i]);
                }
                return message;
            };

            /**
             * Creates a plain object from a UserInfo message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.UserInfo
             * @static
             * @param {qyh.dataplane.UserInfo} message UserInfo
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            UserInfo.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.permissions = [];
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.userId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.userId = options.longs === String ? "0" : 0;
                    object.username = "";
                    object.role = "";
                }
                if (message.userId != null && message.hasOwnProperty("userId"))
                    if (typeof message.userId === "number")
                        object.userId = options.longs === String ? String(message.userId) : message.userId;
                    else
                        object.userId = options.longs === String ? $util.Long.prototype.toString.call(message.userId) : options.longs === Number ? new $util.LongBits(message.userId.low >>> 0, message.userId.high >>> 0).toNumber() : message.userId;
                if (message.username != null && message.hasOwnProperty("username"))
                    object.username = message.username;
                if (message.role != null && message.hasOwnProperty("role"))
                    object.role = message.role;
                if (message.permissions && message.permissions.length) {
                    object.permissions = [];
                    for (let j = 0; j < message.permissions.length; ++j)
                        object.permissions[j] = message.permissions[j];
                }
                return object;
            };

            /**
             * Converts this UserInfo to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.UserInfo
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            UserInfo.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for UserInfo
             * @function getTypeUrl
             * @memberof qyh.dataplane.UserInfo
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            UserInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.UserInfo";
            };

            return UserInfo;
        })();

        dataplane.SessionInfo = (function() {

            /**
             * Properties of a SessionInfo.
             * @memberof qyh.dataplane
             * @interface ISessionInfo
             * @property {string|null} [sessionId] SessionInfo sessionId
             * @property {qyh.dataplane.IUserInfo|null} [user] SessionInfo user
             * @property {qyh.dataplane.ITimestamp|null} [connectedAt] SessionInfo connectedAt
             * @property {boolean|null} [hasControl] SessionInfo hasControl
             */

            /**
             * Constructs a new SessionInfo.
             * @memberof qyh.dataplane
             * @classdesc Represents a SessionInfo.
             * @implements ISessionInfo
             * @constructor
             * @param {qyh.dataplane.ISessionInfo=} [properties] Properties to set
             */
            function SessionInfo(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * SessionInfo sessionId.
             * @member {string} sessionId
             * @memberof qyh.dataplane.SessionInfo
             * @instance
             */
            SessionInfo.prototype.sessionId = "";

            /**
             * SessionInfo user.
             * @member {qyh.dataplane.IUserInfo|null|undefined} user
             * @memberof qyh.dataplane.SessionInfo
             * @instance
             */
            SessionInfo.prototype.user = null;

            /**
             * SessionInfo connectedAt.
             * @member {qyh.dataplane.ITimestamp|null|undefined} connectedAt
             * @memberof qyh.dataplane.SessionInfo
             * @instance
             */
            SessionInfo.prototype.connectedAt = null;

            /**
             * SessionInfo hasControl.
             * @member {boolean} hasControl
             * @memberof qyh.dataplane.SessionInfo
             * @instance
             */
            SessionInfo.prototype.hasControl = false;

            /**
             * Creates a new SessionInfo instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.SessionInfo
             * @static
             * @param {qyh.dataplane.ISessionInfo=} [properties] Properties to set
             * @returns {qyh.dataplane.SessionInfo} SessionInfo instance
             */
            SessionInfo.create = function create(properties) {
                return new SessionInfo(properties);
            };

            /**
             * Encodes the specified SessionInfo message. Does not implicitly {@link qyh.dataplane.SessionInfo.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.SessionInfo
             * @static
             * @param {qyh.dataplane.ISessionInfo} message SessionInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SessionInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.sessionId != null && Object.hasOwnProperty.call(message, "sessionId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.sessionId);
                if (message.user != null && Object.hasOwnProperty.call(message, "user"))
                    $root.qyh.dataplane.UserInfo.encode(message.user, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.connectedAt != null && Object.hasOwnProperty.call(message, "connectedAt"))
                    $root.qyh.dataplane.Timestamp.encode(message.connectedAt, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.hasControl != null && Object.hasOwnProperty.call(message, "hasControl"))
                    writer.uint32(/* id 4, wireType 0 =*/32).bool(message.hasControl);
                return writer;
            };

            /**
             * Encodes the specified SessionInfo message, length delimited. Does not implicitly {@link qyh.dataplane.SessionInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.SessionInfo
             * @static
             * @param {qyh.dataplane.ISessionInfo} message SessionInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SessionInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a SessionInfo message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.SessionInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.SessionInfo} SessionInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SessionInfo.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.SessionInfo();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.sessionId = reader.string();
                            break;
                        }
                    case 2: {
                            message.user = $root.qyh.dataplane.UserInfo.decode(reader, reader.uint32());
                            break;
                        }
                    case 3: {
                            message.connectedAt = $root.qyh.dataplane.Timestamp.decode(reader, reader.uint32());
                            break;
                        }
                    case 4: {
                            message.hasControl = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a SessionInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.SessionInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.SessionInfo} SessionInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SessionInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a SessionInfo message.
             * @function verify
             * @memberof qyh.dataplane.SessionInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SessionInfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.sessionId != null && message.hasOwnProperty("sessionId"))
                    if (!$util.isString(message.sessionId))
                        return "sessionId: string expected";
                if (message.user != null && message.hasOwnProperty("user")) {
                    let error = $root.qyh.dataplane.UserInfo.verify(message.user);
                    if (error)
                        return "user." + error;
                }
                if (message.connectedAt != null && message.hasOwnProperty("connectedAt")) {
                    let error = $root.qyh.dataplane.Timestamp.verify(message.connectedAt);
                    if (error)
                        return "connectedAt." + error;
                }
                if (message.hasControl != null && message.hasOwnProperty("hasControl"))
                    if (typeof message.hasControl !== "boolean")
                        return "hasControl: boolean expected";
                return null;
            };

            /**
             * Creates a SessionInfo message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.SessionInfo
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.SessionInfo} SessionInfo
             */
            SessionInfo.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.SessionInfo)
                    return object;
                let message = new $root.qyh.dataplane.SessionInfo();
                if (object.sessionId != null)
                    message.sessionId = String(object.sessionId);
                if (object.user != null) {
                    if (typeof object.user !== "object")
                        throw TypeError(".qyh.dataplane.SessionInfo.user: object expected");
                    message.user = $root.qyh.dataplane.UserInfo.fromObject(object.user);
                }
                if (object.connectedAt != null) {
                    if (typeof object.connectedAt !== "object")
                        throw TypeError(".qyh.dataplane.SessionInfo.connectedAt: object expected");
                    message.connectedAt = $root.qyh.dataplane.Timestamp.fromObject(object.connectedAt);
                }
                if (object.hasControl != null)
                    message.hasControl = Boolean(object.hasControl);
                return message;
            };

            /**
             * Creates a plain object from a SessionInfo message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.SessionInfo
             * @static
             * @param {qyh.dataplane.SessionInfo} message SessionInfo
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SessionInfo.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.sessionId = "";
                    object.user = null;
                    object.connectedAt = null;
                    object.hasControl = false;
                }
                if (message.sessionId != null && message.hasOwnProperty("sessionId"))
                    object.sessionId = message.sessionId;
                if (message.user != null && message.hasOwnProperty("user"))
                    object.user = $root.qyh.dataplane.UserInfo.toObject(message.user, options);
                if (message.connectedAt != null && message.hasOwnProperty("connectedAt"))
                    object.connectedAt = $root.qyh.dataplane.Timestamp.toObject(message.connectedAt, options);
                if (message.hasControl != null && message.hasOwnProperty("hasControl"))
                    object.hasControl = message.hasControl;
                return object;
            };

            /**
             * Converts this SessionInfo to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.SessionInfo
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SessionInfo.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for SessionInfo
             * @function getTypeUrl
             * @memberof qyh.dataplane.SessionInfo
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            SessionInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.SessionInfo";
            };

            return SessionInfo;
        })();

        dataplane.Error = (function() {

            /**
             * Properties of an Error.
             * @memberof qyh.dataplane
             * @interface IError
             * @property {number|null} [code] Error code
             * @property {string|null} [message] Error message
             * @property {string|null} [details] Error details
             */

            /**
             * Constructs a new Error.
             * @memberof qyh.dataplane
             * @classdesc Represents an Error.
             * @implements IError
             * @constructor
             * @param {qyh.dataplane.IError=} [properties] Properties to set
             */
            function Error(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Error code.
             * @member {number} code
             * @memberof qyh.dataplane.Error
             * @instance
             */
            Error.prototype.code = 0;

            /**
             * Error message.
             * @member {string} message
             * @memberof qyh.dataplane.Error
             * @instance
             */
            Error.prototype.message = "";

            /**
             * Error details.
             * @member {string} details
             * @memberof qyh.dataplane.Error
             * @instance
             */
            Error.prototype.details = "";

            /**
             * Creates a new Error instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.Error
             * @static
             * @param {qyh.dataplane.IError=} [properties] Properties to set
             * @returns {qyh.dataplane.Error} Error instance
             */
            Error.create = function create(properties) {
                return new Error(properties);
            };

            /**
             * Encodes the specified Error message. Does not implicitly {@link qyh.dataplane.Error.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.Error
             * @static
             * @param {qyh.dataplane.IError} message Error message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Error.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
                if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
                if (message.details != null && Object.hasOwnProperty.call(message, "details"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.details);
                return writer;
            };

            /**
             * Encodes the specified Error message, length delimited. Does not implicitly {@link qyh.dataplane.Error.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.Error
             * @static
             * @param {qyh.dataplane.IError} message Error message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Error.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Error message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.Error
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.Error} Error
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Error.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.Error();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.code = reader.int32();
                            break;
                        }
                    case 2: {
                            message.message = reader.string();
                            break;
                        }
                    case 3: {
                            message.details = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an Error message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.Error
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.Error} Error
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Error.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Error message.
             * @function verify
             * @memberof qyh.dataplane.Error
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Error.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.code != null && message.hasOwnProperty("code"))
                    if (!$util.isInteger(message.code))
                        return "code: integer expected";
                if (message.message != null && message.hasOwnProperty("message"))
                    if (!$util.isString(message.message))
                        return "message: string expected";
                if (message.details != null && message.hasOwnProperty("details"))
                    if (!$util.isString(message.details))
                        return "details: string expected";
                return null;
            };

            /**
             * Creates an Error message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.Error
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.Error} Error
             */
            Error.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.Error)
                    return object;
                let message = new $root.qyh.dataplane.Error();
                if (object.code != null)
                    message.code = object.code | 0;
                if (object.message != null)
                    message.message = String(object.message);
                if (object.details != null)
                    message.details = String(object.details);
                return message;
            };

            /**
             * Creates a plain object from an Error message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.Error
             * @static
             * @param {qyh.dataplane.Error} message Error
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Error.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.code = 0;
                    object.message = "";
                    object.details = "";
                }
                if (message.code != null && message.hasOwnProperty("code"))
                    object.code = message.code;
                if (message.message != null && message.hasOwnProperty("message"))
                    object.message = message.message;
                if (message.details != null && message.hasOwnProperty("details"))
                    object.details = message.details;
                return object;
            };

            /**
             * Converts this Error to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.Error
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Error.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Error
             * @function getTypeUrl
             * @memberof qyh.dataplane.Error
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Error.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.Error";
            };

            return Error;
        })();

        /**
         * ControlType enum.
         * @name qyh.dataplane.ControlType
         * @enum {number}
         * @property {number} CONTROL_NONE=0 CONTROL_NONE value
         * @property {number} CONTROL_VR_TELEOP=1 CONTROL_VR_TELEOP value
         * @property {number} CONTROL_GAMEPAD=2 CONTROL_GAMEPAD value
         * @property {number} CONTROL_KEYBOARD=3 CONTROL_KEYBOARD value
         * @property {number} CONTROL_AUTO=4 CONTROL_AUTO value
         */
        dataplane.ControlType = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "CONTROL_NONE"] = 0;
            values[valuesById[1] = "CONTROL_VR_TELEOP"] = 1;
            values[valuesById[2] = "CONTROL_GAMEPAD"] = 2;
            values[valuesById[3] = "CONTROL_KEYBOARD"] = 3;
            values[valuesById[4] = "CONTROL_AUTO"] = 4;
            return values;
        })();

        dataplane.VRController = (function() {

            /**
             * Properties of a VRController.
             * @memberof qyh.dataplane
             * @interface IVRController
             * @property {boolean|null} [active] VRController active
             * @property {qyh.dataplane.IPose|null} [pose] VRController pose
             * @property {number|null} [trigger] VRController trigger
             * @property {number|null} [grip] VRController grip
             * @property {Array.<number>|null} [joystick] VRController joystick
             * @property {Array.<boolean>|null} [buttons] VRController buttons
             * @property {boolean|null} [clutchEngaged] VRController clutchEngaged
             */

            /**
             * Constructs a new VRController.
             * @memberof qyh.dataplane
             * @classdesc Represents a VRController.
             * @implements IVRController
             * @constructor
             * @param {qyh.dataplane.IVRController=} [properties] Properties to set
             */
            function VRController(properties) {
                this.joystick = [];
                this.buttons = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * VRController active.
             * @member {boolean} active
             * @memberof qyh.dataplane.VRController
             * @instance
             */
            VRController.prototype.active = false;

            /**
             * VRController pose.
             * @member {qyh.dataplane.IPose|null|undefined} pose
             * @memberof qyh.dataplane.VRController
             * @instance
             */
            VRController.prototype.pose = null;

            /**
             * VRController trigger.
             * @member {number} trigger
             * @memberof qyh.dataplane.VRController
             * @instance
             */
            VRController.prototype.trigger = 0;

            /**
             * VRController grip.
             * @member {number} grip
             * @memberof qyh.dataplane.VRController
             * @instance
             */
            VRController.prototype.grip = 0;

            /**
             * VRController joystick.
             * @member {Array.<number>} joystick
             * @memberof qyh.dataplane.VRController
             * @instance
             */
            VRController.prototype.joystick = $util.emptyArray;

            /**
             * VRController buttons.
             * @member {Array.<boolean>} buttons
             * @memberof qyh.dataplane.VRController
             * @instance
             */
            VRController.prototype.buttons = $util.emptyArray;

            /**
             * VRController clutchEngaged.
             * @member {boolean} clutchEngaged
             * @memberof qyh.dataplane.VRController
             * @instance
             */
            VRController.prototype.clutchEngaged = false;

            /**
             * Creates a new VRController instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.VRController
             * @static
             * @param {qyh.dataplane.IVRController=} [properties] Properties to set
             * @returns {qyh.dataplane.VRController} VRController instance
             */
            VRController.create = function create(properties) {
                return new VRController(properties);
            };

            /**
             * Encodes the specified VRController message. Does not implicitly {@link qyh.dataplane.VRController.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.VRController
             * @static
             * @param {qyh.dataplane.IVRController} message VRController message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            VRController.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.active != null && Object.hasOwnProperty.call(message, "active"))
                    writer.uint32(/* id 1, wireType 0 =*/8).bool(message.active);
                if (message.pose != null && Object.hasOwnProperty.call(message, "pose"))
                    $root.qyh.dataplane.Pose.encode(message.pose, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.trigger != null && Object.hasOwnProperty.call(message, "trigger"))
                    writer.uint32(/* id 3, wireType 5 =*/29).float(message.trigger);
                if (message.grip != null && Object.hasOwnProperty.call(message, "grip"))
                    writer.uint32(/* id 4, wireType 5 =*/37).float(message.grip);
                if (message.joystick != null && message.joystick.length) {
                    writer.uint32(/* id 5, wireType 2 =*/42).fork();
                    for (let i = 0; i < message.joystick.length; ++i)
                        writer.float(message.joystick[i]);
                    writer.ldelim();
                }
                if (message.buttons != null && message.buttons.length) {
                    writer.uint32(/* id 6, wireType 2 =*/50).fork();
                    for (let i = 0; i < message.buttons.length; ++i)
                        writer.bool(message.buttons[i]);
                    writer.ldelim();
                }
                if (message.clutchEngaged != null && Object.hasOwnProperty.call(message, "clutchEngaged"))
                    writer.uint32(/* id 7, wireType 0 =*/56).bool(message.clutchEngaged);
                return writer;
            };

            /**
             * Encodes the specified VRController message, length delimited. Does not implicitly {@link qyh.dataplane.VRController.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.VRController
             * @static
             * @param {qyh.dataplane.IVRController} message VRController message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            VRController.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a VRController message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.VRController
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.VRController} VRController
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            VRController.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.VRController();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.active = reader.bool();
                            break;
                        }
                    case 2: {
                            message.pose = $root.qyh.dataplane.Pose.decode(reader, reader.uint32());
                            break;
                        }
                    case 3: {
                            message.trigger = reader.float();
                            break;
                        }
                    case 4: {
                            message.grip = reader.float();
                            break;
                        }
                    case 5: {
                            if (!(message.joystick && message.joystick.length))
                                message.joystick = [];
                            if ((tag & 7) === 2) {
                                let end2 = reader.uint32() + reader.pos;
                                while (reader.pos < end2)
                                    message.joystick.push(reader.float());
                            } else
                                message.joystick.push(reader.float());
                            break;
                        }
                    case 6: {
                            if (!(message.buttons && message.buttons.length))
                                message.buttons = [];
                            if ((tag & 7) === 2) {
                                let end2 = reader.uint32() + reader.pos;
                                while (reader.pos < end2)
                                    message.buttons.push(reader.bool());
                            } else
                                message.buttons.push(reader.bool());
                            break;
                        }
                    case 7: {
                            message.clutchEngaged = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a VRController message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.VRController
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.VRController} VRController
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            VRController.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a VRController message.
             * @function verify
             * @memberof qyh.dataplane.VRController
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            VRController.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.active != null && message.hasOwnProperty("active"))
                    if (typeof message.active !== "boolean")
                        return "active: boolean expected";
                if (message.pose != null && message.hasOwnProperty("pose")) {
                    let error = $root.qyh.dataplane.Pose.verify(message.pose);
                    if (error)
                        return "pose." + error;
                }
                if (message.trigger != null && message.hasOwnProperty("trigger"))
                    if (typeof message.trigger !== "number")
                        return "trigger: number expected";
                if (message.grip != null && message.hasOwnProperty("grip"))
                    if (typeof message.grip !== "number")
                        return "grip: number expected";
                if (message.joystick != null && message.hasOwnProperty("joystick")) {
                    if (!Array.isArray(message.joystick))
                        return "joystick: array expected";
                    for (let i = 0; i < message.joystick.length; ++i)
                        if (typeof message.joystick[i] !== "number")
                            return "joystick: number[] expected";
                }
                if (message.buttons != null && message.hasOwnProperty("buttons")) {
                    if (!Array.isArray(message.buttons))
                        return "buttons: array expected";
                    for (let i = 0; i < message.buttons.length; ++i)
                        if (typeof message.buttons[i] !== "boolean")
                            return "buttons: boolean[] expected";
                }
                if (message.clutchEngaged != null && message.hasOwnProperty("clutchEngaged"))
                    if (typeof message.clutchEngaged !== "boolean")
                        return "clutchEngaged: boolean expected";
                return null;
            };

            /**
             * Creates a VRController message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.VRController
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.VRController} VRController
             */
            VRController.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.VRController)
                    return object;
                let message = new $root.qyh.dataplane.VRController();
                if (object.active != null)
                    message.active = Boolean(object.active);
                if (object.pose != null) {
                    if (typeof object.pose !== "object")
                        throw TypeError(".qyh.dataplane.VRController.pose: object expected");
                    message.pose = $root.qyh.dataplane.Pose.fromObject(object.pose);
                }
                if (object.trigger != null)
                    message.trigger = Number(object.trigger);
                if (object.grip != null)
                    message.grip = Number(object.grip);
                if (object.joystick) {
                    if (!Array.isArray(object.joystick))
                        throw TypeError(".qyh.dataplane.VRController.joystick: array expected");
                    message.joystick = [];
                    for (let i = 0; i < object.joystick.length; ++i)
                        message.joystick[i] = Number(object.joystick[i]);
                }
                if (object.buttons) {
                    if (!Array.isArray(object.buttons))
                        throw TypeError(".qyh.dataplane.VRController.buttons: array expected");
                    message.buttons = [];
                    for (let i = 0; i < object.buttons.length; ++i)
                        message.buttons[i] = Boolean(object.buttons[i]);
                }
                if (object.clutchEngaged != null)
                    message.clutchEngaged = Boolean(object.clutchEngaged);
                return message;
            };

            /**
             * Creates a plain object from a VRController message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.VRController
             * @static
             * @param {qyh.dataplane.VRController} message VRController
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            VRController.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults) {
                    object.joystick = [];
                    object.buttons = [];
                }
                if (options.defaults) {
                    object.active = false;
                    object.pose = null;
                    object.trigger = 0;
                    object.grip = 0;
                    object.clutchEngaged = false;
                }
                if (message.active != null && message.hasOwnProperty("active"))
                    object.active = message.active;
                if (message.pose != null && message.hasOwnProperty("pose"))
                    object.pose = $root.qyh.dataplane.Pose.toObject(message.pose, options);
                if (message.trigger != null && message.hasOwnProperty("trigger"))
                    object.trigger = options.json && !isFinite(message.trigger) ? String(message.trigger) : message.trigger;
                if (message.grip != null && message.hasOwnProperty("grip"))
                    object.grip = options.json && !isFinite(message.grip) ? String(message.grip) : message.grip;
                if (message.joystick && message.joystick.length) {
                    object.joystick = [];
                    for (let j = 0; j < message.joystick.length; ++j)
                        object.joystick[j] = options.json && !isFinite(message.joystick[j]) ? String(message.joystick[j]) : message.joystick[j];
                }
                if (message.buttons && message.buttons.length) {
                    object.buttons = [];
                    for (let j = 0; j < message.buttons.length; ++j)
                        object.buttons[j] = message.buttons[j];
                }
                if (message.clutchEngaged != null && message.hasOwnProperty("clutchEngaged"))
                    object.clutchEngaged = message.clutchEngaged;
                return object;
            };

            /**
             * Converts this VRController to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.VRController
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            VRController.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for VRController
             * @function getTypeUrl
             * @memberof qyh.dataplane.VRController
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            VRController.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.VRController";
            };

            return VRController;
        })();

        dataplane.VRControlIntent = (function() {

            /**
             * Properties of a VRControlIntent.
             * @memberof qyh.dataplane
             * @interface IVRControlIntent
             * @property {qyh.dataplane.IHeader|null} [header] VRControlIntent header
             * @property {qyh.dataplane.IPose|null} [headPose] VRControlIntent headPose
             * @property {qyh.dataplane.IVRController|null} [leftHand] VRControlIntent leftHand
             * @property {qyh.dataplane.IVRController|null} [rightHand] VRControlIntent rightHand
             */

            /**
             * Constructs a new VRControlIntent.
             * @memberof qyh.dataplane
             * @classdesc Represents a VRControlIntent.
             * @implements IVRControlIntent
             * @constructor
             * @param {qyh.dataplane.IVRControlIntent=} [properties] Properties to set
             */
            function VRControlIntent(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * VRControlIntent header.
             * @member {qyh.dataplane.IHeader|null|undefined} header
             * @memberof qyh.dataplane.VRControlIntent
             * @instance
             */
            VRControlIntent.prototype.header = null;

            /**
             * VRControlIntent headPose.
             * @member {qyh.dataplane.IPose|null|undefined} headPose
             * @memberof qyh.dataplane.VRControlIntent
             * @instance
             */
            VRControlIntent.prototype.headPose = null;

            /**
             * VRControlIntent leftHand.
             * @member {qyh.dataplane.IVRController|null|undefined} leftHand
             * @memberof qyh.dataplane.VRControlIntent
             * @instance
             */
            VRControlIntent.prototype.leftHand = null;

            /**
             * VRControlIntent rightHand.
             * @member {qyh.dataplane.IVRController|null|undefined} rightHand
             * @memberof qyh.dataplane.VRControlIntent
             * @instance
             */
            VRControlIntent.prototype.rightHand = null;

            /**
             * Creates a new VRControlIntent instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.VRControlIntent
             * @static
             * @param {qyh.dataplane.IVRControlIntent=} [properties] Properties to set
             * @returns {qyh.dataplane.VRControlIntent} VRControlIntent instance
             */
            VRControlIntent.create = function create(properties) {
                return new VRControlIntent(properties);
            };

            /**
             * Encodes the specified VRControlIntent message. Does not implicitly {@link qyh.dataplane.VRControlIntent.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.VRControlIntent
             * @static
             * @param {qyh.dataplane.IVRControlIntent} message VRControlIntent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            VRControlIntent.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                    $root.qyh.dataplane.Header.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.headPose != null && Object.hasOwnProperty.call(message, "headPose"))
                    $root.qyh.dataplane.Pose.encode(message.headPose, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.leftHand != null && Object.hasOwnProperty.call(message, "leftHand"))
                    $root.qyh.dataplane.VRController.encode(message.leftHand, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.rightHand != null && Object.hasOwnProperty.call(message, "rightHand"))
                    $root.qyh.dataplane.VRController.encode(message.rightHand, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified VRControlIntent message, length delimited. Does not implicitly {@link qyh.dataplane.VRControlIntent.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.VRControlIntent
             * @static
             * @param {qyh.dataplane.IVRControlIntent} message VRControlIntent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            VRControlIntent.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a VRControlIntent message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.VRControlIntent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.VRControlIntent} VRControlIntent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            VRControlIntent.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.VRControlIntent();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.header = $root.qyh.dataplane.Header.decode(reader, reader.uint32());
                            break;
                        }
                    case 2: {
                            message.headPose = $root.qyh.dataplane.Pose.decode(reader, reader.uint32());
                            break;
                        }
                    case 3: {
                            message.leftHand = $root.qyh.dataplane.VRController.decode(reader, reader.uint32());
                            break;
                        }
                    case 4: {
                            message.rightHand = $root.qyh.dataplane.VRController.decode(reader, reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a VRControlIntent message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.VRControlIntent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.VRControlIntent} VRControlIntent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            VRControlIntent.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a VRControlIntent message.
             * @function verify
             * @memberof qyh.dataplane.VRControlIntent
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            VRControlIntent.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.header != null && message.hasOwnProperty("header")) {
                    let error = $root.qyh.dataplane.Header.verify(message.header);
                    if (error)
                        return "header." + error;
                }
                if (message.headPose != null && message.hasOwnProperty("headPose")) {
                    let error = $root.qyh.dataplane.Pose.verify(message.headPose);
                    if (error)
                        return "headPose." + error;
                }
                if (message.leftHand != null && message.hasOwnProperty("leftHand")) {
                    let error = $root.qyh.dataplane.VRController.verify(message.leftHand);
                    if (error)
                        return "leftHand." + error;
                }
                if (message.rightHand != null && message.hasOwnProperty("rightHand")) {
                    let error = $root.qyh.dataplane.VRController.verify(message.rightHand);
                    if (error)
                        return "rightHand." + error;
                }
                return null;
            };

            /**
             * Creates a VRControlIntent message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.VRControlIntent
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.VRControlIntent} VRControlIntent
             */
            VRControlIntent.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.VRControlIntent)
                    return object;
                let message = new $root.qyh.dataplane.VRControlIntent();
                if (object.header != null) {
                    if (typeof object.header !== "object")
                        throw TypeError(".qyh.dataplane.VRControlIntent.header: object expected");
                    message.header = $root.qyh.dataplane.Header.fromObject(object.header);
                }
                if (object.headPose != null) {
                    if (typeof object.headPose !== "object")
                        throw TypeError(".qyh.dataplane.VRControlIntent.headPose: object expected");
                    message.headPose = $root.qyh.dataplane.Pose.fromObject(object.headPose);
                }
                if (object.leftHand != null) {
                    if (typeof object.leftHand !== "object")
                        throw TypeError(".qyh.dataplane.VRControlIntent.leftHand: object expected");
                    message.leftHand = $root.qyh.dataplane.VRController.fromObject(object.leftHand);
                }
                if (object.rightHand != null) {
                    if (typeof object.rightHand !== "object")
                        throw TypeError(".qyh.dataplane.VRControlIntent.rightHand: object expected");
                    message.rightHand = $root.qyh.dataplane.VRController.fromObject(object.rightHand);
                }
                return message;
            };

            /**
             * Creates a plain object from a VRControlIntent message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.VRControlIntent
             * @static
             * @param {qyh.dataplane.VRControlIntent} message VRControlIntent
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            VRControlIntent.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.header = null;
                    object.headPose = null;
                    object.leftHand = null;
                    object.rightHand = null;
                }
                if (message.header != null && message.hasOwnProperty("header"))
                    object.header = $root.qyh.dataplane.Header.toObject(message.header, options);
                if (message.headPose != null && message.hasOwnProperty("headPose"))
                    object.headPose = $root.qyh.dataplane.Pose.toObject(message.headPose, options);
                if (message.leftHand != null && message.hasOwnProperty("leftHand"))
                    object.leftHand = $root.qyh.dataplane.VRController.toObject(message.leftHand, options);
                if (message.rightHand != null && message.hasOwnProperty("rightHand"))
                    object.rightHand = $root.qyh.dataplane.VRController.toObject(message.rightHand, options);
                return object;
            };

            /**
             * Converts this VRControlIntent to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.VRControlIntent
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            VRControlIntent.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for VRControlIntent
             * @function getTypeUrl
             * @memberof qyh.dataplane.VRControlIntent
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            VRControlIntent.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.VRControlIntent";
            };

            return VRControlIntent;
        })();

        dataplane.ChassisVelocity = (function() {

            /**
             * Properties of a ChassisVelocity.
             * @memberof qyh.dataplane
             * @interface IChassisVelocity
             * @property {qyh.dataplane.IHeader|null} [header] ChassisVelocity header
             * @property {number|null} [linearX] ChassisVelocity linearX
             * @property {number|null} [linearY] ChassisVelocity linearY
             * @property {number|null} [angularZ] ChassisVelocity angularZ
             */

            /**
             * Constructs a new ChassisVelocity.
             * @memberof qyh.dataplane
             * @classdesc Represents a ChassisVelocity.
             * @implements IChassisVelocity
             * @constructor
             * @param {qyh.dataplane.IChassisVelocity=} [properties] Properties to set
             */
            function ChassisVelocity(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ChassisVelocity header.
             * @member {qyh.dataplane.IHeader|null|undefined} header
             * @memberof qyh.dataplane.ChassisVelocity
             * @instance
             */
            ChassisVelocity.prototype.header = null;

            /**
             * ChassisVelocity linearX.
             * @member {number} linearX
             * @memberof qyh.dataplane.ChassisVelocity
             * @instance
             */
            ChassisVelocity.prototype.linearX = 0;

            /**
             * ChassisVelocity linearY.
             * @member {number} linearY
             * @memberof qyh.dataplane.ChassisVelocity
             * @instance
             */
            ChassisVelocity.prototype.linearY = 0;

            /**
             * ChassisVelocity angularZ.
             * @member {number} angularZ
             * @memberof qyh.dataplane.ChassisVelocity
             * @instance
             */
            ChassisVelocity.prototype.angularZ = 0;

            /**
             * Creates a new ChassisVelocity instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.ChassisVelocity
             * @static
             * @param {qyh.dataplane.IChassisVelocity=} [properties] Properties to set
             * @returns {qyh.dataplane.ChassisVelocity} ChassisVelocity instance
             */
            ChassisVelocity.create = function create(properties) {
                return new ChassisVelocity(properties);
            };

            /**
             * Encodes the specified ChassisVelocity message. Does not implicitly {@link qyh.dataplane.ChassisVelocity.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.ChassisVelocity
             * @static
             * @param {qyh.dataplane.IChassisVelocity} message ChassisVelocity message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChassisVelocity.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                    $root.qyh.dataplane.Header.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.linearX != null && Object.hasOwnProperty.call(message, "linearX"))
                    writer.uint32(/* id 2, wireType 1 =*/17).double(message.linearX);
                if (message.linearY != null && Object.hasOwnProperty.call(message, "linearY"))
                    writer.uint32(/* id 3, wireType 1 =*/25).double(message.linearY);
                if (message.angularZ != null && Object.hasOwnProperty.call(message, "angularZ"))
                    writer.uint32(/* id 4, wireType 1 =*/33).double(message.angularZ);
                return writer;
            };

            /**
             * Encodes the specified ChassisVelocity message, length delimited. Does not implicitly {@link qyh.dataplane.ChassisVelocity.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.ChassisVelocity
             * @static
             * @param {qyh.dataplane.IChassisVelocity} message ChassisVelocity message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChassisVelocity.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ChassisVelocity message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.ChassisVelocity
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.ChassisVelocity} ChassisVelocity
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChassisVelocity.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.ChassisVelocity();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.header = $root.qyh.dataplane.Header.decode(reader, reader.uint32());
                            break;
                        }
                    case 2: {
                            message.linearX = reader.double();
                            break;
                        }
                    case 3: {
                            message.linearY = reader.double();
                            break;
                        }
                    case 4: {
                            message.angularZ = reader.double();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ChassisVelocity message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.ChassisVelocity
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.ChassisVelocity} ChassisVelocity
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChassisVelocity.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ChassisVelocity message.
             * @function verify
             * @memberof qyh.dataplane.ChassisVelocity
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ChassisVelocity.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.header != null && message.hasOwnProperty("header")) {
                    let error = $root.qyh.dataplane.Header.verify(message.header);
                    if (error)
                        return "header." + error;
                }
                if (message.linearX != null && message.hasOwnProperty("linearX"))
                    if (typeof message.linearX !== "number")
                        return "linearX: number expected";
                if (message.linearY != null && message.hasOwnProperty("linearY"))
                    if (typeof message.linearY !== "number")
                        return "linearY: number expected";
                if (message.angularZ != null && message.hasOwnProperty("angularZ"))
                    if (typeof message.angularZ !== "number")
                        return "angularZ: number expected";
                return null;
            };

            /**
             * Creates a ChassisVelocity message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.ChassisVelocity
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.ChassisVelocity} ChassisVelocity
             */
            ChassisVelocity.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.ChassisVelocity)
                    return object;
                let message = new $root.qyh.dataplane.ChassisVelocity();
                if (object.header != null) {
                    if (typeof object.header !== "object")
                        throw TypeError(".qyh.dataplane.ChassisVelocity.header: object expected");
                    message.header = $root.qyh.dataplane.Header.fromObject(object.header);
                }
                if (object.linearX != null)
                    message.linearX = Number(object.linearX);
                if (object.linearY != null)
                    message.linearY = Number(object.linearY);
                if (object.angularZ != null)
                    message.angularZ = Number(object.angularZ);
                return message;
            };

            /**
             * Creates a plain object from a ChassisVelocity message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.ChassisVelocity
             * @static
             * @param {qyh.dataplane.ChassisVelocity} message ChassisVelocity
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ChassisVelocity.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.header = null;
                    object.linearX = 0;
                    object.linearY = 0;
                    object.angularZ = 0;
                }
                if (message.header != null && message.hasOwnProperty("header"))
                    object.header = $root.qyh.dataplane.Header.toObject(message.header, options);
                if (message.linearX != null && message.hasOwnProperty("linearX"))
                    object.linearX = options.json && !isFinite(message.linearX) ? String(message.linearX) : message.linearX;
                if (message.linearY != null && message.hasOwnProperty("linearY"))
                    object.linearY = options.json && !isFinite(message.linearY) ? String(message.linearY) : message.linearY;
                if (message.angularZ != null && message.hasOwnProperty("angularZ"))
                    object.angularZ = options.json && !isFinite(message.angularZ) ? String(message.angularZ) : message.angularZ;
                return object;
            };

            /**
             * Converts this ChassisVelocity to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.ChassisVelocity
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ChassisVelocity.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for ChassisVelocity
             * @function getTypeUrl
             * @memberof qyh.dataplane.ChassisVelocity
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ChassisVelocity.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.ChassisVelocity";
            };

            return ChassisVelocity;
        })();

        dataplane.NavigationGoal = (function() {

            /**
             * Properties of a NavigationGoal.
             * @memberof qyh.dataplane
             * @interface INavigationGoal
             * @property {qyh.dataplane.IHeader|null} [header] NavigationGoal header
             * @property {qyh.dataplane.IPose|null} [targetPose] NavigationGoal targetPose
             * @property {boolean|null} [isLocalizationOnly] NavigationGoal isLocalizationOnly
             */

            /**
             * Constructs a new NavigationGoal.
             * @memberof qyh.dataplane
             * @classdesc Represents a NavigationGoal.
             * @implements INavigationGoal
             * @constructor
             * @param {qyh.dataplane.INavigationGoal=} [properties] Properties to set
             */
            function NavigationGoal(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * NavigationGoal header.
             * @member {qyh.dataplane.IHeader|null|undefined} header
             * @memberof qyh.dataplane.NavigationGoal
             * @instance
             */
            NavigationGoal.prototype.header = null;

            /**
             * NavigationGoal targetPose.
             * @member {qyh.dataplane.IPose|null|undefined} targetPose
             * @memberof qyh.dataplane.NavigationGoal
             * @instance
             */
            NavigationGoal.prototype.targetPose = null;

            /**
             * NavigationGoal isLocalizationOnly.
             * @member {boolean} isLocalizationOnly
             * @memberof qyh.dataplane.NavigationGoal
             * @instance
             */
            NavigationGoal.prototype.isLocalizationOnly = false;

            /**
             * Creates a new NavigationGoal instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.NavigationGoal
             * @static
             * @param {qyh.dataplane.INavigationGoal=} [properties] Properties to set
             * @returns {qyh.dataplane.NavigationGoal} NavigationGoal instance
             */
            NavigationGoal.create = function create(properties) {
                return new NavigationGoal(properties);
            };

            /**
             * Encodes the specified NavigationGoal message. Does not implicitly {@link qyh.dataplane.NavigationGoal.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.NavigationGoal
             * @static
             * @param {qyh.dataplane.INavigationGoal} message NavigationGoal message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            NavigationGoal.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                    $root.qyh.dataplane.Header.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.targetPose != null && Object.hasOwnProperty.call(message, "targetPose"))
                    $root.qyh.dataplane.Pose.encode(message.targetPose, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.isLocalizationOnly != null && Object.hasOwnProperty.call(message, "isLocalizationOnly"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.isLocalizationOnly);
                return writer;
            };

            /**
             * Encodes the specified NavigationGoal message, length delimited. Does not implicitly {@link qyh.dataplane.NavigationGoal.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.NavigationGoal
             * @static
             * @param {qyh.dataplane.INavigationGoal} message NavigationGoal message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            NavigationGoal.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a NavigationGoal message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.NavigationGoal
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.NavigationGoal} NavigationGoal
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            NavigationGoal.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.NavigationGoal();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.header = $root.qyh.dataplane.Header.decode(reader, reader.uint32());
                            break;
                        }
                    case 2: {
                            message.targetPose = $root.qyh.dataplane.Pose.decode(reader, reader.uint32());
                            break;
                        }
                    case 3: {
                            message.isLocalizationOnly = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a NavigationGoal message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.NavigationGoal
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.NavigationGoal} NavigationGoal
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            NavigationGoal.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a NavigationGoal message.
             * @function verify
             * @memberof qyh.dataplane.NavigationGoal
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            NavigationGoal.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.header != null && message.hasOwnProperty("header")) {
                    let error = $root.qyh.dataplane.Header.verify(message.header);
                    if (error)
                        return "header." + error;
                }
                if (message.targetPose != null && message.hasOwnProperty("targetPose")) {
                    let error = $root.qyh.dataplane.Pose.verify(message.targetPose);
                    if (error)
                        return "targetPose." + error;
                }
                if (message.isLocalizationOnly != null && message.hasOwnProperty("isLocalizationOnly"))
                    if (typeof message.isLocalizationOnly !== "boolean")
                        return "isLocalizationOnly: boolean expected";
                return null;
            };

            /**
             * Creates a NavigationGoal message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.NavigationGoal
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.NavigationGoal} NavigationGoal
             */
            NavigationGoal.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.NavigationGoal)
                    return object;
                let message = new $root.qyh.dataplane.NavigationGoal();
                if (object.header != null) {
                    if (typeof object.header !== "object")
                        throw TypeError(".qyh.dataplane.NavigationGoal.header: object expected");
                    message.header = $root.qyh.dataplane.Header.fromObject(object.header);
                }
                if (object.targetPose != null) {
                    if (typeof object.targetPose !== "object")
                        throw TypeError(".qyh.dataplane.NavigationGoal.targetPose: object expected");
                    message.targetPose = $root.qyh.dataplane.Pose.fromObject(object.targetPose);
                }
                if (object.isLocalizationOnly != null)
                    message.isLocalizationOnly = Boolean(object.isLocalizationOnly);
                return message;
            };

            /**
             * Creates a plain object from a NavigationGoal message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.NavigationGoal
             * @static
             * @param {qyh.dataplane.NavigationGoal} message NavigationGoal
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            NavigationGoal.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.header = null;
                    object.targetPose = null;
                    object.isLocalizationOnly = false;
                }
                if (message.header != null && message.hasOwnProperty("header"))
                    object.header = $root.qyh.dataplane.Header.toObject(message.header, options);
                if (message.targetPose != null && message.hasOwnProperty("targetPose"))
                    object.targetPose = $root.qyh.dataplane.Pose.toObject(message.targetPose, options);
                if (message.isLocalizationOnly != null && message.hasOwnProperty("isLocalizationOnly"))
                    object.isLocalizationOnly = message.isLocalizationOnly;
                return object;
            };

            /**
             * Converts this NavigationGoal to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.NavigationGoal
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            NavigationGoal.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for NavigationGoal
             * @function getTypeUrl
             * @memberof qyh.dataplane.NavigationGoal
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            NavigationGoal.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.NavigationGoal";
            };

            return NavigationGoal;
        })();

        dataplane.NavigationControl = (function() {

            /**
             * Properties of a NavigationControl.
             * @memberof qyh.dataplane
             * @interface INavigationControl
             * @property {qyh.dataplane.IHeader|null} [header] NavigationControl header
             * @property {string|null} [action] NavigationControl action
             */

            /**
             * Constructs a new NavigationControl.
             * @memberof qyh.dataplane
             * @classdesc Represents a NavigationControl.
             * @implements INavigationControl
             * @constructor
             * @param {qyh.dataplane.INavigationControl=} [properties] Properties to set
             */
            function NavigationControl(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * NavigationControl header.
             * @member {qyh.dataplane.IHeader|null|undefined} header
             * @memberof qyh.dataplane.NavigationControl
             * @instance
             */
            NavigationControl.prototype.header = null;

            /**
             * NavigationControl action.
             * @member {string} action
             * @memberof qyh.dataplane.NavigationControl
             * @instance
             */
            NavigationControl.prototype.action = "";

            /**
             * Creates a new NavigationControl instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.NavigationControl
             * @static
             * @param {qyh.dataplane.INavigationControl=} [properties] Properties to set
             * @returns {qyh.dataplane.NavigationControl} NavigationControl instance
             */
            NavigationControl.create = function create(properties) {
                return new NavigationControl(properties);
            };

            /**
             * Encodes the specified NavigationControl message. Does not implicitly {@link qyh.dataplane.NavigationControl.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.NavigationControl
             * @static
             * @param {qyh.dataplane.INavigationControl} message NavigationControl message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            NavigationControl.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                    $root.qyh.dataplane.Header.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.action != null && Object.hasOwnProperty.call(message, "action"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.action);
                return writer;
            };

            /**
             * Encodes the specified NavigationControl message, length delimited. Does not implicitly {@link qyh.dataplane.NavigationControl.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.NavigationControl
             * @static
             * @param {qyh.dataplane.INavigationControl} message NavigationControl message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            NavigationControl.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a NavigationControl message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.NavigationControl
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.NavigationControl} NavigationControl
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            NavigationControl.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.NavigationControl();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.header = $root.qyh.dataplane.Header.decode(reader, reader.uint32());
                            break;
                        }
                    case 2: {
                            message.action = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a NavigationControl message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.NavigationControl
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.NavigationControl} NavigationControl
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            NavigationControl.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a NavigationControl message.
             * @function verify
             * @memberof qyh.dataplane.NavigationControl
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            NavigationControl.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.header != null && message.hasOwnProperty("header")) {
                    let error = $root.qyh.dataplane.Header.verify(message.header);
                    if (error)
                        return "header." + error;
                }
                if (message.action != null && message.hasOwnProperty("action"))
                    if (!$util.isString(message.action))
                        return "action: string expected";
                return null;
            };

            /**
             * Creates a NavigationControl message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.NavigationControl
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.NavigationControl} NavigationControl
             */
            NavigationControl.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.NavigationControl)
                    return object;
                let message = new $root.qyh.dataplane.NavigationControl();
                if (object.header != null) {
                    if (typeof object.header !== "object")
                        throw TypeError(".qyh.dataplane.NavigationControl.header: object expected");
                    message.header = $root.qyh.dataplane.Header.fromObject(object.header);
                }
                if (object.action != null)
                    message.action = String(object.action);
                return message;
            };

            /**
             * Creates a plain object from a NavigationControl message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.NavigationControl
             * @static
             * @param {qyh.dataplane.NavigationControl} message NavigationControl
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            NavigationControl.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.header = null;
                    object.action = "";
                }
                if (message.header != null && message.hasOwnProperty("header"))
                    object.header = $root.qyh.dataplane.Header.toObject(message.header, options);
                if (message.action != null && message.hasOwnProperty("action"))
                    object.action = message.action;
                return object;
            };

            /**
             * Converts this NavigationControl to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.NavigationControl
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            NavigationControl.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for NavigationControl
             * @function getTypeUrl
             * @memberof qyh.dataplane.NavigationControl
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            NavigationControl.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.NavigationControl";
            };

            return NavigationControl;
        })();

        dataplane.LiftCommand = (function() {

            /**
             * Properties of a LiftCommand.
             * @memberof qyh.dataplane
             * @interface ILiftCommand
             * @property {qyh.dataplane.IHeader|null} [header] LiftCommand header
             * @property {string|null} [command] LiftCommand command
             * @property {number|null} [targetHeight] LiftCommand targetHeight
             * @property {number|null} [speed] LiftCommand speed
             */

            /**
             * Constructs a new LiftCommand.
             * @memberof qyh.dataplane
             * @classdesc Represents a LiftCommand.
             * @implements ILiftCommand
             * @constructor
             * @param {qyh.dataplane.ILiftCommand=} [properties] Properties to set
             */
            function LiftCommand(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * LiftCommand header.
             * @member {qyh.dataplane.IHeader|null|undefined} header
             * @memberof qyh.dataplane.LiftCommand
             * @instance
             */
            LiftCommand.prototype.header = null;

            /**
             * LiftCommand command.
             * @member {string} command
             * @memberof qyh.dataplane.LiftCommand
             * @instance
             */
            LiftCommand.prototype.command = "";

            /**
             * LiftCommand targetHeight.
             * @member {number} targetHeight
             * @memberof qyh.dataplane.LiftCommand
             * @instance
             */
            LiftCommand.prototype.targetHeight = 0;

            /**
             * LiftCommand speed.
             * @member {number} speed
             * @memberof qyh.dataplane.LiftCommand
             * @instance
             */
            LiftCommand.prototype.speed = 0;

            /**
             * Creates a new LiftCommand instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.LiftCommand
             * @static
             * @param {qyh.dataplane.ILiftCommand=} [properties] Properties to set
             * @returns {qyh.dataplane.LiftCommand} LiftCommand instance
             */
            LiftCommand.create = function create(properties) {
                return new LiftCommand(properties);
            };

            /**
             * Encodes the specified LiftCommand message. Does not implicitly {@link qyh.dataplane.LiftCommand.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.LiftCommand
             * @static
             * @param {qyh.dataplane.ILiftCommand} message LiftCommand message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LiftCommand.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                    $root.qyh.dataplane.Header.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.command != null && Object.hasOwnProperty.call(message, "command"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.command);
                if (message.targetHeight != null && Object.hasOwnProperty.call(message, "targetHeight"))
                    writer.uint32(/* id 3, wireType 1 =*/25).double(message.targetHeight);
                if (message.speed != null && Object.hasOwnProperty.call(message, "speed"))
                    writer.uint32(/* id 4, wireType 1 =*/33).double(message.speed);
                return writer;
            };

            /**
             * Encodes the specified LiftCommand message, length delimited. Does not implicitly {@link qyh.dataplane.LiftCommand.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.LiftCommand
             * @static
             * @param {qyh.dataplane.ILiftCommand} message LiftCommand message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LiftCommand.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a LiftCommand message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.LiftCommand
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.LiftCommand} LiftCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LiftCommand.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.LiftCommand();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.header = $root.qyh.dataplane.Header.decode(reader, reader.uint32());
                            break;
                        }
                    case 2: {
                            message.command = reader.string();
                            break;
                        }
                    case 3: {
                            message.targetHeight = reader.double();
                            break;
                        }
                    case 4: {
                            message.speed = reader.double();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a LiftCommand message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.LiftCommand
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.LiftCommand} LiftCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LiftCommand.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a LiftCommand message.
             * @function verify
             * @memberof qyh.dataplane.LiftCommand
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            LiftCommand.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.header != null && message.hasOwnProperty("header")) {
                    let error = $root.qyh.dataplane.Header.verify(message.header);
                    if (error)
                        return "header." + error;
                }
                if (message.command != null && message.hasOwnProperty("command"))
                    if (!$util.isString(message.command))
                        return "command: string expected";
                if (message.targetHeight != null && message.hasOwnProperty("targetHeight"))
                    if (typeof message.targetHeight !== "number")
                        return "targetHeight: number expected";
                if (message.speed != null && message.hasOwnProperty("speed"))
                    if (typeof message.speed !== "number")
                        return "speed: number expected";
                return null;
            };

            /**
             * Creates a LiftCommand message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.LiftCommand
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.LiftCommand} LiftCommand
             */
            LiftCommand.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.LiftCommand)
                    return object;
                let message = new $root.qyh.dataplane.LiftCommand();
                if (object.header != null) {
                    if (typeof object.header !== "object")
                        throw TypeError(".qyh.dataplane.LiftCommand.header: object expected");
                    message.header = $root.qyh.dataplane.Header.fromObject(object.header);
                }
                if (object.command != null)
                    message.command = String(object.command);
                if (object.targetHeight != null)
                    message.targetHeight = Number(object.targetHeight);
                if (object.speed != null)
                    message.speed = Number(object.speed);
                return message;
            };

            /**
             * Creates a plain object from a LiftCommand message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.LiftCommand
             * @static
             * @param {qyh.dataplane.LiftCommand} message LiftCommand
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LiftCommand.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.header = null;
                    object.command = "";
                    object.targetHeight = 0;
                    object.speed = 0;
                }
                if (message.header != null && message.hasOwnProperty("header"))
                    object.header = $root.qyh.dataplane.Header.toObject(message.header, options);
                if (message.command != null && message.hasOwnProperty("command"))
                    object.command = message.command;
                if (message.targetHeight != null && message.hasOwnProperty("targetHeight"))
                    object.targetHeight = options.json && !isFinite(message.targetHeight) ? String(message.targetHeight) : message.targetHeight;
                if (message.speed != null && message.hasOwnProperty("speed"))
                    object.speed = options.json && !isFinite(message.speed) ? String(message.speed) : message.speed;
                return object;
            };

            /**
             * Converts this LiftCommand to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.LiftCommand
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LiftCommand.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for LiftCommand
             * @function getTypeUrl
             * @memberof qyh.dataplane.LiftCommand
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            LiftCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.LiftCommand";
            };

            return LiftCommand;
        })();

        dataplane.WaistCommand = (function() {

            /**
             * Properties of a WaistCommand.
             * @memberof qyh.dataplane
             * @interface IWaistCommand
             * @property {qyh.dataplane.IHeader|null} [header] WaistCommand header
             * @property {string|null} [command] WaistCommand command
             * @property {number|null} [targetAngle] WaistCommand targetAngle
             * @property {number|null} [speed] WaistCommand speed
             */

            /**
             * Constructs a new WaistCommand.
             * @memberof qyh.dataplane
             * @classdesc Represents a WaistCommand.
             * @implements IWaistCommand
             * @constructor
             * @param {qyh.dataplane.IWaistCommand=} [properties] Properties to set
             */
            function WaistCommand(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * WaistCommand header.
             * @member {qyh.dataplane.IHeader|null|undefined} header
             * @memberof qyh.dataplane.WaistCommand
             * @instance
             */
            WaistCommand.prototype.header = null;

            /**
             * WaistCommand command.
             * @member {string} command
             * @memberof qyh.dataplane.WaistCommand
             * @instance
             */
            WaistCommand.prototype.command = "";

            /**
             * WaistCommand targetAngle.
             * @member {number} targetAngle
             * @memberof qyh.dataplane.WaistCommand
             * @instance
             */
            WaistCommand.prototype.targetAngle = 0;

            /**
             * WaistCommand speed.
             * @member {number} speed
             * @memberof qyh.dataplane.WaistCommand
             * @instance
             */
            WaistCommand.prototype.speed = 0;

            /**
             * Creates a new WaistCommand instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.WaistCommand
             * @static
             * @param {qyh.dataplane.IWaistCommand=} [properties] Properties to set
             * @returns {qyh.dataplane.WaistCommand} WaistCommand instance
             */
            WaistCommand.create = function create(properties) {
                return new WaistCommand(properties);
            };

            /**
             * Encodes the specified WaistCommand message. Does not implicitly {@link qyh.dataplane.WaistCommand.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.WaistCommand
             * @static
             * @param {qyh.dataplane.IWaistCommand} message WaistCommand message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            WaistCommand.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                    $root.qyh.dataplane.Header.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.command != null && Object.hasOwnProperty.call(message, "command"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.command);
                if (message.targetAngle != null && Object.hasOwnProperty.call(message, "targetAngle"))
                    writer.uint32(/* id 3, wireType 1 =*/25).double(message.targetAngle);
                if (message.speed != null && Object.hasOwnProperty.call(message, "speed"))
                    writer.uint32(/* id 4, wireType 1 =*/33).double(message.speed);
                return writer;
            };

            /**
             * Encodes the specified WaistCommand message, length delimited. Does not implicitly {@link qyh.dataplane.WaistCommand.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.WaistCommand
             * @static
             * @param {qyh.dataplane.IWaistCommand} message WaistCommand message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            WaistCommand.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a WaistCommand message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.WaistCommand
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.WaistCommand} WaistCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            WaistCommand.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.WaistCommand();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.header = $root.qyh.dataplane.Header.decode(reader, reader.uint32());
                            break;
                        }
                    case 2: {
                            message.command = reader.string();
                            break;
                        }
                    case 3: {
                            message.targetAngle = reader.double();
                            break;
                        }
                    case 4: {
                            message.speed = reader.double();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a WaistCommand message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.WaistCommand
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.WaistCommand} WaistCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            WaistCommand.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a WaistCommand message.
             * @function verify
             * @memberof qyh.dataplane.WaistCommand
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            WaistCommand.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.header != null && message.hasOwnProperty("header")) {
                    let error = $root.qyh.dataplane.Header.verify(message.header);
                    if (error)
                        return "header." + error;
                }
                if (message.command != null && message.hasOwnProperty("command"))
                    if (!$util.isString(message.command))
                        return "command: string expected";
                if (message.targetAngle != null && message.hasOwnProperty("targetAngle"))
                    if (typeof message.targetAngle !== "number")
                        return "targetAngle: number expected";
                if (message.speed != null && message.hasOwnProperty("speed"))
                    if (typeof message.speed !== "number")
                        return "speed: number expected";
                return null;
            };

            /**
             * Creates a WaistCommand message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.WaistCommand
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.WaistCommand} WaistCommand
             */
            WaistCommand.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.WaistCommand)
                    return object;
                let message = new $root.qyh.dataplane.WaistCommand();
                if (object.header != null) {
                    if (typeof object.header !== "object")
                        throw TypeError(".qyh.dataplane.WaistCommand.header: object expected");
                    message.header = $root.qyh.dataplane.Header.fromObject(object.header);
                }
                if (object.command != null)
                    message.command = String(object.command);
                if (object.targetAngle != null)
                    message.targetAngle = Number(object.targetAngle);
                if (object.speed != null)
                    message.speed = Number(object.speed);
                return message;
            };

            /**
             * Creates a plain object from a WaistCommand message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.WaistCommand
             * @static
             * @param {qyh.dataplane.WaistCommand} message WaistCommand
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            WaistCommand.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.header = null;
                    object.command = "";
                    object.targetAngle = 0;
                    object.speed = 0;
                }
                if (message.header != null && message.hasOwnProperty("header"))
                    object.header = $root.qyh.dataplane.Header.toObject(message.header, options);
                if (message.command != null && message.hasOwnProperty("command"))
                    object.command = message.command;
                if (message.targetAngle != null && message.hasOwnProperty("targetAngle"))
                    object.targetAngle = options.json && !isFinite(message.targetAngle) ? String(message.targetAngle) : message.targetAngle;
                if (message.speed != null && message.hasOwnProperty("speed"))
                    object.speed = options.json && !isFinite(message.speed) ? String(message.speed) : message.speed;
                return object;
            };

            /**
             * Converts this WaistCommand to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.WaistCommand
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            WaistCommand.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for WaistCommand
             * @function getTypeUrl
             * @memberof qyh.dataplane.WaistCommand
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            WaistCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.WaistCommand";
            };

            return WaistCommand;
        })();

        dataplane.HeadCommand = (function() {

            /**
             * Properties of a HeadCommand.
             * @memberof qyh.dataplane
             * @interface IHeadCommand
             * @property {qyh.dataplane.IHeader|null} [header] HeadCommand header
             * @property {string|null} [command] HeadCommand command
             * @property {number|null} [yaw] HeadCommand yaw
             * @property {number|null} [pitch] HeadCommand pitch
             * @property {string|null} [presetName] HeadCommand presetName
             * @property {number|null} [speed] HeadCommand speed
             */

            /**
             * Constructs a new HeadCommand.
             * @memberof qyh.dataplane
             * @classdesc Represents a HeadCommand.
             * @implements IHeadCommand
             * @constructor
             * @param {qyh.dataplane.IHeadCommand=} [properties] Properties to set
             */
            function HeadCommand(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * HeadCommand header.
             * @member {qyh.dataplane.IHeader|null|undefined} header
             * @memberof qyh.dataplane.HeadCommand
             * @instance
             */
            HeadCommand.prototype.header = null;

            /**
             * HeadCommand command.
             * @member {string} command
             * @memberof qyh.dataplane.HeadCommand
             * @instance
             */
            HeadCommand.prototype.command = "";

            /**
             * HeadCommand yaw.
             * @member {number} yaw
             * @memberof qyh.dataplane.HeadCommand
             * @instance
             */
            HeadCommand.prototype.yaw = 0;

            /**
             * HeadCommand pitch.
             * @member {number} pitch
             * @memberof qyh.dataplane.HeadCommand
             * @instance
             */
            HeadCommand.prototype.pitch = 0;

            /**
             * HeadCommand presetName.
             * @member {string} presetName
             * @memberof qyh.dataplane.HeadCommand
             * @instance
             */
            HeadCommand.prototype.presetName = "";

            /**
             * HeadCommand speed.
             * @member {number} speed
             * @memberof qyh.dataplane.HeadCommand
             * @instance
             */
            HeadCommand.prototype.speed = 0;

            /**
             * Creates a new HeadCommand instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.HeadCommand
             * @static
             * @param {qyh.dataplane.IHeadCommand=} [properties] Properties to set
             * @returns {qyh.dataplane.HeadCommand} HeadCommand instance
             */
            HeadCommand.create = function create(properties) {
                return new HeadCommand(properties);
            };

            /**
             * Encodes the specified HeadCommand message. Does not implicitly {@link qyh.dataplane.HeadCommand.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.HeadCommand
             * @static
             * @param {qyh.dataplane.IHeadCommand} message HeadCommand message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            HeadCommand.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                    $root.qyh.dataplane.Header.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.command != null && Object.hasOwnProperty.call(message, "command"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.command);
                if (message.yaw != null && Object.hasOwnProperty.call(message, "yaw"))
                    writer.uint32(/* id 3, wireType 1 =*/25).double(message.yaw);
                if (message.pitch != null && Object.hasOwnProperty.call(message, "pitch"))
                    writer.uint32(/* id 4, wireType 1 =*/33).double(message.pitch);
                if (message.presetName != null && Object.hasOwnProperty.call(message, "presetName"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.presetName);
                if (message.speed != null && Object.hasOwnProperty.call(message, "speed"))
                    writer.uint32(/* id 6, wireType 1 =*/49).double(message.speed);
                return writer;
            };

            /**
             * Encodes the specified HeadCommand message, length delimited. Does not implicitly {@link qyh.dataplane.HeadCommand.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.HeadCommand
             * @static
             * @param {qyh.dataplane.IHeadCommand} message HeadCommand message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            HeadCommand.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a HeadCommand message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.HeadCommand
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.HeadCommand} HeadCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            HeadCommand.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.HeadCommand();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.header = $root.qyh.dataplane.Header.decode(reader, reader.uint32());
                            break;
                        }
                    case 2: {
                            message.command = reader.string();
                            break;
                        }
                    case 3: {
                            message.yaw = reader.double();
                            break;
                        }
                    case 4: {
                            message.pitch = reader.double();
                            break;
                        }
                    case 5: {
                            message.presetName = reader.string();
                            break;
                        }
                    case 6: {
                            message.speed = reader.double();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a HeadCommand message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.HeadCommand
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.HeadCommand} HeadCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            HeadCommand.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a HeadCommand message.
             * @function verify
             * @memberof qyh.dataplane.HeadCommand
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            HeadCommand.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.header != null && message.hasOwnProperty("header")) {
                    let error = $root.qyh.dataplane.Header.verify(message.header);
                    if (error)
                        return "header." + error;
                }
                if (message.command != null && message.hasOwnProperty("command"))
                    if (!$util.isString(message.command))
                        return "command: string expected";
                if (message.yaw != null && message.hasOwnProperty("yaw"))
                    if (typeof message.yaw !== "number")
                        return "yaw: number expected";
                if (message.pitch != null && message.hasOwnProperty("pitch"))
                    if (typeof message.pitch !== "number")
                        return "pitch: number expected";
                if (message.presetName != null && message.hasOwnProperty("presetName"))
                    if (!$util.isString(message.presetName))
                        return "presetName: string expected";
                if (message.speed != null && message.hasOwnProperty("speed"))
                    if (typeof message.speed !== "number")
                        return "speed: number expected";
                return null;
            };

            /**
             * Creates a HeadCommand message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.HeadCommand
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.HeadCommand} HeadCommand
             */
            HeadCommand.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.HeadCommand)
                    return object;
                let message = new $root.qyh.dataplane.HeadCommand();
                if (object.header != null) {
                    if (typeof object.header !== "object")
                        throw TypeError(".qyh.dataplane.HeadCommand.header: object expected");
                    message.header = $root.qyh.dataplane.Header.fromObject(object.header);
                }
                if (object.command != null)
                    message.command = String(object.command);
                if (object.yaw != null)
                    message.yaw = Number(object.yaw);
                if (object.pitch != null)
                    message.pitch = Number(object.pitch);
                if (object.presetName != null)
                    message.presetName = String(object.presetName);
                if (object.speed != null)
                    message.speed = Number(object.speed);
                return message;
            };

            /**
             * Creates a plain object from a HeadCommand message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.HeadCommand
             * @static
             * @param {qyh.dataplane.HeadCommand} message HeadCommand
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            HeadCommand.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.header = null;
                    object.command = "";
                    object.yaw = 0;
                    object.pitch = 0;
                    object.presetName = "";
                    object.speed = 0;
                }
                if (message.header != null && message.hasOwnProperty("header"))
                    object.header = $root.qyh.dataplane.Header.toObject(message.header, options);
                if (message.command != null && message.hasOwnProperty("command"))
                    object.command = message.command;
                if (message.yaw != null && message.hasOwnProperty("yaw"))
                    object.yaw = options.json && !isFinite(message.yaw) ? String(message.yaw) : message.yaw;
                if (message.pitch != null && message.hasOwnProperty("pitch"))
                    object.pitch = options.json && !isFinite(message.pitch) ? String(message.pitch) : message.pitch;
                if (message.presetName != null && message.hasOwnProperty("presetName"))
                    object.presetName = message.presetName;
                if (message.speed != null && message.hasOwnProperty("speed"))
                    object.speed = options.json && !isFinite(message.speed) ? String(message.speed) : message.speed;
                return object;
            };

            /**
             * Converts this HeadCommand to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.HeadCommand
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            HeadCommand.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for HeadCommand
             * @function getTypeUrl
             * @memberof qyh.dataplane.HeadCommand
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            HeadCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.HeadCommand";
            };

            return HeadCommand;
        })();

        dataplane.ArmMoveCommand = (function() {

            /**
             * Properties of an ArmMoveCommand.
             * @memberof qyh.dataplane
             * @interface IArmMoveCommand
             * @property {qyh.dataplane.IHeader|null} [header] ArmMoveCommand header
             * @property {string|null} [armSide] ArmMoveCommand armSide
             * @property {string|null} [motionType] ArmMoveCommand motionType
             * @property {Array.<number>|null} [target] ArmMoveCommand target
             * @property {number|null} [speed] ArmMoveCommand speed
             * @property {number|null} [acceleration] ArmMoveCommand acceleration
             * @property {number|null} [blendRadius] ArmMoveCommand blendRadius
             */

            /**
             * Constructs a new ArmMoveCommand.
             * @memberof qyh.dataplane
             * @classdesc Represents an ArmMoveCommand.
             * @implements IArmMoveCommand
             * @constructor
             * @param {qyh.dataplane.IArmMoveCommand=} [properties] Properties to set
             */
            function ArmMoveCommand(properties) {
                this.target = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ArmMoveCommand header.
             * @member {qyh.dataplane.IHeader|null|undefined} header
             * @memberof qyh.dataplane.ArmMoveCommand
             * @instance
             */
            ArmMoveCommand.prototype.header = null;

            /**
             * ArmMoveCommand armSide.
             * @member {string} armSide
             * @memberof qyh.dataplane.ArmMoveCommand
             * @instance
             */
            ArmMoveCommand.prototype.armSide = "";

            /**
             * ArmMoveCommand motionType.
             * @member {string} motionType
             * @memberof qyh.dataplane.ArmMoveCommand
             * @instance
             */
            ArmMoveCommand.prototype.motionType = "";

            /**
             * ArmMoveCommand target.
             * @member {Array.<number>} target
             * @memberof qyh.dataplane.ArmMoveCommand
             * @instance
             */
            ArmMoveCommand.prototype.target = $util.emptyArray;

            /**
             * ArmMoveCommand speed.
             * @member {number} speed
             * @memberof qyh.dataplane.ArmMoveCommand
             * @instance
             */
            ArmMoveCommand.prototype.speed = 0;

            /**
             * ArmMoveCommand acceleration.
             * @member {number} acceleration
             * @memberof qyh.dataplane.ArmMoveCommand
             * @instance
             */
            ArmMoveCommand.prototype.acceleration = 0;

            /**
             * ArmMoveCommand blendRadius.
             * @member {number} blendRadius
             * @memberof qyh.dataplane.ArmMoveCommand
             * @instance
             */
            ArmMoveCommand.prototype.blendRadius = 0;

            /**
             * Creates a new ArmMoveCommand instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.ArmMoveCommand
             * @static
             * @param {qyh.dataplane.IArmMoveCommand=} [properties] Properties to set
             * @returns {qyh.dataplane.ArmMoveCommand} ArmMoveCommand instance
             */
            ArmMoveCommand.create = function create(properties) {
                return new ArmMoveCommand(properties);
            };

            /**
             * Encodes the specified ArmMoveCommand message. Does not implicitly {@link qyh.dataplane.ArmMoveCommand.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.ArmMoveCommand
             * @static
             * @param {qyh.dataplane.IArmMoveCommand} message ArmMoveCommand message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ArmMoveCommand.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                    $root.qyh.dataplane.Header.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.armSide != null && Object.hasOwnProperty.call(message, "armSide"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.armSide);
                if (message.motionType != null && Object.hasOwnProperty.call(message, "motionType"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.motionType);
                if (message.target != null && message.target.length) {
                    writer.uint32(/* id 4, wireType 2 =*/34).fork();
                    for (let i = 0; i < message.target.length; ++i)
                        writer.double(message.target[i]);
                    writer.ldelim();
                }
                if (message.speed != null && Object.hasOwnProperty.call(message, "speed"))
                    writer.uint32(/* id 5, wireType 1 =*/41).double(message.speed);
                if (message.acceleration != null && Object.hasOwnProperty.call(message, "acceleration"))
                    writer.uint32(/* id 6, wireType 1 =*/49).double(message.acceleration);
                if (message.blendRadius != null && Object.hasOwnProperty.call(message, "blendRadius"))
                    writer.uint32(/* id 7, wireType 1 =*/57).double(message.blendRadius);
                return writer;
            };

            /**
             * Encodes the specified ArmMoveCommand message, length delimited. Does not implicitly {@link qyh.dataplane.ArmMoveCommand.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.ArmMoveCommand
             * @static
             * @param {qyh.dataplane.IArmMoveCommand} message ArmMoveCommand message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ArmMoveCommand.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an ArmMoveCommand message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.ArmMoveCommand
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.ArmMoveCommand} ArmMoveCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ArmMoveCommand.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.ArmMoveCommand();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.header = $root.qyh.dataplane.Header.decode(reader, reader.uint32());
                            break;
                        }
                    case 2: {
                            message.armSide = reader.string();
                            break;
                        }
                    case 3: {
                            message.motionType = reader.string();
                            break;
                        }
                    case 4: {
                            if (!(message.target && message.target.length))
                                message.target = [];
                            if ((tag & 7) === 2) {
                                let end2 = reader.uint32() + reader.pos;
                                while (reader.pos < end2)
                                    message.target.push(reader.double());
                            } else
                                message.target.push(reader.double());
                            break;
                        }
                    case 5: {
                            message.speed = reader.double();
                            break;
                        }
                    case 6: {
                            message.acceleration = reader.double();
                            break;
                        }
                    case 7: {
                            message.blendRadius = reader.double();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an ArmMoveCommand message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.ArmMoveCommand
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.ArmMoveCommand} ArmMoveCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ArmMoveCommand.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an ArmMoveCommand message.
             * @function verify
             * @memberof qyh.dataplane.ArmMoveCommand
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ArmMoveCommand.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.header != null && message.hasOwnProperty("header")) {
                    let error = $root.qyh.dataplane.Header.verify(message.header);
                    if (error)
                        return "header." + error;
                }
                if (message.armSide != null && message.hasOwnProperty("armSide"))
                    if (!$util.isString(message.armSide))
                        return "armSide: string expected";
                if (message.motionType != null && message.hasOwnProperty("motionType"))
                    if (!$util.isString(message.motionType))
                        return "motionType: string expected";
                if (message.target != null && message.hasOwnProperty("target")) {
                    if (!Array.isArray(message.target))
                        return "target: array expected";
                    for (let i = 0; i < message.target.length; ++i)
                        if (typeof message.target[i] !== "number")
                            return "target: number[] expected";
                }
                if (message.speed != null && message.hasOwnProperty("speed"))
                    if (typeof message.speed !== "number")
                        return "speed: number expected";
                if (message.acceleration != null && message.hasOwnProperty("acceleration"))
                    if (typeof message.acceleration !== "number")
                        return "acceleration: number expected";
                if (message.blendRadius != null && message.hasOwnProperty("blendRadius"))
                    if (typeof message.blendRadius !== "number")
                        return "blendRadius: number expected";
                return null;
            };

            /**
             * Creates an ArmMoveCommand message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.ArmMoveCommand
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.ArmMoveCommand} ArmMoveCommand
             */
            ArmMoveCommand.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.ArmMoveCommand)
                    return object;
                let message = new $root.qyh.dataplane.ArmMoveCommand();
                if (object.header != null) {
                    if (typeof object.header !== "object")
                        throw TypeError(".qyh.dataplane.ArmMoveCommand.header: object expected");
                    message.header = $root.qyh.dataplane.Header.fromObject(object.header);
                }
                if (object.armSide != null)
                    message.armSide = String(object.armSide);
                if (object.motionType != null)
                    message.motionType = String(object.motionType);
                if (object.target) {
                    if (!Array.isArray(object.target))
                        throw TypeError(".qyh.dataplane.ArmMoveCommand.target: array expected");
                    message.target = [];
                    for (let i = 0; i < object.target.length; ++i)
                        message.target[i] = Number(object.target[i]);
                }
                if (object.speed != null)
                    message.speed = Number(object.speed);
                if (object.acceleration != null)
                    message.acceleration = Number(object.acceleration);
                if (object.blendRadius != null)
                    message.blendRadius = Number(object.blendRadius);
                return message;
            };

            /**
             * Creates a plain object from an ArmMoveCommand message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.ArmMoveCommand
             * @static
             * @param {qyh.dataplane.ArmMoveCommand} message ArmMoveCommand
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ArmMoveCommand.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.target = [];
                if (options.defaults) {
                    object.header = null;
                    object.armSide = "";
                    object.motionType = "";
                    object.speed = 0;
                    object.acceleration = 0;
                    object.blendRadius = 0;
                }
                if (message.header != null && message.hasOwnProperty("header"))
                    object.header = $root.qyh.dataplane.Header.toObject(message.header, options);
                if (message.armSide != null && message.hasOwnProperty("armSide"))
                    object.armSide = message.armSide;
                if (message.motionType != null && message.hasOwnProperty("motionType"))
                    object.motionType = message.motionType;
                if (message.target && message.target.length) {
                    object.target = [];
                    for (let j = 0; j < message.target.length; ++j)
                        object.target[j] = options.json && !isFinite(message.target[j]) ? String(message.target[j]) : message.target[j];
                }
                if (message.speed != null && message.hasOwnProperty("speed"))
                    object.speed = options.json && !isFinite(message.speed) ? String(message.speed) : message.speed;
                if (message.acceleration != null && message.hasOwnProperty("acceleration"))
                    object.acceleration = options.json && !isFinite(message.acceleration) ? String(message.acceleration) : message.acceleration;
                if (message.blendRadius != null && message.hasOwnProperty("blendRadius"))
                    object.blendRadius = options.json && !isFinite(message.blendRadius) ? String(message.blendRadius) : message.blendRadius;
                return object;
            };

            /**
             * Converts this ArmMoveCommand to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.ArmMoveCommand
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ArmMoveCommand.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for ArmMoveCommand
             * @function getTypeUrl
             * @memberof qyh.dataplane.ArmMoveCommand
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ArmMoveCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.ArmMoveCommand";
            };

            return ArmMoveCommand;
        })();

        dataplane.ArmJogCommand = (function() {

            /**
             * Properties of an ArmJogCommand.
             * @memberof qyh.dataplane
             * @interface IArmJogCommand
             * @property {qyh.dataplane.IHeader|null} [header] ArmJogCommand header
             * @property {string|null} [armSide] ArmJogCommand armSide
             * @property {string|null} [jogMode] ArmJogCommand jogMode
             * @property {number|null} [axisIndex] ArmJogCommand axisIndex
             * @property {number|null} [direction] ArmJogCommand direction
             */

            /**
             * Constructs a new ArmJogCommand.
             * @memberof qyh.dataplane
             * @classdesc Represents an ArmJogCommand.
             * @implements IArmJogCommand
             * @constructor
             * @param {qyh.dataplane.IArmJogCommand=} [properties] Properties to set
             */
            function ArmJogCommand(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ArmJogCommand header.
             * @member {qyh.dataplane.IHeader|null|undefined} header
             * @memberof qyh.dataplane.ArmJogCommand
             * @instance
             */
            ArmJogCommand.prototype.header = null;

            /**
             * ArmJogCommand armSide.
             * @member {string} armSide
             * @memberof qyh.dataplane.ArmJogCommand
             * @instance
             */
            ArmJogCommand.prototype.armSide = "";

            /**
             * ArmJogCommand jogMode.
             * @member {string} jogMode
             * @memberof qyh.dataplane.ArmJogCommand
             * @instance
             */
            ArmJogCommand.prototype.jogMode = "";

            /**
             * ArmJogCommand axisIndex.
             * @member {number} axisIndex
             * @memberof qyh.dataplane.ArmJogCommand
             * @instance
             */
            ArmJogCommand.prototype.axisIndex = 0;

            /**
             * ArmJogCommand direction.
             * @member {number} direction
             * @memberof qyh.dataplane.ArmJogCommand
             * @instance
             */
            ArmJogCommand.prototype.direction = 0;

            /**
             * Creates a new ArmJogCommand instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.ArmJogCommand
             * @static
             * @param {qyh.dataplane.IArmJogCommand=} [properties] Properties to set
             * @returns {qyh.dataplane.ArmJogCommand} ArmJogCommand instance
             */
            ArmJogCommand.create = function create(properties) {
                return new ArmJogCommand(properties);
            };

            /**
             * Encodes the specified ArmJogCommand message. Does not implicitly {@link qyh.dataplane.ArmJogCommand.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.ArmJogCommand
             * @static
             * @param {qyh.dataplane.IArmJogCommand} message ArmJogCommand message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ArmJogCommand.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                    $root.qyh.dataplane.Header.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.armSide != null && Object.hasOwnProperty.call(message, "armSide"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.armSide);
                if (message.jogMode != null && Object.hasOwnProperty.call(message, "jogMode"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.jogMode);
                if (message.axisIndex != null && Object.hasOwnProperty.call(message, "axisIndex"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.axisIndex);
                if (message.direction != null && Object.hasOwnProperty.call(message, "direction"))
                    writer.uint32(/* id 5, wireType 1 =*/41).double(message.direction);
                return writer;
            };

            /**
             * Encodes the specified ArmJogCommand message, length delimited. Does not implicitly {@link qyh.dataplane.ArmJogCommand.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.ArmJogCommand
             * @static
             * @param {qyh.dataplane.IArmJogCommand} message ArmJogCommand message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ArmJogCommand.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an ArmJogCommand message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.ArmJogCommand
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.ArmJogCommand} ArmJogCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ArmJogCommand.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.ArmJogCommand();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.header = $root.qyh.dataplane.Header.decode(reader, reader.uint32());
                            break;
                        }
                    case 2: {
                            message.armSide = reader.string();
                            break;
                        }
                    case 3: {
                            message.jogMode = reader.string();
                            break;
                        }
                    case 4: {
                            message.axisIndex = reader.int32();
                            break;
                        }
                    case 5: {
                            message.direction = reader.double();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an ArmJogCommand message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.ArmJogCommand
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.ArmJogCommand} ArmJogCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ArmJogCommand.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an ArmJogCommand message.
             * @function verify
             * @memberof qyh.dataplane.ArmJogCommand
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ArmJogCommand.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.header != null && message.hasOwnProperty("header")) {
                    let error = $root.qyh.dataplane.Header.verify(message.header);
                    if (error)
                        return "header." + error;
                }
                if (message.armSide != null && message.hasOwnProperty("armSide"))
                    if (!$util.isString(message.armSide))
                        return "armSide: string expected";
                if (message.jogMode != null && message.hasOwnProperty("jogMode"))
                    if (!$util.isString(message.jogMode))
                        return "jogMode: string expected";
                if (message.axisIndex != null && message.hasOwnProperty("axisIndex"))
                    if (!$util.isInteger(message.axisIndex))
                        return "axisIndex: integer expected";
                if (message.direction != null && message.hasOwnProperty("direction"))
                    if (typeof message.direction !== "number")
                        return "direction: number expected";
                return null;
            };

            /**
             * Creates an ArmJogCommand message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.ArmJogCommand
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.ArmJogCommand} ArmJogCommand
             */
            ArmJogCommand.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.ArmJogCommand)
                    return object;
                let message = new $root.qyh.dataplane.ArmJogCommand();
                if (object.header != null) {
                    if (typeof object.header !== "object")
                        throw TypeError(".qyh.dataplane.ArmJogCommand.header: object expected");
                    message.header = $root.qyh.dataplane.Header.fromObject(object.header);
                }
                if (object.armSide != null)
                    message.armSide = String(object.armSide);
                if (object.jogMode != null)
                    message.jogMode = String(object.jogMode);
                if (object.axisIndex != null)
                    message.axisIndex = object.axisIndex | 0;
                if (object.direction != null)
                    message.direction = Number(object.direction);
                return message;
            };

            /**
             * Creates a plain object from an ArmJogCommand message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.ArmJogCommand
             * @static
             * @param {qyh.dataplane.ArmJogCommand} message ArmJogCommand
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ArmJogCommand.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.header = null;
                    object.armSide = "";
                    object.jogMode = "";
                    object.axisIndex = 0;
                    object.direction = 0;
                }
                if (message.header != null && message.hasOwnProperty("header"))
                    object.header = $root.qyh.dataplane.Header.toObject(message.header, options);
                if (message.armSide != null && message.hasOwnProperty("armSide"))
                    object.armSide = message.armSide;
                if (message.jogMode != null && message.hasOwnProperty("jogMode"))
                    object.jogMode = message.jogMode;
                if (message.axisIndex != null && message.hasOwnProperty("axisIndex"))
                    object.axisIndex = message.axisIndex;
                if (message.direction != null && message.hasOwnProperty("direction"))
                    object.direction = options.json && !isFinite(message.direction) ? String(message.direction) : message.direction;
                return object;
            };

            /**
             * Converts this ArmJogCommand to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.ArmJogCommand
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ArmJogCommand.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for ArmJogCommand
             * @function getTypeUrl
             * @memberof qyh.dataplane.ArmJogCommand
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ArmJogCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.ArmJogCommand";
            };

            return ArmJogCommand;
        })();

        dataplane.JointCommand = (function() {

            /**
             * Properties of a JointCommand.
             * @memberof qyh.dataplane
             * @interface IJointCommand
             * @property {qyh.dataplane.IHeader|null} [header] JointCommand header
             * @property {Array.<string>|null} [names] JointCommand names
             * @property {Array.<number>|null} [positions] JointCommand positions
             * @property {Array.<number>|null} [velocities] JointCommand velocities
             */

            /**
             * Constructs a new JointCommand.
             * @memberof qyh.dataplane
             * @classdesc Represents a JointCommand.
             * @implements IJointCommand
             * @constructor
             * @param {qyh.dataplane.IJointCommand=} [properties] Properties to set
             */
            function JointCommand(properties) {
                this.names = [];
                this.positions = [];
                this.velocities = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * JointCommand header.
             * @member {qyh.dataplane.IHeader|null|undefined} header
             * @memberof qyh.dataplane.JointCommand
             * @instance
             */
            JointCommand.prototype.header = null;

            /**
             * JointCommand names.
             * @member {Array.<string>} names
             * @memberof qyh.dataplane.JointCommand
             * @instance
             */
            JointCommand.prototype.names = $util.emptyArray;

            /**
             * JointCommand positions.
             * @member {Array.<number>} positions
             * @memberof qyh.dataplane.JointCommand
             * @instance
             */
            JointCommand.prototype.positions = $util.emptyArray;

            /**
             * JointCommand velocities.
             * @member {Array.<number>} velocities
             * @memberof qyh.dataplane.JointCommand
             * @instance
             */
            JointCommand.prototype.velocities = $util.emptyArray;

            /**
             * Creates a new JointCommand instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.JointCommand
             * @static
             * @param {qyh.dataplane.IJointCommand=} [properties] Properties to set
             * @returns {qyh.dataplane.JointCommand} JointCommand instance
             */
            JointCommand.create = function create(properties) {
                return new JointCommand(properties);
            };

            /**
             * Encodes the specified JointCommand message. Does not implicitly {@link qyh.dataplane.JointCommand.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.JointCommand
             * @static
             * @param {qyh.dataplane.IJointCommand} message JointCommand message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            JointCommand.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                    $root.qyh.dataplane.Header.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.names != null && message.names.length)
                    for (let i = 0; i < message.names.length; ++i)
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.names[i]);
                if (message.positions != null && message.positions.length) {
                    writer.uint32(/* id 3, wireType 2 =*/26).fork();
                    for (let i = 0; i < message.positions.length; ++i)
                        writer.double(message.positions[i]);
                    writer.ldelim();
                }
                if (message.velocities != null && message.velocities.length) {
                    writer.uint32(/* id 4, wireType 2 =*/34).fork();
                    for (let i = 0; i < message.velocities.length; ++i)
                        writer.double(message.velocities[i]);
                    writer.ldelim();
                }
                return writer;
            };

            /**
             * Encodes the specified JointCommand message, length delimited. Does not implicitly {@link qyh.dataplane.JointCommand.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.JointCommand
             * @static
             * @param {qyh.dataplane.IJointCommand} message JointCommand message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            JointCommand.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a JointCommand message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.JointCommand
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.JointCommand} JointCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            JointCommand.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.JointCommand();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.header = $root.qyh.dataplane.Header.decode(reader, reader.uint32());
                            break;
                        }
                    case 2: {
                            if (!(message.names && message.names.length))
                                message.names = [];
                            message.names.push(reader.string());
                            break;
                        }
                    case 3: {
                            if (!(message.positions && message.positions.length))
                                message.positions = [];
                            if ((tag & 7) === 2) {
                                let end2 = reader.uint32() + reader.pos;
                                while (reader.pos < end2)
                                    message.positions.push(reader.double());
                            } else
                                message.positions.push(reader.double());
                            break;
                        }
                    case 4: {
                            if (!(message.velocities && message.velocities.length))
                                message.velocities = [];
                            if ((tag & 7) === 2) {
                                let end2 = reader.uint32() + reader.pos;
                                while (reader.pos < end2)
                                    message.velocities.push(reader.double());
                            } else
                                message.velocities.push(reader.double());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a JointCommand message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.JointCommand
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.JointCommand} JointCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            JointCommand.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a JointCommand message.
             * @function verify
             * @memberof qyh.dataplane.JointCommand
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            JointCommand.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.header != null && message.hasOwnProperty("header")) {
                    let error = $root.qyh.dataplane.Header.verify(message.header);
                    if (error)
                        return "header." + error;
                }
                if (message.names != null && message.hasOwnProperty("names")) {
                    if (!Array.isArray(message.names))
                        return "names: array expected";
                    for (let i = 0; i < message.names.length; ++i)
                        if (!$util.isString(message.names[i]))
                            return "names: string[] expected";
                }
                if (message.positions != null && message.hasOwnProperty("positions")) {
                    if (!Array.isArray(message.positions))
                        return "positions: array expected";
                    for (let i = 0; i < message.positions.length; ++i)
                        if (typeof message.positions[i] !== "number")
                            return "positions: number[] expected";
                }
                if (message.velocities != null && message.hasOwnProperty("velocities")) {
                    if (!Array.isArray(message.velocities))
                        return "velocities: array expected";
                    for (let i = 0; i < message.velocities.length; ++i)
                        if (typeof message.velocities[i] !== "number")
                            return "velocities: number[] expected";
                }
                return null;
            };

            /**
             * Creates a JointCommand message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.JointCommand
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.JointCommand} JointCommand
             */
            JointCommand.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.JointCommand)
                    return object;
                let message = new $root.qyh.dataplane.JointCommand();
                if (object.header != null) {
                    if (typeof object.header !== "object")
                        throw TypeError(".qyh.dataplane.JointCommand.header: object expected");
                    message.header = $root.qyh.dataplane.Header.fromObject(object.header);
                }
                if (object.names) {
                    if (!Array.isArray(object.names))
                        throw TypeError(".qyh.dataplane.JointCommand.names: array expected");
                    message.names = [];
                    for (let i = 0; i < object.names.length; ++i)
                        message.names[i] = String(object.names[i]);
                }
                if (object.positions) {
                    if (!Array.isArray(object.positions))
                        throw TypeError(".qyh.dataplane.JointCommand.positions: array expected");
                    message.positions = [];
                    for (let i = 0; i < object.positions.length; ++i)
                        message.positions[i] = Number(object.positions[i]);
                }
                if (object.velocities) {
                    if (!Array.isArray(object.velocities))
                        throw TypeError(".qyh.dataplane.JointCommand.velocities: array expected");
                    message.velocities = [];
                    for (let i = 0; i < object.velocities.length; ++i)
                        message.velocities[i] = Number(object.velocities[i]);
                }
                return message;
            };

            /**
             * Creates a plain object from a JointCommand message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.JointCommand
             * @static
             * @param {qyh.dataplane.JointCommand} message JointCommand
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            JointCommand.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults) {
                    object.names = [];
                    object.positions = [];
                    object.velocities = [];
                }
                if (options.defaults)
                    object.header = null;
                if (message.header != null && message.hasOwnProperty("header"))
                    object.header = $root.qyh.dataplane.Header.toObject(message.header, options);
                if (message.names && message.names.length) {
                    object.names = [];
                    for (let j = 0; j < message.names.length; ++j)
                        object.names[j] = message.names[j];
                }
                if (message.positions && message.positions.length) {
                    object.positions = [];
                    for (let j = 0; j < message.positions.length; ++j)
                        object.positions[j] = options.json && !isFinite(message.positions[j]) ? String(message.positions[j]) : message.positions[j];
                }
                if (message.velocities && message.velocities.length) {
                    object.velocities = [];
                    for (let j = 0; j < message.velocities.length; ++j)
                        object.velocities[j] = options.json && !isFinite(message.velocities[j]) ? String(message.velocities[j]) : message.velocities[j];
                }
                return object;
            };

            /**
             * Converts this JointCommand to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.JointCommand
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            JointCommand.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for JointCommand
             * @function getTypeUrl
             * @memberof qyh.dataplane.JointCommand
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            JointCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.JointCommand";
            };

            return JointCommand;
        })();

        dataplane.EndEffectorCommand = (function() {

            /**
             * Properties of an EndEffectorCommand.
             * @memberof qyh.dataplane
             * @interface IEndEffectorCommand
             * @property {qyh.dataplane.IHeader|null} [header] EndEffectorCommand header
             * @property {string|null} [armSide] EndEffectorCommand armSide
             * @property {qyh.dataplane.IPose|null} [targetPose] EndEffectorCommand targetPose
             * @property {number|null} [speedFactor] EndEffectorCommand speedFactor
             */

            /**
             * Constructs a new EndEffectorCommand.
             * @memberof qyh.dataplane
             * @classdesc Represents an EndEffectorCommand.
             * @implements IEndEffectorCommand
             * @constructor
             * @param {qyh.dataplane.IEndEffectorCommand=} [properties] Properties to set
             */
            function EndEffectorCommand(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * EndEffectorCommand header.
             * @member {qyh.dataplane.IHeader|null|undefined} header
             * @memberof qyh.dataplane.EndEffectorCommand
             * @instance
             */
            EndEffectorCommand.prototype.header = null;

            /**
             * EndEffectorCommand armSide.
             * @member {string} armSide
             * @memberof qyh.dataplane.EndEffectorCommand
             * @instance
             */
            EndEffectorCommand.prototype.armSide = "";

            /**
             * EndEffectorCommand targetPose.
             * @member {qyh.dataplane.IPose|null|undefined} targetPose
             * @memberof qyh.dataplane.EndEffectorCommand
             * @instance
             */
            EndEffectorCommand.prototype.targetPose = null;

            /**
             * EndEffectorCommand speedFactor.
             * @member {number} speedFactor
             * @memberof qyh.dataplane.EndEffectorCommand
             * @instance
             */
            EndEffectorCommand.prototype.speedFactor = 0;

            /**
             * Creates a new EndEffectorCommand instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.EndEffectorCommand
             * @static
             * @param {qyh.dataplane.IEndEffectorCommand=} [properties] Properties to set
             * @returns {qyh.dataplane.EndEffectorCommand} EndEffectorCommand instance
             */
            EndEffectorCommand.create = function create(properties) {
                return new EndEffectorCommand(properties);
            };

            /**
             * Encodes the specified EndEffectorCommand message. Does not implicitly {@link qyh.dataplane.EndEffectorCommand.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.EndEffectorCommand
             * @static
             * @param {qyh.dataplane.IEndEffectorCommand} message EndEffectorCommand message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            EndEffectorCommand.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                    $root.qyh.dataplane.Header.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.armSide != null && Object.hasOwnProperty.call(message, "armSide"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.armSide);
                if (message.targetPose != null && Object.hasOwnProperty.call(message, "targetPose"))
                    $root.qyh.dataplane.Pose.encode(message.targetPose, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.speedFactor != null && Object.hasOwnProperty.call(message, "speedFactor"))
                    writer.uint32(/* id 4, wireType 1 =*/33).double(message.speedFactor);
                return writer;
            };

            /**
             * Encodes the specified EndEffectorCommand message, length delimited. Does not implicitly {@link qyh.dataplane.EndEffectorCommand.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.EndEffectorCommand
             * @static
             * @param {qyh.dataplane.IEndEffectorCommand} message EndEffectorCommand message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            EndEffectorCommand.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an EndEffectorCommand message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.EndEffectorCommand
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.EndEffectorCommand} EndEffectorCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            EndEffectorCommand.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.EndEffectorCommand();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.header = $root.qyh.dataplane.Header.decode(reader, reader.uint32());
                            break;
                        }
                    case 2: {
                            message.armSide = reader.string();
                            break;
                        }
                    case 3: {
                            message.targetPose = $root.qyh.dataplane.Pose.decode(reader, reader.uint32());
                            break;
                        }
                    case 4: {
                            message.speedFactor = reader.double();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an EndEffectorCommand message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.EndEffectorCommand
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.EndEffectorCommand} EndEffectorCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            EndEffectorCommand.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an EndEffectorCommand message.
             * @function verify
             * @memberof qyh.dataplane.EndEffectorCommand
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            EndEffectorCommand.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.header != null && message.hasOwnProperty("header")) {
                    let error = $root.qyh.dataplane.Header.verify(message.header);
                    if (error)
                        return "header." + error;
                }
                if (message.armSide != null && message.hasOwnProperty("armSide"))
                    if (!$util.isString(message.armSide))
                        return "armSide: string expected";
                if (message.targetPose != null && message.hasOwnProperty("targetPose")) {
                    let error = $root.qyh.dataplane.Pose.verify(message.targetPose);
                    if (error)
                        return "targetPose." + error;
                }
                if (message.speedFactor != null && message.hasOwnProperty("speedFactor"))
                    if (typeof message.speedFactor !== "number")
                        return "speedFactor: number expected";
                return null;
            };

            /**
             * Creates an EndEffectorCommand message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.EndEffectorCommand
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.EndEffectorCommand} EndEffectorCommand
             */
            EndEffectorCommand.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.EndEffectorCommand)
                    return object;
                let message = new $root.qyh.dataplane.EndEffectorCommand();
                if (object.header != null) {
                    if (typeof object.header !== "object")
                        throw TypeError(".qyh.dataplane.EndEffectorCommand.header: object expected");
                    message.header = $root.qyh.dataplane.Header.fromObject(object.header);
                }
                if (object.armSide != null)
                    message.armSide = String(object.armSide);
                if (object.targetPose != null) {
                    if (typeof object.targetPose !== "object")
                        throw TypeError(".qyh.dataplane.EndEffectorCommand.targetPose: object expected");
                    message.targetPose = $root.qyh.dataplane.Pose.fromObject(object.targetPose);
                }
                if (object.speedFactor != null)
                    message.speedFactor = Number(object.speedFactor);
                return message;
            };

            /**
             * Creates a plain object from an EndEffectorCommand message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.EndEffectorCommand
             * @static
             * @param {qyh.dataplane.EndEffectorCommand} message EndEffectorCommand
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            EndEffectorCommand.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.header = null;
                    object.armSide = "";
                    object.targetPose = null;
                    object.speedFactor = 0;
                }
                if (message.header != null && message.hasOwnProperty("header"))
                    object.header = $root.qyh.dataplane.Header.toObject(message.header, options);
                if (message.armSide != null && message.hasOwnProperty("armSide"))
                    object.armSide = message.armSide;
                if (message.targetPose != null && message.hasOwnProperty("targetPose"))
                    object.targetPose = $root.qyh.dataplane.Pose.toObject(message.targetPose, options);
                if (message.speedFactor != null && message.hasOwnProperty("speedFactor"))
                    object.speedFactor = options.json && !isFinite(message.speedFactor) ? String(message.speedFactor) : message.speedFactor;
                return object;
            };

            /**
             * Converts this EndEffectorCommand to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.EndEffectorCommand
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            EndEffectorCommand.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for EndEffectorCommand
             * @function getTypeUrl
             * @memberof qyh.dataplane.EndEffectorCommand
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            EndEffectorCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.EndEffectorCommand";
            };

            return EndEffectorCommand;
        })();

        dataplane.GripperCommand = (function() {

            /**
             * Properties of a GripperCommand.
             * @memberof qyh.dataplane
             * @interface IGripperCommand
             * @property {qyh.dataplane.IHeader|null} [header] GripperCommand header
             * @property {string|null} [gripperId] GripperCommand gripperId
             * @property {number|null} [position] GripperCommand position
             * @property {number|null} [force] GripperCommand force
             */

            /**
             * Constructs a new GripperCommand.
             * @memberof qyh.dataplane
             * @classdesc Represents a GripperCommand.
             * @implements IGripperCommand
             * @constructor
             * @param {qyh.dataplane.IGripperCommand=} [properties] Properties to set
             */
            function GripperCommand(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GripperCommand header.
             * @member {qyh.dataplane.IHeader|null|undefined} header
             * @memberof qyh.dataplane.GripperCommand
             * @instance
             */
            GripperCommand.prototype.header = null;

            /**
             * GripperCommand gripperId.
             * @member {string} gripperId
             * @memberof qyh.dataplane.GripperCommand
             * @instance
             */
            GripperCommand.prototype.gripperId = "";

            /**
             * GripperCommand position.
             * @member {number} position
             * @memberof qyh.dataplane.GripperCommand
             * @instance
             */
            GripperCommand.prototype.position = 0;

            /**
             * GripperCommand force.
             * @member {number} force
             * @memberof qyh.dataplane.GripperCommand
             * @instance
             */
            GripperCommand.prototype.force = 0;

            /**
             * Creates a new GripperCommand instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.GripperCommand
             * @static
             * @param {qyh.dataplane.IGripperCommand=} [properties] Properties to set
             * @returns {qyh.dataplane.GripperCommand} GripperCommand instance
             */
            GripperCommand.create = function create(properties) {
                return new GripperCommand(properties);
            };

            /**
             * Encodes the specified GripperCommand message. Does not implicitly {@link qyh.dataplane.GripperCommand.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.GripperCommand
             * @static
             * @param {qyh.dataplane.IGripperCommand} message GripperCommand message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GripperCommand.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                    $root.qyh.dataplane.Header.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.gripperId != null && Object.hasOwnProperty.call(message, "gripperId"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.gripperId);
                if (message.position != null && Object.hasOwnProperty.call(message, "position"))
                    writer.uint32(/* id 3, wireType 1 =*/25).double(message.position);
                if (message.force != null && Object.hasOwnProperty.call(message, "force"))
                    writer.uint32(/* id 4, wireType 1 =*/33).double(message.force);
                return writer;
            };

            /**
             * Encodes the specified GripperCommand message, length delimited. Does not implicitly {@link qyh.dataplane.GripperCommand.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.GripperCommand
             * @static
             * @param {qyh.dataplane.IGripperCommand} message GripperCommand message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GripperCommand.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GripperCommand message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.GripperCommand
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.GripperCommand} GripperCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GripperCommand.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.GripperCommand();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.header = $root.qyh.dataplane.Header.decode(reader, reader.uint32());
                            break;
                        }
                    case 2: {
                            message.gripperId = reader.string();
                            break;
                        }
                    case 3: {
                            message.position = reader.double();
                            break;
                        }
                    case 4: {
                            message.force = reader.double();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GripperCommand message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.GripperCommand
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.GripperCommand} GripperCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GripperCommand.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GripperCommand message.
             * @function verify
             * @memberof qyh.dataplane.GripperCommand
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GripperCommand.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.header != null && message.hasOwnProperty("header")) {
                    let error = $root.qyh.dataplane.Header.verify(message.header);
                    if (error)
                        return "header." + error;
                }
                if (message.gripperId != null && message.hasOwnProperty("gripperId"))
                    if (!$util.isString(message.gripperId))
                        return "gripperId: string expected";
                if (message.position != null && message.hasOwnProperty("position"))
                    if (typeof message.position !== "number")
                        return "position: number expected";
                if (message.force != null && message.hasOwnProperty("force"))
                    if (typeof message.force !== "number")
                        return "force: number expected";
                return null;
            };

            /**
             * Creates a GripperCommand message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.GripperCommand
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.GripperCommand} GripperCommand
             */
            GripperCommand.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.GripperCommand)
                    return object;
                let message = new $root.qyh.dataplane.GripperCommand();
                if (object.header != null) {
                    if (typeof object.header !== "object")
                        throw TypeError(".qyh.dataplane.GripperCommand.header: object expected");
                    message.header = $root.qyh.dataplane.Header.fromObject(object.header);
                }
                if (object.gripperId != null)
                    message.gripperId = String(object.gripperId);
                if (object.position != null)
                    message.position = Number(object.position);
                if (object.force != null)
                    message.force = Number(object.force);
                return message;
            };

            /**
             * Creates a plain object from a GripperCommand message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.GripperCommand
             * @static
             * @param {qyh.dataplane.GripperCommand} message GripperCommand
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GripperCommand.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.header = null;
                    object.gripperId = "";
                    object.position = 0;
                    object.force = 0;
                }
                if (message.header != null && message.hasOwnProperty("header"))
                    object.header = $root.qyh.dataplane.Header.toObject(message.header, options);
                if (message.gripperId != null && message.hasOwnProperty("gripperId"))
                    object.gripperId = message.gripperId;
                if (message.position != null && message.hasOwnProperty("position"))
                    object.position = options.json && !isFinite(message.position) ? String(message.position) : message.position;
                if (message.force != null && message.hasOwnProperty("force"))
                    object.force = options.json && !isFinite(message.force) ? String(message.force) : message.force;
                return object;
            };

            /**
             * Converts this GripperCommand to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.GripperCommand
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GripperCommand.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for GripperCommand
             * @function getTypeUrl
             * @memberof qyh.dataplane.GripperCommand
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            GripperCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.GripperCommand";
            };

            return GripperCommand;
        })();

        dataplane.Heartbeat = (function() {

            /**
             * Properties of a Heartbeat.
             * @memberof qyh.dataplane
             * @interface IHeartbeat
             * @property {qyh.dataplane.IHeader|null} [header] Heartbeat header
             * @property {string|null} [sessionId] Heartbeat sessionId
             * @property {qyh.dataplane.ControlType|null} [controlType] Heartbeat controlType
             */

            /**
             * Constructs a new Heartbeat.
             * @memberof qyh.dataplane
             * @classdesc Represents a Heartbeat.
             * @implements IHeartbeat
             * @constructor
             * @param {qyh.dataplane.IHeartbeat=} [properties] Properties to set
             */
            function Heartbeat(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Heartbeat header.
             * @member {qyh.dataplane.IHeader|null|undefined} header
             * @memberof qyh.dataplane.Heartbeat
             * @instance
             */
            Heartbeat.prototype.header = null;

            /**
             * Heartbeat sessionId.
             * @member {string} sessionId
             * @memberof qyh.dataplane.Heartbeat
             * @instance
             */
            Heartbeat.prototype.sessionId = "";

            /**
             * Heartbeat controlType.
             * @member {qyh.dataplane.ControlType} controlType
             * @memberof qyh.dataplane.Heartbeat
             * @instance
             */
            Heartbeat.prototype.controlType = 0;

            /**
             * Creates a new Heartbeat instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.Heartbeat
             * @static
             * @param {qyh.dataplane.IHeartbeat=} [properties] Properties to set
             * @returns {qyh.dataplane.Heartbeat} Heartbeat instance
             */
            Heartbeat.create = function create(properties) {
                return new Heartbeat(properties);
            };

            /**
             * Encodes the specified Heartbeat message. Does not implicitly {@link qyh.dataplane.Heartbeat.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.Heartbeat
             * @static
             * @param {qyh.dataplane.IHeartbeat} message Heartbeat message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Heartbeat.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                    $root.qyh.dataplane.Header.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.sessionId != null && Object.hasOwnProperty.call(message, "sessionId"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.sessionId);
                if (message.controlType != null && Object.hasOwnProperty.call(message, "controlType"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.controlType);
                return writer;
            };

            /**
             * Encodes the specified Heartbeat message, length delimited. Does not implicitly {@link qyh.dataplane.Heartbeat.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.Heartbeat
             * @static
             * @param {qyh.dataplane.IHeartbeat} message Heartbeat message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Heartbeat.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Heartbeat message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.Heartbeat
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.Heartbeat} Heartbeat
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Heartbeat.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.Heartbeat();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.header = $root.qyh.dataplane.Header.decode(reader, reader.uint32());
                            break;
                        }
                    case 2: {
                            message.sessionId = reader.string();
                            break;
                        }
                    case 3: {
                            message.controlType = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Heartbeat message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.Heartbeat
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.Heartbeat} Heartbeat
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Heartbeat.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Heartbeat message.
             * @function verify
             * @memberof qyh.dataplane.Heartbeat
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Heartbeat.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.header != null && message.hasOwnProperty("header")) {
                    let error = $root.qyh.dataplane.Header.verify(message.header);
                    if (error)
                        return "header." + error;
                }
                if (message.sessionId != null && message.hasOwnProperty("sessionId"))
                    if (!$util.isString(message.sessionId))
                        return "sessionId: string expected";
                if (message.controlType != null && message.hasOwnProperty("controlType"))
                    switch (message.controlType) {
                    default:
                        return "controlType: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                        break;
                    }
                return null;
            };

            /**
             * Creates a Heartbeat message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.Heartbeat
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.Heartbeat} Heartbeat
             */
            Heartbeat.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.Heartbeat)
                    return object;
                let message = new $root.qyh.dataplane.Heartbeat();
                if (object.header != null) {
                    if (typeof object.header !== "object")
                        throw TypeError(".qyh.dataplane.Heartbeat.header: object expected");
                    message.header = $root.qyh.dataplane.Header.fromObject(object.header);
                }
                if (object.sessionId != null)
                    message.sessionId = String(object.sessionId);
                switch (object.controlType) {
                default:
                    if (typeof object.controlType === "number") {
                        message.controlType = object.controlType;
                        break;
                    }
                    break;
                case "CONTROL_NONE":
                case 0:
                    message.controlType = 0;
                    break;
                case "CONTROL_VR_TELEOP":
                case 1:
                    message.controlType = 1;
                    break;
                case "CONTROL_GAMEPAD":
                case 2:
                    message.controlType = 2;
                    break;
                case "CONTROL_KEYBOARD":
                case 3:
                    message.controlType = 3;
                    break;
                case "CONTROL_AUTO":
                case 4:
                    message.controlType = 4;
                    break;
                }
                return message;
            };

            /**
             * Creates a plain object from a Heartbeat message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.Heartbeat
             * @static
             * @param {qyh.dataplane.Heartbeat} message Heartbeat
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Heartbeat.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.header = null;
                    object.sessionId = "";
                    object.controlType = options.enums === String ? "CONTROL_NONE" : 0;
                }
                if (message.header != null && message.hasOwnProperty("header"))
                    object.header = $root.qyh.dataplane.Header.toObject(message.header, options);
                if (message.sessionId != null && message.hasOwnProperty("sessionId"))
                    object.sessionId = message.sessionId;
                if (message.controlType != null && message.hasOwnProperty("controlType"))
                    object.controlType = options.enums === String ? $root.qyh.dataplane.ControlType[message.controlType] === undefined ? message.controlType : $root.qyh.dataplane.ControlType[message.controlType] : message.controlType;
                return object;
            };

            /**
             * Converts this Heartbeat to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.Heartbeat
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Heartbeat.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Heartbeat
             * @function getTypeUrl
             * @memberof qyh.dataplane.Heartbeat
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Heartbeat.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.Heartbeat";
            };

            return Heartbeat;
        })();

        dataplane.SubscribeRequest = (function() {

            /**
             * Properties of a SubscribeRequest.
             * @memberof qyh.dataplane
             * @interface ISubscribeRequest
             * @property {qyh.dataplane.IHeader|null} [header] SubscribeRequest header
             * @property {Array.<string>|null} [topics] SubscribeRequest topics
             * @property {number|null} [maxRateHz] SubscribeRequest maxRateHz
             */

            /**
             * Constructs a new SubscribeRequest.
             * @memberof qyh.dataplane
             * @classdesc Represents a SubscribeRequest.
             * @implements ISubscribeRequest
             * @constructor
             * @param {qyh.dataplane.ISubscribeRequest=} [properties] Properties to set
             */
            function SubscribeRequest(properties) {
                this.topics = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * SubscribeRequest header.
             * @member {qyh.dataplane.IHeader|null|undefined} header
             * @memberof qyh.dataplane.SubscribeRequest
             * @instance
             */
            SubscribeRequest.prototype.header = null;

            /**
             * SubscribeRequest topics.
             * @member {Array.<string>} topics
             * @memberof qyh.dataplane.SubscribeRequest
             * @instance
             */
            SubscribeRequest.prototype.topics = $util.emptyArray;

            /**
             * SubscribeRequest maxRateHz.
             * @member {number} maxRateHz
             * @memberof qyh.dataplane.SubscribeRequest
             * @instance
             */
            SubscribeRequest.prototype.maxRateHz = 0;

            /**
             * Creates a new SubscribeRequest instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.SubscribeRequest
             * @static
             * @param {qyh.dataplane.ISubscribeRequest=} [properties] Properties to set
             * @returns {qyh.dataplane.SubscribeRequest} SubscribeRequest instance
             */
            SubscribeRequest.create = function create(properties) {
                return new SubscribeRequest(properties);
            };

            /**
             * Encodes the specified SubscribeRequest message. Does not implicitly {@link qyh.dataplane.SubscribeRequest.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.SubscribeRequest
             * @static
             * @param {qyh.dataplane.ISubscribeRequest} message SubscribeRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SubscribeRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                    $root.qyh.dataplane.Header.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.topics != null && message.topics.length)
                    for (let i = 0; i < message.topics.length; ++i)
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.topics[i]);
                if (message.maxRateHz != null && Object.hasOwnProperty.call(message, "maxRateHz"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.maxRateHz);
                return writer;
            };

            /**
             * Encodes the specified SubscribeRequest message, length delimited. Does not implicitly {@link qyh.dataplane.SubscribeRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.SubscribeRequest
             * @static
             * @param {qyh.dataplane.ISubscribeRequest} message SubscribeRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SubscribeRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a SubscribeRequest message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.SubscribeRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.SubscribeRequest} SubscribeRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SubscribeRequest.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.SubscribeRequest();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.header = $root.qyh.dataplane.Header.decode(reader, reader.uint32());
                            break;
                        }
                    case 2: {
                            if (!(message.topics && message.topics.length))
                                message.topics = [];
                            message.topics.push(reader.string());
                            break;
                        }
                    case 3: {
                            message.maxRateHz = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a SubscribeRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.SubscribeRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.SubscribeRequest} SubscribeRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SubscribeRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a SubscribeRequest message.
             * @function verify
             * @memberof qyh.dataplane.SubscribeRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SubscribeRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.header != null && message.hasOwnProperty("header")) {
                    let error = $root.qyh.dataplane.Header.verify(message.header);
                    if (error)
                        return "header." + error;
                }
                if (message.topics != null && message.hasOwnProperty("topics")) {
                    if (!Array.isArray(message.topics))
                        return "topics: array expected";
                    for (let i = 0; i < message.topics.length; ++i)
                        if (!$util.isString(message.topics[i]))
                            return "topics: string[] expected";
                }
                if (message.maxRateHz != null && message.hasOwnProperty("maxRateHz"))
                    if (!$util.isInteger(message.maxRateHz))
                        return "maxRateHz: integer expected";
                return null;
            };

            /**
             * Creates a SubscribeRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.SubscribeRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.SubscribeRequest} SubscribeRequest
             */
            SubscribeRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.SubscribeRequest)
                    return object;
                let message = new $root.qyh.dataplane.SubscribeRequest();
                if (object.header != null) {
                    if (typeof object.header !== "object")
                        throw TypeError(".qyh.dataplane.SubscribeRequest.header: object expected");
                    message.header = $root.qyh.dataplane.Header.fromObject(object.header);
                }
                if (object.topics) {
                    if (!Array.isArray(object.topics))
                        throw TypeError(".qyh.dataplane.SubscribeRequest.topics: array expected");
                    message.topics = [];
                    for (let i = 0; i < object.topics.length; ++i)
                        message.topics[i] = String(object.topics[i]);
                }
                if (object.maxRateHz != null)
                    message.maxRateHz = object.maxRateHz | 0;
                return message;
            };

            /**
             * Creates a plain object from a SubscribeRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.SubscribeRequest
             * @static
             * @param {qyh.dataplane.SubscribeRequest} message SubscribeRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SubscribeRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.topics = [];
                if (options.defaults) {
                    object.header = null;
                    object.maxRateHz = 0;
                }
                if (message.header != null && message.hasOwnProperty("header"))
                    object.header = $root.qyh.dataplane.Header.toObject(message.header, options);
                if (message.topics && message.topics.length) {
                    object.topics = [];
                    for (let j = 0; j < message.topics.length; ++j)
                        object.topics[j] = message.topics[j];
                }
                if (message.maxRateHz != null && message.hasOwnProperty("maxRateHz"))
                    object.maxRateHz = message.maxRateHz;
                return object;
            };

            /**
             * Converts this SubscribeRequest to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.SubscribeRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SubscribeRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for SubscribeRequest
             * @function getTypeUrl
             * @memberof qyh.dataplane.SubscribeRequest
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            SubscribeRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.SubscribeRequest";
            };

            return SubscribeRequest;
        })();

        dataplane.UnsubscribeRequest = (function() {

            /**
             * Properties of an UnsubscribeRequest.
             * @memberof qyh.dataplane
             * @interface IUnsubscribeRequest
             * @property {qyh.dataplane.IHeader|null} [header] UnsubscribeRequest header
             * @property {Array.<string>|null} [topics] UnsubscribeRequest topics
             */

            /**
             * Constructs a new UnsubscribeRequest.
             * @memberof qyh.dataplane
             * @classdesc Represents an UnsubscribeRequest.
             * @implements IUnsubscribeRequest
             * @constructor
             * @param {qyh.dataplane.IUnsubscribeRequest=} [properties] Properties to set
             */
            function UnsubscribeRequest(properties) {
                this.topics = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * UnsubscribeRequest header.
             * @member {qyh.dataplane.IHeader|null|undefined} header
             * @memberof qyh.dataplane.UnsubscribeRequest
             * @instance
             */
            UnsubscribeRequest.prototype.header = null;

            /**
             * UnsubscribeRequest topics.
             * @member {Array.<string>} topics
             * @memberof qyh.dataplane.UnsubscribeRequest
             * @instance
             */
            UnsubscribeRequest.prototype.topics = $util.emptyArray;

            /**
             * Creates a new UnsubscribeRequest instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.UnsubscribeRequest
             * @static
             * @param {qyh.dataplane.IUnsubscribeRequest=} [properties] Properties to set
             * @returns {qyh.dataplane.UnsubscribeRequest} UnsubscribeRequest instance
             */
            UnsubscribeRequest.create = function create(properties) {
                return new UnsubscribeRequest(properties);
            };

            /**
             * Encodes the specified UnsubscribeRequest message. Does not implicitly {@link qyh.dataplane.UnsubscribeRequest.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.UnsubscribeRequest
             * @static
             * @param {qyh.dataplane.IUnsubscribeRequest} message UnsubscribeRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UnsubscribeRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                    $root.qyh.dataplane.Header.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.topics != null && message.topics.length)
                    for (let i = 0; i < message.topics.length; ++i)
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.topics[i]);
                return writer;
            };

            /**
             * Encodes the specified UnsubscribeRequest message, length delimited. Does not implicitly {@link qyh.dataplane.UnsubscribeRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.UnsubscribeRequest
             * @static
             * @param {qyh.dataplane.IUnsubscribeRequest} message UnsubscribeRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UnsubscribeRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an UnsubscribeRequest message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.UnsubscribeRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.UnsubscribeRequest} UnsubscribeRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UnsubscribeRequest.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.UnsubscribeRequest();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.header = $root.qyh.dataplane.Header.decode(reader, reader.uint32());
                            break;
                        }
                    case 2: {
                            if (!(message.topics && message.topics.length))
                                message.topics = [];
                            message.topics.push(reader.string());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an UnsubscribeRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.UnsubscribeRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.UnsubscribeRequest} UnsubscribeRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UnsubscribeRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an UnsubscribeRequest message.
             * @function verify
             * @memberof qyh.dataplane.UnsubscribeRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            UnsubscribeRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.header != null && message.hasOwnProperty("header")) {
                    let error = $root.qyh.dataplane.Header.verify(message.header);
                    if (error)
                        return "header." + error;
                }
                if (message.topics != null && message.hasOwnProperty("topics")) {
                    if (!Array.isArray(message.topics))
                        return "topics: array expected";
                    for (let i = 0; i < message.topics.length; ++i)
                        if (!$util.isString(message.topics[i]))
                            return "topics: string[] expected";
                }
                return null;
            };

            /**
             * Creates an UnsubscribeRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.UnsubscribeRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.UnsubscribeRequest} UnsubscribeRequest
             */
            UnsubscribeRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.UnsubscribeRequest)
                    return object;
                let message = new $root.qyh.dataplane.UnsubscribeRequest();
                if (object.header != null) {
                    if (typeof object.header !== "object")
                        throw TypeError(".qyh.dataplane.UnsubscribeRequest.header: object expected");
                    message.header = $root.qyh.dataplane.Header.fromObject(object.header);
                }
                if (object.topics) {
                    if (!Array.isArray(object.topics))
                        throw TypeError(".qyh.dataplane.UnsubscribeRequest.topics: array expected");
                    message.topics = [];
                    for (let i = 0; i < object.topics.length; ++i)
                        message.topics[i] = String(object.topics[i]);
                }
                return message;
            };

            /**
             * Creates a plain object from an UnsubscribeRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.UnsubscribeRequest
             * @static
             * @param {qyh.dataplane.UnsubscribeRequest} message UnsubscribeRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            UnsubscribeRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.topics = [];
                if (options.defaults)
                    object.header = null;
                if (message.header != null && message.hasOwnProperty("header"))
                    object.header = $root.qyh.dataplane.Header.toObject(message.header, options);
                if (message.topics && message.topics.length) {
                    object.topics = [];
                    for (let j = 0; j < message.topics.length; ++j)
                        object.topics[j] = message.topics[j];
                }
                return object;
            };

            /**
             * Converts this UnsubscribeRequest to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.UnsubscribeRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            UnsubscribeRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for UnsubscribeRequest
             * @function getTypeUrl
             * @memberof qyh.dataplane.UnsubscribeRequest
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            UnsubscribeRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.UnsubscribeRequest";
            };

            return UnsubscribeRequest;
        })();

        dataplane.AuthRequest = (function() {

            /**
             * Properties of an AuthRequest.
             * @memberof qyh.dataplane
             * @interface IAuthRequest
             * @property {string|null} [token] AuthRequest token
             * @property {string|null} [clientType] AuthRequest clientType
             * @property {string|null} [clientVersion] AuthRequest clientVersion
             */

            /**
             * Constructs a new AuthRequest.
             * @memberof qyh.dataplane
             * @classdesc Represents an AuthRequest.
             * @implements IAuthRequest
             * @constructor
             * @param {qyh.dataplane.IAuthRequest=} [properties] Properties to set
             */
            function AuthRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * AuthRequest token.
             * @member {string} token
             * @memberof qyh.dataplane.AuthRequest
             * @instance
             */
            AuthRequest.prototype.token = "";

            /**
             * AuthRequest clientType.
             * @member {string} clientType
             * @memberof qyh.dataplane.AuthRequest
             * @instance
             */
            AuthRequest.prototype.clientType = "";

            /**
             * AuthRequest clientVersion.
             * @member {string} clientVersion
             * @memberof qyh.dataplane.AuthRequest
             * @instance
             */
            AuthRequest.prototype.clientVersion = "";

            /**
             * Creates a new AuthRequest instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.AuthRequest
             * @static
             * @param {qyh.dataplane.IAuthRequest=} [properties] Properties to set
             * @returns {qyh.dataplane.AuthRequest} AuthRequest instance
             */
            AuthRequest.create = function create(properties) {
                return new AuthRequest(properties);
            };

            /**
             * Encodes the specified AuthRequest message. Does not implicitly {@link qyh.dataplane.AuthRequest.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.AuthRequest
             * @static
             * @param {qyh.dataplane.IAuthRequest} message AuthRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AuthRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.token != null && Object.hasOwnProperty.call(message, "token"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.token);
                if (message.clientType != null && Object.hasOwnProperty.call(message, "clientType"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.clientType);
                if (message.clientVersion != null && Object.hasOwnProperty.call(message, "clientVersion"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.clientVersion);
                return writer;
            };

            /**
             * Encodes the specified AuthRequest message, length delimited. Does not implicitly {@link qyh.dataplane.AuthRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.AuthRequest
             * @static
             * @param {qyh.dataplane.IAuthRequest} message AuthRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AuthRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an AuthRequest message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.AuthRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.AuthRequest} AuthRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AuthRequest.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.AuthRequest();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.token = reader.string();
                            break;
                        }
                    case 2: {
                            message.clientType = reader.string();
                            break;
                        }
                    case 3: {
                            message.clientVersion = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an AuthRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.AuthRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.AuthRequest} AuthRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AuthRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an AuthRequest message.
             * @function verify
             * @memberof qyh.dataplane.AuthRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            AuthRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.token != null && message.hasOwnProperty("token"))
                    if (!$util.isString(message.token))
                        return "token: string expected";
                if (message.clientType != null && message.hasOwnProperty("clientType"))
                    if (!$util.isString(message.clientType))
                        return "clientType: string expected";
                if (message.clientVersion != null && message.hasOwnProperty("clientVersion"))
                    if (!$util.isString(message.clientVersion))
                        return "clientVersion: string expected";
                return null;
            };

            /**
             * Creates an AuthRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.AuthRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.AuthRequest} AuthRequest
             */
            AuthRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.AuthRequest)
                    return object;
                let message = new $root.qyh.dataplane.AuthRequest();
                if (object.token != null)
                    message.token = String(object.token);
                if (object.clientType != null)
                    message.clientType = String(object.clientType);
                if (object.clientVersion != null)
                    message.clientVersion = String(object.clientVersion);
                return message;
            };

            /**
             * Creates a plain object from an AuthRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.AuthRequest
             * @static
             * @param {qyh.dataplane.AuthRequest} message AuthRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AuthRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.token = "";
                    object.clientType = "";
                    object.clientVersion = "";
                }
                if (message.token != null && message.hasOwnProperty("token"))
                    object.token = message.token;
                if (message.clientType != null && message.hasOwnProperty("clientType"))
                    object.clientType = message.clientType;
                if (message.clientVersion != null && message.hasOwnProperty("clientVersion"))
                    object.clientVersion = message.clientVersion;
                return object;
            };

            /**
             * Converts this AuthRequest to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.AuthRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AuthRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for AuthRequest
             * @function getTypeUrl
             * @memberof qyh.dataplane.AuthRequest
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            AuthRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.AuthRequest";
            };

            return AuthRequest;
        })();

        dataplane.AuthResponse = (function() {

            /**
             * Properties of an AuthResponse.
             * @memberof qyh.dataplane
             * @interface IAuthResponse
             * @property {boolean|null} [success] AuthResponse success
             * @property {qyh.dataplane.ISessionInfo|null} [session] AuthResponse session
             * @property {qyh.dataplane.IError|null} [error] AuthResponse error
             */

            /**
             * Constructs a new AuthResponse.
             * @memberof qyh.dataplane
             * @classdesc Represents an AuthResponse.
             * @implements IAuthResponse
             * @constructor
             * @param {qyh.dataplane.IAuthResponse=} [properties] Properties to set
             */
            function AuthResponse(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * AuthResponse success.
             * @member {boolean} success
             * @memberof qyh.dataplane.AuthResponse
             * @instance
             */
            AuthResponse.prototype.success = false;

            /**
             * AuthResponse session.
             * @member {qyh.dataplane.ISessionInfo|null|undefined} session
             * @memberof qyh.dataplane.AuthResponse
             * @instance
             */
            AuthResponse.prototype.session = null;

            /**
             * AuthResponse error.
             * @member {qyh.dataplane.IError|null|undefined} error
             * @memberof qyh.dataplane.AuthResponse
             * @instance
             */
            AuthResponse.prototype.error = null;

            /**
             * Creates a new AuthResponse instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.AuthResponse
             * @static
             * @param {qyh.dataplane.IAuthResponse=} [properties] Properties to set
             * @returns {qyh.dataplane.AuthResponse} AuthResponse instance
             */
            AuthResponse.create = function create(properties) {
                return new AuthResponse(properties);
            };

            /**
             * Encodes the specified AuthResponse message. Does not implicitly {@link qyh.dataplane.AuthResponse.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.AuthResponse
             * @static
             * @param {qyh.dataplane.IAuthResponse} message AuthResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AuthResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                    writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
                if (message.session != null && Object.hasOwnProperty.call(message, "session"))
                    $root.qyh.dataplane.SessionInfo.encode(message.session, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                    $root.qyh.dataplane.Error.encode(message.error, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified AuthResponse message, length delimited. Does not implicitly {@link qyh.dataplane.AuthResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.AuthResponse
             * @static
             * @param {qyh.dataplane.IAuthResponse} message AuthResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AuthResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an AuthResponse message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.AuthResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.AuthResponse} AuthResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AuthResponse.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.AuthResponse();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.success = reader.bool();
                            break;
                        }
                    case 2: {
                            message.session = $root.qyh.dataplane.SessionInfo.decode(reader, reader.uint32());
                            break;
                        }
                    case 3: {
                            message.error = $root.qyh.dataplane.Error.decode(reader, reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an AuthResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.AuthResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.AuthResponse} AuthResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AuthResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an AuthResponse message.
             * @function verify
             * @memberof qyh.dataplane.AuthResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            AuthResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.success != null && message.hasOwnProperty("success"))
                    if (typeof message.success !== "boolean")
                        return "success: boolean expected";
                if (message.session != null && message.hasOwnProperty("session")) {
                    let error = $root.qyh.dataplane.SessionInfo.verify(message.session);
                    if (error)
                        return "session." + error;
                }
                if (message.error != null && message.hasOwnProperty("error")) {
                    let error = $root.qyh.dataplane.Error.verify(message.error);
                    if (error)
                        return "error." + error;
                }
                return null;
            };

            /**
             * Creates an AuthResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.AuthResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.AuthResponse} AuthResponse
             */
            AuthResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.AuthResponse)
                    return object;
                let message = new $root.qyh.dataplane.AuthResponse();
                if (object.success != null)
                    message.success = Boolean(object.success);
                if (object.session != null) {
                    if (typeof object.session !== "object")
                        throw TypeError(".qyh.dataplane.AuthResponse.session: object expected");
                    message.session = $root.qyh.dataplane.SessionInfo.fromObject(object.session);
                }
                if (object.error != null) {
                    if (typeof object.error !== "object")
                        throw TypeError(".qyh.dataplane.AuthResponse.error: object expected");
                    message.error = $root.qyh.dataplane.Error.fromObject(object.error);
                }
                return message;
            };

            /**
             * Creates a plain object from an AuthResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.AuthResponse
             * @static
             * @param {qyh.dataplane.AuthResponse} message AuthResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AuthResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.success = false;
                    object.session = null;
                    object.error = null;
                }
                if (message.success != null && message.hasOwnProperty("success"))
                    object.success = message.success;
                if (message.session != null && message.hasOwnProperty("session"))
                    object.session = $root.qyh.dataplane.SessionInfo.toObject(message.session, options);
                if (message.error != null && message.hasOwnProperty("error"))
                    object.error = $root.qyh.dataplane.Error.toObject(message.error, options);
                return object;
            };

            /**
             * Converts this AuthResponse to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.AuthResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AuthResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for AuthResponse
             * @function getTypeUrl
             * @memberof qyh.dataplane.AuthResponse
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            AuthResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.AuthResponse";
            };

            return AuthResponse;
        })();

        /**
         * MessageType enum.
         * @name qyh.dataplane.MessageType
         * @enum {number}
         * @property {number} MSG_UNKNOWN=0 MSG_UNKNOWN value
         * @property {number} MSG_AUTH_REQUEST=1 MSG_AUTH_REQUEST value
         * @property {number} MSG_AUTH_RESPONSE=2 MSG_AUTH_RESPONSE value
         * @property {number} MSG_SUBSCRIBE=16 MSG_SUBSCRIBE value
         * @property {number} MSG_UNSUBSCRIBE=17 MSG_UNSUBSCRIBE value
         * @property {number} MSG_HEARTBEAT=32 MSG_HEARTBEAT value
         * @property {number} MSG_HEARTBEAT_ACK=33 MSG_HEARTBEAT_ACK value
         * @property {number} MSG_VR_CONTROL=256 MSG_VR_CONTROL value
         * @property {number} MSG_CHASSIS_VELOCITY=257 MSG_CHASSIS_VELOCITY value
         * @property {number} MSG_JOINT_COMMAND=258 MSG_JOINT_COMMAND value
         * @property {number} MSG_END_EFFECTOR_CMD=259 MSG_END_EFFECTOR_CMD value
         * @property {number} MSG_GRIPPER_COMMAND=260 MSG_GRIPPER_COMMAND value
         * @property {number} MSG_NAVIGATION_GOAL=261 MSG_NAVIGATION_GOAL value
         * @property {number} MSG_NAVIGATION_CANCEL=262 MSG_NAVIGATION_CANCEL value
         * @property {number} MSG_NAVIGATION_PAUSE=263 MSG_NAVIGATION_PAUSE value
         * @property {number} MSG_NAVIGATION_RESUME=264 MSG_NAVIGATION_RESUME value
         * @property {number} MSG_LIFT_COMMAND=265 MSG_LIFT_COMMAND value
         * @property {number} MSG_WAIST_COMMAND=266 MSG_WAIST_COMMAND value
         * @property {number} MSG_HEAD_COMMAND=267 MSG_HEAD_COMMAND value
         * @property {number} MSG_ARM_MOVE=268 MSG_ARM_MOVE value
         * @property {number} MSG_ARM_JOG=269 MSG_ARM_JOG value
         * @property {number} MSG_ROBOT_STATE=512 MSG_ROBOT_STATE value
         * @property {number} MSG_JOINT_STATE=513 MSG_JOINT_STATE value
         * @property {number} MSG_ARM_STATE=514 MSG_ARM_STATE value
         * @property {number} MSG_CHASSIS_STATE=515 MSG_CHASSIS_STATE value
         * @property {number} MSG_GRIPPER_STATE=516 MSG_GRIPPER_STATE value
         * @property {number} MSG_VR_SYSTEM_STATE=517 MSG_VR_SYSTEM_STATE value
         * @property {number} MSG_TASK_STATE=518 MSG_TASK_STATE value
         * @property {number} MSG_ACTUATOR_STATE=519 MSG_ACTUATOR_STATE value
         * @property {number} MSG_BASIC_STATE=520 MSG_BASIC_STATE value
         * @property {number} MSG_ERROR=768 MSG_ERROR value
         * @property {number} MSG_MODE_CHANGED=1024 MSG_MODE_CHANGED value
         * @property {number} MSG_CONTROL_CHANGED=1025 MSG_CONTROL_CHANGED value
         * @property {number} MSG_EMERGENCY_STOP=1026 MSG_EMERGENCY_STOP value
         */
        dataplane.MessageType = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "MSG_UNKNOWN"] = 0;
            values[valuesById[1] = "MSG_AUTH_REQUEST"] = 1;
            values[valuesById[2] = "MSG_AUTH_RESPONSE"] = 2;
            values[valuesById[16] = "MSG_SUBSCRIBE"] = 16;
            values[valuesById[17] = "MSG_UNSUBSCRIBE"] = 17;
            values[valuesById[32] = "MSG_HEARTBEAT"] = 32;
            values[valuesById[33] = "MSG_HEARTBEAT_ACK"] = 33;
            values[valuesById[256] = "MSG_VR_CONTROL"] = 256;
            values[valuesById[257] = "MSG_CHASSIS_VELOCITY"] = 257;
            values[valuesById[258] = "MSG_JOINT_COMMAND"] = 258;
            values[valuesById[259] = "MSG_END_EFFECTOR_CMD"] = 259;
            values[valuesById[260] = "MSG_GRIPPER_COMMAND"] = 260;
            values[valuesById[261] = "MSG_NAVIGATION_GOAL"] = 261;
            values[valuesById[262] = "MSG_NAVIGATION_CANCEL"] = 262;
            values[valuesById[263] = "MSG_NAVIGATION_PAUSE"] = 263;
            values[valuesById[264] = "MSG_NAVIGATION_RESUME"] = 264;
            values[valuesById[265] = "MSG_LIFT_COMMAND"] = 265;
            values[valuesById[266] = "MSG_WAIST_COMMAND"] = 266;
            values[valuesById[267] = "MSG_HEAD_COMMAND"] = 267;
            values[valuesById[268] = "MSG_ARM_MOVE"] = 268;
            values[valuesById[269] = "MSG_ARM_JOG"] = 269;
            values[valuesById[512] = "MSG_ROBOT_STATE"] = 512;
            values[valuesById[513] = "MSG_JOINT_STATE"] = 513;
            values[valuesById[514] = "MSG_ARM_STATE"] = 514;
            values[valuesById[515] = "MSG_CHASSIS_STATE"] = 515;
            values[valuesById[516] = "MSG_GRIPPER_STATE"] = 516;
            values[valuesById[517] = "MSG_VR_SYSTEM_STATE"] = 517;
            values[valuesById[518] = "MSG_TASK_STATE"] = 518;
            values[valuesById[519] = "MSG_ACTUATOR_STATE"] = 519;
            values[valuesById[520] = "MSG_BASIC_STATE"] = 520;
            values[valuesById[768] = "MSG_ERROR"] = 768;
            values[valuesById[1024] = "MSG_MODE_CHANGED"] = 1024;
            values[valuesById[1025] = "MSG_CONTROL_CHANGED"] = 1025;
            values[valuesById[1026] = "MSG_EMERGENCY_STOP"] = 1026;
            return values;
        })();

        dataplane.WebSocketMessage = (function() {

            /**
             * Properties of a WebSocketMessage.
             * @memberof qyh.dataplane
             * @interface IWebSocketMessage
             * @property {qyh.dataplane.MessageType|null} [type] WebSocketMessage type
             * @property {number|Long|null} [sequence] WebSocketMessage sequence
             * @property {qyh.dataplane.ITimestamp|null} [timestamp] WebSocketMessage timestamp
             * @property {qyh.dataplane.IAuthRequest|null} [authRequest] WebSocketMessage authRequest
             * @property {qyh.dataplane.IAuthResponse|null} [authResponse] WebSocketMessage authResponse
             * @property {qyh.dataplane.ISubscribeRequest|null} [subscribe] WebSocketMessage subscribe
             * @property {qyh.dataplane.IUnsubscribeRequest|null} [unsubscribe] WebSocketMessage unsubscribe
             * @property {qyh.dataplane.IHeartbeat|null} [heartbeat] WebSocketMessage heartbeat
             * @property {qyh.dataplane.IVRControlIntent|null} [vrControl] WebSocketMessage vrControl
             * @property {qyh.dataplane.IChassisVelocity|null} [chassisVelocity] WebSocketMessage chassisVelocity
             * @property {qyh.dataplane.IJointCommand|null} [jointCommand] WebSocketMessage jointCommand
             * @property {qyh.dataplane.IEndEffectorCommand|null} [endEffectorCmd] WebSocketMessage endEffectorCmd
             * @property {qyh.dataplane.IGripperCommand|null} [gripperCommand] WebSocketMessage gripperCommand
             * @property {qyh.dataplane.INavigationGoal|null} [navigationGoal] WebSocketMessage navigationGoal
             * @property {qyh.dataplane.INavigationControl|null} [navigationControl] WebSocketMessage navigationControl
             * @property {qyh.dataplane.ILiftCommand|null} [liftCommand] WebSocketMessage liftCommand
             * @property {qyh.dataplane.IWaistCommand|null} [waistCommand] WebSocketMessage waistCommand
             * @property {qyh.dataplane.IHeadCommand|null} [headCommand] WebSocketMessage headCommand
             * @property {qyh.dataplane.IArmMoveCommand|null} [armMove] WebSocketMessage armMove
             * @property {qyh.dataplane.IArmJogCommand|null} [armJog] WebSocketMessage armJog
             * @property {qyh.dataplane.IRobotState|null} [robotState] WebSocketMessage robotState
             * @property {qyh.dataplane.IJointState|null} [jointState] WebSocketMessage jointState
             * @property {qyh.dataplane.IArmState|null} [armState] WebSocketMessage armState
             * @property {qyh.dataplane.IChassisState|null} [chassisState] WebSocketMessage chassisState
             * @property {qyh.dataplane.IGripperState|null} [gripperState] WebSocketMessage gripperState
             * @property {qyh.dataplane.IVRSystemState|null} [vrSystemState] WebSocketMessage vrSystemState
             * @property {qyh.dataplane.ITaskState|null} [taskState] WebSocketMessage taskState
             * @property {qyh.dataplane.IActuatorState|null} [actuatorState] WebSocketMessage actuatorState
             * @property {qyh.dataplane.IBasicState|null} [basicState] WebSocketMessage basicState
             * @property {qyh.dataplane.IError|null} [error] WebSocketMessage error
             * @property {qyh.dataplane.IModeChangedNotification|null} [modeChanged] WebSocketMessage modeChanged
             * @property {qyh.dataplane.IControlChangedNotification|null} [controlChanged] WebSocketMessage controlChanged
             * @property {qyh.dataplane.IEmergencyStopNotification|null} [emergencyStop] WebSocketMessage emergencyStop
             */

            /**
             * Constructs a new WebSocketMessage.
             * @memberof qyh.dataplane
             * @classdesc Represents a WebSocketMessage.
             * @implements IWebSocketMessage
             * @constructor
             * @param {qyh.dataplane.IWebSocketMessage=} [properties] Properties to set
             */
            function WebSocketMessage(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * WebSocketMessage type.
             * @member {qyh.dataplane.MessageType} type
             * @memberof qyh.dataplane.WebSocketMessage
             * @instance
             */
            WebSocketMessage.prototype.type = 0;

            /**
             * WebSocketMessage sequence.
             * @member {number|Long} sequence
             * @memberof qyh.dataplane.WebSocketMessage
             * @instance
             */
            WebSocketMessage.prototype.sequence = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * WebSocketMessage timestamp.
             * @member {qyh.dataplane.ITimestamp|null|undefined} timestamp
             * @memberof qyh.dataplane.WebSocketMessage
             * @instance
             */
            WebSocketMessage.prototype.timestamp = null;

            /**
             * WebSocketMessage authRequest.
             * @member {qyh.dataplane.IAuthRequest|null|undefined} authRequest
             * @memberof qyh.dataplane.WebSocketMessage
             * @instance
             */
            WebSocketMessage.prototype.authRequest = null;

            /**
             * WebSocketMessage authResponse.
             * @member {qyh.dataplane.IAuthResponse|null|undefined} authResponse
             * @memberof qyh.dataplane.WebSocketMessage
             * @instance
             */
            WebSocketMessage.prototype.authResponse = null;

            /**
             * WebSocketMessage subscribe.
             * @member {qyh.dataplane.ISubscribeRequest|null|undefined} subscribe
             * @memberof qyh.dataplane.WebSocketMessage
             * @instance
             */
            WebSocketMessage.prototype.subscribe = null;

            /**
             * WebSocketMessage unsubscribe.
             * @member {qyh.dataplane.IUnsubscribeRequest|null|undefined} unsubscribe
             * @memberof qyh.dataplane.WebSocketMessage
             * @instance
             */
            WebSocketMessage.prototype.unsubscribe = null;

            /**
             * WebSocketMessage heartbeat.
             * @member {qyh.dataplane.IHeartbeat|null|undefined} heartbeat
             * @memberof qyh.dataplane.WebSocketMessage
             * @instance
             */
            WebSocketMessage.prototype.heartbeat = null;

            /**
             * WebSocketMessage vrControl.
             * @member {qyh.dataplane.IVRControlIntent|null|undefined} vrControl
             * @memberof qyh.dataplane.WebSocketMessage
             * @instance
             */
            WebSocketMessage.prototype.vrControl = null;

            /**
             * WebSocketMessage chassisVelocity.
             * @member {qyh.dataplane.IChassisVelocity|null|undefined} chassisVelocity
             * @memberof qyh.dataplane.WebSocketMessage
             * @instance
             */
            WebSocketMessage.prototype.chassisVelocity = null;

            /**
             * WebSocketMessage jointCommand.
             * @member {qyh.dataplane.IJointCommand|null|undefined} jointCommand
             * @memberof qyh.dataplane.WebSocketMessage
             * @instance
             */
            WebSocketMessage.prototype.jointCommand = null;

            /**
             * WebSocketMessage endEffectorCmd.
             * @member {qyh.dataplane.IEndEffectorCommand|null|undefined} endEffectorCmd
             * @memberof qyh.dataplane.WebSocketMessage
             * @instance
             */
            WebSocketMessage.prototype.endEffectorCmd = null;

            /**
             * WebSocketMessage gripperCommand.
             * @member {qyh.dataplane.IGripperCommand|null|undefined} gripperCommand
             * @memberof qyh.dataplane.WebSocketMessage
             * @instance
             */
            WebSocketMessage.prototype.gripperCommand = null;

            /**
             * WebSocketMessage navigationGoal.
             * @member {qyh.dataplane.INavigationGoal|null|undefined} navigationGoal
             * @memberof qyh.dataplane.WebSocketMessage
             * @instance
             */
            WebSocketMessage.prototype.navigationGoal = null;

            /**
             * WebSocketMessage navigationControl.
             * @member {qyh.dataplane.INavigationControl|null|undefined} navigationControl
             * @memberof qyh.dataplane.WebSocketMessage
             * @instance
             */
            WebSocketMessage.prototype.navigationControl = null;

            /**
             * WebSocketMessage liftCommand.
             * @member {qyh.dataplane.ILiftCommand|null|undefined} liftCommand
             * @memberof qyh.dataplane.WebSocketMessage
             * @instance
             */
            WebSocketMessage.prototype.liftCommand = null;

            /**
             * WebSocketMessage waistCommand.
             * @member {qyh.dataplane.IWaistCommand|null|undefined} waistCommand
             * @memberof qyh.dataplane.WebSocketMessage
             * @instance
             */
            WebSocketMessage.prototype.waistCommand = null;

            /**
             * WebSocketMessage headCommand.
             * @member {qyh.dataplane.IHeadCommand|null|undefined} headCommand
             * @memberof qyh.dataplane.WebSocketMessage
             * @instance
             */
            WebSocketMessage.prototype.headCommand = null;

            /**
             * WebSocketMessage armMove.
             * @member {qyh.dataplane.IArmMoveCommand|null|undefined} armMove
             * @memberof qyh.dataplane.WebSocketMessage
             * @instance
             */
            WebSocketMessage.prototype.armMove = null;

            /**
             * WebSocketMessage armJog.
             * @member {qyh.dataplane.IArmJogCommand|null|undefined} armJog
             * @memberof qyh.dataplane.WebSocketMessage
             * @instance
             */
            WebSocketMessage.prototype.armJog = null;

            /**
             * WebSocketMessage robotState.
             * @member {qyh.dataplane.IRobotState|null|undefined} robotState
             * @memberof qyh.dataplane.WebSocketMessage
             * @instance
             */
            WebSocketMessage.prototype.robotState = null;

            /**
             * WebSocketMessage jointState.
             * @member {qyh.dataplane.IJointState|null|undefined} jointState
             * @memberof qyh.dataplane.WebSocketMessage
             * @instance
             */
            WebSocketMessage.prototype.jointState = null;

            /**
             * WebSocketMessage armState.
             * @member {qyh.dataplane.IArmState|null|undefined} armState
             * @memberof qyh.dataplane.WebSocketMessage
             * @instance
             */
            WebSocketMessage.prototype.armState = null;

            /**
             * WebSocketMessage chassisState.
             * @member {qyh.dataplane.IChassisState|null|undefined} chassisState
             * @memberof qyh.dataplane.WebSocketMessage
             * @instance
             */
            WebSocketMessage.prototype.chassisState = null;

            /**
             * WebSocketMessage gripperState.
             * @member {qyh.dataplane.IGripperState|null|undefined} gripperState
             * @memberof qyh.dataplane.WebSocketMessage
             * @instance
             */
            WebSocketMessage.prototype.gripperState = null;

            /**
             * WebSocketMessage vrSystemState.
             * @member {qyh.dataplane.IVRSystemState|null|undefined} vrSystemState
             * @memberof qyh.dataplane.WebSocketMessage
             * @instance
             */
            WebSocketMessage.prototype.vrSystemState = null;

            /**
             * WebSocketMessage taskState.
             * @member {qyh.dataplane.ITaskState|null|undefined} taskState
             * @memberof qyh.dataplane.WebSocketMessage
             * @instance
             */
            WebSocketMessage.prototype.taskState = null;

            /**
             * WebSocketMessage actuatorState.
             * @member {qyh.dataplane.IActuatorState|null|undefined} actuatorState
             * @memberof qyh.dataplane.WebSocketMessage
             * @instance
             */
            WebSocketMessage.prototype.actuatorState = null;

            /**
             * WebSocketMessage basicState.
             * @member {qyh.dataplane.IBasicState|null|undefined} basicState
             * @memberof qyh.dataplane.WebSocketMessage
             * @instance
             */
            WebSocketMessage.prototype.basicState = null;

            /**
             * WebSocketMessage error.
             * @member {qyh.dataplane.IError|null|undefined} error
             * @memberof qyh.dataplane.WebSocketMessage
             * @instance
             */
            WebSocketMessage.prototype.error = null;

            /**
             * WebSocketMessage modeChanged.
             * @member {qyh.dataplane.IModeChangedNotification|null|undefined} modeChanged
             * @memberof qyh.dataplane.WebSocketMessage
             * @instance
             */
            WebSocketMessage.prototype.modeChanged = null;

            /**
             * WebSocketMessage controlChanged.
             * @member {qyh.dataplane.IControlChangedNotification|null|undefined} controlChanged
             * @memberof qyh.dataplane.WebSocketMessage
             * @instance
             */
            WebSocketMessage.prototype.controlChanged = null;

            /**
             * WebSocketMessage emergencyStop.
             * @member {qyh.dataplane.IEmergencyStopNotification|null|undefined} emergencyStop
             * @memberof qyh.dataplane.WebSocketMessage
             * @instance
             */
            WebSocketMessage.prototype.emergencyStop = null;

            // OneOf field names bound to virtual getters and setters
            let $oneOfFields;

            /**
             * WebSocketMessage payload.
             * @member {"authRequest"|"authResponse"|"subscribe"|"unsubscribe"|"heartbeat"|"vrControl"|"chassisVelocity"|"jointCommand"|"endEffectorCmd"|"gripperCommand"|"navigationGoal"|"navigationControl"|"liftCommand"|"waistCommand"|"headCommand"|"armMove"|"armJog"|"robotState"|"jointState"|"armState"|"chassisState"|"gripperState"|"vrSystemState"|"taskState"|"actuatorState"|"basicState"|"error"|"modeChanged"|"controlChanged"|"emergencyStop"|undefined} payload
             * @memberof qyh.dataplane.WebSocketMessage
             * @instance
             */
            Object.defineProperty(WebSocketMessage.prototype, "payload", {
                get: $util.oneOfGetter($oneOfFields = ["authRequest", "authResponse", "subscribe", "unsubscribe", "heartbeat", "vrControl", "chassisVelocity", "jointCommand", "endEffectorCmd", "gripperCommand", "navigationGoal", "navigationControl", "liftCommand", "waistCommand", "headCommand", "armMove", "armJog", "robotState", "jointState", "armState", "chassisState", "gripperState", "vrSystemState", "taskState", "actuatorState", "basicState", "error", "modeChanged", "controlChanged", "emergencyStop"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new WebSocketMessage instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.WebSocketMessage
             * @static
             * @param {qyh.dataplane.IWebSocketMessage=} [properties] Properties to set
             * @returns {qyh.dataplane.WebSocketMessage} WebSocketMessage instance
             */
            WebSocketMessage.create = function create(properties) {
                return new WebSocketMessage(properties);
            };

            /**
             * Encodes the specified WebSocketMessage message. Does not implicitly {@link qyh.dataplane.WebSocketMessage.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.WebSocketMessage
             * @static
             * @param {qyh.dataplane.IWebSocketMessage} message WebSocketMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            WebSocketMessage.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
                if (message.sequence != null && Object.hasOwnProperty.call(message, "sequence"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.sequence);
                if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                    $root.qyh.dataplane.Timestamp.encode(message.timestamp, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.authRequest != null && Object.hasOwnProperty.call(message, "authRequest"))
                    $root.qyh.dataplane.AuthRequest.encode(message.authRequest, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
                if (message.authResponse != null && Object.hasOwnProperty.call(message, "authResponse"))
                    $root.qyh.dataplane.AuthResponse.encode(message.authResponse, writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
                if (message.subscribe != null && Object.hasOwnProperty.call(message, "subscribe"))
                    $root.qyh.dataplane.SubscribeRequest.encode(message.subscribe, writer.uint32(/* id 20, wireType 2 =*/162).fork()).ldelim();
                if (message.unsubscribe != null && Object.hasOwnProperty.call(message, "unsubscribe"))
                    $root.qyh.dataplane.UnsubscribeRequest.encode(message.unsubscribe, writer.uint32(/* id 21, wireType 2 =*/170).fork()).ldelim();
                if (message.heartbeat != null && Object.hasOwnProperty.call(message, "heartbeat"))
                    $root.qyh.dataplane.Heartbeat.encode(message.heartbeat, writer.uint32(/* id 30, wireType 2 =*/242).fork()).ldelim();
                if (message.vrControl != null && Object.hasOwnProperty.call(message, "vrControl"))
                    $root.qyh.dataplane.VRControlIntent.encode(message.vrControl, writer.uint32(/* id 100, wireType 2 =*/802).fork()).ldelim();
                if (message.chassisVelocity != null && Object.hasOwnProperty.call(message, "chassisVelocity"))
                    $root.qyh.dataplane.ChassisVelocity.encode(message.chassisVelocity, writer.uint32(/* id 101, wireType 2 =*/810).fork()).ldelim();
                if (message.jointCommand != null && Object.hasOwnProperty.call(message, "jointCommand"))
                    $root.qyh.dataplane.JointCommand.encode(message.jointCommand, writer.uint32(/* id 102, wireType 2 =*/818).fork()).ldelim();
                if (message.endEffectorCmd != null && Object.hasOwnProperty.call(message, "endEffectorCmd"))
                    $root.qyh.dataplane.EndEffectorCommand.encode(message.endEffectorCmd, writer.uint32(/* id 103, wireType 2 =*/826).fork()).ldelim();
                if (message.gripperCommand != null && Object.hasOwnProperty.call(message, "gripperCommand"))
                    $root.qyh.dataplane.GripperCommand.encode(message.gripperCommand, writer.uint32(/* id 104, wireType 2 =*/834).fork()).ldelim();
                if (message.navigationGoal != null && Object.hasOwnProperty.call(message, "navigationGoal"))
                    $root.qyh.dataplane.NavigationGoal.encode(message.navigationGoal, writer.uint32(/* id 105, wireType 2 =*/842).fork()).ldelim();
                if (message.navigationControl != null && Object.hasOwnProperty.call(message, "navigationControl"))
                    $root.qyh.dataplane.NavigationControl.encode(message.navigationControl, writer.uint32(/* id 106, wireType 2 =*/850).fork()).ldelim();
                if (message.liftCommand != null && Object.hasOwnProperty.call(message, "liftCommand"))
                    $root.qyh.dataplane.LiftCommand.encode(message.liftCommand, writer.uint32(/* id 107, wireType 2 =*/858).fork()).ldelim();
                if (message.waistCommand != null && Object.hasOwnProperty.call(message, "waistCommand"))
                    $root.qyh.dataplane.WaistCommand.encode(message.waistCommand, writer.uint32(/* id 108, wireType 2 =*/866).fork()).ldelim();
                if (message.headCommand != null && Object.hasOwnProperty.call(message, "headCommand"))
                    $root.qyh.dataplane.HeadCommand.encode(message.headCommand, writer.uint32(/* id 109, wireType 2 =*/874).fork()).ldelim();
                if (message.armMove != null && Object.hasOwnProperty.call(message, "armMove"))
                    $root.qyh.dataplane.ArmMoveCommand.encode(message.armMove, writer.uint32(/* id 110, wireType 2 =*/882).fork()).ldelim();
                if (message.armJog != null && Object.hasOwnProperty.call(message, "armJog"))
                    $root.qyh.dataplane.ArmJogCommand.encode(message.armJog, writer.uint32(/* id 111, wireType 2 =*/890).fork()).ldelim();
                if (message.robotState != null && Object.hasOwnProperty.call(message, "robotState"))
                    $root.qyh.dataplane.RobotState.encode(message.robotState, writer.uint32(/* id 200, wireType 2 =*/1602).fork()).ldelim();
                if (message.jointState != null && Object.hasOwnProperty.call(message, "jointState"))
                    $root.qyh.dataplane.JointState.encode(message.jointState, writer.uint32(/* id 201, wireType 2 =*/1610).fork()).ldelim();
                if (message.armState != null && Object.hasOwnProperty.call(message, "armState"))
                    $root.qyh.dataplane.ArmState.encode(message.armState, writer.uint32(/* id 202, wireType 2 =*/1618).fork()).ldelim();
                if (message.chassisState != null && Object.hasOwnProperty.call(message, "chassisState"))
                    $root.qyh.dataplane.ChassisState.encode(message.chassisState, writer.uint32(/* id 203, wireType 2 =*/1626).fork()).ldelim();
                if (message.gripperState != null && Object.hasOwnProperty.call(message, "gripperState"))
                    $root.qyh.dataplane.GripperState.encode(message.gripperState, writer.uint32(/* id 204, wireType 2 =*/1634).fork()).ldelim();
                if (message.vrSystemState != null && Object.hasOwnProperty.call(message, "vrSystemState"))
                    $root.qyh.dataplane.VRSystemState.encode(message.vrSystemState, writer.uint32(/* id 205, wireType 2 =*/1642).fork()).ldelim();
                if (message.taskState != null && Object.hasOwnProperty.call(message, "taskState"))
                    $root.qyh.dataplane.TaskState.encode(message.taskState, writer.uint32(/* id 206, wireType 2 =*/1650).fork()).ldelim();
                if (message.actuatorState != null && Object.hasOwnProperty.call(message, "actuatorState"))
                    $root.qyh.dataplane.ActuatorState.encode(message.actuatorState, writer.uint32(/* id 207, wireType 2 =*/1658).fork()).ldelim();
                if (message.basicState != null && Object.hasOwnProperty.call(message, "basicState"))
                    $root.qyh.dataplane.BasicState.encode(message.basicState, writer.uint32(/* id 208, wireType 2 =*/1666).fork()).ldelim();
                if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                    $root.qyh.dataplane.Error.encode(message.error, writer.uint32(/* id 300, wireType 2 =*/2402).fork()).ldelim();
                if (message.modeChanged != null && Object.hasOwnProperty.call(message, "modeChanged"))
                    $root.qyh.dataplane.ModeChangedNotification.encode(message.modeChanged, writer.uint32(/* id 400, wireType 2 =*/3202).fork()).ldelim();
                if (message.controlChanged != null && Object.hasOwnProperty.call(message, "controlChanged"))
                    $root.qyh.dataplane.ControlChangedNotification.encode(message.controlChanged, writer.uint32(/* id 401, wireType 2 =*/3210).fork()).ldelim();
                if (message.emergencyStop != null && Object.hasOwnProperty.call(message, "emergencyStop"))
                    $root.qyh.dataplane.EmergencyStopNotification.encode(message.emergencyStop, writer.uint32(/* id 402, wireType 2 =*/3218).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified WebSocketMessage message, length delimited. Does not implicitly {@link qyh.dataplane.WebSocketMessage.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.WebSocketMessage
             * @static
             * @param {qyh.dataplane.IWebSocketMessage} message WebSocketMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            WebSocketMessage.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a WebSocketMessage message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.WebSocketMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.WebSocketMessage} WebSocketMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            WebSocketMessage.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.WebSocketMessage();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.type = reader.int32();
                            break;
                        }
                    case 2: {
                            message.sequence = reader.uint64();
                            break;
                        }
                    case 3: {
                            message.timestamp = $root.qyh.dataplane.Timestamp.decode(reader, reader.uint32());
                            break;
                        }
                    case 10: {
                            message.authRequest = $root.qyh.dataplane.AuthRequest.decode(reader, reader.uint32());
                            break;
                        }
                    case 11: {
                            message.authResponse = $root.qyh.dataplane.AuthResponse.decode(reader, reader.uint32());
                            break;
                        }
                    case 20: {
                            message.subscribe = $root.qyh.dataplane.SubscribeRequest.decode(reader, reader.uint32());
                            break;
                        }
                    case 21: {
                            message.unsubscribe = $root.qyh.dataplane.UnsubscribeRequest.decode(reader, reader.uint32());
                            break;
                        }
                    case 30: {
                            message.heartbeat = $root.qyh.dataplane.Heartbeat.decode(reader, reader.uint32());
                            break;
                        }
                    case 100: {
                            message.vrControl = $root.qyh.dataplane.VRControlIntent.decode(reader, reader.uint32());
                            break;
                        }
                    case 101: {
                            message.chassisVelocity = $root.qyh.dataplane.ChassisVelocity.decode(reader, reader.uint32());
                            break;
                        }
                    case 102: {
                            message.jointCommand = $root.qyh.dataplane.JointCommand.decode(reader, reader.uint32());
                            break;
                        }
                    case 103: {
                            message.endEffectorCmd = $root.qyh.dataplane.EndEffectorCommand.decode(reader, reader.uint32());
                            break;
                        }
                    case 104: {
                            message.gripperCommand = $root.qyh.dataplane.GripperCommand.decode(reader, reader.uint32());
                            break;
                        }
                    case 105: {
                            message.navigationGoal = $root.qyh.dataplane.NavigationGoal.decode(reader, reader.uint32());
                            break;
                        }
                    case 106: {
                            message.navigationControl = $root.qyh.dataplane.NavigationControl.decode(reader, reader.uint32());
                            break;
                        }
                    case 107: {
                            message.liftCommand = $root.qyh.dataplane.LiftCommand.decode(reader, reader.uint32());
                            break;
                        }
                    case 108: {
                            message.waistCommand = $root.qyh.dataplane.WaistCommand.decode(reader, reader.uint32());
                            break;
                        }
                    case 109: {
                            message.headCommand = $root.qyh.dataplane.HeadCommand.decode(reader, reader.uint32());
                            break;
                        }
                    case 110: {
                            message.armMove = $root.qyh.dataplane.ArmMoveCommand.decode(reader, reader.uint32());
                            break;
                        }
                    case 111: {
                            message.armJog = $root.qyh.dataplane.ArmJogCommand.decode(reader, reader.uint32());
                            break;
                        }
                    case 200: {
                            message.robotState = $root.qyh.dataplane.RobotState.decode(reader, reader.uint32());
                            break;
                        }
                    case 201: {
                            message.jointState = $root.qyh.dataplane.JointState.decode(reader, reader.uint32());
                            break;
                        }
                    case 202: {
                            message.armState = $root.qyh.dataplane.ArmState.decode(reader, reader.uint32());
                            break;
                        }
                    case 203: {
                            message.chassisState = $root.qyh.dataplane.ChassisState.decode(reader, reader.uint32());
                            break;
                        }
                    case 204: {
                            message.gripperState = $root.qyh.dataplane.GripperState.decode(reader, reader.uint32());
                            break;
                        }
                    case 205: {
                            message.vrSystemState = $root.qyh.dataplane.VRSystemState.decode(reader, reader.uint32());
                            break;
                        }
                    case 206: {
                            message.taskState = $root.qyh.dataplane.TaskState.decode(reader, reader.uint32());
                            break;
                        }
                    case 207: {
                            message.actuatorState = $root.qyh.dataplane.ActuatorState.decode(reader, reader.uint32());
                            break;
                        }
                    case 208: {
                            message.basicState = $root.qyh.dataplane.BasicState.decode(reader, reader.uint32());
                            break;
                        }
                    case 300: {
                            message.error = $root.qyh.dataplane.Error.decode(reader, reader.uint32());
                            break;
                        }
                    case 400: {
                            message.modeChanged = $root.qyh.dataplane.ModeChangedNotification.decode(reader, reader.uint32());
                            break;
                        }
                    case 401: {
                            message.controlChanged = $root.qyh.dataplane.ControlChangedNotification.decode(reader, reader.uint32());
                            break;
                        }
                    case 402: {
                            message.emergencyStop = $root.qyh.dataplane.EmergencyStopNotification.decode(reader, reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a WebSocketMessage message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.WebSocketMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.WebSocketMessage} WebSocketMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            WebSocketMessage.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a WebSocketMessage message.
             * @function verify
             * @memberof qyh.dataplane.WebSocketMessage
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            WebSocketMessage.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                let properties = {};
                if (message.type != null && message.hasOwnProperty("type"))
                    switch (message.type) {
                    default:
                        return "type: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 16:
                    case 17:
                    case 32:
                    case 33:
                    case 256:
                    case 257:
                    case 258:
                    case 259:
                    case 260:
                    case 261:
                    case 262:
                    case 263:
                    case 264:
                    case 265:
                    case 266:
                    case 267:
                    case 268:
                    case 269:
                    case 512:
                    case 513:
                    case 514:
                    case 515:
                    case 516:
                    case 517:
                    case 518:
                    case 519:
                    case 520:
                    case 768:
                    case 1024:
                    case 1025:
                    case 1026:
                        break;
                    }
                if (message.sequence != null && message.hasOwnProperty("sequence"))
                    if (!$util.isInteger(message.sequence) && !(message.sequence && $util.isInteger(message.sequence.low) && $util.isInteger(message.sequence.high)))
                        return "sequence: integer|Long expected";
                if (message.timestamp != null && message.hasOwnProperty("timestamp")) {
                    let error = $root.qyh.dataplane.Timestamp.verify(message.timestamp);
                    if (error)
                        return "timestamp." + error;
                }
                if (message.authRequest != null && message.hasOwnProperty("authRequest")) {
                    properties.payload = 1;
                    {
                        let error = $root.qyh.dataplane.AuthRequest.verify(message.authRequest);
                        if (error)
                            return "authRequest." + error;
                    }
                }
                if (message.authResponse != null && message.hasOwnProperty("authResponse")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        let error = $root.qyh.dataplane.AuthResponse.verify(message.authResponse);
                        if (error)
                            return "authResponse." + error;
                    }
                }
                if (message.subscribe != null && message.hasOwnProperty("subscribe")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        let error = $root.qyh.dataplane.SubscribeRequest.verify(message.subscribe);
                        if (error)
                            return "subscribe." + error;
                    }
                }
                if (message.unsubscribe != null && message.hasOwnProperty("unsubscribe")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        let error = $root.qyh.dataplane.UnsubscribeRequest.verify(message.unsubscribe);
                        if (error)
                            return "unsubscribe." + error;
                    }
                }
                if (message.heartbeat != null && message.hasOwnProperty("heartbeat")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        let error = $root.qyh.dataplane.Heartbeat.verify(message.heartbeat);
                        if (error)
                            return "heartbeat." + error;
                    }
                }
                if (message.vrControl != null && message.hasOwnProperty("vrControl")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        let error = $root.qyh.dataplane.VRControlIntent.verify(message.vrControl);
                        if (error)
                            return "vrControl." + error;
                    }
                }
                if (message.chassisVelocity != null && message.hasOwnProperty("chassisVelocity")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        let error = $root.qyh.dataplane.ChassisVelocity.verify(message.chassisVelocity);
                        if (error)
                            return "chassisVelocity." + error;
                    }
                }
                if (message.jointCommand != null && message.hasOwnProperty("jointCommand")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        let error = $root.qyh.dataplane.JointCommand.verify(message.jointCommand);
                        if (error)
                            return "jointCommand." + error;
                    }
                }
                if (message.endEffectorCmd != null && message.hasOwnProperty("endEffectorCmd")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        let error = $root.qyh.dataplane.EndEffectorCommand.verify(message.endEffectorCmd);
                        if (error)
                            return "endEffectorCmd." + error;
                    }
                }
                if (message.gripperCommand != null && message.hasOwnProperty("gripperCommand")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        let error = $root.qyh.dataplane.GripperCommand.verify(message.gripperCommand);
                        if (error)
                            return "gripperCommand." + error;
                    }
                }
                if (message.navigationGoal != null && message.hasOwnProperty("navigationGoal")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        let error = $root.qyh.dataplane.NavigationGoal.verify(message.navigationGoal);
                        if (error)
                            return "navigationGoal." + error;
                    }
                }
                if (message.navigationControl != null && message.hasOwnProperty("navigationControl")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        let error = $root.qyh.dataplane.NavigationControl.verify(message.navigationControl);
                        if (error)
                            return "navigationControl." + error;
                    }
                }
                if (message.liftCommand != null && message.hasOwnProperty("liftCommand")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        let error = $root.qyh.dataplane.LiftCommand.verify(message.liftCommand);
                        if (error)
                            return "liftCommand." + error;
                    }
                }
                if (message.waistCommand != null && message.hasOwnProperty("waistCommand")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        let error = $root.qyh.dataplane.WaistCommand.verify(message.waistCommand);
                        if (error)
                            return "waistCommand." + error;
                    }
                }
                if (message.headCommand != null && message.hasOwnProperty("headCommand")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        let error = $root.qyh.dataplane.HeadCommand.verify(message.headCommand);
                        if (error)
                            return "headCommand." + error;
                    }
                }
                if (message.armMove != null && message.hasOwnProperty("armMove")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        let error = $root.qyh.dataplane.ArmMoveCommand.verify(message.armMove);
                        if (error)
                            return "armMove." + error;
                    }
                }
                if (message.armJog != null && message.hasOwnProperty("armJog")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        let error = $root.qyh.dataplane.ArmJogCommand.verify(message.armJog);
                        if (error)
                            return "armJog." + error;
                    }
                }
                if (message.robotState != null && message.hasOwnProperty("robotState")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        let error = $root.qyh.dataplane.RobotState.verify(message.robotState);
                        if (error)
                            return "robotState." + error;
                    }
                }
                if (message.jointState != null && message.hasOwnProperty("jointState")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        let error = $root.qyh.dataplane.JointState.verify(message.jointState);
                        if (error)
                            return "jointState." + error;
                    }
                }
                if (message.armState != null && message.hasOwnProperty("armState")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        let error = $root.qyh.dataplane.ArmState.verify(message.armState);
                        if (error)
                            return "armState." + error;
                    }
                }
                if (message.chassisState != null && message.hasOwnProperty("chassisState")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        let error = $root.qyh.dataplane.ChassisState.verify(message.chassisState);
                        if (error)
                            return "chassisState." + error;
                    }
                }
                if (message.gripperState != null && message.hasOwnProperty("gripperState")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        let error = $root.qyh.dataplane.GripperState.verify(message.gripperState);
                        if (error)
                            return "gripperState." + error;
                    }
                }
                if (message.vrSystemState != null && message.hasOwnProperty("vrSystemState")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        let error = $root.qyh.dataplane.VRSystemState.verify(message.vrSystemState);
                        if (error)
                            return "vrSystemState." + error;
                    }
                }
                if (message.taskState != null && message.hasOwnProperty("taskState")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        let error = $root.qyh.dataplane.TaskState.verify(message.taskState);
                        if (error)
                            return "taskState." + error;
                    }
                }
                if (message.actuatorState != null && message.hasOwnProperty("actuatorState")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        let error = $root.qyh.dataplane.ActuatorState.verify(message.actuatorState);
                        if (error)
                            return "actuatorState." + error;
                    }
                }
                if (message.basicState != null && message.hasOwnProperty("basicState")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        let error = $root.qyh.dataplane.BasicState.verify(message.basicState);
                        if (error)
                            return "basicState." + error;
                    }
                }
                if (message.error != null && message.hasOwnProperty("error")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        let error = $root.qyh.dataplane.Error.verify(message.error);
                        if (error)
                            return "error." + error;
                    }
                }
                if (message.modeChanged != null && message.hasOwnProperty("modeChanged")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        let error = $root.qyh.dataplane.ModeChangedNotification.verify(message.modeChanged);
                        if (error)
                            return "modeChanged." + error;
                    }
                }
                if (message.controlChanged != null && message.hasOwnProperty("controlChanged")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        let error = $root.qyh.dataplane.ControlChangedNotification.verify(message.controlChanged);
                        if (error)
                            return "controlChanged." + error;
                    }
                }
                if (message.emergencyStop != null && message.hasOwnProperty("emergencyStop")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        let error = $root.qyh.dataplane.EmergencyStopNotification.verify(message.emergencyStop);
                        if (error)
                            return "emergencyStop." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a WebSocketMessage message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.WebSocketMessage
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.WebSocketMessage} WebSocketMessage
             */
            WebSocketMessage.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.WebSocketMessage)
                    return object;
                let message = new $root.qyh.dataplane.WebSocketMessage();
                switch (object.type) {
                default:
                    if (typeof object.type === "number") {
                        message.type = object.type;
                        break;
                    }
                    break;
                case "MSG_UNKNOWN":
                case 0:
                    message.type = 0;
                    break;
                case "MSG_AUTH_REQUEST":
                case 1:
                    message.type = 1;
                    break;
                case "MSG_AUTH_RESPONSE":
                case 2:
                    message.type = 2;
                    break;
                case "MSG_SUBSCRIBE":
                case 16:
                    message.type = 16;
                    break;
                case "MSG_UNSUBSCRIBE":
                case 17:
                    message.type = 17;
                    break;
                case "MSG_HEARTBEAT":
                case 32:
                    message.type = 32;
                    break;
                case "MSG_HEARTBEAT_ACK":
                case 33:
                    message.type = 33;
                    break;
                case "MSG_VR_CONTROL":
                case 256:
                    message.type = 256;
                    break;
                case "MSG_CHASSIS_VELOCITY":
                case 257:
                    message.type = 257;
                    break;
                case "MSG_JOINT_COMMAND":
                case 258:
                    message.type = 258;
                    break;
                case "MSG_END_EFFECTOR_CMD":
                case 259:
                    message.type = 259;
                    break;
                case "MSG_GRIPPER_COMMAND":
                case 260:
                    message.type = 260;
                    break;
                case "MSG_NAVIGATION_GOAL":
                case 261:
                    message.type = 261;
                    break;
                case "MSG_NAVIGATION_CANCEL":
                case 262:
                    message.type = 262;
                    break;
                case "MSG_NAVIGATION_PAUSE":
                case 263:
                    message.type = 263;
                    break;
                case "MSG_NAVIGATION_RESUME":
                case 264:
                    message.type = 264;
                    break;
                case "MSG_LIFT_COMMAND":
                case 265:
                    message.type = 265;
                    break;
                case "MSG_WAIST_COMMAND":
                case 266:
                    message.type = 266;
                    break;
                case "MSG_HEAD_COMMAND":
                case 267:
                    message.type = 267;
                    break;
                case "MSG_ARM_MOVE":
                case 268:
                    message.type = 268;
                    break;
                case "MSG_ARM_JOG":
                case 269:
                    message.type = 269;
                    break;
                case "MSG_ROBOT_STATE":
                case 512:
                    message.type = 512;
                    break;
                case "MSG_JOINT_STATE":
                case 513:
                    message.type = 513;
                    break;
                case "MSG_ARM_STATE":
                case 514:
                    message.type = 514;
                    break;
                case "MSG_CHASSIS_STATE":
                case 515:
                    message.type = 515;
                    break;
                case "MSG_GRIPPER_STATE":
                case 516:
                    message.type = 516;
                    break;
                case "MSG_VR_SYSTEM_STATE":
                case 517:
                    message.type = 517;
                    break;
                case "MSG_TASK_STATE":
                case 518:
                    message.type = 518;
                    break;
                case "MSG_ACTUATOR_STATE":
                case 519:
                    message.type = 519;
                    break;
                case "MSG_BASIC_STATE":
                case 520:
                    message.type = 520;
                    break;
                case "MSG_ERROR":
                case 768:
                    message.type = 768;
                    break;
                case "MSG_MODE_CHANGED":
                case 1024:
                    message.type = 1024;
                    break;
                case "MSG_CONTROL_CHANGED":
                case 1025:
                    message.type = 1025;
                    break;
                case "MSG_EMERGENCY_STOP":
                case 1026:
                    message.type = 1026;
                    break;
                }
                if (object.sequence != null)
                    if ($util.Long)
                        (message.sequence = $util.Long.fromValue(object.sequence)).unsigned = true;
                    else if (typeof object.sequence === "string")
                        message.sequence = parseInt(object.sequence, 10);
                    else if (typeof object.sequence === "number")
                        message.sequence = object.sequence;
                    else if (typeof object.sequence === "object")
                        message.sequence = new $util.LongBits(object.sequence.low >>> 0, object.sequence.high >>> 0).toNumber(true);
                if (object.timestamp != null) {
                    if (typeof object.timestamp !== "object")
                        throw TypeError(".qyh.dataplane.WebSocketMessage.timestamp: object expected");
                    message.timestamp = $root.qyh.dataplane.Timestamp.fromObject(object.timestamp);
                }
                if (object.authRequest != null) {
                    if (typeof object.authRequest !== "object")
                        throw TypeError(".qyh.dataplane.WebSocketMessage.authRequest: object expected");
                    message.authRequest = $root.qyh.dataplane.AuthRequest.fromObject(object.authRequest);
                }
                if (object.authResponse != null) {
                    if (typeof object.authResponse !== "object")
                        throw TypeError(".qyh.dataplane.WebSocketMessage.authResponse: object expected");
                    message.authResponse = $root.qyh.dataplane.AuthResponse.fromObject(object.authResponse);
                }
                if (object.subscribe != null) {
                    if (typeof object.subscribe !== "object")
                        throw TypeError(".qyh.dataplane.WebSocketMessage.subscribe: object expected");
                    message.subscribe = $root.qyh.dataplane.SubscribeRequest.fromObject(object.subscribe);
                }
                if (object.unsubscribe != null) {
                    if (typeof object.unsubscribe !== "object")
                        throw TypeError(".qyh.dataplane.WebSocketMessage.unsubscribe: object expected");
                    message.unsubscribe = $root.qyh.dataplane.UnsubscribeRequest.fromObject(object.unsubscribe);
                }
                if (object.heartbeat != null) {
                    if (typeof object.heartbeat !== "object")
                        throw TypeError(".qyh.dataplane.WebSocketMessage.heartbeat: object expected");
                    message.heartbeat = $root.qyh.dataplane.Heartbeat.fromObject(object.heartbeat);
                }
                if (object.vrControl != null) {
                    if (typeof object.vrControl !== "object")
                        throw TypeError(".qyh.dataplane.WebSocketMessage.vrControl: object expected");
                    message.vrControl = $root.qyh.dataplane.VRControlIntent.fromObject(object.vrControl);
                }
                if (object.chassisVelocity != null) {
                    if (typeof object.chassisVelocity !== "object")
                        throw TypeError(".qyh.dataplane.WebSocketMessage.chassisVelocity: object expected");
                    message.chassisVelocity = $root.qyh.dataplane.ChassisVelocity.fromObject(object.chassisVelocity);
                }
                if (object.jointCommand != null) {
                    if (typeof object.jointCommand !== "object")
                        throw TypeError(".qyh.dataplane.WebSocketMessage.jointCommand: object expected");
                    message.jointCommand = $root.qyh.dataplane.JointCommand.fromObject(object.jointCommand);
                }
                if (object.endEffectorCmd != null) {
                    if (typeof object.endEffectorCmd !== "object")
                        throw TypeError(".qyh.dataplane.WebSocketMessage.endEffectorCmd: object expected");
                    message.endEffectorCmd = $root.qyh.dataplane.EndEffectorCommand.fromObject(object.endEffectorCmd);
                }
                if (object.gripperCommand != null) {
                    if (typeof object.gripperCommand !== "object")
                        throw TypeError(".qyh.dataplane.WebSocketMessage.gripperCommand: object expected");
                    message.gripperCommand = $root.qyh.dataplane.GripperCommand.fromObject(object.gripperCommand);
                }
                if (object.navigationGoal != null) {
                    if (typeof object.navigationGoal !== "object")
                        throw TypeError(".qyh.dataplane.WebSocketMessage.navigationGoal: object expected");
                    message.navigationGoal = $root.qyh.dataplane.NavigationGoal.fromObject(object.navigationGoal);
                }
                if (object.navigationControl != null) {
                    if (typeof object.navigationControl !== "object")
                        throw TypeError(".qyh.dataplane.WebSocketMessage.navigationControl: object expected");
                    message.navigationControl = $root.qyh.dataplane.NavigationControl.fromObject(object.navigationControl);
                }
                if (object.liftCommand != null) {
                    if (typeof object.liftCommand !== "object")
                        throw TypeError(".qyh.dataplane.WebSocketMessage.liftCommand: object expected");
                    message.liftCommand = $root.qyh.dataplane.LiftCommand.fromObject(object.liftCommand);
                }
                if (object.waistCommand != null) {
                    if (typeof object.waistCommand !== "object")
                        throw TypeError(".qyh.dataplane.WebSocketMessage.waistCommand: object expected");
                    message.waistCommand = $root.qyh.dataplane.WaistCommand.fromObject(object.waistCommand);
                }
                if (object.headCommand != null) {
                    if (typeof object.headCommand !== "object")
                        throw TypeError(".qyh.dataplane.WebSocketMessage.headCommand: object expected");
                    message.headCommand = $root.qyh.dataplane.HeadCommand.fromObject(object.headCommand);
                }
                if (object.armMove != null) {
                    if (typeof object.armMove !== "object")
                        throw TypeError(".qyh.dataplane.WebSocketMessage.armMove: object expected");
                    message.armMove = $root.qyh.dataplane.ArmMoveCommand.fromObject(object.armMove);
                }
                if (object.armJog != null) {
                    if (typeof object.armJog !== "object")
                        throw TypeError(".qyh.dataplane.WebSocketMessage.armJog: object expected");
                    message.armJog = $root.qyh.dataplane.ArmJogCommand.fromObject(object.armJog);
                }
                if (object.robotState != null) {
                    if (typeof object.robotState !== "object")
                        throw TypeError(".qyh.dataplane.WebSocketMessage.robotState: object expected");
                    message.robotState = $root.qyh.dataplane.RobotState.fromObject(object.robotState);
                }
                if (object.jointState != null) {
                    if (typeof object.jointState !== "object")
                        throw TypeError(".qyh.dataplane.WebSocketMessage.jointState: object expected");
                    message.jointState = $root.qyh.dataplane.JointState.fromObject(object.jointState);
                }
                if (object.armState != null) {
                    if (typeof object.armState !== "object")
                        throw TypeError(".qyh.dataplane.WebSocketMessage.armState: object expected");
                    message.armState = $root.qyh.dataplane.ArmState.fromObject(object.armState);
                }
                if (object.chassisState != null) {
                    if (typeof object.chassisState !== "object")
                        throw TypeError(".qyh.dataplane.WebSocketMessage.chassisState: object expected");
                    message.chassisState = $root.qyh.dataplane.ChassisState.fromObject(object.chassisState);
                }
                if (object.gripperState != null) {
                    if (typeof object.gripperState !== "object")
                        throw TypeError(".qyh.dataplane.WebSocketMessage.gripperState: object expected");
                    message.gripperState = $root.qyh.dataplane.GripperState.fromObject(object.gripperState);
                }
                if (object.vrSystemState != null) {
                    if (typeof object.vrSystemState !== "object")
                        throw TypeError(".qyh.dataplane.WebSocketMessage.vrSystemState: object expected");
                    message.vrSystemState = $root.qyh.dataplane.VRSystemState.fromObject(object.vrSystemState);
                }
                if (object.taskState != null) {
                    if (typeof object.taskState !== "object")
                        throw TypeError(".qyh.dataplane.WebSocketMessage.taskState: object expected");
                    message.taskState = $root.qyh.dataplane.TaskState.fromObject(object.taskState);
                }
                if (object.actuatorState != null) {
                    if (typeof object.actuatorState !== "object")
                        throw TypeError(".qyh.dataplane.WebSocketMessage.actuatorState: object expected");
                    message.actuatorState = $root.qyh.dataplane.ActuatorState.fromObject(object.actuatorState);
                }
                if (object.basicState != null) {
                    if (typeof object.basicState !== "object")
                        throw TypeError(".qyh.dataplane.WebSocketMessage.basicState: object expected");
                    message.basicState = $root.qyh.dataplane.BasicState.fromObject(object.basicState);
                }
                if (object.error != null) {
                    if (typeof object.error !== "object")
                        throw TypeError(".qyh.dataplane.WebSocketMessage.error: object expected");
                    message.error = $root.qyh.dataplane.Error.fromObject(object.error);
                }
                if (object.modeChanged != null) {
                    if (typeof object.modeChanged !== "object")
                        throw TypeError(".qyh.dataplane.WebSocketMessage.modeChanged: object expected");
                    message.modeChanged = $root.qyh.dataplane.ModeChangedNotification.fromObject(object.modeChanged);
                }
                if (object.controlChanged != null) {
                    if (typeof object.controlChanged !== "object")
                        throw TypeError(".qyh.dataplane.WebSocketMessage.controlChanged: object expected");
                    message.controlChanged = $root.qyh.dataplane.ControlChangedNotification.fromObject(object.controlChanged);
                }
                if (object.emergencyStop != null) {
                    if (typeof object.emergencyStop !== "object")
                        throw TypeError(".qyh.dataplane.WebSocketMessage.emergencyStop: object expected");
                    message.emergencyStop = $root.qyh.dataplane.EmergencyStopNotification.fromObject(object.emergencyStop);
                }
                return message;
            };

            /**
             * Creates a plain object from a WebSocketMessage message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.WebSocketMessage
             * @static
             * @param {qyh.dataplane.WebSocketMessage} message WebSocketMessage
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            WebSocketMessage.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.type = options.enums === String ? "MSG_UNKNOWN" : 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, true);
                        object.sequence = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.sequence = options.longs === String ? "0" : 0;
                    object.timestamp = null;
                }
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = options.enums === String ? $root.qyh.dataplane.MessageType[message.type] === undefined ? message.type : $root.qyh.dataplane.MessageType[message.type] : message.type;
                if (message.sequence != null && message.hasOwnProperty("sequence"))
                    if (typeof message.sequence === "number")
                        object.sequence = options.longs === String ? String(message.sequence) : message.sequence;
                    else
                        object.sequence = options.longs === String ? $util.Long.prototype.toString.call(message.sequence) : options.longs === Number ? new $util.LongBits(message.sequence.low >>> 0, message.sequence.high >>> 0).toNumber(true) : message.sequence;
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    object.timestamp = $root.qyh.dataplane.Timestamp.toObject(message.timestamp, options);
                if (message.authRequest != null && message.hasOwnProperty("authRequest")) {
                    object.authRequest = $root.qyh.dataplane.AuthRequest.toObject(message.authRequest, options);
                    if (options.oneofs)
                        object.payload = "authRequest";
                }
                if (message.authResponse != null && message.hasOwnProperty("authResponse")) {
                    object.authResponse = $root.qyh.dataplane.AuthResponse.toObject(message.authResponse, options);
                    if (options.oneofs)
                        object.payload = "authResponse";
                }
                if (message.subscribe != null && message.hasOwnProperty("subscribe")) {
                    object.subscribe = $root.qyh.dataplane.SubscribeRequest.toObject(message.subscribe, options);
                    if (options.oneofs)
                        object.payload = "subscribe";
                }
                if (message.unsubscribe != null && message.hasOwnProperty("unsubscribe")) {
                    object.unsubscribe = $root.qyh.dataplane.UnsubscribeRequest.toObject(message.unsubscribe, options);
                    if (options.oneofs)
                        object.payload = "unsubscribe";
                }
                if (message.heartbeat != null && message.hasOwnProperty("heartbeat")) {
                    object.heartbeat = $root.qyh.dataplane.Heartbeat.toObject(message.heartbeat, options);
                    if (options.oneofs)
                        object.payload = "heartbeat";
                }
                if (message.vrControl != null && message.hasOwnProperty("vrControl")) {
                    object.vrControl = $root.qyh.dataplane.VRControlIntent.toObject(message.vrControl, options);
                    if (options.oneofs)
                        object.payload = "vrControl";
                }
                if (message.chassisVelocity != null && message.hasOwnProperty("chassisVelocity")) {
                    object.chassisVelocity = $root.qyh.dataplane.ChassisVelocity.toObject(message.chassisVelocity, options);
                    if (options.oneofs)
                        object.payload = "chassisVelocity";
                }
                if (message.jointCommand != null && message.hasOwnProperty("jointCommand")) {
                    object.jointCommand = $root.qyh.dataplane.JointCommand.toObject(message.jointCommand, options);
                    if (options.oneofs)
                        object.payload = "jointCommand";
                }
                if (message.endEffectorCmd != null && message.hasOwnProperty("endEffectorCmd")) {
                    object.endEffectorCmd = $root.qyh.dataplane.EndEffectorCommand.toObject(message.endEffectorCmd, options);
                    if (options.oneofs)
                        object.payload = "endEffectorCmd";
                }
                if (message.gripperCommand != null && message.hasOwnProperty("gripperCommand")) {
                    object.gripperCommand = $root.qyh.dataplane.GripperCommand.toObject(message.gripperCommand, options);
                    if (options.oneofs)
                        object.payload = "gripperCommand";
                }
                if (message.navigationGoal != null && message.hasOwnProperty("navigationGoal")) {
                    object.navigationGoal = $root.qyh.dataplane.NavigationGoal.toObject(message.navigationGoal, options);
                    if (options.oneofs)
                        object.payload = "navigationGoal";
                }
                if (message.navigationControl != null && message.hasOwnProperty("navigationControl")) {
                    object.navigationControl = $root.qyh.dataplane.NavigationControl.toObject(message.navigationControl, options);
                    if (options.oneofs)
                        object.payload = "navigationControl";
                }
                if (message.liftCommand != null && message.hasOwnProperty("liftCommand")) {
                    object.liftCommand = $root.qyh.dataplane.LiftCommand.toObject(message.liftCommand, options);
                    if (options.oneofs)
                        object.payload = "liftCommand";
                }
                if (message.waistCommand != null && message.hasOwnProperty("waistCommand")) {
                    object.waistCommand = $root.qyh.dataplane.WaistCommand.toObject(message.waistCommand, options);
                    if (options.oneofs)
                        object.payload = "waistCommand";
                }
                if (message.headCommand != null && message.hasOwnProperty("headCommand")) {
                    object.headCommand = $root.qyh.dataplane.HeadCommand.toObject(message.headCommand, options);
                    if (options.oneofs)
                        object.payload = "headCommand";
                }
                if (message.armMove != null && message.hasOwnProperty("armMove")) {
                    object.armMove = $root.qyh.dataplane.ArmMoveCommand.toObject(message.armMove, options);
                    if (options.oneofs)
                        object.payload = "armMove";
                }
                if (message.armJog != null && message.hasOwnProperty("armJog")) {
                    object.armJog = $root.qyh.dataplane.ArmJogCommand.toObject(message.armJog, options);
                    if (options.oneofs)
                        object.payload = "armJog";
                }
                if (message.robotState != null && message.hasOwnProperty("robotState")) {
                    object.robotState = $root.qyh.dataplane.RobotState.toObject(message.robotState, options);
                    if (options.oneofs)
                        object.payload = "robotState";
                }
                if (message.jointState != null && message.hasOwnProperty("jointState")) {
                    object.jointState = $root.qyh.dataplane.JointState.toObject(message.jointState, options);
                    if (options.oneofs)
                        object.payload = "jointState";
                }
                if (message.armState != null && message.hasOwnProperty("armState")) {
                    object.armState = $root.qyh.dataplane.ArmState.toObject(message.armState, options);
                    if (options.oneofs)
                        object.payload = "armState";
                }
                if (message.chassisState != null && message.hasOwnProperty("chassisState")) {
                    object.chassisState = $root.qyh.dataplane.ChassisState.toObject(message.chassisState, options);
                    if (options.oneofs)
                        object.payload = "chassisState";
                }
                if (message.gripperState != null && message.hasOwnProperty("gripperState")) {
                    object.gripperState = $root.qyh.dataplane.GripperState.toObject(message.gripperState, options);
                    if (options.oneofs)
                        object.payload = "gripperState";
                }
                if (message.vrSystemState != null && message.hasOwnProperty("vrSystemState")) {
                    object.vrSystemState = $root.qyh.dataplane.VRSystemState.toObject(message.vrSystemState, options);
                    if (options.oneofs)
                        object.payload = "vrSystemState";
                }
                if (message.taskState != null && message.hasOwnProperty("taskState")) {
                    object.taskState = $root.qyh.dataplane.TaskState.toObject(message.taskState, options);
                    if (options.oneofs)
                        object.payload = "taskState";
                }
                if (message.actuatorState != null && message.hasOwnProperty("actuatorState")) {
                    object.actuatorState = $root.qyh.dataplane.ActuatorState.toObject(message.actuatorState, options);
                    if (options.oneofs)
                        object.payload = "actuatorState";
                }
                if (message.basicState != null && message.hasOwnProperty("basicState")) {
                    object.basicState = $root.qyh.dataplane.BasicState.toObject(message.basicState, options);
                    if (options.oneofs)
                        object.payload = "basicState";
                }
                if (message.error != null && message.hasOwnProperty("error")) {
                    object.error = $root.qyh.dataplane.Error.toObject(message.error, options);
                    if (options.oneofs)
                        object.payload = "error";
                }
                if (message.modeChanged != null && message.hasOwnProperty("modeChanged")) {
                    object.modeChanged = $root.qyh.dataplane.ModeChangedNotification.toObject(message.modeChanged, options);
                    if (options.oneofs)
                        object.payload = "modeChanged";
                }
                if (message.controlChanged != null && message.hasOwnProperty("controlChanged")) {
                    object.controlChanged = $root.qyh.dataplane.ControlChangedNotification.toObject(message.controlChanged, options);
                    if (options.oneofs)
                        object.payload = "controlChanged";
                }
                if (message.emergencyStop != null && message.hasOwnProperty("emergencyStop")) {
                    object.emergencyStop = $root.qyh.dataplane.EmergencyStopNotification.toObject(message.emergencyStop, options);
                    if (options.oneofs)
                        object.payload = "emergencyStop";
                }
                return object;
            };

            /**
             * Converts this WebSocketMessage to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.WebSocketMessage
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            WebSocketMessage.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for WebSocketMessage
             * @function getTypeUrl
             * @memberof qyh.dataplane.WebSocketMessage
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            WebSocketMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.WebSocketMessage";
            };

            return WebSocketMessage;
        })();

        dataplane.ModeChangedNotification = (function() {

            /**
             * Properties of a ModeChangedNotification.
             * @memberof qyh.dataplane
             * @interface IModeChangedNotification
             * @property {qyh.dataplane.IHeader|null} [header] ModeChangedNotification header
             * @property {qyh.dataplane.RobotMode|null} [oldMode] ModeChangedNotification oldMode
             * @property {qyh.dataplane.RobotMode|null} [newMode] ModeChangedNotification newMode
             * @property {string|null} [reason] ModeChangedNotification reason
             */

            /**
             * Constructs a new ModeChangedNotification.
             * @memberof qyh.dataplane
             * @classdesc Represents a ModeChangedNotification.
             * @implements IModeChangedNotification
             * @constructor
             * @param {qyh.dataplane.IModeChangedNotification=} [properties] Properties to set
             */
            function ModeChangedNotification(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ModeChangedNotification header.
             * @member {qyh.dataplane.IHeader|null|undefined} header
             * @memberof qyh.dataplane.ModeChangedNotification
             * @instance
             */
            ModeChangedNotification.prototype.header = null;

            /**
             * ModeChangedNotification oldMode.
             * @member {qyh.dataplane.RobotMode} oldMode
             * @memberof qyh.dataplane.ModeChangedNotification
             * @instance
             */
            ModeChangedNotification.prototype.oldMode = 0;

            /**
             * ModeChangedNotification newMode.
             * @member {qyh.dataplane.RobotMode} newMode
             * @memberof qyh.dataplane.ModeChangedNotification
             * @instance
             */
            ModeChangedNotification.prototype.newMode = 0;

            /**
             * ModeChangedNotification reason.
             * @member {string} reason
             * @memberof qyh.dataplane.ModeChangedNotification
             * @instance
             */
            ModeChangedNotification.prototype.reason = "";

            /**
             * Creates a new ModeChangedNotification instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.ModeChangedNotification
             * @static
             * @param {qyh.dataplane.IModeChangedNotification=} [properties] Properties to set
             * @returns {qyh.dataplane.ModeChangedNotification} ModeChangedNotification instance
             */
            ModeChangedNotification.create = function create(properties) {
                return new ModeChangedNotification(properties);
            };

            /**
             * Encodes the specified ModeChangedNotification message. Does not implicitly {@link qyh.dataplane.ModeChangedNotification.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.ModeChangedNotification
             * @static
             * @param {qyh.dataplane.IModeChangedNotification} message ModeChangedNotification message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ModeChangedNotification.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                    $root.qyh.dataplane.Header.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.oldMode != null && Object.hasOwnProperty.call(message, "oldMode"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.oldMode);
                if (message.newMode != null && Object.hasOwnProperty.call(message, "newMode"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.newMode);
                if (message.reason != null && Object.hasOwnProperty.call(message, "reason"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.reason);
                return writer;
            };

            /**
             * Encodes the specified ModeChangedNotification message, length delimited. Does not implicitly {@link qyh.dataplane.ModeChangedNotification.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.ModeChangedNotification
             * @static
             * @param {qyh.dataplane.IModeChangedNotification} message ModeChangedNotification message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ModeChangedNotification.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ModeChangedNotification message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.ModeChangedNotification
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.ModeChangedNotification} ModeChangedNotification
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ModeChangedNotification.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.ModeChangedNotification();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.header = $root.qyh.dataplane.Header.decode(reader, reader.uint32());
                            break;
                        }
                    case 2: {
                            message.oldMode = reader.int32();
                            break;
                        }
                    case 3: {
                            message.newMode = reader.int32();
                            break;
                        }
                    case 4: {
                            message.reason = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ModeChangedNotification message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.ModeChangedNotification
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.ModeChangedNotification} ModeChangedNotification
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ModeChangedNotification.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ModeChangedNotification message.
             * @function verify
             * @memberof qyh.dataplane.ModeChangedNotification
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ModeChangedNotification.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.header != null && message.hasOwnProperty("header")) {
                    let error = $root.qyh.dataplane.Header.verify(message.header);
                    if (error)
                        return "header." + error;
                }
                if (message.oldMode != null && message.hasOwnProperty("oldMode"))
                    switch (message.oldMode) {
                    default:
                        return "oldMode: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                        break;
                    }
                if (message.newMode != null && message.hasOwnProperty("newMode"))
                    switch (message.newMode) {
                    default:
                        return "newMode: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                        break;
                    }
                if (message.reason != null && message.hasOwnProperty("reason"))
                    if (!$util.isString(message.reason))
                        return "reason: string expected";
                return null;
            };

            /**
             * Creates a ModeChangedNotification message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.ModeChangedNotification
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.ModeChangedNotification} ModeChangedNotification
             */
            ModeChangedNotification.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.ModeChangedNotification)
                    return object;
                let message = new $root.qyh.dataplane.ModeChangedNotification();
                if (object.header != null) {
                    if (typeof object.header !== "object")
                        throw TypeError(".qyh.dataplane.ModeChangedNotification.header: object expected");
                    message.header = $root.qyh.dataplane.Header.fromObject(object.header);
                }
                switch (object.oldMode) {
                default:
                    if (typeof object.oldMode === "number") {
                        message.oldMode = object.oldMode;
                        break;
                    }
                    break;
                case "MODE_IDLE":
                case 0:
                    message.oldMode = 0;
                    break;
                case "MODE_TELEOP":
                case 1:
                    message.oldMode = 1;
                    break;
                case "MODE_AUTO":
                case 2:
                    message.oldMode = 2;
                    break;
                case "MODE_MAINTENANCE":
                case 3:
                    message.oldMode = 3;
                    break;
                case "MODE_ERROR":
                case 4:
                    message.oldMode = 4;
                    break;
                }
                switch (object.newMode) {
                default:
                    if (typeof object.newMode === "number") {
                        message.newMode = object.newMode;
                        break;
                    }
                    break;
                case "MODE_IDLE":
                case 0:
                    message.newMode = 0;
                    break;
                case "MODE_TELEOP":
                case 1:
                    message.newMode = 1;
                    break;
                case "MODE_AUTO":
                case 2:
                    message.newMode = 2;
                    break;
                case "MODE_MAINTENANCE":
                case 3:
                    message.newMode = 3;
                    break;
                case "MODE_ERROR":
                case 4:
                    message.newMode = 4;
                    break;
                }
                if (object.reason != null)
                    message.reason = String(object.reason);
                return message;
            };

            /**
             * Creates a plain object from a ModeChangedNotification message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.ModeChangedNotification
             * @static
             * @param {qyh.dataplane.ModeChangedNotification} message ModeChangedNotification
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ModeChangedNotification.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.header = null;
                    object.oldMode = options.enums === String ? "MODE_IDLE" : 0;
                    object.newMode = options.enums === String ? "MODE_IDLE" : 0;
                    object.reason = "";
                }
                if (message.header != null && message.hasOwnProperty("header"))
                    object.header = $root.qyh.dataplane.Header.toObject(message.header, options);
                if (message.oldMode != null && message.hasOwnProperty("oldMode"))
                    object.oldMode = options.enums === String ? $root.qyh.dataplane.RobotMode[message.oldMode] === undefined ? message.oldMode : $root.qyh.dataplane.RobotMode[message.oldMode] : message.oldMode;
                if (message.newMode != null && message.hasOwnProperty("newMode"))
                    object.newMode = options.enums === String ? $root.qyh.dataplane.RobotMode[message.newMode] === undefined ? message.newMode : $root.qyh.dataplane.RobotMode[message.newMode] : message.newMode;
                if (message.reason != null && message.hasOwnProperty("reason"))
                    object.reason = message.reason;
                return object;
            };

            /**
             * Converts this ModeChangedNotification to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.ModeChangedNotification
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ModeChangedNotification.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for ModeChangedNotification
             * @function getTypeUrl
             * @memberof qyh.dataplane.ModeChangedNotification
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ModeChangedNotification.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.ModeChangedNotification";
            };

            return ModeChangedNotification;
        })();

        dataplane.ControlChangedNotification = (function() {

            /**
             * Properties of a ControlChangedNotification.
             * @memberof qyh.dataplane
             * @interface IControlChangedNotification
             * @property {qyh.dataplane.IHeader|null} [header] ControlChangedNotification header
             * @property {boolean|null} [controlHeld] ControlChangedNotification controlHeld
             * @property {string|null} [holderUsername] ControlChangedNotification holderUsername
             * @property {number|Long|null} [holderUserId] ControlChangedNotification holderUserId
             * @property {string|null} [changeReason] ControlChangedNotification changeReason
             */

            /**
             * Constructs a new ControlChangedNotification.
             * @memberof qyh.dataplane
             * @classdesc Represents a ControlChangedNotification.
             * @implements IControlChangedNotification
             * @constructor
             * @param {qyh.dataplane.IControlChangedNotification=} [properties] Properties to set
             */
            function ControlChangedNotification(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ControlChangedNotification header.
             * @member {qyh.dataplane.IHeader|null|undefined} header
             * @memberof qyh.dataplane.ControlChangedNotification
             * @instance
             */
            ControlChangedNotification.prototype.header = null;

            /**
             * ControlChangedNotification controlHeld.
             * @member {boolean} controlHeld
             * @memberof qyh.dataplane.ControlChangedNotification
             * @instance
             */
            ControlChangedNotification.prototype.controlHeld = false;

            /**
             * ControlChangedNotification holderUsername.
             * @member {string} holderUsername
             * @memberof qyh.dataplane.ControlChangedNotification
             * @instance
             */
            ControlChangedNotification.prototype.holderUsername = "";

            /**
             * ControlChangedNotification holderUserId.
             * @member {number|Long} holderUserId
             * @memberof qyh.dataplane.ControlChangedNotification
             * @instance
             */
            ControlChangedNotification.prototype.holderUserId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * ControlChangedNotification changeReason.
             * @member {string} changeReason
             * @memberof qyh.dataplane.ControlChangedNotification
             * @instance
             */
            ControlChangedNotification.prototype.changeReason = "";

            /**
             * Creates a new ControlChangedNotification instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.ControlChangedNotification
             * @static
             * @param {qyh.dataplane.IControlChangedNotification=} [properties] Properties to set
             * @returns {qyh.dataplane.ControlChangedNotification} ControlChangedNotification instance
             */
            ControlChangedNotification.create = function create(properties) {
                return new ControlChangedNotification(properties);
            };

            /**
             * Encodes the specified ControlChangedNotification message. Does not implicitly {@link qyh.dataplane.ControlChangedNotification.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.ControlChangedNotification
             * @static
             * @param {qyh.dataplane.IControlChangedNotification} message ControlChangedNotification message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ControlChangedNotification.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                    $root.qyh.dataplane.Header.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.controlHeld != null && Object.hasOwnProperty.call(message, "controlHeld"))
                    writer.uint32(/* id 2, wireType 0 =*/16).bool(message.controlHeld);
                if (message.holderUsername != null && Object.hasOwnProperty.call(message, "holderUsername"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.holderUsername);
                if (message.holderUserId != null && Object.hasOwnProperty.call(message, "holderUserId"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int64(message.holderUserId);
                if (message.changeReason != null && Object.hasOwnProperty.call(message, "changeReason"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.changeReason);
                return writer;
            };

            /**
             * Encodes the specified ControlChangedNotification message, length delimited. Does not implicitly {@link qyh.dataplane.ControlChangedNotification.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.ControlChangedNotification
             * @static
             * @param {qyh.dataplane.IControlChangedNotification} message ControlChangedNotification message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ControlChangedNotification.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ControlChangedNotification message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.ControlChangedNotification
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.ControlChangedNotification} ControlChangedNotification
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ControlChangedNotification.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.ControlChangedNotification();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.header = $root.qyh.dataplane.Header.decode(reader, reader.uint32());
                            break;
                        }
                    case 2: {
                            message.controlHeld = reader.bool();
                            break;
                        }
                    case 3: {
                            message.holderUsername = reader.string();
                            break;
                        }
                    case 4: {
                            message.holderUserId = reader.int64();
                            break;
                        }
                    case 5: {
                            message.changeReason = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ControlChangedNotification message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.ControlChangedNotification
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.ControlChangedNotification} ControlChangedNotification
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ControlChangedNotification.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ControlChangedNotification message.
             * @function verify
             * @memberof qyh.dataplane.ControlChangedNotification
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ControlChangedNotification.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.header != null && message.hasOwnProperty("header")) {
                    let error = $root.qyh.dataplane.Header.verify(message.header);
                    if (error)
                        return "header." + error;
                }
                if (message.controlHeld != null && message.hasOwnProperty("controlHeld"))
                    if (typeof message.controlHeld !== "boolean")
                        return "controlHeld: boolean expected";
                if (message.holderUsername != null && message.hasOwnProperty("holderUsername"))
                    if (!$util.isString(message.holderUsername))
                        return "holderUsername: string expected";
                if (message.holderUserId != null && message.hasOwnProperty("holderUserId"))
                    if (!$util.isInteger(message.holderUserId) && !(message.holderUserId && $util.isInteger(message.holderUserId.low) && $util.isInteger(message.holderUserId.high)))
                        return "holderUserId: integer|Long expected";
                if (message.changeReason != null && message.hasOwnProperty("changeReason"))
                    if (!$util.isString(message.changeReason))
                        return "changeReason: string expected";
                return null;
            };

            /**
             * Creates a ControlChangedNotification message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.ControlChangedNotification
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.ControlChangedNotification} ControlChangedNotification
             */
            ControlChangedNotification.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.ControlChangedNotification)
                    return object;
                let message = new $root.qyh.dataplane.ControlChangedNotification();
                if (object.header != null) {
                    if (typeof object.header !== "object")
                        throw TypeError(".qyh.dataplane.ControlChangedNotification.header: object expected");
                    message.header = $root.qyh.dataplane.Header.fromObject(object.header);
                }
                if (object.controlHeld != null)
                    message.controlHeld = Boolean(object.controlHeld);
                if (object.holderUsername != null)
                    message.holderUsername = String(object.holderUsername);
                if (object.holderUserId != null)
                    if ($util.Long)
                        (message.holderUserId = $util.Long.fromValue(object.holderUserId)).unsigned = false;
                    else if (typeof object.holderUserId === "string")
                        message.holderUserId = parseInt(object.holderUserId, 10);
                    else if (typeof object.holderUserId === "number")
                        message.holderUserId = object.holderUserId;
                    else if (typeof object.holderUserId === "object")
                        message.holderUserId = new $util.LongBits(object.holderUserId.low >>> 0, object.holderUserId.high >>> 0).toNumber();
                if (object.changeReason != null)
                    message.changeReason = String(object.changeReason);
                return message;
            };

            /**
             * Creates a plain object from a ControlChangedNotification message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.ControlChangedNotification
             * @static
             * @param {qyh.dataplane.ControlChangedNotification} message ControlChangedNotification
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ControlChangedNotification.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.header = null;
                    object.controlHeld = false;
                    object.holderUsername = "";
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.holderUserId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.holderUserId = options.longs === String ? "0" : 0;
                    object.changeReason = "";
                }
                if (message.header != null && message.hasOwnProperty("header"))
                    object.header = $root.qyh.dataplane.Header.toObject(message.header, options);
                if (message.controlHeld != null && message.hasOwnProperty("controlHeld"))
                    object.controlHeld = message.controlHeld;
                if (message.holderUsername != null && message.hasOwnProperty("holderUsername"))
                    object.holderUsername = message.holderUsername;
                if (message.holderUserId != null && message.hasOwnProperty("holderUserId"))
                    if (typeof message.holderUserId === "number")
                        object.holderUserId = options.longs === String ? String(message.holderUserId) : message.holderUserId;
                    else
                        object.holderUserId = options.longs === String ? $util.Long.prototype.toString.call(message.holderUserId) : options.longs === Number ? new $util.LongBits(message.holderUserId.low >>> 0, message.holderUserId.high >>> 0).toNumber() : message.holderUserId;
                if (message.changeReason != null && message.hasOwnProperty("changeReason"))
                    object.changeReason = message.changeReason;
                return object;
            };

            /**
             * Converts this ControlChangedNotification to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.ControlChangedNotification
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ControlChangedNotification.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for ControlChangedNotification
             * @function getTypeUrl
             * @memberof qyh.dataplane.ControlChangedNotification
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ControlChangedNotification.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.ControlChangedNotification";
            };

            return ControlChangedNotification;
        })();

        dataplane.EmergencyStopNotification = (function() {

            /**
             * Properties of an EmergencyStopNotification.
             * @memberof qyh.dataplane
             * @interface IEmergencyStopNotification
             * @property {qyh.dataplane.IHeader|null} [header] EmergencyStopNotification header
             * @property {boolean|null} [active] EmergencyStopNotification active
             * @property {string|null} [source] EmergencyStopNotification source
             * @property {string|null} [reason] EmergencyStopNotification reason
             */

            /**
             * Constructs a new EmergencyStopNotification.
             * @memberof qyh.dataplane
             * @classdesc Represents an EmergencyStopNotification.
             * @implements IEmergencyStopNotification
             * @constructor
             * @param {qyh.dataplane.IEmergencyStopNotification=} [properties] Properties to set
             */
            function EmergencyStopNotification(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * EmergencyStopNotification header.
             * @member {qyh.dataplane.IHeader|null|undefined} header
             * @memberof qyh.dataplane.EmergencyStopNotification
             * @instance
             */
            EmergencyStopNotification.prototype.header = null;

            /**
             * EmergencyStopNotification active.
             * @member {boolean} active
             * @memberof qyh.dataplane.EmergencyStopNotification
             * @instance
             */
            EmergencyStopNotification.prototype.active = false;

            /**
             * EmergencyStopNotification source.
             * @member {string} source
             * @memberof qyh.dataplane.EmergencyStopNotification
             * @instance
             */
            EmergencyStopNotification.prototype.source = "";

            /**
             * EmergencyStopNotification reason.
             * @member {string} reason
             * @memberof qyh.dataplane.EmergencyStopNotification
             * @instance
             */
            EmergencyStopNotification.prototype.reason = "";

            /**
             * Creates a new EmergencyStopNotification instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.EmergencyStopNotification
             * @static
             * @param {qyh.dataplane.IEmergencyStopNotification=} [properties] Properties to set
             * @returns {qyh.dataplane.EmergencyStopNotification} EmergencyStopNotification instance
             */
            EmergencyStopNotification.create = function create(properties) {
                return new EmergencyStopNotification(properties);
            };

            /**
             * Encodes the specified EmergencyStopNotification message. Does not implicitly {@link qyh.dataplane.EmergencyStopNotification.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.EmergencyStopNotification
             * @static
             * @param {qyh.dataplane.IEmergencyStopNotification} message EmergencyStopNotification message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            EmergencyStopNotification.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                    $root.qyh.dataplane.Header.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.active != null && Object.hasOwnProperty.call(message, "active"))
                    writer.uint32(/* id 2, wireType 0 =*/16).bool(message.active);
                if (message.source != null && Object.hasOwnProperty.call(message, "source"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.source);
                if (message.reason != null && Object.hasOwnProperty.call(message, "reason"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.reason);
                return writer;
            };

            /**
             * Encodes the specified EmergencyStopNotification message, length delimited. Does not implicitly {@link qyh.dataplane.EmergencyStopNotification.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.EmergencyStopNotification
             * @static
             * @param {qyh.dataplane.IEmergencyStopNotification} message EmergencyStopNotification message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            EmergencyStopNotification.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an EmergencyStopNotification message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.EmergencyStopNotification
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.EmergencyStopNotification} EmergencyStopNotification
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            EmergencyStopNotification.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.EmergencyStopNotification();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.header = $root.qyh.dataplane.Header.decode(reader, reader.uint32());
                            break;
                        }
                    case 2: {
                            message.active = reader.bool();
                            break;
                        }
                    case 3: {
                            message.source = reader.string();
                            break;
                        }
                    case 4: {
                            message.reason = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an EmergencyStopNotification message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.EmergencyStopNotification
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.EmergencyStopNotification} EmergencyStopNotification
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            EmergencyStopNotification.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an EmergencyStopNotification message.
             * @function verify
             * @memberof qyh.dataplane.EmergencyStopNotification
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            EmergencyStopNotification.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.header != null && message.hasOwnProperty("header")) {
                    let error = $root.qyh.dataplane.Header.verify(message.header);
                    if (error)
                        return "header." + error;
                }
                if (message.active != null && message.hasOwnProperty("active"))
                    if (typeof message.active !== "boolean")
                        return "active: boolean expected";
                if (message.source != null && message.hasOwnProperty("source"))
                    if (!$util.isString(message.source))
                        return "source: string expected";
                if (message.reason != null && message.hasOwnProperty("reason"))
                    if (!$util.isString(message.reason))
                        return "reason: string expected";
                return null;
            };

            /**
             * Creates an EmergencyStopNotification message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.EmergencyStopNotification
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.EmergencyStopNotification} EmergencyStopNotification
             */
            EmergencyStopNotification.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.EmergencyStopNotification)
                    return object;
                let message = new $root.qyh.dataplane.EmergencyStopNotification();
                if (object.header != null) {
                    if (typeof object.header !== "object")
                        throw TypeError(".qyh.dataplane.EmergencyStopNotification.header: object expected");
                    message.header = $root.qyh.dataplane.Header.fromObject(object.header);
                }
                if (object.active != null)
                    message.active = Boolean(object.active);
                if (object.source != null)
                    message.source = String(object.source);
                if (object.reason != null)
                    message.reason = String(object.reason);
                return message;
            };

            /**
             * Creates a plain object from an EmergencyStopNotification message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.EmergencyStopNotification
             * @static
             * @param {qyh.dataplane.EmergencyStopNotification} message EmergencyStopNotification
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            EmergencyStopNotification.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.header = null;
                    object.active = false;
                    object.source = "";
                    object.reason = "";
                }
                if (message.header != null && message.hasOwnProperty("header"))
                    object.header = $root.qyh.dataplane.Header.toObject(message.header, options);
                if (message.active != null && message.hasOwnProperty("active"))
                    object.active = message.active;
                if (message.source != null && message.hasOwnProperty("source"))
                    object.source = message.source;
                if (message.reason != null && message.hasOwnProperty("reason"))
                    object.reason = message.reason;
                return object;
            };

            /**
             * Converts this EmergencyStopNotification to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.EmergencyStopNotification
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            EmergencyStopNotification.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for EmergencyStopNotification
             * @function getTypeUrl
             * @memberof qyh.dataplane.EmergencyStopNotification
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            EmergencyStopNotification.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.EmergencyStopNotification";
            };

            return EmergencyStopNotification;
        })();

        dataplane.JointState = (function() {

            /**
             * Properties of a JointState.
             * @memberof qyh.dataplane
             * @interface IJointState
             * @property {qyh.dataplane.IHeader|null} [header] JointState header
             * @property {Array.<string>|null} [names] JointState names
             * @property {Array.<number>|null} [positions] JointState positions
             * @property {Array.<number>|null} [velocities] JointState velocities
             * @property {Array.<number>|null} [efforts] JointState efforts
             */

            /**
             * Constructs a new JointState.
             * @memberof qyh.dataplane
             * @classdesc Represents a JointState.
             * @implements IJointState
             * @constructor
             * @param {qyh.dataplane.IJointState=} [properties] Properties to set
             */
            function JointState(properties) {
                this.names = [];
                this.positions = [];
                this.velocities = [];
                this.efforts = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * JointState header.
             * @member {qyh.dataplane.IHeader|null|undefined} header
             * @memberof qyh.dataplane.JointState
             * @instance
             */
            JointState.prototype.header = null;

            /**
             * JointState names.
             * @member {Array.<string>} names
             * @memberof qyh.dataplane.JointState
             * @instance
             */
            JointState.prototype.names = $util.emptyArray;

            /**
             * JointState positions.
             * @member {Array.<number>} positions
             * @memberof qyh.dataplane.JointState
             * @instance
             */
            JointState.prototype.positions = $util.emptyArray;

            /**
             * JointState velocities.
             * @member {Array.<number>} velocities
             * @memberof qyh.dataplane.JointState
             * @instance
             */
            JointState.prototype.velocities = $util.emptyArray;

            /**
             * JointState efforts.
             * @member {Array.<number>} efforts
             * @memberof qyh.dataplane.JointState
             * @instance
             */
            JointState.prototype.efforts = $util.emptyArray;

            /**
             * Creates a new JointState instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.JointState
             * @static
             * @param {qyh.dataplane.IJointState=} [properties] Properties to set
             * @returns {qyh.dataplane.JointState} JointState instance
             */
            JointState.create = function create(properties) {
                return new JointState(properties);
            };

            /**
             * Encodes the specified JointState message. Does not implicitly {@link qyh.dataplane.JointState.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.JointState
             * @static
             * @param {qyh.dataplane.IJointState} message JointState message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            JointState.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                    $root.qyh.dataplane.Header.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.names != null && message.names.length)
                    for (let i = 0; i < message.names.length; ++i)
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.names[i]);
                if (message.positions != null && message.positions.length) {
                    writer.uint32(/* id 3, wireType 2 =*/26).fork();
                    for (let i = 0; i < message.positions.length; ++i)
                        writer.double(message.positions[i]);
                    writer.ldelim();
                }
                if (message.velocities != null && message.velocities.length) {
                    writer.uint32(/* id 4, wireType 2 =*/34).fork();
                    for (let i = 0; i < message.velocities.length; ++i)
                        writer.double(message.velocities[i]);
                    writer.ldelim();
                }
                if (message.efforts != null && message.efforts.length) {
                    writer.uint32(/* id 5, wireType 2 =*/42).fork();
                    for (let i = 0; i < message.efforts.length; ++i)
                        writer.double(message.efforts[i]);
                    writer.ldelim();
                }
                return writer;
            };

            /**
             * Encodes the specified JointState message, length delimited. Does not implicitly {@link qyh.dataplane.JointState.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.JointState
             * @static
             * @param {qyh.dataplane.IJointState} message JointState message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            JointState.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a JointState message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.JointState
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.JointState} JointState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            JointState.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.JointState();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.header = $root.qyh.dataplane.Header.decode(reader, reader.uint32());
                            break;
                        }
                    case 2: {
                            if (!(message.names && message.names.length))
                                message.names = [];
                            message.names.push(reader.string());
                            break;
                        }
                    case 3: {
                            if (!(message.positions && message.positions.length))
                                message.positions = [];
                            if ((tag & 7) === 2) {
                                let end2 = reader.uint32() + reader.pos;
                                while (reader.pos < end2)
                                    message.positions.push(reader.double());
                            } else
                                message.positions.push(reader.double());
                            break;
                        }
                    case 4: {
                            if (!(message.velocities && message.velocities.length))
                                message.velocities = [];
                            if ((tag & 7) === 2) {
                                let end2 = reader.uint32() + reader.pos;
                                while (reader.pos < end2)
                                    message.velocities.push(reader.double());
                            } else
                                message.velocities.push(reader.double());
                            break;
                        }
                    case 5: {
                            if (!(message.efforts && message.efforts.length))
                                message.efforts = [];
                            if ((tag & 7) === 2) {
                                let end2 = reader.uint32() + reader.pos;
                                while (reader.pos < end2)
                                    message.efforts.push(reader.double());
                            } else
                                message.efforts.push(reader.double());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a JointState message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.JointState
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.JointState} JointState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            JointState.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a JointState message.
             * @function verify
             * @memberof qyh.dataplane.JointState
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            JointState.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.header != null && message.hasOwnProperty("header")) {
                    let error = $root.qyh.dataplane.Header.verify(message.header);
                    if (error)
                        return "header." + error;
                }
                if (message.names != null && message.hasOwnProperty("names")) {
                    if (!Array.isArray(message.names))
                        return "names: array expected";
                    for (let i = 0; i < message.names.length; ++i)
                        if (!$util.isString(message.names[i]))
                            return "names: string[] expected";
                }
                if (message.positions != null && message.hasOwnProperty("positions")) {
                    if (!Array.isArray(message.positions))
                        return "positions: array expected";
                    for (let i = 0; i < message.positions.length; ++i)
                        if (typeof message.positions[i] !== "number")
                            return "positions: number[] expected";
                }
                if (message.velocities != null && message.hasOwnProperty("velocities")) {
                    if (!Array.isArray(message.velocities))
                        return "velocities: array expected";
                    for (let i = 0; i < message.velocities.length; ++i)
                        if (typeof message.velocities[i] !== "number")
                            return "velocities: number[] expected";
                }
                if (message.efforts != null && message.hasOwnProperty("efforts")) {
                    if (!Array.isArray(message.efforts))
                        return "efforts: array expected";
                    for (let i = 0; i < message.efforts.length; ++i)
                        if (typeof message.efforts[i] !== "number")
                            return "efforts: number[] expected";
                }
                return null;
            };

            /**
             * Creates a JointState message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.JointState
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.JointState} JointState
             */
            JointState.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.JointState)
                    return object;
                let message = new $root.qyh.dataplane.JointState();
                if (object.header != null) {
                    if (typeof object.header !== "object")
                        throw TypeError(".qyh.dataplane.JointState.header: object expected");
                    message.header = $root.qyh.dataplane.Header.fromObject(object.header);
                }
                if (object.names) {
                    if (!Array.isArray(object.names))
                        throw TypeError(".qyh.dataplane.JointState.names: array expected");
                    message.names = [];
                    for (let i = 0; i < object.names.length; ++i)
                        message.names[i] = String(object.names[i]);
                }
                if (object.positions) {
                    if (!Array.isArray(object.positions))
                        throw TypeError(".qyh.dataplane.JointState.positions: array expected");
                    message.positions = [];
                    for (let i = 0; i < object.positions.length; ++i)
                        message.positions[i] = Number(object.positions[i]);
                }
                if (object.velocities) {
                    if (!Array.isArray(object.velocities))
                        throw TypeError(".qyh.dataplane.JointState.velocities: array expected");
                    message.velocities = [];
                    for (let i = 0; i < object.velocities.length; ++i)
                        message.velocities[i] = Number(object.velocities[i]);
                }
                if (object.efforts) {
                    if (!Array.isArray(object.efforts))
                        throw TypeError(".qyh.dataplane.JointState.efforts: array expected");
                    message.efforts = [];
                    for (let i = 0; i < object.efforts.length; ++i)
                        message.efforts[i] = Number(object.efforts[i]);
                }
                return message;
            };

            /**
             * Creates a plain object from a JointState message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.JointState
             * @static
             * @param {qyh.dataplane.JointState} message JointState
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            JointState.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults) {
                    object.names = [];
                    object.positions = [];
                    object.velocities = [];
                    object.efforts = [];
                }
                if (options.defaults)
                    object.header = null;
                if (message.header != null && message.hasOwnProperty("header"))
                    object.header = $root.qyh.dataplane.Header.toObject(message.header, options);
                if (message.names && message.names.length) {
                    object.names = [];
                    for (let j = 0; j < message.names.length; ++j)
                        object.names[j] = message.names[j];
                }
                if (message.positions && message.positions.length) {
                    object.positions = [];
                    for (let j = 0; j < message.positions.length; ++j)
                        object.positions[j] = options.json && !isFinite(message.positions[j]) ? String(message.positions[j]) : message.positions[j];
                }
                if (message.velocities && message.velocities.length) {
                    object.velocities = [];
                    for (let j = 0; j < message.velocities.length; ++j)
                        object.velocities[j] = options.json && !isFinite(message.velocities[j]) ? String(message.velocities[j]) : message.velocities[j];
                }
                if (message.efforts && message.efforts.length) {
                    object.efforts = [];
                    for (let j = 0; j < message.efforts.length; ++j)
                        object.efforts[j] = options.json && !isFinite(message.efforts[j]) ? String(message.efforts[j]) : message.efforts[j];
                }
                return object;
            };

            /**
             * Converts this JointState to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.JointState
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            JointState.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for JointState
             * @function getTypeUrl
             * @memberof qyh.dataplane.JointState
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            JointState.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.JointState";
            };

            return JointState;
        })();

        dataplane.ArmState = (function() {

            /**
             * Properties of an ArmState.
             * @memberof qyh.dataplane
             * @interface IArmState
             * @property {qyh.dataplane.IHeader|null} [header] ArmState header
             * @property {boolean|null} [connected] ArmState connected
             * @property {boolean|null} [poweredOn] ArmState poweredOn
             * @property {boolean|null} [enabled] ArmState enabled
             * @property {boolean|null} [inEstop] ArmState inEstop
             * @property {boolean|null} [inError] ArmState inError
             * @property {boolean|null} [servoMode] ArmState servoMode
             * @property {string|null} [errorMessage] ArmState errorMessage
             * @property {Array.<number>|null} [leftPositions] ArmState leftPositions
             * @property {Array.<number>|null} [rightPositions] ArmState rightPositions
             * @property {qyh.dataplane.IPose|null} [leftEndEffector] ArmState leftEndEffector
             * @property {qyh.dataplane.IPose|null} [rightEndEffector] ArmState rightEndEffector
             * @property {boolean|null} [leftInPosition] ArmState leftInPosition
             * @property {boolean|null} [rightInPosition] ArmState rightInPosition
             */

            /**
             * Constructs a new ArmState.
             * @memberof qyh.dataplane
             * @classdesc Represents an ArmState.
             * @implements IArmState
             * @constructor
             * @param {qyh.dataplane.IArmState=} [properties] Properties to set
             */
            function ArmState(properties) {
                this.leftPositions = [];
                this.rightPositions = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ArmState header.
             * @member {qyh.dataplane.IHeader|null|undefined} header
             * @memberof qyh.dataplane.ArmState
             * @instance
             */
            ArmState.prototype.header = null;

            /**
             * ArmState connected.
             * @member {boolean} connected
             * @memberof qyh.dataplane.ArmState
             * @instance
             */
            ArmState.prototype.connected = false;

            /**
             * ArmState poweredOn.
             * @member {boolean} poweredOn
             * @memberof qyh.dataplane.ArmState
             * @instance
             */
            ArmState.prototype.poweredOn = false;

            /**
             * ArmState enabled.
             * @member {boolean} enabled
             * @memberof qyh.dataplane.ArmState
             * @instance
             */
            ArmState.prototype.enabled = false;

            /**
             * ArmState inEstop.
             * @member {boolean} inEstop
             * @memberof qyh.dataplane.ArmState
             * @instance
             */
            ArmState.prototype.inEstop = false;

            /**
             * ArmState inError.
             * @member {boolean} inError
             * @memberof qyh.dataplane.ArmState
             * @instance
             */
            ArmState.prototype.inError = false;

            /**
             * ArmState servoMode.
             * @member {boolean} servoMode
             * @memberof qyh.dataplane.ArmState
             * @instance
             */
            ArmState.prototype.servoMode = false;

            /**
             * ArmState errorMessage.
             * @member {string} errorMessage
             * @memberof qyh.dataplane.ArmState
             * @instance
             */
            ArmState.prototype.errorMessage = "";

            /**
             * ArmState leftPositions.
             * @member {Array.<number>} leftPositions
             * @memberof qyh.dataplane.ArmState
             * @instance
             */
            ArmState.prototype.leftPositions = $util.emptyArray;

            /**
             * ArmState rightPositions.
             * @member {Array.<number>} rightPositions
             * @memberof qyh.dataplane.ArmState
             * @instance
             */
            ArmState.prototype.rightPositions = $util.emptyArray;

            /**
             * ArmState leftEndEffector.
             * @member {qyh.dataplane.IPose|null|undefined} leftEndEffector
             * @memberof qyh.dataplane.ArmState
             * @instance
             */
            ArmState.prototype.leftEndEffector = null;

            /**
             * ArmState rightEndEffector.
             * @member {qyh.dataplane.IPose|null|undefined} rightEndEffector
             * @memberof qyh.dataplane.ArmState
             * @instance
             */
            ArmState.prototype.rightEndEffector = null;

            /**
             * ArmState leftInPosition.
             * @member {boolean} leftInPosition
             * @memberof qyh.dataplane.ArmState
             * @instance
             */
            ArmState.prototype.leftInPosition = false;

            /**
             * ArmState rightInPosition.
             * @member {boolean} rightInPosition
             * @memberof qyh.dataplane.ArmState
             * @instance
             */
            ArmState.prototype.rightInPosition = false;

            /**
             * Creates a new ArmState instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.ArmState
             * @static
             * @param {qyh.dataplane.IArmState=} [properties] Properties to set
             * @returns {qyh.dataplane.ArmState} ArmState instance
             */
            ArmState.create = function create(properties) {
                return new ArmState(properties);
            };

            /**
             * Encodes the specified ArmState message. Does not implicitly {@link qyh.dataplane.ArmState.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.ArmState
             * @static
             * @param {qyh.dataplane.IArmState} message ArmState message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ArmState.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                    $root.qyh.dataplane.Header.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.connected != null && Object.hasOwnProperty.call(message, "connected"))
                    writer.uint32(/* id 2, wireType 0 =*/16).bool(message.connected);
                if (message.poweredOn != null && Object.hasOwnProperty.call(message, "poweredOn"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.poweredOn);
                if (message.enabled != null && Object.hasOwnProperty.call(message, "enabled"))
                    writer.uint32(/* id 4, wireType 0 =*/32).bool(message.enabled);
                if (message.inEstop != null && Object.hasOwnProperty.call(message, "inEstop"))
                    writer.uint32(/* id 5, wireType 0 =*/40).bool(message.inEstop);
                if (message.inError != null && Object.hasOwnProperty.call(message, "inError"))
                    writer.uint32(/* id 6, wireType 0 =*/48).bool(message.inError);
                if (message.servoMode != null && Object.hasOwnProperty.call(message, "servoMode"))
                    writer.uint32(/* id 7, wireType 0 =*/56).bool(message.servoMode);
                if (message.errorMessage != null && Object.hasOwnProperty.call(message, "errorMessage"))
                    writer.uint32(/* id 8, wireType 2 =*/66).string(message.errorMessage);
                if (message.leftPositions != null && message.leftPositions.length) {
                    writer.uint32(/* id 9, wireType 2 =*/74).fork();
                    for (let i = 0; i < message.leftPositions.length; ++i)
                        writer.double(message.leftPositions[i]);
                    writer.ldelim();
                }
                if (message.rightPositions != null && message.rightPositions.length) {
                    writer.uint32(/* id 10, wireType 2 =*/82).fork();
                    for (let i = 0; i < message.rightPositions.length; ++i)
                        writer.double(message.rightPositions[i]);
                    writer.ldelim();
                }
                if (message.leftEndEffector != null && Object.hasOwnProperty.call(message, "leftEndEffector"))
                    $root.qyh.dataplane.Pose.encode(message.leftEndEffector, writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
                if (message.rightEndEffector != null && Object.hasOwnProperty.call(message, "rightEndEffector"))
                    $root.qyh.dataplane.Pose.encode(message.rightEndEffector, writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
                if (message.leftInPosition != null && Object.hasOwnProperty.call(message, "leftInPosition"))
                    writer.uint32(/* id 13, wireType 0 =*/104).bool(message.leftInPosition);
                if (message.rightInPosition != null && Object.hasOwnProperty.call(message, "rightInPosition"))
                    writer.uint32(/* id 14, wireType 0 =*/112).bool(message.rightInPosition);
                return writer;
            };

            /**
             * Encodes the specified ArmState message, length delimited. Does not implicitly {@link qyh.dataplane.ArmState.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.ArmState
             * @static
             * @param {qyh.dataplane.IArmState} message ArmState message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ArmState.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an ArmState message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.ArmState
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.ArmState} ArmState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ArmState.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.ArmState();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.header = $root.qyh.dataplane.Header.decode(reader, reader.uint32());
                            break;
                        }
                    case 2: {
                            message.connected = reader.bool();
                            break;
                        }
                    case 3: {
                            message.poweredOn = reader.bool();
                            break;
                        }
                    case 4: {
                            message.enabled = reader.bool();
                            break;
                        }
                    case 5: {
                            message.inEstop = reader.bool();
                            break;
                        }
                    case 6: {
                            message.inError = reader.bool();
                            break;
                        }
                    case 7: {
                            message.servoMode = reader.bool();
                            break;
                        }
                    case 8: {
                            message.errorMessage = reader.string();
                            break;
                        }
                    case 9: {
                            if (!(message.leftPositions && message.leftPositions.length))
                                message.leftPositions = [];
                            if ((tag & 7) === 2) {
                                let end2 = reader.uint32() + reader.pos;
                                while (reader.pos < end2)
                                    message.leftPositions.push(reader.double());
                            } else
                                message.leftPositions.push(reader.double());
                            break;
                        }
                    case 10: {
                            if (!(message.rightPositions && message.rightPositions.length))
                                message.rightPositions = [];
                            if ((tag & 7) === 2) {
                                let end2 = reader.uint32() + reader.pos;
                                while (reader.pos < end2)
                                    message.rightPositions.push(reader.double());
                            } else
                                message.rightPositions.push(reader.double());
                            break;
                        }
                    case 11: {
                            message.leftEndEffector = $root.qyh.dataplane.Pose.decode(reader, reader.uint32());
                            break;
                        }
                    case 12: {
                            message.rightEndEffector = $root.qyh.dataplane.Pose.decode(reader, reader.uint32());
                            break;
                        }
                    case 13: {
                            message.leftInPosition = reader.bool();
                            break;
                        }
                    case 14: {
                            message.rightInPosition = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an ArmState message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.ArmState
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.ArmState} ArmState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ArmState.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an ArmState message.
             * @function verify
             * @memberof qyh.dataplane.ArmState
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ArmState.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.header != null && message.hasOwnProperty("header")) {
                    let error = $root.qyh.dataplane.Header.verify(message.header);
                    if (error)
                        return "header." + error;
                }
                if (message.connected != null && message.hasOwnProperty("connected"))
                    if (typeof message.connected !== "boolean")
                        return "connected: boolean expected";
                if (message.poweredOn != null && message.hasOwnProperty("poweredOn"))
                    if (typeof message.poweredOn !== "boolean")
                        return "poweredOn: boolean expected";
                if (message.enabled != null && message.hasOwnProperty("enabled"))
                    if (typeof message.enabled !== "boolean")
                        return "enabled: boolean expected";
                if (message.inEstop != null && message.hasOwnProperty("inEstop"))
                    if (typeof message.inEstop !== "boolean")
                        return "inEstop: boolean expected";
                if (message.inError != null && message.hasOwnProperty("inError"))
                    if (typeof message.inError !== "boolean")
                        return "inError: boolean expected";
                if (message.servoMode != null && message.hasOwnProperty("servoMode"))
                    if (typeof message.servoMode !== "boolean")
                        return "servoMode: boolean expected";
                if (message.errorMessage != null && message.hasOwnProperty("errorMessage"))
                    if (!$util.isString(message.errorMessage))
                        return "errorMessage: string expected";
                if (message.leftPositions != null && message.hasOwnProperty("leftPositions")) {
                    if (!Array.isArray(message.leftPositions))
                        return "leftPositions: array expected";
                    for (let i = 0; i < message.leftPositions.length; ++i)
                        if (typeof message.leftPositions[i] !== "number")
                            return "leftPositions: number[] expected";
                }
                if (message.rightPositions != null && message.hasOwnProperty("rightPositions")) {
                    if (!Array.isArray(message.rightPositions))
                        return "rightPositions: array expected";
                    for (let i = 0; i < message.rightPositions.length; ++i)
                        if (typeof message.rightPositions[i] !== "number")
                            return "rightPositions: number[] expected";
                }
                if (message.leftEndEffector != null && message.hasOwnProperty("leftEndEffector")) {
                    let error = $root.qyh.dataplane.Pose.verify(message.leftEndEffector);
                    if (error)
                        return "leftEndEffector." + error;
                }
                if (message.rightEndEffector != null && message.hasOwnProperty("rightEndEffector")) {
                    let error = $root.qyh.dataplane.Pose.verify(message.rightEndEffector);
                    if (error)
                        return "rightEndEffector." + error;
                }
                if (message.leftInPosition != null && message.hasOwnProperty("leftInPosition"))
                    if (typeof message.leftInPosition !== "boolean")
                        return "leftInPosition: boolean expected";
                if (message.rightInPosition != null && message.hasOwnProperty("rightInPosition"))
                    if (typeof message.rightInPosition !== "boolean")
                        return "rightInPosition: boolean expected";
                return null;
            };

            /**
             * Creates an ArmState message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.ArmState
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.ArmState} ArmState
             */
            ArmState.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.ArmState)
                    return object;
                let message = new $root.qyh.dataplane.ArmState();
                if (object.header != null) {
                    if (typeof object.header !== "object")
                        throw TypeError(".qyh.dataplane.ArmState.header: object expected");
                    message.header = $root.qyh.dataplane.Header.fromObject(object.header);
                }
                if (object.connected != null)
                    message.connected = Boolean(object.connected);
                if (object.poweredOn != null)
                    message.poweredOn = Boolean(object.poweredOn);
                if (object.enabled != null)
                    message.enabled = Boolean(object.enabled);
                if (object.inEstop != null)
                    message.inEstop = Boolean(object.inEstop);
                if (object.inError != null)
                    message.inError = Boolean(object.inError);
                if (object.servoMode != null)
                    message.servoMode = Boolean(object.servoMode);
                if (object.errorMessage != null)
                    message.errorMessage = String(object.errorMessage);
                if (object.leftPositions) {
                    if (!Array.isArray(object.leftPositions))
                        throw TypeError(".qyh.dataplane.ArmState.leftPositions: array expected");
                    message.leftPositions = [];
                    for (let i = 0; i < object.leftPositions.length; ++i)
                        message.leftPositions[i] = Number(object.leftPositions[i]);
                }
                if (object.rightPositions) {
                    if (!Array.isArray(object.rightPositions))
                        throw TypeError(".qyh.dataplane.ArmState.rightPositions: array expected");
                    message.rightPositions = [];
                    for (let i = 0; i < object.rightPositions.length; ++i)
                        message.rightPositions[i] = Number(object.rightPositions[i]);
                }
                if (object.leftEndEffector != null) {
                    if (typeof object.leftEndEffector !== "object")
                        throw TypeError(".qyh.dataplane.ArmState.leftEndEffector: object expected");
                    message.leftEndEffector = $root.qyh.dataplane.Pose.fromObject(object.leftEndEffector);
                }
                if (object.rightEndEffector != null) {
                    if (typeof object.rightEndEffector !== "object")
                        throw TypeError(".qyh.dataplane.ArmState.rightEndEffector: object expected");
                    message.rightEndEffector = $root.qyh.dataplane.Pose.fromObject(object.rightEndEffector);
                }
                if (object.leftInPosition != null)
                    message.leftInPosition = Boolean(object.leftInPosition);
                if (object.rightInPosition != null)
                    message.rightInPosition = Boolean(object.rightInPosition);
                return message;
            };

            /**
             * Creates a plain object from an ArmState message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.ArmState
             * @static
             * @param {qyh.dataplane.ArmState} message ArmState
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ArmState.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults) {
                    object.leftPositions = [];
                    object.rightPositions = [];
                }
                if (options.defaults) {
                    object.header = null;
                    object.connected = false;
                    object.poweredOn = false;
                    object.enabled = false;
                    object.inEstop = false;
                    object.inError = false;
                    object.servoMode = false;
                    object.errorMessage = "";
                    object.leftEndEffector = null;
                    object.rightEndEffector = null;
                    object.leftInPosition = false;
                    object.rightInPosition = false;
                }
                if (message.header != null && message.hasOwnProperty("header"))
                    object.header = $root.qyh.dataplane.Header.toObject(message.header, options);
                if (message.connected != null && message.hasOwnProperty("connected"))
                    object.connected = message.connected;
                if (message.poweredOn != null && message.hasOwnProperty("poweredOn"))
                    object.poweredOn = message.poweredOn;
                if (message.enabled != null && message.hasOwnProperty("enabled"))
                    object.enabled = message.enabled;
                if (message.inEstop != null && message.hasOwnProperty("inEstop"))
                    object.inEstop = message.inEstop;
                if (message.inError != null && message.hasOwnProperty("inError"))
                    object.inError = message.inError;
                if (message.servoMode != null && message.hasOwnProperty("servoMode"))
                    object.servoMode = message.servoMode;
                if (message.errorMessage != null && message.hasOwnProperty("errorMessage"))
                    object.errorMessage = message.errorMessage;
                if (message.leftPositions && message.leftPositions.length) {
                    object.leftPositions = [];
                    for (let j = 0; j < message.leftPositions.length; ++j)
                        object.leftPositions[j] = options.json && !isFinite(message.leftPositions[j]) ? String(message.leftPositions[j]) : message.leftPositions[j];
                }
                if (message.rightPositions && message.rightPositions.length) {
                    object.rightPositions = [];
                    for (let j = 0; j < message.rightPositions.length; ++j)
                        object.rightPositions[j] = options.json && !isFinite(message.rightPositions[j]) ? String(message.rightPositions[j]) : message.rightPositions[j];
                }
                if (message.leftEndEffector != null && message.hasOwnProperty("leftEndEffector"))
                    object.leftEndEffector = $root.qyh.dataplane.Pose.toObject(message.leftEndEffector, options);
                if (message.rightEndEffector != null && message.hasOwnProperty("rightEndEffector"))
                    object.rightEndEffector = $root.qyh.dataplane.Pose.toObject(message.rightEndEffector, options);
                if (message.leftInPosition != null && message.hasOwnProperty("leftInPosition"))
                    object.leftInPosition = message.leftInPosition;
                if (message.rightInPosition != null && message.hasOwnProperty("rightInPosition"))
                    object.rightInPosition = message.rightInPosition;
                return object;
            };

            /**
             * Converts this ArmState to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.ArmState
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ArmState.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for ArmState
             * @function getTypeUrl
             * @memberof qyh.dataplane.ArmState
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ArmState.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.ArmState";
            };

            return ArmState;
        })();

        dataplane.GripperState = (function() {

            /**
             * Properties of a GripperState.
             * @memberof qyh.dataplane
             * @interface IGripperState
             * @property {qyh.dataplane.IHeader|null} [header] GripperState header
             * @property {string|null} [gripperId] GripperState gripperId
             * @property {number|null} [position] GripperState position
             * @property {number|null} [force] GripperState force
             * @property {boolean|null} [objectDetected] GripperState objectDetected
             * @property {boolean|null} [inMotion] GripperState inMotion
             */

            /**
             * Constructs a new GripperState.
             * @memberof qyh.dataplane
             * @classdesc Represents a GripperState.
             * @implements IGripperState
             * @constructor
             * @param {qyh.dataplane.IGripperState=} [properties] Properties to set
             */
            function GripperState(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GripperState header.
             * @member {qyh.dataplane.IHeader|null|undefined} header
             * @memberof qyh.dataplane.GripperState
             * @instance
             */
            GripperState.prototype.header = null;

            /**
             * GripperState gripperId.
             * @member {string} gripperId
             * @memberof qyh.dataplane.GripperState
             * @instance
             */
            GripperState.prototype.gripperId = "";

            /**
             * GripperState position.
             * @member {number} position
             * @memberof qyh.dataplane.GripperState
             * @instance
             */
            GripperState.prototype.position = 0;

            /**
             * GripperState force.
             * @member {number} force
             * @memberof qyh.dataplane.GripperState
             * @instance
             */
            GripperState.prototype.force = 0;

            /**
             * GripperState objectDetected.
             * @member {boolean} objectDetected
             * @memberof qyh.dataplane.GripperState
             * @instance
             */
            GripperState.prototype.objectDetected = false;

            /**
             * GripperState inMotion.
             * @member {boolean} inMotion
             * @memberof qyh.dataplane.GripperState
             * @instance
             */
            GripperState.prototype.inMotion = false;

            /**
             * Creates a new GripperState instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.GripperState
             * @static
             * @param {qyh.dataplane.IGripperState=} [properties] Properties to set
             * @returns {qyh.dataplane.GripperState} GripperState instance
             */
            GripperState.create = function create(properties) {
                return new GripperState(properties);
            };

            /**
             * Encodes the specified GripperState message. Does not implicitly {@link qyh.dataplane.GripperState.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.GripperState
             * @static
             * @param {qyh.dataplane.IGripperState} message GripperState message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GripperState.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                    $root.qyh.dataplane.Header.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.gripperId != null && Object.hasOwnProperty.call(message, "gripperId"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.gripperId);
                if (message.position != null && Object.hasOwnProperty.call(message, "position"))
                    writer.uint32(/* id 3, wireType 1 =*/25).double(message.position);
                if (message.force != null && Object.hasOwnProperty.call(message, "force"))
                    writer.uint32(/* id 4, wireType 1 =*/33).double(message.force);
                if (message.objectDetected != null && Object.hasOwnProperty.call(message, "objectDetected"))
                    writer.uint32(/* id 5, wireType 0 =*/40).bool(message.objectDetected);
                if (message.inMotion != null && Object.hasOwnProperty.call(message, "inMotion"))
                    writer.uint32(/* id 6, wireType 0 =*/48).bool(message.inMotion);
                return writer;
            };

            /**
             * Encodes the specified GripperState message, length delimited. Does not implicitly {@link qyh.dataplane.GripperState.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.GripperState
             * @static
             * @param {qyh.dataplane.IGripperState} message GripperState message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GripperState.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GripperState message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.GripperState
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.GripperState} GripperState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GripperState.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.GripperState();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.header = $root.qyh.dataplane.Header.decode(reader, reader.uint32());
                            break;
                        }
                    case 2: {
                            message.gripperId = reader.string();
                            break;
                        }
                    case 3: {
                            message.position = reader.double();
                            break;
                        }
                    case 4: {
                            message.force = reader.double();
                            break;
                        }
                    case 5: {
                            message.objectDetected = reader.bool();
                            break;
                        }
                    case 6: {
                            message.inMotion = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GripperState message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.GripperState
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.GripperState} GripperState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GripperState.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GripperState message.
             * @function verify
             * @memberof qyh.dataplane.GripperState
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GripperState.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.header != null && message.hasOwnProperty("header")) {
                    let error = $root.qyh.dataplane.Header.verify(message.header);
                    if (error)
                        return "header." + error;
                }
                if (message.gripperId != null && message.hasOwnProperty("gripperId"))
                    if (!$util.isString(message.gripperId))
                        return "gripperId: string expected";
                if (message.position != null && message.hasOwnProperty("position"))
                    if (typeof message.position !== "number")
                        return "position: number expected";
                if (message.force != null && message.hasOwnProperty("force"))
                    if (typeof message.force !== "number")
                        return "force: number expected";
                if (message.objectDetected != null && message.hasOwnProperty("objectDetected"))
                    if (typeof message.objectDetected !== "boolean")
                        return "objectDetected: boolean expected";
                if (message.inMotion != null && message.hasOwnProperty("inMotion"))
                    if (typeof message.inMotion !== "boolean")
                        return "inMotion: boolean expected";
                return null;
            };

            /**
             * Creates a GripperState message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.GripperState
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.GripperState} GripperState
             */
            GripperState.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.GripperState)
                    return object;
                let message = new $root.qyh.dataplane.GripperState();
                if (object.header != null) {
                    if (typeof object.header !== "object")
                        throw TypeError(".qyh.dataplane.GripperState.header: object expected");
                    message.header = $root.qyh.dataplane.Header.fromObject(object.header);
                }
                if (object.gripperId != null)
                    message.gripperId = String(object.gripperId);
                if (object.position != null)
                    message.position = Number(object.position);
                if (object.force != null)
                    message.force = Number(object.force);
                if (object.objectDetected != null)
                    message.objectDetected = Boolean(object.objectDetected);
                if (object.inMotion != null)
                    message.inMotion = Boolean(object.inMotion);
                return message;
            };

            /**
             * Creates a plain object from a GripperState message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.GripperState
             * @static
             * @param {qyh.dataplane.GripperState} message GripperState
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GripperState.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.header = null;
                    object.gripperId = "";
                    object.position = 0;
                    object.force = 0;
                    object.objectDetected = false;
                    object.inMotion = false;
                }
                if (message.header != null && message.hasOwnProperty("header"))
                    object.header = $root.qyh.dataplane.Header.toObject(message.header, options);
                if (message.gripperId != null && message.hasOwnProperty("gripperId"))
                    object.gripperId = message.gripperId;
                if (message.position != null && message.hasOwnProperty("position"))
                    object.position = options.json && !isFinite(message.position) ? String(message.position) : message.position;
                if (message.force != null && message.hasOwnProperty("force"))
                    object.force = options.json && !isFinite(message.force) ? String(message.force) : message.force;
                if (message.objectDetected != null && message.hasOwnProperty("objectDetected"))
                    object.objectDetected = message.objectDetected;
                if (message.inMotion != null && message.hasOwnProperty("inMotion"))
                    object.inMotion = message.inMotion;
                return object;
            };

            /**
             * Converts this GripperState to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.GripperState
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GripperState.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for GripperState
             * @function getTypeUrl
             * @memberof qyh.dataplane.GripperState
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            GripperState.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.GripperState";
            };

            return GripperState;
        })();

        dataplane.ChassisState = (function() {

            /**
             * Properties of a ChassisState.
             * @memberof qyh.dataplane
             * @interface IChassisState
             * @property {qyh.dataplane.IHeader|null} [header] ChassisState header
             * @property {qyh.dataplane.IPose|null} [odom] ChassisState odom
             * @property {qyh.dataplane.ITwist|null} [velocity] ChassisState velocity
             * @property {number|null} [batteryLevel] ChassisState batteryLevel
             * @property {boolean|null} [charging] ChassisState charging
             * @property {boolean|null} [emergencyStop] ChassisState emergencyStop
             * @property {qyh.dataplane.INavigationStatus|null} [navigation] ChassisState navigation
             */

            /**
             * Constructs a new ChassisState.
             * @memberof qyh.dataplane
             * @classdesc Represents a ChassisState.
             * @implements IChassisState
             * @constructor
             * @param {qyh.dataplane.IChassisState=} [properties] Properties to set
             */
            function ChassisState(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ChassisState header.
             * @member {qyh.dataplane.IHeader|null|undefined} header
             * @memberof qyh.dataplane.ChassisState
             * @instance
             */
            ChassisState.prototype.header = null;

            /**
             * ChassisState odom.
             * @member {qyh.dataplane.IPose|null|undefined} odom
             * @memberof qyh.dataplane.ChassisState
             * @instance
             */
            ChassisState.prototype.odom = null;

            /**
             * ChassisState velocity.
             * @member {qyh.dataplane.ITwist|null|undefined} velocity
             * @memberof qyh.dataplane.ChassisState
             * @instance
             */
            ChassisState.prototype.velocity = null;

            /**
             * ChassisState batteryLevel.
             * @member {number} batteryLevel
             * @memberof qyh.dataplane.ChassisState
             * @instance
             */
            ChassisState.prototype.batteryLevel = 0;

            /**
             * ChassisState charging.
             * @member {boolean} charging
             * @memberof qyh.dataplane.ChassisState
             * @instance
             */
            ChassisState.prototype.charging = false;

            /**
             * ChassisState emergencyStop.
             * @member {boolean} emergencyStop
             * @memberof qyh.dataplane.ChassisState
             * @instance
             */
            ChassisState.prototype.emergencyStop = false;

            /**
             * ChassisState navigation.
             * @member {qyh.dataplane.INavigationStatus|null|undefined} navigation
             * @memberof qyh.dataplane.ChassisState
             * @instance
             */
            ChassisState.prototype.navigation = null;

            /**
             * Creates a new ChassisState instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.ChassisState
             * @static
             * @param {qyh.dataplane.IChassisState=} [properties] Properties to set
             * @returns {qyh.dataplane.ChassisState} ChassisState instance
             */
            ChassisState.create = function create(properties) {
                return new ChassisState(properties);
            };

            /**
             * Encodes the specified ChassisState message. Does not implicitly {@link qyh.dataplane.ChassisState.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.ChassisState
             * @static
             * @param {qyh.dataplane.IChassisState} message ChassisState message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChassisState.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                    $root.qyh.dataplane.Header.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.odom != null && Object.hasOwnProperty.call(message, "odom"))
                    $root.qyh.dataplane.Pose.encode(message.odom, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.velocity != null && Object.hasOwnProperty.call(message, "velocity"))
                    $root.qyh.dataplane.Twist.encode(message.velocity, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.batteryLevel != null && Object.hasOwnProperty.call(message, "batteryLevel"))
                    writer.uint32(/* id 4, wireType 1 =*/33).double(message.batteryLevel);
                if (message.charging != null && Object.hasOwnProperty.call(message, "charging"))
                    writer.uint32(/* id 5, wireType 0 =*/40).bool(message.charging);
                if (message.emergencyStop != null && Object.hasOwnProperty.call(message, "emergencyStop"))
                    writer.uint32(/* id 6, wireType 0 =*/48).bool(message.emergencyStop);
                if (message.navigation != null && Object.hasOwnProperty.call(message, "navigation"))
                    $root.qyh.dataplane.NavigationStatus.encode(message.navigation, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ChassisState message, length delimited. Does not implicitly {@link qyh.dataplane.ChassisState.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.ChassisState
             * @static
             * @param {qyh.dataplane.IChassisState} message ChassisState message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChassisState.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ChassisState message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.ChassisState
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.ChassisState} ChassisState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChassisState.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.ChassisState();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.header = $root.qyh.dataplane.Header.decode(reader, reader.uint32());
                            break;
                        }
                    case 2: {
                            message.odom = $root.qyh.dataplane.Pose.decode(reader, reader.uint32());
                            break;
                        }
                    case 3: {
                            message.velocity = $root.qyh.dataplane.Twist.decode(reader, reader.uint32());
                            break;
                        }
                    case 4: {
                            message.batteryLevel = reader.double();
                            break;
                        }
                    case 5: {
                            message.charging = reader.bool();
                            break;
                        }
                    case 6: {
                            message.emergencyStop = reader.bool();
                            break;
                        }
                    case 7: {
                            message.navigation = $root.qyh.dataplane.NavigationStatus.decode(reader, reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ChassisState message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.ChassisState
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.ChassisState} ChassisState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChassisState.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ChassisState message.
             * @function verify
             * @memberof qyh.dataplane.ChassisState
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ChassisState.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.header != null && message.hasOwnProperty("header")) {
                    let error = $root.qyh.dataplane.Header.verify(message.header);
                    if (error)
                        return "header." + error;
                }
                if (message.odom != null && message.hasOwnProperty("odom")) {
                    let error = $root.qyh.dataplane.Pose.verify(message.odom);
                    if (error)
                        return "odom." + error;
                }
                if (message.velocity != null && message.hasOwnProperty("velocity")) {
                    let error = $root.qyh.dataplane.Twist.verify(message.velocity);
                    if (error)
                        return "velocity." + error;
                }
                if (message.batteryLevel != null && message.hasOwnProperty("batteryLevel"))
                    if (typeof message.batteryLevel !== "number")
                        return "batteryLevel: number expected";
                if (message.charging != null && message.hasOwnProperty("charging"))
                    if (typeof message.charging !== "boolean")
                        return "charging: boolean expected";
                if (message.emergencyStop != null && message.hasOwnProperty("emergencyStop"))
                    if (typeof message.emergencyStop !== "boolean")
                        return "emergencyStop: boolean expected";
                if (message.navigation != null && message.hasOwnProperty("navigation")) {
                    let error = $root.qyh.dataplane.NavigationStatus.verify(message.navigation);
                    if (error)
                        return "navigation." + error;
                }
                return null;
            };

            /**
             * Creates a ChassisState message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.ChassisState
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.ChassisState} ChassisState
             */
            ChassisState.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.ChassisState)
                    return object;
                let message = new $root.qyh.dataplane.ChassisState();
                if (object.header != null) {
                    if (typeof object.header !== "object")
                        throw TypeError(".qyh.dataplane.ChassisState.header: object expected");
                    message.header = $root.qyh.dataplane.Header.fromObject(object.header);
                }
                if (object.odom != null) {
                    if (typeof object.odom !== "object")
                        throw TypeError(".qyh.dataplane.ChassisState.odom: object expected");
                    message.odom = $root.qyh.dataplane.Pose.fromObject(object.odom);
                }
                if (object.velocity != null) {
                    if (typeof object.velocity !== "object")
                        throw TypeError(".qyh.dataplane.ChassisState.velocity: object expected");
                    message.velocity = $root.qyh.dataplane.Twist.fromObject(object.velocity);
                }
                if (object.batteryLevel != null)
                    message.batteryLevel = Number(object.batteryLevel);
                if (object.charging != null)
                    message.charging = Boolean(object.charging);
                if (object.emergencyStop != null)
                    message.emergencyStop = Boolean(object.emergencyStop);
                if (object.navigation != null) {
                    if (typeof object.navigation !== "object")
                        throw TypeError(".qyh.dataplane.ChassisState.navigation: object expected");
                    message.navigation = $root.qyh.dataplane.NavigationStatus.fromObject(object.navigation);
                }
                return message;
            };

            /**
             * Creates a plain object from a ChassisState message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.ChassisState
             * @static
             * @param {qyh.dataplane.ChassisState} message ChassisState
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ChassisState.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.header = null;
                    object.odom = null;
                    object.velocity = null;
                    object.batteryLevel = 0;
                    object.charging = false;
                    object.emergencyStop = false;
                    object.navigation = null;
                }
                if (message.header != null && message.hasOwnProperty("header"))
                    object.header = $root.qyh.dataplane.Header.toObject(message.header, options);
                if (message.odom != null && message.hasOwnProperty("odom"))
                    object.odom = $root.qyh.dataplane.Pose.toObject(message.odom, options);
                if (message.velocity != null && message.hasOwnProperty("velocity"))
                    object.velocity = $root.qyh.dataplane.Twist.toObject(message.velocity, options);
                if (message.batteryLevel != null && message.hasOwnProperty("batteryLevel"))
                    object.batteryLevel = options.json && !isFinite(message.batteryLevel) ? String(message.batteryLevel) : message.batteryLevel;
                if (message.charging != null && message.hasOwnProperty("charging"))
                    object.charging = message.charging;
                if (message.emergencyStop != null && message.hasOwnProperty("emergencyStop"))
                    object.emergencyStop = message.emergencyStop;
                if (message.navigation != null && message.hasOwnProperty("navigation"))
                    object.navigation = $root.qyh.dataplane.NavigationStatus.toObject(message.navigation, options);
                return object;
            };

            /**
             * Converts this ChassisState to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.ChassisState
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ChassisState.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for ChassisState
             * @function getTypeUrl
             * @memberof qyh.dataplane.ChassisState
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ChassisState.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.ChassisState";
            };

            return ChassisState;
        })();

        dataplane.NavigationStatus = (function() {

            /**
             * Properties of a NavigationStatus.
             * @memberof qyh.dataplane
             * @interface INavigationStatus
             * @property {qyh.dataplane.NavigationStatus.State|null} [state] NavigationStatus state
             * @property {qyh.dataplane.IPose|null} [currentGoal] NavigationStatus currentGoal
             * @property {number|null} [distanceRemaining] NavigationStatus distanceRemaining
             * @property {number|null} [etaSeconds] NavigationStatus etaSeconds
             * @property {string|null} [errorMessage] NavigationStatus errorMessage
             */

            /**
             * Constructs a new NavigationStatus.
             * @memberof qyh.dataplane
             * @classdesc Represents a NavigationStatus.
             * @implements INavigationStatus
             * @constructor
             * @param {qyh.dataplane.INavigationStatus=} [properties] Properties to set
             */
            function NavigationStatus(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * NavigationStatus state.
             * @member {qyh.dataplane.NavigationStatus.State} state
             * @memberof qyh.dataplane.NavigationStatus
             * @instance
             */
            NavigationStatus.prototype.state = 0;

            /**
             * NavigationStatus currentGoal.
             * @member {qyh.dataplane.IPose|null|undefined} currentGoal
             * @memberof qyh.dataplane.NavigationStatus
             * @instance
             */
            NavigationStatus.prototype.currentGoal = null;

            /**
             * NavigationStatus distanceRemaining.
             * @member {number} distanceRemaining
             * @memberof qyh.dataplane.NavigationStatus
             * @instance
             */
            NavigationStatus.prototype.distanceRemaining = 0;

            /**
             * NavigationStatus etaSeconds.
             * @member {number} etaSeconds
             * @memberof qyh.dataplane.NavigationStatus
             * @instance
             */
            NavigationStatus.prototype.etaSeconds = 0;

            /**
             * NavigationStatus errorMessage.
             * @member {string} errorMessage
             * @memberof qyh.dataplane.NavigationStatus
             * @instance
             */
            NavigationStatus.prototype.errorMessage = "";

            /**
             * Creates a new NavigationStatus instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.NavigationStatus
             * @static
             * @param {qyh.dataplane.INavigationStatus=} [properties] Properties to set
             * @returns {qyh.dataplane.NavigationStatus} NavigationStatus instance
             */
            NavigationStatus.create = function create(properties) {
                return new NavigationStatus(properties);
            };

            /**
             * Encodes the specified NavigationStatus message. Does not implicitly {@link qyh.dataplane.NavigationStatus.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.NavigationStatus
             * @static
             * @param {qyh.dataplane.INavigationStatus} message NavigationStatus message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            NavigationStatus.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.state != null && Object.hasOwnProperty.call(message, "state"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.state);
                if (message.currentGoal != null && Object.hasOwnProperty.call(message, "currentGoal"))
                    $root.qyh.dataplane.Pose.encode(message.currentGoal, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.distanceRemaining != null && Object.hasOwnProperty.call(message, "distanceRemaining"))
                    writer.uint32(/* id 3, wireType 1 =*/25).double(message.distanceRemaining);
                if (message.etaSeconds != null && Object.hasOwnProperty.call(message, "etaSeconds"))
                    writer.uint32(/* id 4, wireType 1 =*/33).double(message.etaSeconds);
                if (message.errorMessage != null && Object.hasOwnProperty.call(message, "errorMessage"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.errorMessage);
                return writer;
            };

            /**
             * Encodes the specified NavigationStatus message, length delimited. Does not implicitly {@link qyh.dataplane.NavigationStatus.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.NavigationStatus
             * @static
             * @param {qyh.dataplane.INavigationStatus} message NavigationStatus message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            NavigationStatus.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a NavigationStatus message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.NavigationStatus
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.NavigationStatus} NavigationStatus
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            NavigationStatus.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.NavigationStatus();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.state = reader.int32();
                            break;
                        }
                    case 2: {
                            message.currentGoal = $root.qyh.dataplane.Pose.decode(reader, reader.uint32());
                            break;
                        }
                    case 3: {
                            message.distanceRemaining = reader.double();
                            break;
                        }
                    case 4: {
                            message.etaSeconds = reader.double();
                            break;
                        }
                    case 5: {
                            message.errorMessage = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a NavigationStatus message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.NavigationStatus
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.NavigationStatus} NavigationStatus
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            NavigationStatus.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a NavigationStatus message.
             * @function verify
             * @memberof qyh.dataplane.NavigationStatus
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            NavigationStatus.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.state != null && message.hasOwnProperty("state"))
                    switch (message.state) {
                    default:
                        return "state: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        break;
                    }
                if (message.currentGoal != null && message.hasOwnProperty("currentGoal")) {
                    let error = $root.qyh.dataplane.Pose.verify(message.currentGoal);
                    if (error)
                        return "currentGoal." + error;
                }
                if (message.distanceRemaining != null && message.hasOwnProperty("distanceRemaining"))
                    if (typeof message.distanceRemaining !== "number")
                        return "distanceRemaining: number expected";
                if (message.etaSeconds != null && message.hasOwnProperty("etaSeconds"))
                    if (typeof message.etaSeconds !== "number")
                        return "etaSeconds: number expected";
                if (message.errorMessage != null && message.hasOwnProperty("errorMessage"))
                    if (!$util.isString(message.errorMessage))
                        return "errorMessage: string expected";
                return null;
            };

            /**
             * Creates a NavigationStatus message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.NavigationStatus
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.NavigationStatus} NavigationStatus
             */
            NavigationStatus.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.NavigationStatus)
                    return object;
                let message = new $root.qyh.dataplane.NavigationStatus();
                switch (object.state) {
                default:
                    if (typeof object.state === "number") {
                        message.state = object.state;
                        break;
                    }
                    break;
                case "IDLE":
                case 0:
                    message.state = 0;
                    break;
                case "NAVIGATING":
                case 1:
                    message.state = 1;
                    break;
                case "PAUSED":
                case 2:
                    message.state = 2;
                    break;
                case "SUCCEEDED":
                case 3:
                    message.state = 3;
                    break;
                case "FAILED":
                case 4:
                    message.state = 4;
                    break;
                case "CANCELLED":
                case 5:
                    message.state = 5;
                    break;
                }
                if (object.currentGoal != null) {
                    if (typeof object.currentGoal !== "object")
                        throw TypeError(".qyh.dataplane.NavigationStatus.currentGoal: object expected");
                    message.currentGoal = $root.qyh.dataplane.Pose.fromObject(object.currentGoal);
                }
                if (object.distanceRemaining != null)
                    message.distanceRemaining = Number(object.distanceRemaining);
                if (object.etaSeconds != null)
                    message.etaSeconds = Number(object.etaSeconds);
                if (object.errorMessage != null)
                    message.errorMessage = String(object.errorMessage);
                return message;
            };

            /**
             * Creates a plain object from a NavigationStatus message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.NavigationStatus
             * @static
             * @param {qyh.dataplane.NavigationStatus} message NavigationStatus
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            NavigationStatus.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.state = options.enums === String ? "IDLE" : 0;
                    object.currentGoal = null;
                    object.distanceRemaining = 0;
                    object.etaSeconds = 0;
                    object.errorMessage = "";
                }
                if (message.state != null && message.hasOwnProperty("state"))
                    object.state = options.enums === String ? $root.qyh.dataplane.NavigationStatus.State[message.state] === undefined ? message.state : $root.qyh.dataplane.NavigationStatus.State[message.state] : message.state;
                if (message.currentGoal != null && message.hasOwnProperty("currentGoal"))
                    object.currentGoal = $root.qyh.dataplane.Pose.toObject(message.currentGoal, options);
                if (message.distanceRemaining != null && message.hasOwnProperty("distanceRemaining"))
                    object.distanceRemaining = options.json && !isFinite(message.distanceRemaining) ? String(message.distanceRemaining) : message.distanceRemaining;
                if (message.etaSeconds != null && message.hasOwnProperty("etaSeconds"))
                    object.etaSeconds = options.json && !isFinite(message.etaSeconds) ? String(message.etaSeconds) : message.etaSeconds;
                if (message.errorMessage != null && message.hasOwnProperty("errorMessage"))
                    object.errorMessage = message.errorMessage;
                return object;
            };

            /**
             * Converts this NavigationStatus to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.NavigationStatus
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            NavigationStatus.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for NavigationStatus
             * @function getTypeUrl
             * @memberof qyh.dataplane.NavigationStatus
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            NavigationStatus.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.NavigationStatus";
            };

            /**
             * State enum.
             * @name qyh.dataplane.NavigationStatus.State
             * @enum {number}
             * @property {number} IDLE=0 IDLE value
             * @property {number} NAVIGATING=1 NAVIGATING value
             * @property {number} PAUSED=2 PAUSED value
             * @property {number} SUCCEEDED=3 SUCCEEDED value
             * @property {number} FAILED=4 FAILED value
             * @property {number} CANCELLED=5 CANCELLED value
             */
            NavigationStatus.State = (function() {
                const valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "IDLE"] = 0;
                values[valuesById[1] = "NAVIGATING"] = 1;
                values[valuesById[2] = "PAUSED"] = 2;
                values[valuesById[3] = "SUCCEEDED"] = 3;
                values[valuesById[4] = "FAILED"] = 4;
                values[valuesById[5] = "CANCELLED"] = 5;
                return values;
            })();

            return NavigationStatus;
        })();

        dataplane.ImuData = (function() {

            /**
             * Properties of an ImuData.
             * @memberof qyh.dataplane
             * @interface IImuData
             * @property {qyh.dataplane.IHeader|null} [header] ImuData header
             * @property {qyh.dataplane.IQuaternion|null} [orientation] ImuData orientation
             * @property {qyh.dataplane.IVector3|null} [angularVelocity] ImuData angularVelocity
             * @property {qyh.dataplane.IVector3|null} [linearAcceleration] ImuData linearAcceleration
             */

            /**
             * Constructs a new ImuData.
             * @memberof qyh.dataplane
             * @classdesc Represents an ImuData.
             * @implements IImuData
             * @constructor
             * @param {qyh.dataplane.IImuData=} [properties] Properties to set
             */
            function ImuData(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ImuData header.
             * @member {qyh.dataplane.IHeader|null|undefined} header
             * @memberof qyh.dataplane.ImuData
             * @instance
             */
            ImuData.prototype.header = null;

            /**
             * ImuData orientation.
             * @member {qyh.dataplane.IQuaternion|null|undefined} orientation
             * @memberof qyh.dataplane.ImuData
             * @instance
             */
            ImuData.prototype.orientation = null;

            /**
             * ImuData angularVelocity.
             * @member {qyh.dataplane.IVector3|null|undefined} angularVelocity
             * @memberof qyh.dataplane.ImuData
             * @instance
             */
            ImuData.prototype.angularVelocity = null;

            /**
             * ImuData linearAcceleration.
             * @member {qyh.dataplane.IVector3|null|undefined} linearAcceleration
             * @memberof qyh.dataplane.ImuData
             * @instance
             */
            ImuData.prototype.linearAcceleration = null;

            /**
             * Creates a new ImuData instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.ImuData
             * @static
             * @param {qyh.dataplane.IImuData=} [properties] Properties to set
             * @returns {qyh.dataplane.ImuData} ImuData instance
             */
            ImuData.create = function create(properties) {
                return new ImuData(properties);
            };

            /**
             * Encodes the specified ImuData message. Does not implicitly {@link qyh.dataplane.ImuData.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.ImuData
             * @static
             * @param {qyh.dataplane.IImuData} message ImuData message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ImuData.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                    $root.qyh.dataplane.Header.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.orientation != null && Object.hasOwnProperty.call(message, "orientation"))
                    $root.qyh.dataplane.Quaternion.encode(message.orientation, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.angularVelocity != null && Object.hasOwnProperty.call(message, "angularVelocity"))
                    $root.qyh.dataplane.Vector3.encode(message.angularVelocity, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.linearAcceleration != null && Object.hasOwnProperty.call(message, "linearAcceleration"))
                    $root.qyh.dataplane.Vector3.encode(message.linearAcceleration, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ImuData message, length delimited. Does not implicitly {@link qyh.dataplane.ImuData.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.ImuData
             * @static
             * @param {qyh.dataplane.IImuData} message ImuData message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ImuData.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an ImuData message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.ImuData
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.ImuData} ImuData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ImuData.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.ImuData();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.header = $root.qyh.dataplane.Header.decode(reader, reader.uint32());
                            break;
                        }
                    case 2: {
                            message.orientation = $root.qyh.dataplane.Quaternion.decode(reader, reader.uint32());
                            break;
                        }
                    case 3: {
                            message.angularVelocity = $root.qyh.dataplane.Vector3.decode(reader, reader.uint32());
                            break;
                        }
                    case 4: {
                            message.linearAcceleration = $root.qyh.dataplane.Vector3.decode(reader, reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an ImuData message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.ImuData
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.ImuData} ImuData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ImuData.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an ImuData message.
             * @function verify
             * @memberof qyh.dataplane.ImuData
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ImuData.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.header != null && message.hasOwnProperty("header")) {
                    let error = $root.qyh.dataplane.Header.verify(message.header);
                    if (error)
                        return "header." + error;
                }
                if (message.orientation != null && message.hasOwnProperty("orientation")) {
                    let error = $root.qyh.dataplane.Quaternion.verify(message.orientation);
                    if (error)
                        return "orientation." + error;
                }
                if (message.angularVelocity != null && message.hasOwnProperty("angularVelocity")) {
                    let error = $root.qyh.dataplane.Vector3.verify(message.angularVelocity);
                    if (error)
                        return "angularVelocity." + error;
                }
                if (message.linearAcceleration != null && message.hasOwnProperty("linearAcceleration")) {
                    let error = $root.qyh.dataplane.Vector3.verify(message.linearAcceleration);
                    if (error)
                        return "linearAcceleration." + error;
                }
                return null;
            };

            /**
             * Creates an ImuData message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.ImuData
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.ImuData} ImuData
             */
            ImuData.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.ImuData)
                    return object;
                let message = new $root.qyh.dataplane.ImuData();
                if (object.header != null) {
                    if (typeof object.header !== "object")
                        throw TypeError(".qyh.dataplane.ImuData.header: object expected");
                    message.header = $root.qyh.dataplane.Header.fromObject(object.header);
                }
                if (object.orientation != null) {
                    if (typeof object.orientation !== "object")
                        throw TypeError(".qyh.dataplane.ImuData.orientation: object expected");
                    message.orientation = $root.qyh.dataplane.Quaternion.fromObject(object.orientation);
                }
                if (object.angularVelocity != null) {
                    if (typeof object.angularVelocity !== "object")
                        throw TypeError(".qyh.dataplane.ImuData.angularVelocity: object expected");
                    message.angularVelocity = $root.qyh.dataplane.Vector3.fromObject(object.angularVelocity);
                }
                if (object.linearAcceleration != null) {
                    if (typeof object.linearAcceleration !== "object")
                        throw TypeError(".qyh.dataplane.ImuData.linearAcceleration: object expected");
                    message.linearAcceleration = $root.qyh.dataplane.Vector3.fromObject(object.linearAcceleration);
                }
                return message;
            };

            /**
             * Creates a plain object from an ImuData message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.ImuData
             * @static
             * @param {qyh.dataplane.ImuData} message ImuData
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ImuData.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.header = null;
                    object.orientation = null;
                    object.angularVelocity = null;
                    object.linearAcceleration = null;
                }
                if (message.header != null && message.hasOwnProperty("header"))
                    object.header = $root.qyh.dataplane.Header.toObject(message.header, options);
                if (message.orientation != null && message.hasOwnProperty("orientation"))
                    object.orientation = $root.qyh.dataplane.Quaternion.toObject(message.orientation, options);
                if (message.angularVelocity != null && message.hasOwnProperty("angularVelocity"))
                    object.angularVelocity = $root.qyh.dataplane.Vector3.toObject(message.angularVelocity, options);
                if (message.linearAcceleration != null && message.hasOwnProperty("linearAcceleration"))
                    object.linearAcceleration = $root.qyh.dataplane.Vector3.toObject(message.linearAcceleration, options);
                return object;
            };

            /**
             * Converts this ImuData to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.ImuData
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ImuData.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for ImuData
             * @function getTypeUrl
             * @memberof qyh.dataplane.ImuData
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ImuData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.ImuData";
            };

            return ImuData;
        })();

        dataplane.ActuatorState = (function() {

            /**
             * Properties of an ActuatorState.
             * @memberof qyh.dataplane
             * @interface IActuatorState
             * @property {qyh.dataplane.IHeader|null} [header] ActuatorState header
             * @property {string|null} [actuatorId] ActuatorState actuatorId
             * @property {number|null} [position] ActuatorState position
             * @property {number|null} [velocity] ActuatorState velocity
             * @property {number|null} [minLimit] ActuatorState minLimit
             * @property {number|null} [maxLimit] ActuatorState maxLimit
             * @property {boolean|null} [inMotion] ActuatorState inMotion
             * @property {boolean|null} [inPosition] ActuatorState inPosition
             */

            /**
             * Constructs a new ActuatorState.
             * @memberof qyh.dataplane
             * @classdesc Represents an ActuatorState.
             * @implements IActuatorState
             * @constructor
             * @param {qyh.dataplane.IActuatorState=} [properties] Properties to set
             */
            function ActuatorState(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ActuatorState header.
             * @member {qyh.dataplane.IHeader|null|undefined} header
             * @memberof qyh.dataplane.ActuatorState
             * @instance
             */
            ActuatorState.prototype.header = null;

            /**
             * ActuatorState actuatorId.
             * @member {string} actuatorId
             * @memberof qyh.dataplane.ActuatorState
             * @instance
             */
            ActuatorState.prototype.actuatorId = "";

            /**
             * ActuatorState position.
             * @member {number} position
             * @memberof qyh.dataplane.ActuatorState
             * @instance
             */
            ActuatorState.prototype.position = 0;

            /**
             * ActuatorState velocity.
             * @member {number} velocity
             * @memberof qyh.dataplane.ActuatorState
             * @instance
             */
            ActuatorState.prototype.velocity = 0;

            /**
             * ActuatorState minLimit.
             * @member {number} minLimit
             * @memberof qyh.dataplane.ActuatorState
             * @instance
             */
            ActuatorState.prototype.minLimit = 0;

            /**
             * ActuatorState maxLimit.
             * @member {number} maxLimit
             * @memberof qyh.dataplane.ActuatorState
             * @instance
             */
            ActuatorState.prototype.maxLimit = 0;

            /**
             * ActuatorState inMotion.
             * @member {boolean} inMotion
             * @memberof qyh.dataplane.ActuatorState
             * @instance
             */
            ActuatorState.prototype.inMotion = false;

            /**
             * ActuatorState inPosition.
             * @member {boolean} inPosition
             * @memberof qyh.dataplane.ActuatorState
             * @instance
             */
            ActuatorState.prototype.inPosition = false;

            /**
             * Creates a new ActuatorState instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.ActuatorState
             * @static
             * @param {qyh.dataplane.IActuatorState=} [properties] Properties to set
             * @returns {qyh.dataplane.ActuatorState} ActuatorState instance
             */
            ActuatorState.create = function create(properties) {
                return new ActuatorState(properties);
            };

            /**
             * Encodes the specified ActuatorState message. Does not implicitly {@link qyh.dataplane.ActuatorState.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.ActuatorState
             * @static
             * @param {qyh.dataplane.IActuatorState} message ActuatorState message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ActuatorState.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                    $root.qyh.dataplane.Header.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.actuatorId != null && Object.hasOwnProperty.call(message, "actuatorId"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.actuatorId);
                if (message.position != null && Object.hasOwnProperty.call(message, "position"))
                    writer.uint32(/* id 3, wireType 1 =*/25).double(message.position);
                if (message.velocity != null && Object.hasOwnProperty.call(message, "velocity"))
                    writer.uint32(/* id 4, wireType 1 =*/33).double(message.velocity);
                if (message.minLimit != null && Object.hasOwnProperty.call(message, "minLimit"))
                    writer.uint32(/* id 5, wireType 1 =*/41).double(message.minLimit);
                if (message.maxLimit != null && Object.hasOwnProperty.call(message, "maxLimit"))
                    writer.uint32(/* id 6, wireType 1 =*/49).double(message.maxLimit);
                if (message.inMotion != null && Object.hasOwnProperty.call(message, "inMotion"))
                    writer.uint32(/* id 7, wireType 0 =*/56).bool(message.inMotion);
                if (message.inPosition != null && Object.hasOwnProperty.call(message, "inPosition"))
                    writer.uint32(/* id 8, wireType 0 =*/64).bool(message.inPosition);
                return writer;
            };

            /**
             * Encodes the specified ActuatorState message, length delimited. Does not implicitly {@link qyh.dataplane.ActuatorState.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.ActuatorState
             * @static
             * @param {qyh.dataplane.IActuatorState} message ActuatorState message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ActuatorState.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an ActuatorState message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.ActuatorState
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.ActuatorState} ActuatorState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ActuatorState.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.ActuatorState();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.header = $root.qyh.dataplane.Header.decode(reader, reader.uint32());
                            break;
                        }
                    case 2: {
                            message.actuatorId = reader.string();
                            break;
                        }
                    case 3: {
                            message.position = reader.double();
                            break;
                        }
                    case 4: {
                            message.velocity = reader.double();
                            break;
                        }
                    case 5: {
                            message.minLimit = reader.double();
                            break;
                        }
                    case 6: {
                            message.maxLimit = reader.double();
                            break;
                        }
                    case 7: {
                            message.inMotion = reader.bool();
                            break;
                        }
                    case 8: {
                            message.inPosition = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an ActuatorState message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.ActuatorState
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.ActuatorState} ActuatorState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ActuatorState.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an ActuatorState message.
             * @function verify
             * @memberof qyh.dataplane.ActuatorState
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ActuatorState.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.header != null && message.hasOwnProperty("header")) {
                    let error = $root.qyh.dataplane.Header.verify(message.header);
                    if (error)
                        return "header." + error;
                }
                if (message.actuatorId != null && message.hasOwnProperty("actuatorId"))
                    if (!$util.isString(message.actuatorId))
                        return "actuatorId: string expected";
                if (message.position != null && message.hasOwnProperty("position"))
                    if (typeof message.position !== "number")
                        return "position: number expected";
                if (message.velocity != null && message.hasOwnProperty("velocity"))
                    if (typeof message.velocity !== "number")
                        return "velocity: number expected";
                if (message.minLimit != null && message.hasOwnProperty("minLimit"))
                    if (typeof message.minLimit !== "number")
                        return "minLimit: number expected";
                if (message.maxLimit != null && message.hasOwnProperty("maxLimit"))
                    if (typeof message.maxLimit !== "number")
                        return "maxLimit: number expected";
                if (message.inMotion != null && message.hasOwnProperty("inMotion"))
                    if (typeof message.inMotion !== "boolean")
                        return "inMotion: boolean expected";
                if (message.inPosition != null && message.hasOwnProperty("inPosition"))
                    if (typeof message.inPosition !== "boolean")
                        return "inPosition: boolean expected";
                return null;
            };

            /**
             * Creates an ActuatorState message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.ActuatorState
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.ActuatorState} ActuatorState
             */
            ActuatorState.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.ActuatorState)
                    return object;
                let message = new $root.qyh.dataplane.ActuatorState();
                if (object.header != null) {
                    if (typeof object.header !== "object")
                        throw TypeError(".qyh.dataplane.ActuatorState.header: object expected");
                    message.header = $root.qyh.dataplane.Header.fromObject(object.header);
                }
                if (object.actuatorId != null)
                    message.actuatorId = String(object.actuatorId);
                if (object.position != null)
                    message.position = Number(object.position);
                if (object.velocity != null)
                    message.velocity = Number(object.velocity);
                if (object.minLimit != null)
                    message.minLimit = Number(object.minLimit);
                if (object.maxLimit != null)
                    message.maxLimit = Number(object.maxLimit);
                if (object.inMotion != null)
                    message.inMotion = Boolean(object.inMotion);
                if (object.inPosition != null)
                    message.inPosition = Boolean(object.inPosition);
                return message;
            };

            /**
             * Creates a plain object from an ActuatorState message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.ActuatorState
             * @static
             * @param {qyh.dataplane.ActuatorState} message ActuatorState
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ActuatorState.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.header = null;
                    object.actuatorId = "";
                    object.position = 0;
                    object.velocity = 0;
                    object.minLimit = 0;
                    object.maxLimit = 0;
                    object.inMotion = false;
                    object.inPosition = false;
                }
                if (message.header != null && message.hasOwnProperty("header"))
                    object.header = $root.qyh.dataplane.Header.toObject(message.header, options);
                if (message.actuatorId != null && message.hasOwnProperty("actuatorId"))
                    object.actuatorId = message.actuatorId;
                if (message.position != null && message.hasOwnProperty("position"))
                    object.position = options.json && !isFinite(message.position) ? String(message.position) : message.position;
                if (message.velocity != null && message.hasOwnProperty("velocity"))
                    object.velocity = options.json && !isFinite(message.velocity) ? String(message.velocity) : message.velocity;
                if (message.minLimit != null && message.hasOwnProperty("minLimit"))
                    object.minLimit = options.json && !isFinite(message.minLimit) ? String(message.minLimit) : message.minLimit;
                if (message.maxLimit != null && message.hasOwnProperty("maxLimit"))
                    object.maxLimit = options.json && !isFinite(message.maxLimit) ? String(message.maxLimit) : message.maxLimit;
                if (message.inMotion != null && message.hasOwnProperty("inMotion"))
                    object.inMotion = message.inMotion;
                if (message.inPosition != null && message.hasOwnProperty("inPosition"))
                    object.inPosition = message.inPosition;
                return object;
            };

            /**
             * Converts this ActuatorState to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.ActuatorState
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ActuatorState.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for ActuatorState
             * @function getTypeUrl
             * @memberof qyh.dataplane.ActuatorState
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ActuatorState.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.ActuatorState";
            };

            return ActuatorState;
        })();

        /**
         * RobotMode enum.
         * @name qyh.dataplane.RobotMode
         * @enum {number}
         * @property {number} MODE_IDLE=0 MODE_IDLE value
         * @property {number} MODE_TELEOP=1 MODE_TELEOP value
         * @property {number} MODE_AUTO=2 MODE_AUTO value
         * @property {number} MODE_MAINTENANCE=3 MODE_MAINTENANCE value
         * @property {number} MODE_ERROR=4 MODE_ERROR value
         */
        dataplane.RobotMode = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "MODE_IDLE"] = 0;
            values[valuesById[1] = "MODE_TELEOP"] = 1;
            values[valuesById[2] = "MODE_AUTO"] = 2;
            values[valuesById[3] = "MODE_MAINTENANCE"] = 3;
            values[valuesById[4] = "MODE_ERROR"] = 4;
            return values;
        })();

        dataplane.RobotState = (function() {

            /**
             * Properties of a RobotState.
             * @memberof qyh.dataplane
             * @interface IRobotState
             * @property {qyh.dataplane.IHeader|null} [header] RobotState header
             * @property {qyh.dataplane.RobotMode|null} [mode] RobotState mode
             * @property {boolean|null} [controlHeld] RobotState controlHeld
             * @property {string|null} [controlHolder] RobotState controlHolder
             * @property {qyh.dataplane.IArmState|null} [arm] RobotState arm
             * @property {qyh.dataplane.IChassisState|null} [chassis] RobotState chassis
             * @property {qyh.dataplane.IJointState|null} [joints] RobotState joints
             * @property {qyh.dataplane.IActuatorState|null} [lift] RobotState lift
             * @property {qyh.dataplane.IActuatorState|null} [waist] RobotState waist
             * @property {qyh.dataplane.IActuatorState|null} [headPan] RobotState headPan
             * @property {qyh.dataplane.IActuatorState|null} [headTilt] RobotState headTilt
             * @property {qyh.dataplane.IGripperState|null} [leftGripper] RobotState leftGripper
             * @property {qyh.dataplane.IGripperState|null} [rightGripper] RobotState rightGripper
             * @property {boolean|null} [systemReady] RobotState systemReady
             * @property {Array.<string>|null} [activeErrors] RobotState activeErrors
             * @property {Array.<string>|null} [warnings] RobotState warnings
             */

            /**
             * Constructs a new RobotState.
             * @memberof qyh.dataplane
             * @classdesc Represents a RobotState.
             * @implements IRobotState
             * @constructor
             * @param {qyh.dataplane.IRobotState=} [properties] Properties to set
             */
            function RobotState(properties) {
                this.activeErrors = [];
                this.warnings = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * RobotState header.
             * @member {qyh.dataplane.IHeader|null|undefined} header
             * @memberof qyh.dataplane.RobotState
             * @instance
             */
            RobotState.prototype.header = null;

            /**
             * RobotState mode.
             * @member {qyh.dataplane.RobotMode} mode
             * @memberof qyh.dataplane.RobotState
             * @instance
             */
            RobotState.prototype.mode = 0;

            /**
             * RobotState controlHeld.
             * @member {boolean} controlHeld
             * @memberof qyh.dataplane.RobotState
             * @instance
             */
            RobotState.prototype.controlHeld = false;

            /**
             * RobotState controlHolder.
             * @member {string} controlHolder
             * @memberof qyh.dataplane.RobotState
             * @instance
             */
            RobotState.prototype.controlHolder = "";

            /**
             * RobotState arm.
             * @member {qyh.dataplane.IArmState|null|undefined} arm
             * @memberof qyh.dataplane.RobotState
             * @instance
             */
            RobotState.prototype.arm = null;

            /**
             * RobotState chassis.
             * @member {qyh.dataplane.IChassisState|null|undefined} chassis
             * @memberof qyh.dataplane.RobotState
             * @instance
             */
            RobotState.prototype.chassis = null;

            /**
             * RobotState joints.
             * @member {qyh.dataplane.IJointState|null|undefined} joints
             * @memberof qyh.dataplane.RobotState
             * @instance
             */
            RobotState.prototype.joints = null;

            /**
             * RobotState lift.
             * @member {qyh.dataplane.IActuatorState|null|undefined} lift
             * @memberof qyh.dataplane.RobotState
             * @instance
             */
            RobotState.prototype.lift = null;

            /**
             * RobotState waist.
             * @member {qyh.dataplane.IActuatorState|null|undefined} waist
             * @memberof qyh.dataplane.RobotState
             * @instance
             */
            RobotState.prototype.waist = null;

            /**
             * RobotState headPan.
             * @member {qyh.dataplane.IActuatorState|null|undefined} headPan
             * @memberof qyh.dataplane.RobotState
             * @instance
             */
            RobotState.prototype.headPan = null;

            /**
             * RobotState headTilt.
             * @member {qyh.dataplane.IActuatorState|null|undefined} headTilt
             * @memberof qyh.dataplane.RobotState
             * @instance
             */
            RobotState.prototype.headTilt = null;

            /**
             * RobotState leftGripper.
             * @member {qyh.dataplane.IGripperState|null|undefined} leftGripper
             * @memberof qyh.dataplane.RobotState
             * @instance
             */
            RobotState.prototype.leftGripper = null;

            /**
             * RobotState rightGripper.
             * @member {qyh.dataplane.IGripperState|null|undefined} rightGripper
             * @memberof qyh.dataplane.RobotState
             * @instance
             */
            RobotState.prototype.rightGripper = null;

            /**
             * RobotState systemReady.
             * @member {boolean} systemReady
             * @memberof qyh.dataplane.RobotState
             * @instance
             */
            RobotState.prototype.systemReady = false;

            /**
             * RobotState activeErrors.
             * @member {Array.<string>} activeErrors
             * @memberof qyh.dataplane.RobotState
             * @instance
             */
            RobotState.prototype.activeErrors = $util.emptyArray;

            /**
             * RobotState warnings.
             * @member {Array.<string>} warnings
             * @memberof qyh.dataplane.RobotState
             * @instance
             */
            RobotState.prototype.warnings = $util.emptyArray;

            /**
             * Creates a new RobotState instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.RobotState
             * @static
             * @param {qyh.dataplane.IRobotState=} [properties] Properties to set
             * @returns {qyh.dataplane.RobotState} RobotState instance
             */
            RobotState.create = function create(properties) {
                return new RobotState(properties);
            };

            /**
             * Encodes the specified RobotState message. Does not implicitly {@link qyh.dataplane.RobotState.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.RobotState
             * @static
             * @param {qyh.dataplane.IRobotState} message RobotState message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RobotState.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                    $root.qyh.dataplane.Header.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.mode != null && Object.hasOwnProperty.call(message, "mode"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.mode);
                if (message.controlHeld != null && Object.hasOwnProperty.call(message, "controlHeld"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.controlHeld);
                if (message.controlHolder != null && Object.hasOwnProperty.call(message, "controlHolder"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.controlHolder);
                if (message.arm != null && Object.hasOwnProperty.call(message, "arm"))
                    $root.qyh.dataplane.ArmState.encode(message.arm, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                if (message.chassis != null && Object.hasOwnProperty.call(message, "chassis"))
                    $root.qyh.dataplane.ChassisState.encode(message.chassis, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                if (message.joints != null && Object.hasOwnProperty.call(message, "joints"))
                    $root.qyh.dataplane.JointState.encode(message.joints, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                if (message.lift != null && Object.hasOwnProperty.call(message, "lift"))
                    $root.qyh.dataplane.ActuatorState.encode(message.lift, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
                if (message.waist != null && Object.hasOwnProperty.call(message, "waist"))
                    $root.qyh.dataplane.ActuatorState.encode(message.waist, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
                if (message.headPan != null && Object.hasOwnProperty.call(message, "headPan"))
                    $root.qyh.dataplane.ActuatorState.encode(message.headPan, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
                if (message.headTilt != null && Object.hasOwnProperty.call(message, "headTilt"))
                    $root.qyh.dataplane.ActuatorState.encode(message.headTilt, writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
                if (message.leftGripper != null && Object.hasOwnProperty.call(message, "leftGripper"))
                    $root.qyh.dataplane.GripperState.encode(message.leftGripper, writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
                if (message.rightGripper != null && Object.hasOwnProperty.call(message, "rightGripper"))
                    $root.qyh.dataplane.GripperState.encode(message.rightGripper, writer.uint32(/* id 13, wireType 2 =*/106).fork()).ldelim();
                if (message.systemReady != null && Object.hasOwnProperty.call(message, "systemReady"))
                    writer.uint32(/* id 14, wireType 0 =*/112).bool(message.systemReady);
                if (message.activeErrors != null && message.activeErrors.length)
                    for (let i = 0; i < message.activeErrors.length; ++i)
                        writer.uint32(/* id 15, wireType 2 =*/122).string(message.activeErrors[i]);
                if (message.warnings != null && message.warnings.length)
                    for (let i = 0; i < message.warnings.length; ++i)
                        writer.uint32(/* id 16, wireType 2 =*/130).string(message.warnings[i]);
                return writer;
            };

            /**
             * Encodes the specified RobotState message, length delimited. Does not implicitly {@link qyh.dataplane.RobotState.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.RobotState
             * @static
             * @param {qyh.dataplane.IRobotState} message RobotState message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RobotState.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a RobotState message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.RobotState
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.RobotState} RobotState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RobotState.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.RobotState();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.header = $root.qyh.dataplane.Header.decode(reader, reader.uint32());
                            break;
                        }
                    case 2: {
                            message.mode = reader.int32();
                            break;
                        }
                    case 3: {
                            message.controlHeld = reader.bool();
                            break;
                        }
                    case 4: {
                            message.controlHolder = reader.string();
                            break;
                        }
                    case 5: {
                            message.arm = $root.qyh.dataplane.ArmState.decode(reader, reader.uint32());
                            break;
                        }
                    case 6: {
                            message.chassis = $root.qyh.dataplane.ChassisState.decode(reader, reader.uint32());
                            break;
                        }
                    case 7: {
                            message.joints = $root.qyh.dataplane.JointState.decode(reader, reader.uint32());
                            break;
                        }
                    case 8: {
                            message.lift = $root.qyh.dataplane.ActuatorState.decode(reader, reader.uint32());
                            break;
                        }
                    case 9: {
                            message.waist = $root.qyh.dataplane.ActuatorState.decode(reader, reader.uint32());
                            break;
                        }
                    case 10: {
                            message.headPan = $root.qyh.dataplane.ActuatorState.decode(reader, reader.uint32());
                            break;
                        }
                    case 11: {
                            message.headTilt = $root.qyh.dataplane.ActuatorState.decode(reader, reader.uint32());
                            break;
                        }
                    case 12: {
                            message.leftGripper = $root.qyh.dataplane.GripperState.decode(reader, reader.uint32());
                            break;
                        }
                    case 13: {
                            message.rightGripper = $root.qyh.dataplane.GripperState.decode(reader, reader.uint32());
                            break;
                        }
                    case 14: {
                            message.systemReady = reader.bool();
                            break;
                        }
                    case 15: {
                            if (!(message.activeErrors && message.activeErrors.length))
                                message.activeErrors = [];
                            message.activeErrors.push(reader.string());
                            break;
                        }
                    case 16: {
                            if (!(message.warnings && message.warnings.length))
                                message.warnings = [];
                            message.warnings.push(reader.string());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a RobotState message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.RobotState
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.RobotState} RobotState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RobotState.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a RobotState message.
             * @function verify
             * @memberof qyh.dataplane.RobotState
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RobotState.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.header != null && message.hasOwnProperty("header")) {
                    let error = $root.qyh.dataplane.Header.verify(message.header);
                    if (error)
                        return "header." + error;
                }
                if (message.mode != null && message.hasOwnProperty("mode"))
                    switch (message.mode) {
                    default:
                        return "mode: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                        break;
                    }
                if (message.controlHeld != null && message.hasOwnProperty("controlHeld"))
                    if (typeof message.controlHeld !== "boolean")
                        return "controlHeld: boolean expected";
                if (message.controlHolder != null && message.hasOwnProperty("controlHolder"))
                    if (!$util.isString(message.controlHolder))
                        return "controlHolder: string expected";
                if (message.arm != null && message.hasOwnProperty("arm")) {
                    let error = $root.qyh.dataplane.ArmState.verify(message.arm);
                    if (error)
                        return "arm." + error;
                }
                if (message.chassis != null && message.hasOwnProperty("chassis")) {
                    let error = $root.qyh.dataplane.ChassisState.verify(message.chassis);
                    if (error)
                        return "chassis." + error;
                }
                if (message.joints != null && message.hasOwnProperty("joints")) {
                    let error = $root.qyh.dataplane.JointState.verify(message.joints);
                    if (error)
                        return "joints." + error;
                }
                if (message.lift != null && message.hasOwnProperty("lift")) {
                    let error = $root.qyh.dataplane.ActuatorState.verify(message.lift);
                    if (error)
                        return "lift." + error;
                }
                if (message.waist != null && message.hasOwnProperty("waist")) {
                    let error = $root.qyh.dataplane.ActuatorState.verify(message.waist);
                    if (error)
                        return "waist." + error;
                }
                if (message.headPan != null && message.hasOwnProperty("headPan")) {
                    let error = $root.qyh.dataplane.ActuatorState.verify(message.headPan);
                    if (error)
                        return "headPan." + error;
                }
                if (message.headTilt != null && message.hasOwnProperty("headTilt")) {
                    let error = $root.qyh.dataplane.ActuatorState.verify(message.headTilt);
                    if (error)
                        return "headTilt." + error;
                }
                if (message.leftGripper != null && message.hasOwnProperty("leftGripper")) {
                    let error = $root.qyh.dataplane.GripperState.verify(message.leftGripper);
                    if (error)
                        return "leftGripper." + error;
                }
                if (message.rightGripper != null && message.hasOwnProperty("rightGripper")) {
                    let error = $root.qyh.dataplane.GripperState.verify(message.rightGripper);
                    if (error)
                        return "rightGripper." + error;
                }
                if (message.systemReady != null && message.hasOwnProperty("systemReady"))
                    if (typeof message.systemReady !== "boolean")
                        return "systemReady: boolean expected";
                if (message.activeErrors != null && message.hasOwnProperty("activeErrors")) {
                    if (!Array.isArray(message.activeErrors))
                        return "activeErrors: array expected";
                    for (let i = 0; i < message.activeErrors.length; ++i)
                        if (!$util.isString(message.activeErrors[i]))
                            return "activeErrors: string[] expected";
                }
                if (message.warnings != null && message.hasOwnProperty("warnings")) {
                    if (!Array.isArray(message.warnings))
                        return "warnings: array expected";
                    for (let i = 0; i < message.warnings.length; ++i)
                        if (!$util.isString(message.warnings[i]))
                            return "warnings: string[] expected";
                }
                return null;
            };

            /**
             * Creates a RobotState message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.RobotState
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.RobotState} RobotState
             */
            RobotState.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.RobotState)
                    return object;
                let message = new $root.qyh.dataplane.RobotState();
                if (object.header != null) {
                    if (typeof object.header !== "object")
                        throw TypeError(".qyh.dataplane.RobotState.header: object expected");
                    message.header = $root.qyh.dataplane.Header.fromObject(object.header);
                }
                switch (object.mode) {
                default:
                    if (typeof object.mode === "number") {
                        message.mode = object.mode;
                        break;
                    }
                    break;
                case "MODE_IDLE":
                case 0:
                    message.mode = 0;
                    break;
                case "MODE_TELEOP":
                case 1:
                    message.mode = 1;
                    break;
                case "MODE_AUTO":
                case 2:
                    message.mode = 2;
                    break;
                case "MODE_MAINTENANCE":
                case 3:
                    message.mode = 3;
                    break;
                case "MODE_ERROR":
                case 4:
                    message.mode = 4;
                    break;
                }
                if (object.controlHeld != null)
                    message.controlHeld = Boolean(object.controlHeld);
                if (object.controlHolder != null)
                    message.controlHolder = String(object.controlHolder);
                if (object.arm != null) {
                    if (typeof object.arm !== "object")
                        throw TypeError(".qyh.dataplane.RobotState.arm: object expected");
                    message.arm = $root.qyh.dataplane.ArmState.fromObject(object.arm);
                }
                if (object.chassis != null) {
                    if (typeof object.chassis !== "object")
                        throw TypeError(".qyh.dataplane.RobotState.chassis: object expected");
                    message.chassis = $root.qyh.dataplane.ChassisState.fromObject(object.chassis);
                }
                if (object.joints != null) {
                    if (typeof object.joints !== "object")
                        throw TypeError(".qyh.dataplane.RobotState.joints: object expected");
                    message.joints = $root.qyh.dataplane.JointState.fromObject(object.joints);
                }
                if (object.lift != null) {
                    if (typeof object.lift !== "object")
                        throw TypeError(".qyh.dataplane.RobotState.lift: object expected");
                    message.lift = $root.qyh.dataplane.ActuatorState.fromObject(object.lift);
                }
                if (object.waist != null) {
                    if (typeof object.waist !== "object")
                        throw TypeError(".qyh.dataplane.RobotState.waist: object expected");
                    message.waist = $root.qyh.dataplane.ActuatorState.fromObject(object.waist);
                }
                if (object.headPan != null) {
                    if (typeof object.headPan !== "object")
                        throw TypeError(".qyh.dataplane.RobotState.headPan: object expected");
                    message.headPan = $root.qyh.dataplane.ActuatorState.fromObject(object.headPan);
                }
                if (object.headTilt != null) {
                    if (typeof object.headTilt !== "object")
                        throw TypeError(".qyh.dataplane.RobotState.headTilt: object expected");
                    message.headTilt = $root.qyh.dataplane.ActuatorState.fromObject(object.headTilt);
                }
                if (object.leftGripper != null) {
                    if (typeof object.leftGripper !== "object")
                        throw TypeError(".qyh.dataplane.RobotState.leftGripper: object expected");
                    message.leftGripper = $root.qyh.dataplane.GripperState.fromObject(object.leftGripper);
                }
                if (object.rightGripper != null) {
                    if (typeof object.rightGripper !== "object")
                        throw TypeError(".qyh.dataplane.RobotState.rightGripper: object expected");
                    message.rightGripper = $root.qyh.dataplane.GripperState.fromObject(object.rightGripper);
                }
                if (object.systemReady != null)
                    message.systemReady = Boolean(object.systemReady);
                if (object.activeErrors) {
                    if (!Array.isArray(object.activeErrors))
                        throw TypeError(".qyh.dataplane.RobotState.activeErrors: array expected");
                    message.activeErrors = [];
                    for (let i = 0; i < object.activeErrors.length; ++i)
                        message.activeErrors[i] = String(object.activeErrors[i]);
                }
                if (object.warnings) {
                    if (!Array.isArray(object.warnings))
                        throw TypeError(".qyh.dataplane.RobotState.warnings: array expected");
                    message.warnings = [];
                    for (let i = 0; i < object.warnings.length; ++i)
                        message.warnings[i] = String(object.warnings[i]);
                }
                return message;
            };

            /**
             * Creates a plain object from a RobotState message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.RobotState
             * @static
             * @param {qyh.dataplane.RobotState} message RobotState
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            RobotState.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults) {
                    object.activeErrors = [];
                    object.warnings = [];
                }
                if (options.defaults) {
                    object.header = null;
                    object.mode = options.enums === String ? "MODE_IDLE" : 0;
                    object.controlHeld = false;
                    object.controlHolder = "";
                    object.arm = null;
                    object.chassis = null;
                    object.joints = null;
                    object.lift = null;
                    object.waist = null;
                    object.headPan = null;
                    object.headTilt = null;
                    object.leftGripper = null;
                    object.rightGripper = null;
                    object.systemReady = false;
                }
                if (message.header != null && message.hasOwnProperty("header"))
                    object.header = $root.qyh.dataplane.Header.toObject(message.header, options);
                if (message.mode != null && message.hasOwnProperty("mode"))
                    object.mode = options.enums === String ? $root.qyh.dataplane.RobotMode[message.mode] === undefined ? message.mode : $root.qyh.dataplane.RobotMode[message.mode] : message.mode;
                if (message.controlHeld != null && message.hasOwnProperty("controlHeld"))
                    object.controlHeld = message.controlHeld;
                if (message.controlHolder != null && message.hasOwnProperty("controlHolder"))
                    object.controlHolder = message.controlHolder;
                if (message.arm != null && message.hasOwnProperty("arm"))
                    object.arm = $root.qyh.dataplane.ArmState.toObject(message.arm, options);
                if (message.chassis != null && message.hasOwnProperty("chassis"))
                    object.chassis = $root.qyh.dataplane.ChassisState.toObject(message.chassis, options);
                if (message.joints != null && message.hasOwnProperty("joints"))
                    object.joints = $root.qyh.dataplane.JointState.toObject(message.joints, options);
                if (message.lift != null && message.hasOwnProperty("lift"))
                    object.lift = $root.qyh.dataplane.ActuatorState.toObject(message.lift, options);
                if (message.waist != null && message.hasOwnProperty("waist"))
                    object.waist = $root.qyh.dataplane.ActuatorState.toObject(message.waist, options);
                if (message.headPan != null && message.hasOwnProperty("headPan"))
                    object.headPan = $root.qyh.dataplane.ActuatorState.toObject(message.headPan, options);
                if (message.headTilt != null && message.hasOwnProperty("headTilt"))
                    object.headTilt = $root.qyh.dataplane.ActuatorState.toObject(message.headTilt, options);
                if (message.leftGripper != null && message.hasOwnProperty("leftGripper"))
                    object.leftGripper = $root.qyh.dataplane.GripperState.toObject(message.leftGripper, options);
                if (message.rightGripper != null && message.hasOwnProperty("rightGripper"))
                    object.rightGripper = $root.qyh.dataplane.GripperState.toObject(message.rightGripper, options);
                if (message.systemReady != null && message.hasOwnProperty("systemReady"))
                    object.systemReady = message.systemReady;
                if (message.activeErrors && message.activeErrors.length) {
                    object.activeErrors = [];
                    for (let j = 0; j < message.activeErrors.length; ++j)
                        object.activeErrors[j] = message.activeErrors[j];
                }
                if (message.warnings && message.warnings.length) {
                    object.warnings = [];
                    for (let j = 0; j < message.warnings.length; ++j)
                        object.warnings[j] = message.warnings[j];
                }
                return object;
            };

            /**
             * Converts this RobotState to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.RobotState
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            RobotState.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for RobotState
             * @function getTypeUrl
             * @memberof qyh.dataplane.RobotState
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            RobotState.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.RobotState";
            };

            return RobotState;
        })();

        dataplane.VRSystemState = (function() {

            /**
             * Properties of a VRSystemState.
             * @memberof qyh.dataplane
             * @interface IVRSystemState
             * @property {qyh.dataplane.IHeader|null} [header] VRSystemState header
             * @property {boolean|null} [connected] VRSystemState connected
             * @property {qyh.dataplane.IPose|null} [headPose] VRSystemState headPose
             * @property {boolean|null} [leftControllerActive] VRSystemState leftControllerActive
             * @property {boolean|null} [rightControllerActive] VRSystemState rightControllerActive
             * @property {boolean|null} [leftClutchEngaged] VRSystemState leftClutchEngaged
             * @property {boolean|null} [rightClutchEngaged] VRSystemState rightClutchEngaged
             */

            /**
             * Constructs a new VRSystemState.
             * @memberof qyh.dataplane
             * @classdesc Represents a VRSystemState.
             * @implements IVRSystemState
             * @constructor
             * @param {qyh.dataplane.IVRSystemState=} [properties] Properties to set
             */
            function VRSystemState(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * VRSystemState header.
             * @member {qyh.dataplane.IHeader|null|undefined} header
             * @memberof qyh.dataplane.VRSystemState
             * @instance
             */
            VRSystemState.prototype.header = null;

            /**
             * VRSystemState connected.
             * @member {boolean} connected
             * @memberof qyh.dataplane.VRSystemState
             * @instance
             */
            VRSystemState.prototype.connected = false;

            /**
             * VRSystemState headPose.
             * @member {qyh.dataplane.IPose|null|undefined} headPose
             * @memberof qyh.dataplane.VRSystemState
             * @instance
             */
            VRSystemState.prototype.headPose = null;

            /**
             * VRSystemState leftControllerActive.
             * @member {boolean} leftControllerActive
             * @memberof qyh.dataplane.VRSystemState
             * @instance
             */
            VRSystemState.prototype.leftControllerActive = false;

            /**
             * VRSystemState rightControllerActive.
             * @member {boolean} rightControllerActive
             * @memberof qyh.dataplane.VRSystemState
             * @instance
             */
            VRSystemState.prototype.rightControllerActive = false;

            /**
             * VRSystemState leftClutchEngaged.
             * @member {boolean} leftClutchEngaged
             * @memberof qyh.dataplane.VRSystemState
             * @instance
             */
            VRSystemState.prototype.leftClutchEngaged = false;

            /**
             * VRSystemState rightClutchEngaged.
             * @member {boolean} rightClutchEngaged
             * @memberof qyh.dataplane.VRSystemState
             * @instance
             */
            VRSystemState.prototype.rightClutchEngaged = false;

            /**
             * Creates a new VRSystemState instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.VRSystemState
             * @static
             * @param {qyh.dataplane.IVRSystemState=} [properties] Properties to set
             * @returns {qyh.dataplane.VRSystemState} VRSystemState instance
             */
            VRSystemState.create = function create(properties) {
                return new VRSystemState(properties);
            };

            /**
             * Encodes the specified VRSystemState message. Does not implicitly {@link qyh.dataplane.VRSystemState.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.VRSystemState
             * @static
             * @param {qyh.dataplane.IVRSystemState} message VRSystemState message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            VRSystemState.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                    $root.qyh.dataplane.Header.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.connected != null && Object.hasOwnProperty.call(message, "connected"))
                    writer.uint32(/* id 2, wireType 0 =*/16).bool(message.connected);
                if (message.headPose != null && Object.hasOwnProperty.call(message, "headPose"))
                    $root.qyh.dataplane.Pose.encode(message.headPose, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.leftControllerActive != null && Object.hasOwnProperty.call(message, "leftControllerActive"))
                    writer.uint32(/* id 4, wireType 0 =*/32).bool(message.leftControllerActive);
                if (message.rightControllerActive != null && Object.hasOwnProperty.call(message, "rightControllerActive"))
                    writer.uint32(/* id 5, wireType 0 =*/40).bool(message.rightControllerActive);
                if (message.leftClutchEngaged != null && Object.hasOwnProperty.call(message, "leftClutchEngaged"))
                    writer.uint32(/* id 6, wireType 0 =*/48).bool(message.leftClutchEngaged);
                if (message.rightClutchEngaged != null && Object.hasOwnProperty.call(message, "rightClutchEngaged"))
                    writer.uint32(/* id 7, wireType 0 =*/56).bool(message.rightClutchEngaged);
                return writer;
            };

            /**
             * Encodes the specified VRSystemState message, length delimited. Does not implicitly {@link qyh.dataplane.VRSystemState.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.VRSystemState
             * @static
             * @param {qyh.dataplane.IVRSystemState} message VRSystemState message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            VRSystemState.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a VRSystemState message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.VRSystemState
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.VRSystemState} VRSystemState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            VRSystemState.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.VRSystemState();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.header = $root.qyh.dataplane.Header.decode(reader, reader.uint32());
                            break;
                        }
                    case 2: {
                            message.connected = reader.bool();
                            break;
                        }
                    case 3: {
                            message.headPose = $root.qyh.dataplane.Pose.decode(reader, reader.uint32());
                            break;
                        }
                    case 4: {
                            message.leftControllerActive = reader.bool();
                            break;
                        }
                    case 5: {
                            message.rightControllerActive = reader.bool();
                            break;
                        }
                    case 6: {
                            message.leftClutchEngaged = reader.bool();
                            break;
                        }
                    case 7: {
                            message.rightClutchEngaged = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a VRSystemState message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.VRSystemState
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.VRSystemState} VRSystemState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            VRSystemState.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a VRSystemState message.
             * @function verify
             * @memberof qyh.dataplane.VRSystemState
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            VRSystemState.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.header != null && message.hasOwnProperty("header")) {
                    let error = $root.qyh.dataplane.Header.verify(message.header);
                    if (error)
                        return "header." + error;
                }
                if (message.connected != null && message.hasOwnProperty("connected"))
                    if (typeof message.connected !== "boolean")
                        return "connected: boolean expected";
                if (message.headPose != null && message.hasOwnProperty("headPose")) {
                    let error = $root.qyh.dataplane.Pose.verify(message.headPose);
                    if (error)
                        return "headPose." + error;
                }
                if (message.leftControllerActive != null && message.hasOwnProperty("leftControllerActive"))
                    if (typeof message.leftControllerActive !== "boolean")
                        return "leftControllerActive: boolean expected";
                if (message.rightControllerActive != null && message.hasOwnProperty("rightControllerActive"))
                    if (typeof message.rightControllerActive !== "boolean")
                        return "rightControllerActive: boolean expected";
                if (message.leftClutchEngaged != null && message.hasOwnProperty("leftClutchEngaged"))
                    if (typeof message.leftClutchEngaged !== "boolean")
                        return "leftClutchEngaged: boolean expected";
                if (message.rightClutchEngaged != null && message.hasOwnProperty("rightClutchEngaged"))
                    if (typeof message.rightClutchEngaged !== "boolean")
                        return "rightClutchEngaged: boolean expected";
                return null;
            };

            /**
             * Creates a VRSystemState message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.VRSystemState
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.VRSystemState} VRSystemState
             */
            VRSystemState.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.VRSystemState)
                    return object;
                let message = new $root.qyh.dataplane.VRSystemState();
                if (object.header != null) {
                    if (typeof object.header !== "object")
                        throw TypeError(".qyh.dataplane.VRSystemState.header: object expected");
                    message.header = $root.qyh.dataplane.Header.fromObject(object.header);
                }
                if (object.connected != null)
                    message.connected = Boolean(object.connected);
                if (object.headPose != null) {
                    if (typeof object.headPose !== "object")
                        throw TypeError(".qyh.dataplane.VRSystemState.headPose: object expected");
                    message.headPose = $root.qyh.dataplane.Pose.fromObject(object.headPose);
                }
                if (object.leftControllerActive != null)
                    message.leftControllerActive = Boolean(object.leftControllerActive);
                if (object.rightControllerActive != null)
                    message.rightControllerActive = Boolean(object.rightControllerActive);
                if (object.leftClutchEngaged != null)
                    message.leftClutchEngaged = Boolean(object.leftClutchEngaged);
                if (object.rightClutchEngaged != null)
                    message.rightClutchEngaged = Boolean(object.rightClutchEngaged);
                return message;
            };

            /**
             * Creates a plain object from a VRSystemState message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.VRSystemState
             * @static
             * @param {qyh.dataplane.VRSystemState} message VRSystemState
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            VRSystemState.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.header = null;
                    object.connected = false;
                    object.headPose = null;
                    object.leftControllerActive = false;
                    object.rightControllerActive = false;
                    object.leftClutchEngaged = false;
                    object.rightClutchEngaged = false;
                }
                if (message.header != null && message.hasOwnProperty("header"))
                    object.header = $root.qyh.dataplane.Header.toObject(message.header, options);
                if (message.connected != null && message.hasOwnProperty("connected"))
                    object.connected = message.connected;
                if (message.headPose != null && message.hasOwnProperty("headPose"))
                    object.headPose = $root.qyh.dataplane.Pose.toObject(message.headPose, options);
                if (message.leftControllerActive != null && message.hasOwnProperty("leftControllerActive"))
                    object.leftControllerActive = message.leftControllerActive;
                if (message.rightControllerActive != null && message.hasOwnProperty("rightControllerActive"))
                    object.rightControllerActive = message.rightControllerActive;
                if (message.leftClutchEngaged != null && message.hasOwnProperty("leftClutchEngaged"))
                    object.leftClutchEngaged = message.leftClutchEngaged;
                if (message.rightClutchEngaged != null && message.hasOwnProperty("rightClutchEngaged"))
                    object.rightClutchEngaged = message.rightClutchEngaged;
                return object;
            };

            /**
             * Converts this VRSystemState to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.VRSystemState
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            VRSystemState.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for VRSystemState
             * @function getTypeUrl
             * @memberof qyh.dataplane.VRSystemState
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            VRSystemState.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.VRSystemState";
            };

            return VRSystemState;
        })();

        dataplane.TaskState = (function() {

            /**
             * Properties of a TaskState.
             * @memberof qyh.dataplane
             * @interface ITaskState
             * @property {qyh.dataplane.IHeader|null} [header] TaskState header
             * @property {number|Long|null} [taskId] TaskState taskId
             * @property {string|null} [taskName] TaskState taskName
             * @property {qyh.dataplane.TaskState.Status|null} [status] TaskState status
             * @property {number|null} [currentStep] TaskState currentStep
             * @property {number|null} [totalSteps] TaskState totalSteps
             * @property {number|null} [progress] TaskState progress
             * @property {string|null} [currentAction] TaskState currentAction
             * @property {string|null} [errorMessage] TaskState errorMessage
             */

            /**
             * Constructs a new TaskState.
             * @memberof qyh.dataplane
             * @classdesc Represents a TaskState.
             * @implements ITaskState
             * @constructor
             * @param {qyh.dataplane.ITaskState=} [properties] Properties to set
             */
            function TaskState(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * TaskState header.
             * @member {qyh.dataplane.IHeader|null|undefined} header
             * @memberof qyh.dataplane.TaskState
             * @instance
             */
            TaskState.prototype.header = null;

            /**
             * TaskState taskId.
             * @member {number|Long} taskId
             * @memberof qyh.dataplane.TaskState
             * @instance
             */
            TaskState.prototype.taskId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * TaskState taskName.
             * @member {string} taskName
             * @memberof qyh.dataplane.TaskState
             * @instance
             */
            TaskState.prototype.taskName = "";

            /**
             * TaskState status.
             * @member {qyh.dataplane.TaskState.Status} status
             * @memberof qyh.dataplane.TaskState
             * @instance
             */
            TaskState.prototype.status = 0;

            /**
             * TaskState currentStep.
             * @member {number} currentStep
             * @memberof qyh.dataplane.TaskState
             * @instance
             */
            TaskState.prototype.currentStep = 0;

            /**
             * TaskState totalSteps.
             * @member {number} totalSteps
             * @memberof qyh.dataplane.TaskState
             * @instance
             */
            TaskState.prototype.totalSteps = 0;

            /**
             * TaskState progress.
             * @member {number} progress
             * @memberof qyh.dataplane.TaskState
             * @instance
             */
            TaskState.prototype.progress = 0;

            /**
             * TaskState currentAction.
             * @member {string} currentAction
             * @memberof qyh.dataplane.TaskState
             * @instance
             */
            TaskState.prototype.currentAction = "";

            /**
             * TaskState errorMessage.
             * @member {string} errorMessage
             * @memberof qyh.dataplane.TaskState
             * @instance
             */
            TaskState.prototype.errorMessage = "";

            /**
             * Creates a new TaskState instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.TaskState
             * @static
             * @param {qyh.dataplane.ITaskState=} [properties] Properties to set
             * @returns {qyh.dataplane.TaskState} TaskState instance
             */
            TaskState.create = function create(properties) {
                return new TaskState(properties);
            };

            /**
             * Encodes the specified TaskState message. Does not implicitly {@link qyh.dataplane.TaskState.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.TaskState
             * @static
             * @param {qyh.dataplane.ITaskState} message TaskState message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TaskState.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                    $root.qyh.dataplane.Header.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.taskId != null && Object.hasOwnProperty.call(message, "taskId"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.taskId);
                if (message.taskName != null && Object.hasOwnProperty.call(message, "taskName"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.taskName);
                if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.status);
                if (message.currentStep != null && Object.hasOwnProperty.call(message, "currentStep"))
                    writer.uint32(/* id 5, wireType 0 =*/40).int32(message.currentStep);
                if (message.totalSteps != null && Object.hasOwnProperty.call(message, "totalSteps"))
                    writer.uint32(/* id 6, wireType 0 =*/48).int32(message.totalSteps);
                if (message.progress != null && Object.hasOwnProperty.call(message, "progress"))
                    writer.uint32(/* id 7, wireType 1 =*/57).double(message.progress);
                if (message.currentAction != null && Object.hasOwnProperty.call(message, "currentAction"))
                    writer.uint32(/* id 8, wireType 2 =*/66).string(message.currentAction);
                if (message.errorMessage != null && Object.hasOwnProperty.call(message, "errorMessage"))
                    writer.uint32(/* id 9, wireType 2 =*/74).string(message.errorMessage);
                return writer;
            };

            /**
             * Encodes the specified TaskState message, length delimited. Does not implicitly {@link qyh.dataplane.TaskState.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.TaskState
             * @static
             * @param {qyh.dataplane.ITaskState} message TaskState message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TaskState.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TaskState message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.TaskState
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.TaskState} TaskState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TaskState.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.TaskState();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.header = $root.qyh.dataplane.Header.decode(reader, reader.uint32());
                            break;
                        }
                    case 2: {
                            message.taskId = reader.int64();
                            break;
                        }
                    case 3: {
                            message.taskName = reader.string();
                            break;
                        }
                    case 4: {
                            message.status = reader.int32();
                            break;
                        }
                    case 5: {
                            message.currentStep = reader.int32();
                            break;
                        }
                    case 6: {
                            message.totalSteps = reader.int32();
                            break;
                        }
                    case 7: {
                            message.progress = reader.double();
                            break;
                        }
                    case 8: {
                            message.currentAction = reader.string();
                            break;
                        }
                    case 9: {
                            message.errorMessage = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a TaskState message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.TaskState
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.TaskState} TaskState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TaskState.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a TaskState message.
             * @function verify
             * @memberof qyh.dataplane.TaskState
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TaskState.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.header != null && message.hasOwnProperty("header")) {
                    let error = $root.qyh.dataplane.Header.verify(message.header);
                    if (error)
                        return "header." + error;
                }
                if (message.taskId != null && message.hasOwnProperty("taskId"))
                    if (!$util.isInteger(message.taskId) && !(message.taskId && $util.isInteger(message.taskId.low) && $util.isInteger(message.taskId.high)))
                        return "taskId: integer|Long expected";
                if (message.taskName != null && message.hasOwnProperty("taskName"))
                    if (!$util.isString(message.taskName))
                        return "taskName: string expected";
                if (message.status != null && message.hasOwnProperty("status"))
                    switch (message.status) {
                    default:
                        return "status: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        break;
                    }
                if (message.currentStep != null && message.hasOwnProperty("currentStep"))
                    if (!$util.isInteger(message.currentStep))
                        return "currentStep: integer expected";
                if (message.totalSteps != null && message.hasOwnProperty("totalSteps"))
                    if (!$util.isInteger(message.totalSteps))
                        return "totalSteps: integer expected";
                if (message.progress != null && message.hasOwnProperty("progress"))
                    if (typeof message.progress !== "number")
                        return "progress: number expected";
                if (message.currentAction != null && message.hasOwnProperty("currentAction"))
                    if (!$util.isString(message.currentAction))
                        return "currentAction: string expected";
                if (message.errorMessage != null && message.hasOwnProperty("errorMessage"))
                    if (!$util.isString(message.errorMessage))
                        return "errorMessage: string expected";
                return null;
            };

            /**
             * Creates a TaskState message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.TaskState
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.TaskState} TaskState
             */
            TaskState.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.TaskState)
                    return object;
                let message = new $root.qyh.dataplane.TaskState();
                if (object.header != null) {
                    if (typeof object.header !== "object")
                        throw TypeError(".qyh.dataplane.TaskState.header: object expected");
                    message.header = $root.qyh.dataplane.Header.fromObject(object.header);
                }
                if (object.taskId != null)
                    if ($util.Long)
                        (message.taskId = $util.Long.fromValue(object.taskId)).unsigned = false;
                    else if (typeof object.taskId === "string")
                        message.taskId = parseInt(object.taskId, 10);
                    else if (typeof object.taskId === "number")
                        message.taskId = object.taskId;
                    else if (typeof object.taskId === "object")
                        message.taskId = new $util.LongBits(object.taskId.low >>> 0, object.taskId.high >>> 0).toNumber();
                if (object.taskName != null)
                    message.taskName = String(object.taskName);
                switch (object.status) {
                default:
                    if (typeof object.status === "number") {
                        message.status = object.status;
                        break;
                    }
                    break;
                case "PENDING":
                case 0:
                    message.status = 0;
                    break;
                case "RUNNING":
                case 1:
                    message.status = 1;
                    break;
                case "PAUSED":
                case 2:
                    message.status = 2;
                    break;
                case "COMPLETED":
                case 3:
                    message.status = 3;
                    break;
                case "FAILED":
                case 4:
                    message.status = 4;
                    break;
                case "CANCELLED":
                case 5:
                    message.status = 5;
                    break;
                }
                if (object.currentStep != null)
                    message.currentStep = object.currentStep | 0;
                if (object.totalSteps != null)
                    message.totalSteps = object.totalSteps | 0;
                if (object.progress != null)
                    message.progress = Number(object.progress);
                if (object.currentAction != null)
                    message.currentAction = String(object.currentAction);
                if (object.errorMessage != null)
                    message.errorMessage = String(object.errorMessage);
                return message;
            };

            /**
             * Creates a plain object from a TaskState message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.TaskState
             * @static
             * @param {qyh.dataplane.TaskState} message TaskState
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TaskState.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.header = null;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.taskId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.taskId = options.longs === String ? "0" : 0;
                    object.taskName = "";
                    object.status = options.enums === String ? "PENDING" : 0;
                    object.currentStep = 0;
                    object.totalSteps = 0;
                    object.progress = 0;
                    object.currentAction = "";
                    object.errorMessage = "";
                }
                if (message.header != null && message.hasOwnProperty("header"))
                    object.header = $root.qyh.dataplane.Header.toObject(message.header, options);
                if (message.taskId != null && message.hasOwnProperty("taskId"))
                    if (typeof message.taskId === "number")
                        object.taskId = options.longs === String ? String(message.taskId) : message.taskId;
                    else
                        object.taskId = options.longs === String ? $util.Long.prototype.toString.call(message.taskId) : options.longs === Number ? new $util.LongBits(message.taskId.low >>> 0, message.taskId.high >>> 0).toNumber() : message.taskId;
                if (message.taskName != null && message.hasOwnProperty("taskName"))
                    object.taskName = message.taskName;
                if (message.status != null && message.hasOwnProperty("status"))
                    object.status = options.enums === String ? $root.qyh.dataplane.TaskState.Status[message.status] === undefined ? message.status : $root.qyh.dataplane.TaskState.Status[message.status] : message.status;
                if (message.currentStep != null && message.hasOwnProperty("currentStep"))
                    object.currentStep = message.currentStep;
                if (message.totalSteps != null && message.hasOwnProperty("totalSteps"))
                    object.totalSteps = message.totalSteps;
                if (message.progress != null && message.hasOwnProperty("progress"))
                    object.progress = options.json && !isFinite(message.progress) ? String(message.progress) : message.progress;
                if (message.currentAction != null && message.hasOwnProperty("currentAction"))
                    object.currentAction = message.currentAction;
                if (message.errorMessage != null && message.hasOwnProperty("errorMessage"))
                    object.errorMessage = message.errorMessage;
                return object;
            };

            /**
             * Converts this TaskState to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.TaskState
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TaskState.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for TaskState
             * @function getTypeUrl
             * @memberof qyh.dataplane.TaskState
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            TaskState.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.TaskState";
            };

            /**
             * Status enum.
             * @name qyh.dataplane.TaskState.Status
             * @enum {number}
             * @property {number} PENDING=0 PENDING value
             * @property {number} RUNNING=1 RUNNING value
             * @property {number} PAUSED=2 PAUSED value
             * @property {number} COMPLETED=3 COMPLETED value
             * @property {number} FAILED=4 FAILED value
             * @property {number} CANCELLED=5 CANCELLED value
             */
            TaskState.Status = (function() {
                const valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "PENDING"] = 0;
                values[valuesById[1] = "RUNNING"] = 1;
                values[valuesById[2] = "PAUSED"] = 2;
                values[valuesById[3] = "COMPLETED"] = 3;
                values[valuesById[4] = "FAILED"] = 4;
                values[valuesById[5] = "CANCELLED"] = 5;
                return values;
            })();

            return TaskState;
        })();

        dataplane.ModuleStatus = (function() {

            /**
             * Properties of a ModuleStatus.
             * @memberof qyh.dataplane
             * @interface IModuleStatus
             * @property {boolean|null} [connected] ModuleStatus connected
             * @property {boolean|null} [enabled] ModuleStatus enabled
             * @property {boolean|null} [error] ModuleStatus error
             * @property {number|null} [errorCode] ModuleStatus errorCode
             */

            /**
             * Constructs a new ModuleStatus.
             * @memberof qyh.dataplane
             * @classdesc Represents a ModuleStatus.
             * @implements IModuleStatus
             * @constructor
             * @param {qyh.dataplane.IModuleStatus=} [properties] Properties to set
             */
            function ModuleStatus(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ModuleStatus connected.
             * @member {boolean} connected
             * @memberof qyh.dataplane.ModuleStatus
             * @instance
             */
            ModuleStatus.prototype.connected = false;

            /**
             * ModuleStatus enabled.
             * @member {boolean} enabled
             * @memberof qyh.dataplane.ModuleStatus
             * @instance
             */
            ModuleStatus.prototype.enabled = false;

            /**
             * ModuleStatus error.
             * @member {boolean} error
             * @memberof qyh.dataplane.ModuleStatus
             * @instance
             */
            ModuleStatus.prototype.error = false;

            /**
             * ModuleStatus errorCode.
             * @member {number} errorCode
             * @memberof qyh.dataplane.ModuleStatus
             * @instance
             */
            ModuleStatus.prototype.errorCode = 0;

            /**
             * Creates a new ModuleStatus instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.ModuleStatus
             * @static
             * @param {qyh.dataplane.IModuleStatus=} [properties] Properties to set
             * @returns {qyh.dataplane.ModuleStatus} ModuleStatus instance
             */
            ModuleStatus.create = function create(properties) {
                return new ModuleStatus(properties);
            };

            /**
             * Encodes the specified ModuleStatus message. Does not implicitly {@link qyh.dataplane.ModuleStatus.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.ModuleStatus
             * @static
             * @param {qyh.dataplane.IModuleStatus} message ModuleStatus message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ModuleStatus.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.connected != null && Object.hasOwnProperty.call(message, "connected"))
                    writer.uint32(/* id 1, wireType 0 =*/8).bool(message.connected);
                if (message.enabled != null && Object.hasOwnProperty.call(message, "enabled"))
                    writer.uint32(/* id 2, wireType 0 =*/16).bool(message.enabled);
                if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.error);
                if (message.errorCode != null && Object.hasOwnProperty.call(message, "errorCode"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.errorCode);
                return writer;
            };

            /**
             * Encodes the specified ModuleStatus message, length delimited. Does not implicitly {@link qyh.dataplane.ModuleStatus.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.ModuleStatus
             * @static
             * @param {qyh.dataplane.IModuleStatus} message ModuleStatus message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ModuleStatus.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ModuleStatus message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.ModuleStatus
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.ModuleStatus} ModuleStatus
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ModuleStatus.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.ModuleStatus();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.connected = reader.bool();
                            break;
                        }
                    case 2: {
                            message.enabled = reader.bool();
                            break;
                        }
                    case 3: {
                            message.error = reader.bool();
                            break;
                        }
                    case 4: {
                            message.errorCode = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ModuleStatus message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.ModuleStatus
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.ModuleStatus} ModuleStatus
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ModuleStatus.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ModuleStatus message.
             * @function verify
             * @memberof qyh.dataplane.ModuleStatus
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ModuleStatus.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.connected != null && message.hasOwnProperty("connected"))
                    if (typeof message.connected !== "boolean")
                        return "connected: boolean expected";
                if (message.enabled != null && message.hasOwnProperty("enabled"))
                    if (typeof message.enabled !== "boolean")
                        return "enabled: boolean expected";
                if (message.error != null && message.hasOwnProperty("error"))
                    if (typeof message.error !== "boolean")
                        return "error: boolean expected";
                if (message.errorCode != null && message.hasOwnProperty("errorCode"))
                    if (!$util.isInteger(message.errorCode))
                        return "errorCode: integer expected";
                return null;
            };

            /**
             * Creates a ModuleStatus message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.ModuleStatus
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.ModuleStatus} ModuleStatus
             */
            ModuleStatus.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.ModuleStatus)
                    return object;
                let message = new $root.qyh.dataplane.ModuleStatus();
                if (object.connected != null)
                    message.connected = Boolean(object.connected);
                if (object.enabled != null)
                    message.enabled = Boolean(object.enabled);
                if (object.error != null)
                    message.error = Boolean(object.error);
                if (object.errorCode != null)
                    message.errorCode = object.errorCode | 0;
                return message;
            };

            /**
             * Creates a plain object from a ModuleStatus message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.ModuleStatus
             * @static
             * @param {qyh.dataplane.ModuleStatus} message ModuleStatus
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ModuleStatus.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.connected = false;
                    object.enabled = false;
                    object.error = false;
                    object.errorCode = 0;
                }
                if (message.connected != null && message.hasOwnProperty("connected"))
                    object.connected = message.connected;
                if (message.enabled != null && message.hasOwnProperty("enabled"))
                    object.enabled = message.enabled;
                if (message.error != null && message.hasOwnProperty("error"))
                    object.error = message.error;
                if (message.errorCode != null && message.hasOwnProperty("errorCode"))
                    object.errorCode = message.errorCode;
                return object;
            };

            /**
             * Converts this ModuleStatus to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.ModuleStatus
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ModuleStatus.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for ModuleStatus
             * @function getTypeUrl
             * @memberof qyh.dataplane.ModuleStatus
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ModuleStatus.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.ModuleStatus";
            };

            return ModuleStatus;
        })();

        dataplane.CameraStatus = (function() {

            /**
             * Properties of a CameraStatus.
             * @memberof qyh.dataplane
             * @interface ICameraStatus
             * @property {boolean|null} [headConnected] CameraStatus headConnected
             * @property {boolean|null} [leftHandConnected] CameraStatus leftHandConnected
             * @property {boolean|null} [rightHandConnected] CameraStatus rightHandConnected
             */

            /**
             * Constructs a new CameraStatus.
             * @memberof qyh.dataplane
             * @classdesc Represents a CameraStatus.
             * @implements ICameraStatus
             * @constructor
             * @param {qyh.dataplane.ICameraStatus=} [properties] Properties to set
             */
            function CameraStatus(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * CameraStatus headConnected.
             * @member {boolean} headConnected
             * @memberof qyh.dataplane.CameraStatus
             * @instance
             */
            CameraStatus.prototype.headConnected = false;

            /**
             * CameraStatus leftHandConnected.
             * @member {boolean} leftHandConnected
             * @memberof qyh.dataplane.CameraStatus
             * @instance
             */
            CameraStatus.prototype.leftHandConnected = false;

            /**
             * CameraStatus rightHandConnected.
             * @member {boolean} rightHandConnected
             * @memberof qyh.dataplane.CameraStatus
             * @instance
             */
            CameraStatus.prototype.rightHandConnected = false;

            /**
             * Creates a new CameraStatus instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.CameraStatus
             * @static
             * @param {qyh.dataplane.ICameraStatus=} [properties] Properties to set
             * @returns {qyh.dataplane.CameraStatus} CameraStatus instance
             */
            CameraStatus.create = function create(properties) {
                return new CameraStatus(properties);
            };

            /**
             * Encodes the specified CameraStatus message. Does not implicitly {@link qyh.dataplane.CameraStatus.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.CameraStatus
             * @static
             * @param {qyh.dataplane.ICameraStatus} message CameraStatus message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CameraStatus.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.headConnected != null && Object.hasOwnProperty.call(message, "headConnected"))
                    writer.uint32(/* id 1, wireType 0 =*/8).bool(message.headConnected);
                if (message.leftHandConnected != null && Object.hasOwnProperty.call(message, "leftHandConnected"))
                    writer.uint32(/* id 2, wireType 0 =*/16).bool(message.leftHandConnected);
                if (message.rightHandConnected != null && Object.hasOwnProperty.call(message, "rightHandConnected"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.rightHandConnected);
                return writer;
            };

            /**
             * Encodes the specified CameraStatus message, length delimited. Does not implicitly {@link qyh.dataplane.CameraStatus.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.CameraStatus
             * @static
             * @param {qyh.dataplane.ICameraStatus} message CameraStatus message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CameraStatus.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a CameraStatus message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.CameraStatus
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.CameraStatus} CameraStatus
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CameraStatus.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.CameraStatus();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.headConnected = reader.bool();
                            break;
                        }
                    case 2: {
                            message.leftHandConnected = reader.bool();
                            break;
                        }
                    case 3: {
                            message.rightHandConnected = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a CameraStatus message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.CameraStatus
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.CameraStatus} CameraStatus
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CameraStatus.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a CameraStatus message.
             * @function verify
             * @memberof qyh.dataplane.CameraStatus
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            CameraStatus.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.headConnected != null && message.hasOwnProperty("headConnected"))
                    if (typeof message.headConnected !== "boolean")
                        return "headConnected: boolean expected";
                if (message.leftHandConnected != null && message.hasOwnProperty("leftHandConnected"))
                    if (typeof message.leftHandConnected !== "boolean")
                        return "leftHandConnected: boolean expected";
                if (message.rightHandConnected != null && message.hasOwnProperty("rightHandConnected"))
                    if (typeof message.rightHandConnected !== "boolean")
                        return "rightHandConnected: boolean expected";
                return null;
            };

            /**
             * Creates a CameraStatus message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.CameraStatus
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.CameraStatus} CameraStatus
             */
            CameraStatus.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.CameraStatus)
                    return object;
                let message = new $root.qyh.dataplane.CameraStatus();
                if (object.headConnected != null)
                    message.headConnected = Boolean(object.headConnected);
                if (object.leftHandConnected != null)
                    message.leftHandConnected = Boolean(object.leftHandConnected);
                if (object.rightHandConnected != null)
                    message.rightHandConnected = Boolean(object.rightHandConnected);
                return message;
            };

            /**
             * Creates a plain object from a CameraStatus message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.CameraStatus
             * @static
             * @param {qyh.dataplane.CameraStatus} message CameraStatus
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CameraStatus.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.headConnected = false;
                    object.leftHandConnected = false;
                    object.rightHandConnected = false;
                }
                if (message.headConnected != null && message.hasOwnProperty("headConnected"))
                    object.headConnected = message.headConnected;
                if (message.leftHandConnected != null && message.hasOwnProperty("leftHandConnected"))
                    object.leftHandConnected = message.leftHandConnected;
                if (message.rightHandConnected != null && message.hasOwnProperty("rightHandConnected"))
                    object.rightHandConnected = message.rightHandConnected;
                return object;
            };

            /**
             * Converts this CameraStatus to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.CameraStatus
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CameraStatus.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for CameraStatus
             * @function getTypeUrl
             * @memberof qyh.dataplane.CameraStatus
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            CameraStatus.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.CameraStatus";
            };

            return CameraStatus;
        })();

        dataplane.GripperStatusSummary = (function() {

            /**
             * Properties of a GripperStatusSummary.
             * @memberof qyh.dataplane
             * @interface IGripperStatusSummary
             * @property {boolean|null} [leftConnected] GripperStatusSummary leftConnected
             * @property {boolean|null} [leftActivated] GripperStatusSummary leftActivated
             * @property {number|null} [leftFault] GripperStatusSummary leftFault
             * @property {boolean|null} [rightConnected] GripperStatusSummary rightConnected
             * @property {boolean|null} [rightActivated] GripperStatusSummary rightActivated
             * @property {number|null} [rightFault] GripperStatusSummary rightFault
             */

            /**
             * Constructs a new GripperStatusSummary.
             * @memberof qyh.dataplane
             * @classdesc Represents a GripperStatusSummary.
             * @implements IGripperStatusSummary
             * @constructor
             * @param {qyh.dataplane.IGripperStatusSummary=} [properties] Properties to set
             */
            function GripperStatusSummary(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GripperStatusSummary leftConnected.
             * @member {boolean} leftConnected
             * @memberof qyh.dataplane.GripperStatusSummary
             * @instance
             */
            GripperStatusSummary.prototype.leftConnected = false;

            /**
             * GripperStatusSummary leftActivated.
             * @member {boolean} leftActivated
             * @memberof qyh.dataplane.GripperStatusSummary
             * @instance
             */
            GripperStatusSummary.prototype.leftActivated = false;

            /**
             * GripperStatusSummary leftFault.
             * @member {number} leftFault
             * @memberof qyh.dataplane.GripperStatusSummary
             * @instance
             */
            GripperStatusSummary.prototype.leftFault = 0;

            /**
             * GripperStatusSummary rightConnected.
             * @member {boolean} rightConnected
             * @memberof qyh.dataplane.GripperStatusSummary
             * @instance
             */
            GripperStatusSummary.prototype.rightConnected = false;

            /**
             * GripperStatusSummary rightActivated.
             * @member {boolean} rightActivated
             * @memberof qyh.dataplane.GripperStatusSummary
             * @instance
             */
            GripperStatusSummary.prototype.rightActivated = false;

            /**
             * GripperStatusSummary rightFault.
             * @member {number} rightFault
             * @memberof qyh.dataplane.GripperStatusSummary
             * @instance
             */
            GripperStatusSummary.prototype.rightFault = 0;

            /**
             * Creates a new GripperStatusSummary instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.GripperStatusSummary
             * @static
             * @param {qyh.dataplane.IGripperStatusSummary=} [properties] Properties to set
             * @returns {qyh.dataplane.GripperStatusSummary} GripperStatusSummary instance
             */
            GripperStatusSummary.create = function create(properties) {
                return new GripperStatusSummary(properties);
            };

            /**
             * Encodes the specified GripperStatusSummary message. Does not implicitly {@link qyh.dataplane.GripperStatusSummary.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.GripperStatusSummary
             * @static
             * @param {qyh.dataplane.IGripperStatusSummary} message GripperStatusSummary message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GripperStatusSummary.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.leftConnected != null && Object.hasOwnProperty.call(message, "leftConnected"))
                    writer.uint32(/* id 1, wireType 0 =*/8).bool(message.leftConnected);
                if (message.leftActivated != null && Object.hasOwnProperty.call(message, "leftActivated"))
                    writer.uint32(/* id 2, wireType 0 =*/16).bool(message.leftActivated);
                if (message.leftFault != null && Object.hasOwnProperty.call(message, "leftFault"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.leftFault);
                if (message.rightConnected != null && Object.hasOwnProperty.call(message, "rightConnected"))
                    writer.uint32(/* id 4, wireType 0 =*/32).bool(message.rightConnected);
                if (message.rightActivated != null && Object.hasOwnProperty.call(message, "rightActivated"))
                    writer.uint32(/* id 5, wireType 0 =*/40).bool(message.rightActivated);
                if (message.rightFault != null && Object.hasOwnProperty.call(message, "rightFault"))
                    writer.uint32(/* id 6, wireType 0 =*/48).int32(message.rightFault);
                return writer;
            };

            /**
             * Encodes the specified GripperStatusSummary message, length delimited. Does not implicitly {@link qyh.dataplane.GripperStatusSummary.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.GripperStatusSummary
             * @static
             * @param {qyh.dataplane.IGripperStatusSummary} message GripperStatusSummary message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GripperStatusSummary.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GripperStatusSummary message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.GripperStatusSummary
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.GripperStatusSummary} GripperStatusSummary
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GripperStatusSummary.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.GripperStatusSummary();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.leftConnected = reader.bool();
                            break;
                        }
                    case 2: {
                            message.leftActivated = reader.bool();
                            break;
                        }
                    case 3: {
                            message.leftFault = reader.int32();
                            break;
                        }
                    case 4: {
                            message.rightConnected = reader.bool();
                            break;
                        }
                    case 5: {
                            message.rightActivated = reader.bool();
                            break;
                        }
                    case 6: {
                            message.rightFault = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GripperStatusSummary message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.GripperStatusSummary
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.GripperStatusSummary} GripperStatusSummary
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GripperStatusSummary.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GripperStatusSummary message.
             * @function verify
             * @memberof qyh.dataplane.GripperStatusSummary
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GripperStatusSummary.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.leftConnected != null && message.hasOwnProperty("leftConnected"))
                    if (typeof message.leftConnected !== "boolean")
                        return "leftConnected: boolean expected";
                if (message.leftActivated != null && message.hasOwnProperty("leftActivated"))
                    if (typeof message.leftActivated !== "boolean")
                        return "leftActivated: boolean expected";
                if (message.leftFault != null && message.hasOwnProperty("leftFault"))
                    if (!$util.isInteger(message.leftFault))
                        return "leftFault: integer expected";
                if (message.rightConnected != null && message.hasOwnProperty("rightConnected"))
                    if (typeof message.rightConnected !== "boolean")
                        return "rightConnected: boolean expected";
                if (message.rightActivated != null && message.hasOwnProperty("rightActivated"))
                    if (typeof message.rightActivated !== "boolean")
                        return "rightActivated: boolean expected";
                if (message.rightFault != null && message.hasOwnProperty("rightFault"))
                    if (!$util.isInteger(message.rightFault))
                        return "rightFault: integer expected";
                return null;
            };

            /**
             * Creates a GripperStatusSummary message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.GripperStatusSummary
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.GripperStatusSummary} GripperStatusSummary
             */
            GripperStatusSummary.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.GripperStatusSummary)
                    return object;
                let message = new $root.qyh.dataplane.GripperStatusSummary();
                if (object.leftConnected != null)
                    message.leftConnected = Boolean(object.leftConnected);
                if (object.leftActivated != null)
                    message.leftActivated = Boolean(object.leftActivated);
                if (object.leftFault != null)
                    message.leftFault = object.leftFault | 0;
                if (object.rightConnected != null)
                    message.rightConnected = Boolean(object.rightConnected);
                if (object.rightActivated != null)
                    message.rightActivated = Boolean(object.rightActivated);
                if (object.rightFault != null)
                    message.rightFault = object.rightFault | 0;
                return message;
            };

            /**
             * Creates a plain object from a GripperStatusSummary message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.GripperStatusSummary
             * @static
             * @param {qyh.dataplane.GripperStatusSummary} message GripperStatusSummary
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GripperStatusSummary.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.leftConnected = false;
                    object.leftActivated = false;
                    object.leftFault = 0;
                    object.rightConnected = false;
                    object.rightActivated = false;
                    object.rightFault = 0;
                }
                if (message.leftConnected != null && message.hasOwnProperty("leftConnected"))
                    object.leftConnected = message.leftConnected;
                if (message.leftActivated != null && message.hasOwnProperty("leftActivated"))
                    object.leftActivated = message.leftActivated;
                if (message.leftFault != null && message.hasOwnProperty("leftFault"))
                    object.leftFault = message.leftFault;
                if (message.rightConnected != null && message.hasOwnProperty("rightConnected"))
                    object.rightConnected = message.rightConnected;
                if (message.rightActivated != null && message.hasOwnProperty("rightActivated"))
                    object.rightActivated = message.rightActivated;
                if (message.rightFault != null && message.hasOwnProperty("rightFault"))
                    object.rightFault = message.rightFault;
                return object;
            };

            /**
             * Converts this GripperStatusSummary to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.GripperStatusSummary
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GripperStatusSummary.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for GripperStatusSummary
             * @function getTypeUrl
             * @memberof qyh.dataplane.GripperStatusSummary
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            GripperStatusSummary.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.GripperStatusSummary";
            };

            return GripperStatusSummary;
        })();

        dataplane.BatteryStatus = (function() {

            /**
             * Properties of a BatteryStatus.
             * @memberof qyh.dataplane
             * @interface IBatteryStatus
             * @property {number|null} [percentage] BatteryStatus percentage
             * @property {number|null} [voltage] BatteryStatus voltage
             * @property {boolean|null} [charging] BatteryStatus charging
             */

            /**
             * Constructs a new BatteryStatus.
             * @memberof qyh.dataplane
             * @classdesc Represents a BatteryStatus.
             * @implements IBatteryStatus
             * @constructor
             * @param {qyh.dataplane.IBatteryStatus=} [properties] Properties to set
             */
            function BatteryStatus(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * BatteryStatus percentage.
             * @member {number} percentage
             * @memberof qyh.dataplane.BatteryStatus
             * @instance
             */
            BatteryStatus.prototype.percentage = 0;

            /**
             * BatteryStatus voltage.
             * @member {number} voltage
             * @memberof qyh.dataplane.BatteryStatus
             * @instance
             */
            BatteryStatus.prototype.voltage = 0;

            /**
             * BatteryStatus charging.
             * @member {boolean} charging
             * @memberof qyh.dataplane.BatteryStatus
             * @instance
             */
            BatteryStatus.prototype.charging = false;

            /**
             * Creates a new BatteryStatus instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.BatteryStatus
             * @static
             * @param {qyh.dataplane.IBatteryStatus=} [properties] Properties to set
             * @returns {qyh.dataplane.BatteryStatus} BatteryStatus instance
             */
            BatteryStatus.create = function create(properties) {
                return new BatteryStatus(properties);
            };

            /**
             * Encodes the specified BatteryStatus message. Does not implicitly {@link qyh.dataplane.BatteryStatus.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.BatteryStatus
             * @static
             * @param {qyh.dataplane.IBatteryStatus} message BatteryStatus message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BatteryStatus.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.percentage != null && Object.hasOwnProperty.call(message, "percentage"))
                    writer.uint32(/* id 1, wireType 1 =*/9).double(message.percentage);
                if (message.voltage != null && Object.hasOwnProperty.call(message, "voltage"))
                    writer.uint32(/* id 2, wireType 1 =*/17).double(message.voltage);
                if (message.charging != null && Object.hasOwnProperty.call(message, "charging"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.charging);
                return writer;
            };

            /**
             * Encodes the specified BatteryStatus message, length delimited. Does not implicitly {@link qyh.dataplane.BatteryStatus.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.BatteryStatus
             * @static
             * @param {qyh.dataplane.IBatteryStatus} message BatteryStatus message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BatteryStatus.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a BatteryStatus message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.BatteryStatus
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.BatteryStatus} BatteryStatus
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BatteryStatus.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.BatteryStatus();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.percentage = reader.double();
                            break;
                        }
                    case 2: {
                            message.voltage = reader.double();
                            break;
                        }
                    case 3: {
                            message.charging = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a BatteryStatus message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.BatteryStatus
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.BatteryStatus} BatteryStatus
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BatteryStatus.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a BatteryStatus message.
             * @function verify
             * @memberof qyh.dataplane.BatteryStatus
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            BatteryStatus.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.percentage != null && message.hasOwnProperty("percentage"))
                    if (typeof message.percentage !== "number")
                        return "percentage: number expected";
                if (message.voltage != null && message.hasOwnProperty("voltage"))
                    if (typeof message.voltage !== "number")
                        return "voltage: number expected";
                if (message.charging != null && message.hasOwnProperty("charging"))
                    if (typeof message.charging !== "boolean")
                        return "charging: boolean expected";
                return null;
            };

            /**
             * Creates a BatteryStatus message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.BatteryStatus
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.BatteryStatus} BatteryStatus
             */
            BatteryStatus.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.BatteryStatus)
                    return object;
                let message = new $root.qyh.dataplane.BatteryStatus();
                if (object.percentage != null)
                    message.percentage = Number(object.percentage);
                if (object.voltage != null)
                    message.voltage = Number(object.voltage);
                if (object.charging != null)
                    message.charging = Boolean(object.charging);
                return message;
            };

            /**
             * Creates a plain object from a BatteryStatus message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.BatteryStatus
             * @static
             * @param {qyh.dataplane.BatteryStatus} message BatteryStatus
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            BatteryStatus.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.percentage = 0;
                    object.voltage = 0;
                    object.charging = false;
                }
                if (message.percentage != null && message.hasOwnProperty("percentage"))
                    object.percentage = options.json && !isFinite(message.percentage) ? String(message.percentage) : message.percentage;
                if (message.voltage != null && message.hasOwnProperty("voltage"))
                    object.voltage = options.json && !isFinite(message.voltage) ? String(message.voltage) : message.voltage;
                if (message.charging != null && message.hasOwnProperty("charging"))
                    object.charging = message.charging;
                return object;
            };

            /**
             * Converts this BatteryStatus to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.BatteryStatus
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            BatteryStatus.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for BatteryStatus
             * @function getTypeUrl
             * @memberof qyh.dataplane.BatteryStatus
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            BatteryStatus.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.BatteryStatus";
            };

            return BatteryStatus;
        })();

        dataplane.BasicState = (function() {

            /**
             * Properties of a BasicState.
             * @memberof qyh.dataplane
             * @interface IBasicState
             * @property {qyh.dataplane.IHeader|null} [header] BasicState header
             * @property {boolean|null} [wsConnected] BasicState wsConnected
             * @property {boolean|null} [rosConnected] BasicState rosConnected
             * @property {qyh.dataplane.IModuleStatus|null} [arm] BasicState arm
             * @property {qyh.dataplane.IModuleStatus|null} [chassis] BasicState chassis
             * @property {qyh.dataplane.IModuleStatus|null} [lift] BasicState lift
             * @property {qyh.dataplane.IModuleStatus|null} [waist] BasicState waist
             * @property {qyh.dataplane.IModuleStatus|null} [head] BasicState head
             * @property {qyh.dataplane.ICameraStatus|null} [camera] BasicState camera
             * @property {qyh.dataplane.IGripperStatusSummary|null} [gripper] BasicState gripper
             * @property {boolean|null} [vrConnected] BasicState vrConnected
             * @property {boolean|null} [vrLeftController] BasicState vrLeftController
             * @property {boolean|null} [vrRightController] BasicState vrRightController
             * @property {boolean|null} [emergencyStop] BasicState emergencyStop
             * @property {qyh.dataplane.IBatteryStatus|null} [battery] BasicState battery
             * @property {qyh.dataplane.RobotMode|null} [mode] BasicState mode
             * @property {boolean|null} [controlHeld] BasicState controlHeld
             * @property {string|null} [controlHolder] BasicState controlHolder
             */

            /**
             * Constructs a new BasicState.
             * @memberof qyh.dataplane
             * @classdesc Represents a BasicState.
             * @implements IBasicState
             * @constructor
             * @param {qyh.dataplane.IBasicState=} [properties] Properties to set
             */
            function BasicState(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * BasicState header.
             * @member {qyh.dataplane.IHeader|null|undefined} header
             * @memberof qyh.dataplane.BasicState
             * @instance
             */
            BasicState.prototype.header = null;

            /**
             * BasicState wsConnected.
             * @member {boolean} wsConnected
             * @memberof qyh.dataplane.BasicState
             * @instance
             */
            BasicState.prototype.wsConnected = false;

            /**
             * BasicState rosConnected.
             * @member {boolean} rosConnected
             * @memberof qyh.dataplane.BasicState
             * @instance
             */
            BasicState.prototype.rosConnected = false;

            /**
             * BasicState arm.
             * @member {qyh.dataplane.IModuleStatus|null|undefined} arm
             * @memberof qyh.dataplane.BasicState
             * @instance
             */
            BasicState.prototype.arm = null;

            /**
             * BasicState chassis.
             * @member {qyh.dataplane.IModuleStatus|null|undefined} chassis
             * @memberof qyh.dataplane.BasicState
             * @instance
             */
            BasicState.prototype.chassis = null;

            /**
             * BasicState lift.
             * @member {qyh.dataplane.IModuleStatus|null|undefined} lift
             * @memberof qyh.dataplane.BasicState
             * @instance
             */
            BasicState.prototype.lift = null;

            /**
             * BasicState waist.
             * @member {qyh.dataplane.IModuleStatus|null|undefined} waist
             * @memberof qyh.dataplane.BasicState
             * @instance
             */
            BasicState.prototype.waist = null;

            /**
             * BasicState head.
             * @member {qyh.dataplane.IModuleStatus|null|undefined} head
             * @memberof qyh.dataplane.BasicState
             * @instance
             */
            BasicState.prototype.head = null;

            /**
             * BasicState camera.
             * @member {qyh.dataplane.ICameraStatus|null|undefined} camera
             * @memberof qyh.dataplane.BasicState
             * @instance
             */
            BasicState.prototype.camera = null;

            /**
             * BasicState gripper.
             * @member {qyh.dataplane.IGripperStatusSummary|null|undefined} gripper
             * @memberof qyh.dataplane.BasicState
             * @instance
             */
            BasicState.prototype.gripper = null;

            /**
             * BasicState vrConnected.
             * @member {boolean} vrConnected
             * @memberof qyh.dataplane.BasicState
             * @instance
             */
            BasicState.prototype.vrConnected = false;

            /**
             * BasicState vrLeftController.
             * @member {boolean} vrLeftController
             * @memberof qyh.dataplane.BasicState
             * @instance
             */
            BasicState.prototype.vrLeftController = false;

            /**
             * BasicState vrRightController.
             * @member {boolean} vrRightController
             * @memberof qyh.dataplane.BasicState
             * @instance
             */
            BasicState.prototype.vrRightController = false;

            /**
             * BasicState emergencyStop.
             * @member {boolean} emergencyStop
             * @memberof qyh.dataplane.BasicState
             * @instance
             */
            BasicState.prototype.emergencyStop = false;

            /**
             * BasicState battery.
             * @member {qyh.dataplane.IBatteryStatus|null|undefined} battery
             * @memberof qyh.dataplane.BasicState
             * @instance
             */
            BasicState.prototype.battery = null;

            /**
             * BasicState mode.
             * @member {qyh.dataplane.RobotMode} mode
             * @memberof qyh.dataplane.BasicState
             * @instance
             */
            BasicState.prototype.mode = 0;

            /**
             * BasicState controlHeld.
             * @member {boolean} controlHeld
             * @memberof qyh.dataplane.BasicState
             * @instance
             */
            BasicState.prototype.controlHeld = false;

            /**
             * BasicState controlHolder.
             * @member {string} controlHolder
             * @memberof qyh.dataplane.BasicState
             * @instance
             */
            BasicState.prototype.controlHolder = "";

            /**
             * Creates a new BasicState instance using the specified properties.
             * @function create
             * @memberof qyh.dataplane.BasicState
             * @static
             * @param {qyh.dataplane.IBasicState=} [properties] Properties to set
             * @returns {qyh.dataplane.BasicState} BasicState instance
             */
            BasicState.create = function create(properties) {
                return new BasicState(properties);
            };

            /**
             * Encodes the specified BasicState message. Does not implicitly {@link qyh.dataplane.BasicState.verify|verify} messages.
             * @function encode
             * @memberof qyh.dataplane.BasicState
             * @static
             * @param {qyh.dataplane.IBasicState} message BasicState message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BasicState.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                    $root.qyh.dataplane.Header.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.wsConnected != null && Object.hasOwnProperty.call(message, "wsConnected"))
                    writer.uint32(/* id 2, wireType 0 =*/16).bool(message.wsConnected);
                if (message.rosConnected != null && Object.hasOwnProperty.call(message, "rosConnected"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.rosConnected);
                if (message.arm != null && Object.hasOwnProperty.call(message, "arm"))
                    $root.qyh.dataplane.ModuleStatus.encode(message.arm, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                if (message.chassis != null && Object.hasOwnProperty.call(message, "chassis"))
                    $root.qyh.dataplane.ModuleStatus.encode(message.chassis, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                if (message.lift != null && Object.hasOwnProperty.call(message, "lift"))
                    $root.qyh.dataplane.ModuleStatus.encode(message.lift, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                if (message.waist != null && Object.hasOwnProperty.call(message, "waist"))
                    $root.qyh.dataplane.ModuleStatus.encode(message.waist, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                if (message.head != null && Object.hasOwnProperty.call(message, "head"))
                    $root.qyh.dataplane.ModuleStatus.encode(message.head, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
                if (message.camera != null && Object.hasOwnProperty.call(message, "camera"))
                    $root.qyh.dataplane.CameraStatus.encode(message.camera, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
                if (message.gripper != null && Object.hasOwnProperty.call(message, "gripper"))
                    $root.qyh.dataplane.GripperStatusSummary.encode(message.gripper, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
                if (message.vrConnected != null && Object.hasOwnProperty.call(message, "vrConnected"))
                    writer.uint32(/* id 11, wireType 0 =*/88).bool(message.vrConnected);
                if (message.vrLeftController != null && Object.hasOwnProperty.call(message, "vrLeftController"))
                    writer.uint32(/* id 12, wireType 0 =*/96).bool(message.vrLeftController);
                if (message.vrRightController != null && Object.hasOwnProperty.call(message, "vrRightController"))
                    writer.uint32(/* id 13, wireType 0 =*/104).bool(message.vrRightController);
                if (message.emergencyStop != null && Object.hasOwnProperty.call(message, "emergencyStop"))
                    writer.uint32(/* id 14, wireType 0 =*/112).bool(message.emergencyStop);
                if (message.battery != null && Object.hasOwnProperty.call(message, "battery"))
                    $root.qyh.dataplane.BatteryStatus.encode(message.battery, writer.uint32(/* id 15, wireType 2 =*/122).fork()).ldelim();
                if (message.mode != null && Object.hasOwnProperty.call(message, "mode"))
                    writer.uint32(/* id 16, wireType 0 =*/128).int32(message.mode);
                if (message.controlHeld != null && Object.hasOwnProperty.call(message, "controlHeld"))
                    writer.uint32(/* id 17, wireType 0 =*/136).bool(message.controlHeld);
                if (message.controlHolder != null && Object.hasOwnProperty.call(message, "controlHolder"))
                    writer.uint32(/* id 18, wireType 2 =*/146).string(message.controlHolder);
                return writer;
            };

            /**
             * Encodes the specified BasicState message, length delimited. Does not implicitly {@link qyh.dataplane.BasicState.verify|verify} messages.
             * @function encodeDelimited
             * @memberof qyh.dataplane.BasicState
             * @static
             * @param {qyh.dataplane.IBasicState} message BasicState message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BasicState.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a BasicState message from the specified reader or buffer.
             * @function decode
             * @memberof qyh.dataplane.BasicState
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {qyh.dataplane.BasicState} BasicState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BasicState.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.qyh.dataplane.BasicState();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.header = $root.qyh.dataplane.Header.decode(reader, reader.uint32());
                            break;
                        }
                    case 2: {
                            message.wsConnected = reader.bool();
                            break;
                        }
                    case 3: {
                            message.rosConnected = reader.bool();
                            break;
                        }
                    case 4: {
                            message.arm = $root.qyh.dataplane.ModuleStatus.decode(reader, reader.uint32());
                            break;
                        }
                    case 5: {
                            message.chassis = $root.qyh.dataplane.ModuleStatus.decode(reader, reader.uint32());
                            break;
                        }
                    case 6: {
                            message.lift = $root.qyh.dataplane.ModuleStatus.decode(reader, reader.uint32());
                            break;
                        }
                    case 7: {
                            message.waist = $root.qyh.dataplane.ModuleStatus.decode(reader, reader.uint32());
                            break;
                        }
                    case 8: {
                            message.head = $root.qyh.dataplane.ModuleStatus.decode(reader, reader.uint32());
                            break;
                        }
                    case 9: {
                            message.camera = $root.qyh.dataplane.CameraStatus.decode(reader, reader.uint32());
                            break;
                        }
                    case 10: {
                            message.gripper = $root.qyh.dataplane.GripperStatusSummary.decode(reader, reader.uint32());
                            break;
                        }
                    case 11: {
                            message.vrConnected = reader.bool();
                            break;
                        }
                    case 12: {
                            message.vrLeftController = reader.bool();
                            break;
                        }
                    case 13: {
                            message.vrRightController = reader.bool();
                            break;
                        }
                    case 14: {
                            message.emergencyStop = reader.bool();
                            break;
                        }
                    case 15: {
                            message.battery = $root.qyh.dataplane.BatteryStatus.decode(reader, reader.uint32());
                            break;
                        }
                    case 16: {
                            message.mode = reader.int32();
                            break;
                        }
                    case 17: {
                            message.controlHeld = reader.bool();
                            break;
                        }
                    case 18: {
                            message.controlHolder = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a BasicState message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof qyh.dataplane.BasicState
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {qyh.dataplane.BasicState} BasicState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BasicState.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a BasicState message.
             * @function verify
             * @memberof qyh.dataplane.BasicState
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            BasicState.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.header != null && message.hasOwnProperty("header")) {
                    let error = $root.qyh.dataplane.Header.verify(message.header);
                    if (error)
                        return "header." + error;
                }
                if (message.wsConnected != null && message.hasOwnProperty("wsConnected"))
                    if (typeof message.wsConnected !== "boolean")
                        return "wsConnected: boolean expected";
                if (message.rosConnected != null && message.hasOwnProperty("rosConnected"))
                    if (typeof message.rosConnected !== "boolean")
                        return "rosConnected: boolean expected";
                if (message.arm != null && message.hasOwnProperty("arm")) {
                    let error = $root.qyh.dataplane.ModuleStatus.verify(message.arm);
                    if (error)
                        return "arm." + error;
                }
                if (message.chassis != null && message.hasOwnProperty("chassis")) {
                    let error = $root.qyh.dataplane.ModuleStatus.verify(message.chassis);
                    if (error)
                        return "chassis." + error;
                }
                if (message.lift != null && message.hasOwnProperty("lift")) {
                    let error = $root.qyh.dataplane.ModuleStatus.verify(message.lift);
                    if (error)
                        return "lift." + error;
                }
                if (message.waist != null && message.hasOwnProperty("waist")) {
                    let error = $root.qyh.dataplane.ModuleStatus.verify(message.waist);
                    if (error)
                        return "waist." + error;
                }
                if (message.head != null && message.hasOwnProperty("head")) {
                    let error = $root.qyh.dataplane.ModuleStatus.verify(message.head);
                    if (error)
                        return "head." + error;
                }
                if (message.camera != null && message.hasOwnProperty("camera")) {
                    let error = $root.qyh.dataplane.CameraStatus.verify(message.camera);
                    if (error)
                        return "camera." + error;
                }
                if (message.gripper != null && message.hasOwnProperty("gripper")) {
                    let error = $root.qyh.dataplane.GripperStatusSummary.verify(message.gripper);
                    if (error)
                        return "gripper." + error;
                }
                if (message.vrConnected != null && message.hasOwnProperty("vrConnected"))
                    if (typeof message.vrConnected !== "boolean")
                        return "vrConnected: boolean expected";
                if (message.vrLeftController != null && message.hasOwnProperty("vrLeftController"))
                    if (typeof message.vrLeftController !== "boolean")
                        return "vrLeftController: boolean expected";
                if (message.vrRightController != null && message.hasOwnProperty("vrRightController"))
                    if (typeof message.vrRightController !== "boolean")
                        return "vrRightController: boolean expected";
                if (message.emergencyStop != null && message.hasOwnProperty("emergencyStop"))
                    if (typeof message.emergencyStop !== "boolean")
                        return "emergencyStop: boolean expected";
                if (message.battery != null && message.hasOwnProperty("battery")) {
                    let error = $root.qyh.dataplane.BatteryStatus.verify(message.battery);
                    if (error)
                        return "battery." + error;
                }
                if (message.mode != null && message.hasOwnProperty("mode"))
                    switch (message.mode) {
                    default:
                        return "mode: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                        break;
                    }
                if (message.controlHeld != null && message.hasOwnProperty("controlHeld"))
                    if (typeof message.controlHeld !== "boolean")
                        return "controlHeld: boolean expected";
                if (message.controlHolder != null && message.hasOwnProperty("controlHolder"))
                    if (!$util.isString(message.controlHolder))
                        return "controlHolder: string expected";
                return null;
            };

            /**
             * Creates a BasicState message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof qyh.dataplane.BasicState
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {qyh.dataplane.BasicState} BasicState
             */
            BasicState.fromObject = function fromObject(object) {
                if (object instanceof $root.qyh.dataplane.BasicState)
                    return object;
                let message = new $root.qyh.dataplane.BasicState();
                if (object.header != null) {
                    if (typeof object.header !== "object")
                        throw TypeError(".qyh.dataplane.BasicState.header: object expected");
                    message.header = $root.qyh.dataplane.Header.fromObject(object.header);
                }
                if (object.wsConnected != null)
                    message.wsConnected = Boolean(object.wsConnected);
                if (object.rosConnected != null)
                    message.rosConnected = Boolean(object.rosConnected);
                if (object.arm != null) {
                    if (typeof object.arm !== "object")
                        throw TypeError(".qyh.dataplane.BasicState.arm: object expected");
                    message.arm = $root.qyh.dataplane.ModuleStatus.fromObject(object.arm);
                }
                if (object.chassis != null) {
                    if (typeof object.chassis !== "object")
                        throw TypeError(".qyh.dataplane.BasicState.chassis: object expected");
                    message.chassis = $root.qyh.dataplane.ModuleStatus.fromObject(object.chassis);
                }
                if (object.lift != null) {
                    if (typeof object.lift !== "object")
                        throw TypeError(".qyh.dataplane.BasicState.lift: object expected");
                    message.lift = $root.qyh.dataplane.ModuleStatus.fromObject(object.lift);
                }
                if (object.waist != null) {
                    if (typeof object.waist !== "object")
                        throw TypeError(".qyh.dataplane.BasicState.waist: object expected");
                    message.waist = $root.qyh.dataplane.ModuleStatus.fromObject(object.waist);
                }
                if (object.head != null) {
                    if (typeof object.head !== "object")
                        throw TypeError(".qyh.dataplane.BasicState.head: object expected");
                    message.head = $root.qyh.dataplane.ModuleStatus.fromObject(object.head);
                }
                if (object.camera != null) {
                    if (typeof object.camera !== "object")
                        throw TypeError(".qyh.dataplane.BasicState.camera: object expected");
                    message.camera = $root.qyh.dataplane.CameraStatus.fromObject(object.camera);
                }
                if (object.gripper != null) {
                    if (typeof object.gripper !== "object")
                        throw TypeError(".qyh.dataplane.BasicState.gripper: object expected");
                    message.gripper = $root.qyh.dataplane.GripperStatusSummary.fromObject(object.gripper);
                }
                if (object.vrConnected != null)
                    message.vrConnected = Boolean(object.vrConnected);
                if (object.vrLeftController != null)
                    message.vrLeftController = Boolean(object.vrLeftController);
                if (object.vrRightController != null)
                    message.vrRightController = Boolean(object.vrRightController);
                if (object.emergencyStop != null)
                    message.emergencyStop = Boolean(object.emergencyStop);
                if (object.battery != null) {
                    if (typeof object.battery !== "object")
                        throw TypeError(".qyh.dataplane.BasicState.battery: object expected");
                    message.battery = $root.qyh.dataplane.BatteryStatus.fromObject(object.battery);
                }
                switch (object.mode) {
                default:
                    if (typeof object.mode === "number") {
                        message.mode = object.mode;
                        break;
                    }
                    break;
                case "MODE_IDLE":
                case 0:
                    message.mode = 0;
                    break;
                case "MODE_TELEOP":
                case 1:
                    message.mode = 1;
                    break;
                case "MODE_AUTO":
                case 2:
                    message.mode = 2;
                    break;
                case "MODE_MAINTENANCE":
                case 3:
                    message.mode = 3;
                    break;
                case "MODE_ERROR":
                case 4:
                    message.mode = 4;
                    break;
                }
                if (object.controlHeld != null)
                    message.controlHeld = Boolean(object.controlHeld);
                if (object.controlHolder != null)
                    message.controlHolder = String(object.controlHolder);
                return message;
            };

            /**
             * Creates a plain object from a BasicState message. Also converts values to other types if specified.
             * @function toObject
             * @memberof qyh.dataplane.BasicState
             * @static
             * @param {qyh.dataplane.BasicState} message BasicState
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            BasicState.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.header = null;
                    object.wsConnected = false;
                    object.rosConnected = false;
                    object.arm = null;
                    object.chassis = null;
                    object.lift = null;
                    object.waist = null;
                    object.head = null;
                    object.camera = null;
                    object.gripper = null;
                    object.vrConnected = false;
                    object.vrLeftController = false;
                    object.vrRightController = false;
                    object.emergencyStop = false;
                    object.battery = null;
                    object.mode = options.enums === String ? "MODE_IDLE" : 0;
                    object.controlHeld = false;
                    object.controlHolder = "";
                }
                if (message.header != null && message.hasOwnProperty("header"))
                    object.header = $root.qyh.dataplane.Header.toObject(message.header, options);
                if (message.wsConnected != null && message.hasOwnProperty("wsConnected"))
                    object.wsConnected = message.wsConnected;
                if (message.rosConnected != null && message.hasOwnProperty("rosConnected"))
                    object.rosConnected = message.rosConnected;
                if (message.arm != null && message.hasOwnProperty("arm"))
                    object.arm = $root.qyh.dataplane.ModuleStatus.toObject(message.arm, options);
                if (message.chassis != null && message.hasOwnProperty("chassis"))
                    object.chassis = $root.qyh.dataplane.ModuleStatus.toObject(message.chassis, options);
                if (message.lift != null && message.hasOwnProperty("lift"))
                    object.lift = $root.qyh.dataplane.ModuleStatus.toObject(message.lift, options);
                if (message.waist != null && message.hasOwnProperty("waist"))
                    object.waist = $root.qyh.dataplane.ModuleStatus.toObject(message.waist, options);
                if (message.head != null && message.hasOwnProperty("head"))
                    object.head = $root.qyh.dataplane.ModuleStatus.toObject(message.head, options);
                if (message.camera != null && message.hasOwnProperty("camera"))
                    object.camera = $root.qyh.dataplane.CameraStatus.toObject(message.camera, options);
                if (message.gripper != null && message.hasOwnProperty("gripper"))
                    object.gripper = $root.qyh.dataplane.GripperStatusSummary.toObject(message.gripper, options);
                if (message.vrConnected != null && message.hasOwnProperty("vrConnected"))
                    object.vrConnected = message.vrConnected;
                if (message.vrLeftController != null && message.hasOwnProperty("vrLeftController"))
                    object.vrLeftController = message.vrLeftController;
                if (message.vrRightController != null && message.hasOwnProperty("vrRightController"))
                    object.vrRightController = message.vrRightController;
                if (message.emergencyStop != null && message.hasOwnProperty("emergencyStop"))
                    object.emergencyStop = message.emergencyStop;
                if (message.battery != null && message.hasOwnProperty("battery"))
                    object.battery = $root.qyh.dataplane.BatteryStatus.toObject(message.battery, options);
                if (message.mode != null && message.hasOwnProperty("mode"))
                    object.mode = options.enums === String ? $root.qyh.dataplane.RobotMode[message.mode] === undefined ? message.mode : $root.qyh.dataplane.RobotMode[message.mode] : message.mode;
                if (message.controlHeld != null && message.hasOwnProperty("controlHeld"))
                    object.controlHeld = message.controlHeld;
                if (message.controlHolder != null && message.hasOwnProperty("controlHolder"))
                    object.controlHolder = message.controlHolder;
                return object;
            };

            /**
             * Converts this BasicState to JSON.
             * @function toJSON
             * @memberof qyh.dataplane.BasicState
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            BasicState.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for BasicState
             * @function getTypeUrl
             * @memberof qyh.dataplane.BasicState
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            BasicState.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/qyh.dataplane.BasicState";
            };

            return BasicState;
        })();

        return dataplane;
    })();

    return qyh;
})();

export { $root as default };
