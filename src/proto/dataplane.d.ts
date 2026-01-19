import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace qyh. */
export namespace qyh {

    /** Namespace dataplane. */
    namespace dataplane {

        /** Properties of a Timestamp. */
        interface ITimestamp {

            /** Timestamp seconds */
            seconds?: (number|Long|null);

            /** Timestamp nanos */
            nanos?: (number|null);
        }

        /** Represents a Timestamp. */
        class Timestamp implements ITimestamp {

            /**
             * Constructs a new Timestamp.
             * @param [properties] Properties to set
             */
            constructor(properties?: qyh.dataplane.ITimestamp);

            /** Timestamp seconds. */
            public seconds: (number|Long);

            /** Timestamp nanos. */
            public nanos: number;

            /**
             * Creates a new Timestamp instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Timestamp instance
             */
            public static create(properties?: qyh.dataplane.ITimestamp): qyh.dataplane.Timestamp;

            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link qyh.dataplane.Timestamp.verify|verify} messages.
             * @param message Timestamp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: qyh.dataplane.ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link qyh.dataplane.Timestamp.verify|verify} messages.
             * @param message Timestamp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: qyh.dataplane.ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qyh.dataplane.Timestamp;

            /**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qyh.dataplane.Timestamp;

            /**
             * Verifies a Timestamp message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Timestamp
             */
            public static fromObject(object: { [k: string]: any }): qyh.dataplane.Timestamp;

            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @param message Timestamp
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: qyh.dataplane.Timestamp, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Timestamp to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Timestamp
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a Vector3. */
        interface IVector3 {

            /** Vector3 x */
            x?: (number|null);

            /** Vector3 y */
            y?: (number|null);

            /** Vector3 z */
            z?: (number|null);
        }

        /** Represents a Vector3. */
        class Vector3 implements IVector3 {

            /**
             * Constructs a new Vector3.
             * @param [properties] Properties to set
             */
            constructor(properties?: qyh.dataplane.IVector3);

            /** Vector3 x. */
            public x: number;

            /** Vector3 y. */
            public y: number;

            /** Vector3 z. */
            public z: number;

            /**
             * Creates a new Vector3 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Vector3 instance
             */
            public static create(properties?: qyh.dataplane.IVector3): qyh.dataplane.Vector3;

            /**
             * Encodes the specified Vector3 message. Does not implicitly {@link qyh.dataplane.Vector3.verify|verify} messages.
             * @param message Vector3 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: qyh.dataplane.IVector3, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Vector3 message, length delimited. Does not implicitly {@link qyh.dataplane.Vector3.verify|verify} messages.
             * @param message Vector3 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: qyh.dataplane.IVector3, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Vector3 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Vector3
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qyh.dataplane.Vector3;

            /**
             * Decodes a Vector3 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Vector3
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qyh.dataplane.Vector3;

            /**
             * Verifies a Vector3 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Vector3 message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Vector3
             */
            public static fromObject(object: { [k: string]: any }): qyh.dataplane.Vector3;

            /**
             * Creates a plain object from a Vector3 message. Also converts values to other types if specified.
             * @param message Vector3
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: qyh.dataplane.Vector3, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Vector3 to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Vector3
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a Quaternion. */
        interface IQuaternion {

            /** Quaternion x */
            x?: (number|null);

            /** Quaternion y */
            y?: (number|null);

            /** Quaternion z */
            z?: (number|null);

            /** Quaternion w */
            w?: (number|null);
        }

        /** Represents a Quaternion. */
        class Quaternion implements IQuaternion {

            /**
             * Constructs a new Quaternion.
             * @param [properties] Properties to set
             */
            constructor(properties?: qyh.dataplane.IQuaternion);

            /** Quaternion x. */
            public x: number;

            /** Quaternion y. */
            public y: number;

            /** Quaternion z. */
            public z: number;

            /** Quaternion w. */
            public w: number;

            /**
             * Creates a new Quaternion instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Quaternion instance
             */
            public static create(properties?: qyh.dataplane.IQuaternion): qyh.dataplane.Quaternion;

            /**
             * Encodes the specified Quaternion message. Does not implicitly {@link qyh.dataplane.Quaternion.verify|verify} messages.
             * @param message Quaternion message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: qyh.dataplane.IQuaternion, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Quaternion message, length delimited. Does not implicitly {@link qyh.dataplane.Quaternion.verify|verify} messages.
             * @param message Quaternion message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: qyh.dataplane.IQuaternion, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Quaternion message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Quaternion
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qyh.dataplane.Quaternion;

            /**
             * Decodes a Quaternion message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Quaternion
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qyh.dataplane.Quaternion;

            /**
             * Verifies a Quaternion message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Quaternion message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Quaternion
             */
            public static fromObject(object: { [k: string]: any }): qyh.dataplane.Quaternion;

            /**
             * Creates a plain object from a Quaternion message. Also converts values to other types if specified.
             * @param message Quaternion
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: qyh.dataplane.Quaternion, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Quaternion to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Quaternion
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a Pose. */
        interface IPose {

            /** Pose position */
            position?: (qyh.dataplane.IVector3|null);

            /** Pose orientation */
            orientation?: (qyh.dataplane.IQuaternion|null);
        }

        /** Represents a Pose. */
        class Pose implements IPose {

            /**
             * Constructs a new Pose.
             * @param [properties] Properties to set
             */
            constructor(properties?: qyh.dataplane.IPose);

            /** Pose position. */
            public position?: (qyh.dataplane.IVector3|null);

            /** Pose orientation. */
            public orientation?: (qyh.dataplane.IQuaternion|null);

            /**
             * Creates a new Pose instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Pose instance
             */
            public static create(properties?: qyh.dataplane.IPose): qyh.dataplane.Pose;

            /**
             * Encodes the specified Pose message. Does not implicitly {@link qyh.dataplane.Pose.verify|verify} messages.
             * @param message Pose message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: qyh.dataplane.IPose, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Pose message, length delimited. Does not implicitly {@link qyh.dataplane.Pose.verify|verify} messages.
             * @param message Pose message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: qyh.dataplane.IPose, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Pose message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Pose
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qyh.dataplane.Pose;

            /**
             * Decodes a Pose message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Pose
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qyh.dataplane.Pose;

            /**
             * Verifies a Pose message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Pose message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Pose
             */
            public static fromObject(object: { [k: string]: any }): qyh.dataplane.Pose;

            /**
             * Creates a plain object from a Pose message. Also converts values to other types if specified.
             * @param message Pose
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: qyh.dataplane.Pose, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Pose to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Pose
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a Twist. */
        interface ITwist {

            /** Twist linear */
            linear?: (qyh.dataplane.IVector3|null);

            /** Twist angular */
            angular?: (qyh.dataplane.IVector3|null);
        }

        /** Represents a Twist. */
        class Twist implements ITwist {

            /**
             * Constructs a new Twist.
             * @param [properties] Properties to set
             */
            constructor(properties?: qyh.dataplane.ITwist);

            /** Twist linear. */
            public linear?: (qyh.dataplane.IVector3|null);

            /** Twist angular. */
            public angular?: (qyh.dataplane.IVector3|null);

            /**
             * Creates a new Twist instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Twist instance
             */
            public static create(properties?: qyh.dataplane.ITwist): qyh.dataplane.Twist;

            /**
             * Encodes the specified Twist message. Does not implicitly {@link qyh.dataplane.Twist.verify|verify} messages.
             * @param message Twist message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: qyh.dataplane.ITwist, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Twist message, length delimited. Does not implicitly {@link qyh.dataplane.Twist.verify|verify} messages.
             * @param message Twist message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: qyh.dataplane.ITwist, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Twist message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Twist
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qyh.dataplane.Twist;

            /**
             * Decodes a Twist message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Twist
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qyh.dataplane.Twist;

            /**
             * Verifies a Twist message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Twist message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Twist
             */
            public static fromObject(object: { [k: string]: any }): qyh.dataplane.Twist;

            /**
             * Creates a plain object from a Twist message. Also converts values to other types if specified.
             * @param message Twist
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: qyh.dataplane.Twist, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Twist to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Twist
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a Header. */
        interface IHeader {

            /** Header stamp */
            stamp?: (qyh.dataplane.ITimestamp|null);

            /** Header frameId */
            frameId?: (string|null);

            /** Header sequence */
            sequence?: (number|Long|null);
        }

        /** Represents a Header. */
        class Header implements IHeader {

            /**
             * Constructs a new Header.
             * @param [properties] Properties to set
             */
            constructor(properties?: qyh.dataplane.IHeader);

            /** Header stamp. */
            public stamp?: (qyh.dataplane.ITimestamp|null);

            /** Header frameId. */
            public frameId: string;

            /** Header sequence. */
            public sequence: (number|Long);

            /**
             * Creates a new Header instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Header instance
             */
            public static create(properties?: qyh.dataplane.IHeader): qyh.dataplane.Header;

            /**
             * Encodes the specified Header message. Does not implicitly {@link qyh.dataplane.Header.verify|verify} messages.
             * @param message Header message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: qyh.dataplane.IHeader, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Header message, length delimited. Does not implicitly {@link qyh.dataplane.Header.verify|verify} messages.
             * @param message Header message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: qyh.dataplane.IHeader, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Header message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Header
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qyh.dataplane.Header;

            /**
             * Decodes a Header message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Header
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qyh.dataplane.Header;

            /**
             * Verifies a Header message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Header message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Header
             */
            public static fromObject(object: { [k: string]: any }): qyh.dataplane.Header;

            /**
             * Creates a plain object from a Header message. Also converts values to other types if specified.
             * @param message Header
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: qyh.dataplane.Header, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Header to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Header
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a UserInfo. */
        interface IUserInfo {

            /** UserInfo userId */
            userId?: (number|Long|null);

            /** UserInfo username */
            username?: (string|null);

            /** UserInfo role */
            role?: (string|null);

            /** UserInfo permissions */
            permissions?: (string[]|null);
        }

        /** Represents a UserInfo. */
        class UserInfo implements IUserInfo {

            /**
             * Constructs a new UserInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: qyh.dataplane.IUserInfo);

            /** UserInfo userId. */
            public userId: (number|Long);

            /** UserInfo username. */
            public username: string;

            /** UserInfo role. */
            public role: string;

            /** UserInfo permissions. */
            public permissions: string[];

            /**
             * Creates a new UserInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns UserInfo instance
             */
            public static create(properties?: qyh.dataplane.IUserInfo): qyh.dataplane.UserInfo;

            /**
             * Encodes the specified UserInfo message. Does not implicitly {@link qyh.dataplane.UserInfo.verify|verify} messages.
             * @param message UserInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: qyh.dataplane.IUserInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified UserInfo message, length delimited. Does not implicitly {@link qyh.dataplane.UserInfo.verify|verify} messages.
             * @param message UserInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: qyh.dataplane.IUserInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a UserInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UserInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qyh.dataplane.UserInfo;

            /**
             * Decodes a UserInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns UserInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qyh.dataplane.UserInfo;

            /**
             * Verifies a UserInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a UserInfo message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UserInfo
             */
            public static fromObject(object: { [k: string]: any }): qyh.dataplane.UserInfo;

            /**
             * Creates a plain object from a UserInfo message. Also converts values to other types if specified.
             * @param message UserInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: qyh.dataplane.UserInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this UserInfo to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for UserInfo
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a SessionInfo. */
        interface ISessionInfo {

            /** SessionInfo sessionId */
            sessionId?: (string|null);

            /** SessionInfo user */
            user?: (qyh.dataplane.IUserInfo|null);

            /** SessionInfo connectedAt */
            connectedAt?: (qyh.dataplane.ITimestamp|null);

            /** SessionInfo hasControl */
            hasControl?: (boolean|null);
        }

        /** Represents a SessionInfo. */
        class SessionInfo implements ISessionInfo {

            /**
             * Constructs a new SessionInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: qyh.dataplane.ISessionInfo);

            /** SessionInfo sessionId. */
            public sessionId: string;

            /** SessionInfo user. */
            public user?: (qyh.dataplane.IUserInfo|null);

            /** SessionInfo connectedAt. */
            public connectedAt?: (qyh.dataplane.ITimestamp|null);

            /** SessionInfo hasControl. */
            public hasControl: boolean;

            /**
             * Creates a new SessionInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SessionInfo instance
             */
            public static create(properties?: qyh.dataplane.ISessionInfo): qyh.dataplane.SessionInfo;

            /**
             * Encodes the specified SessionInfo message. Does not implicitly {@link qyh.dataplane.SessionInfo.verify|verify} messages.
             * @param message SessionInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: qyh.dataplane.ISessionInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SessionInfo message, length delimited. Does not implicitly {@link qyh.dataplane.SessionInfo.verify|verify} messages.
             * @param message SessionInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: qyh.dataplane.ISessionInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SessionInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SessionInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qyh.dataplane.SessionInfo;

            /**
             * Decodes a SessionInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SessionInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qyh.dataplane.SessionInfo;

            /**
             * Verifies a SessionInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SessionInfo message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SessionInfo
             */
            public static fromObject(object: { [k: string]: any }): qyh.dataplane.SessionInfo;

            /**
             * Creates a plain object from a SessionInfo message. Also converts values to other types if specified.
             * @param message SessionInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: qyh.dataplane.SessionInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SessionInfo to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for SessionInfo
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of an Error. */
        interface IError {

            /** Error code */
            code?: (number|null);

            /** Error message */
            message?: (string|null);

            /** Error details */
            details?: (string|null);
        }

        /** Represents an Error. */
        class Error implements IError {

            /**
             * Constructs a new Error.
             * @param [properties] Properties to set
             */
            constructor(properties?: qyh.dataplane.IError);

            /** Error code. */
            public code: number;

            /** Error message. */
            public message: string;

            /** Error details. */
            public details: string;

            /**
             * Creates a new Error instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Error instance
             */
            public static create(properties?: qyh.dataplane.IError): qyh.dataplane.Error;

            /**
             * Encodes the specified Error message. Does not implicitly {@link qyh.dataplane.Error.verify|verify} messages.
             * @param message Error message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: qyh.dataplane.IError, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Error message, length delimited. Does not implicitly {@link qyh.dataplane.Error.verify|verify} messages.
             * @param message Error message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: qyh.dataplane.IError, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Error message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Error
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qyh.dataplane.Error;

            /**
             * Decodes an Error message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Error
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qyh.dataplane.Error;

            /**
             * Verifies an Error message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Error message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Error
             */
            public static fromObject(object: { [k: string]: any }): qyh.dataplane.Error;

            /**
             * Creates a plain object from an Error message. Also converts values to other types if specified.
             * @param message Error
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: qyh.dataplane.Error, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Error to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Error
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a JointState. */
        interface IJointState {

            /** JointState header */
            header?: (qyh.dataplane.IHeader|null);

            /** JointState names */
            names?: (string[]|null);

            /** JointState positions */
            positions?: (number[]|null);

            /** JointState velocities */
            velocities?: (number[]|null);

            /** JointState efforts */
            efforts?: (number[]|null);
        }

        /** Represents a JointState. */
        class JointState implements IJointState {

            /**
             * Constructs a new JointState.
             * @param [properties] Properties to set
             */
            constructor(properties?: qyh.dataplane.IJointState);

            /** JointState header. */
            public header?: (qyh.dataplane.IHeader|null);

            /** JointState names. */
            public names: string[];

            /** JointState positions. */
            public positions: number[];

            /** JointState velocities. */
            public velocities: number[];

            /** JointState efforts. */
            public efforts: number[];

            /**
             * Creates a new JointState instance using the specified properties.
             * @param [properties] Properties to set
             * @returns JointState instance
             */
            public static create(properties?: qyh.dataplane.IJointState): qyh.dataplane.JointState;

            /**
             * Encodes the specified JointState message. Does not implicitly {@link qyh.dataplane.JointState.verify|verify} messages.
             * @param message JointState message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: qyh.dataplane.IJointState, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified JointState message, length delimited. Does not implicitly {@link qyh.dataplane.JointState.verify|verify} messages.
             * @param message JointState message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: qyh.dataplane.IJointState, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a JointState message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns JointState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qyh.dataplane.JointState;

            /**
             * Decodes a JointState message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns JointState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qyh.dataplane.JointState;

            /**
             * Verifies a JointState message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a JointState message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns JointState
             */
            public static fromObject(object: { [k: string]: any }): qyh.dataplane.JointState;

            /**
             * Creates a plain object from a JointState message. Also converts values to other types if specified.
             * @param message JointState
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: qyh.dataplane.JointState, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this JointState to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for JointState
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of an ArmState. */
        interface IArmState {

            /** ArmState header */
            header?: (qyh.dataplane.IHeader|null);

            /** ArmState connected */
            connected?: (boolean|null);

            /** ArmState poweredOn */
            poweredOn?: (boolean|null);

            /** ArmState enabled */
            enabled?: (boolean|null);

            /** ArmState inEstop */
            inEstop?: (boolean|null);

            /** ArmState inError */
            inError?: (boolean|null);

            /** ArmState servoMode */
            servoMode?: (boolean|null);

            /** ArmState errorMessage */
            errorMessage?: (string|null);

            /** ArmState leftPositions */
            leftPositions?: (number[]|null);

            /** ArmState rightPositions */
            rightPositions?: (number[]|null);

            /** ArmState leftEndEffector */
            leftEndEffector?: (qyh.dataplane.IPose|null);

            /** ArmState rightEndEffector */
            rightEndEffector?: (qyh.dataplane.IPose|null);

            /** ArmState leftInPosition */
            leftInPosition?: (boolean|null);

            /** ArmState rightInPosition */
            rightInPosition?: (boolean|null);
        }

        /** Represents an ArmState. */
        class ArmState implements IArmState {

            /**
             * Constructs a new ArmState.
             * @param [properties] Properties to set
             */
            constructor(properties?: qyh.dataplane.IArmState);

            /** ArmState header. */
            public header?: (qyh.dataplane.IHeader|null);

            /** ArmState connected. */
            public connected: boolean;

            /** ArmState poweredOn. */
            public poweredOn: boolean;

            /** ArmState enabled. */
            public enabled: boolean;

            /** ArmState inEstop. */
            public inEstop: boolean;

            /** ArmState inError. */
            public inError: boolean;

            /** ArmState servoMode. */
            public servoMode: boolean;

            /** ArmState errorMessage. */
            public errorMessage: string;

            /** ArmState leftPositions. */
            public leftPositions: number[];

            /** ArmState rightPositions. */
            public rightPositions: number[];

            /** ArmState leftEndEffector. */
            public leftEndEffector?: (qyh.dataplane.IPose|null);

            /** ArmState rightEndEffector. */
            public rightEndEffector?: (qyh.dataplane.IPose|null);

            /** ArmState leftInPosition. */
            public leftInPosition: boolean;

            /** ArmState rightInPosition. */
            public rightInPosition: boolean;

            /**
             * Creates a new ArmState instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ArmState instance
             */
            public static create(properties?: qyh.dataplane.IArmState): qyh.dataplane.ArmState;

            /**
             * Encodes the specified ArmState message. Does not implicitly {@link qyh.dataplane.ArmState.verify|verify} messages.
             * @param message ArmState message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: qyh.dataplane.IArmState, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ArmState message, length delimited. Does not implicitly {@link qyh.dataplane.ArmState.verify|verify} messages.
             * @param message ArmState message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: qyh.dataplane.IArmState, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ArmState message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ArmState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qyh.dataplane.ArmState;

            /**
             * Decodes an ArmState message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ArmState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qyh.dataplane.ArmState;

            /**
             * Verifies an ArmState message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an ArmState message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ArmState
             */
            public static fromObject(object: { [k: string]: any }): qyh.dataplane.ArmState;

            /**
             * Creates a plain object from an ArmState message. Also converts values to other types if specified.
             * @param message ArmState
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: qyh.dataplane.ArmState, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ArmState to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ArmState
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a GripperState. */
        interface IGripperState {

            /** GripperState header */
            header?: (qyh.dataplane.IHeader|null);

            /** GripperState gripperId */
            gripperId?: (string|null);

            /** GripperState position */
            position?: (number|null);

            /** GripperState force */
            force?: (number|null);

            /** GripperState objectDetected */
            objectDetected?: (boolean|null);

            /** GripperState inMotion */
            inMotion?: (boolean|null);
        }

        /** Represents a GripperState. */
        class GripperState implements IGripperState {

            /**
             * Constructs a new GripperState.
             * @param [properties] Properties to set
             */
            constructor(properties?: qyh.dataplane.IGripperState);

            /** GripperState header. */
            public header?: (qyh.dataplane.IHeader|null);

            /** GripperState gripperId. */
            public gripperId: string;

            /** GripperState position. */
            public position: number;

            /** GripperState force. */
            public force: number;

            /** GripperState objectDetected. */
            public objectDetected: boolean;

            /** GripperState inMotion. */
            public inMotion: boolean;

            /**
             * Creates a new GripperState instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GripperState instance
             */
            public static create(properties?: qyh.dataplane.IGripperState): qyh.dataplane.GripperState;

            /**
             * Encodes the specified GripperState message. Does not implicitly {@link qyh.dataplane.GripperState.verify|verify} messages.
             * @param message GripperState message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: qyh.dataplane.IGripperState, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GripperState message, length delimited. Does not implicitly {@link qyh.dataplane.GripperState.verify|verify} messages.
             * @param message GripperState message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: qyh.dataplane.IGripperState, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GripperState message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GripperState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qyh.dataplane.GripperState;

            /**
             * Decodes a GripperState message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GripperState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qyh.dataplane.GripperState;

            /**
             * Verifies a GripperState message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GripperState message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GripperState
             */
            public static fromObject(object: { [k: string]: any }): qyh.dataplane.GripperState;

            /**
             * Creates a plain object from a GripperState message. Also converts values to other types if specified.
             * @param message GripperState
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: qyh.dataplane.GripperState, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GripperState to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for GripperState
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a ChassisState. */
        interface IChassisState {

            /** ChassisState header */
            header?: (qyh.dataplane.IHeader|null);

            /** ChassisState odom */
            odom?: (qyh.dataplane.IPose|null);

            /** ChassisState velocity */
            velocity?: (qyh.dataplane.ITwist|null);

            /** ChassisState batteryLevel */
            batteryLevel?: (number|null);

            /** ChassisState charging */
            charging?: (boolean|null);

            /** ChassisState emergencyStop */
            emergencyStop?: (boolean|null);

            /** ChassisState navigation */
            navigation?: (qyh.dataplane.INavigationStatus|null);
        }

        /** Represents a ChassisState. */
        class ChassisState implements IChassisState {

            /**
             * Constructs a new ChassisState.
             * @param [properties] Properties to set
             */
            constructor(properties?: qyh.dataplane.IChassisState);

            /** ChassisState header. */
            public header?: (qyh.dataplane.IHeader|null);

            /** ChassisState odom. */
            public odom?: (qyh.dataplane.IPose|null);

            /** ChassisState velocity. */
            public velocity?: (qyh.dataplane.ITwist|null);

            /** ChassisState batteryLevel. */
            public batteryLevel: number;

            /** ChassisState charging. */
            public charging: boolean;

            /** ChassisState emergencyStop. */
            public emergencyStop: boolean;

            /** ChassisState navigation. */
            public navigation?: (qyh.dataplane.INavigationStatus|null);

            /**
             * Creates a new ChassisState instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ChassisState instance
             */
            public static create(properties?: qyh.dataplane.IChassisState): qyh.dataplane.ChassisState;

            /**
             * Encodes the specified ChassisState message. Does not implicitly {@link qyh.dataplane.ChassisState.verify|verify} messages.
             * @param message ChassisState message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: qyh.dataplane.IChassisState, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ChassisState message, length delimited. Does not implicitly {@link qyh.dataplane.ChassisState.verify|verify} messages.
             * @param message ChassisState message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: qyh.dataplane.IChassisState, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ChassisState message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ChassisState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qyh.dataplane.ChassisState;

            /**
             * Decodes a ChassisState message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ChassisState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qyh.dataplane.ChassisState;

            /**
             * Verifies a ChassisState message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ChassisState message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ChassisState
             */
            public static fromObject(object: { [k: string]: any }): qyh.dataplane.ChassisState;

            /**
             * Creates a plain object from a ChassisState message. Also converts values to other types if specified.
             * @param message ChassisState
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: qyh.dataplane.ChassisState, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ChassisState to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ChassisState
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a NavigationStatus. */
        interface INavigationStatus {

            /** NavigationStatus state */
            state?: (qyh.dataplane.NavigationStatus.State|null);

            /** NavigationStatus currentGoal */
            currentGoal?: (qyh.dataplane.IPose|null);

            /** NavigationStatus distanceRemaining */
            distanceRemaining?: (number|null);

            /** NavigationStatus etaSeconds */
            etaSeconds?: (number|null);

            /** NavigationStatus errorMessage */
            errorMessage?: (string|null);
        }

        /** Represents a NavigationStatus. */
        class NavigationStatus implements INavigationStatus {

            /**
             * Constructs a new NavigationStatus.
             * @param [properties] Properties to set
             */
            constructor(properties?: qyh.dataplane.INavigationStatus);

            /** NavigationStatus state. */
            public state: qyh.dataplane.NavigationStatus.State;

            /** NavigationStatus currentGoal. */
            public currentGoal?: (qyh.dataplane.IPose|null);

            /** NavigationStatus distanceRemaining. */
            public distanceRemaining: number;

            /** NavigationStatus etaSeconds. */
            public etaSeconds: number;

            /** NavigationStatus errorMessage. */
            public errorMessage: string;

            /**
             * Creates a new NavigationStatus instance using the specified properties.
             * @param [properties] Properties to set
             * @returns NavigationStatus instance
             */
            public static create(properties?: qyh.dataplane.INavigationStatus): qyh.dataplane.NavigationStatus;

            /**
             * Encodes the specified NavigationStatus message. Does not implicitly {@link qyh.dataplane.NavigationStatus.verify|verify} messages.
             * @param message NavigationStatus message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: qyh.dataplane.INavigationStatus, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified NavigationStatus message, length delimited. Does not implicitly {@link qyh.dataplane.NavigationStatus.verify|verify} messages.
             * @param message NavigationStatus message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: qyh.dataplane.INavigationStatus, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a NavigationStatus message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns NavigationStatus
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qyh.dataplane.NavigationStatus;

            /**
             * Decodes a NavigationStatus message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns NavigationStatus
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qyh.dataplane.NavigationStatus;

            /**
             * Verifies a NavigationStatus message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a NavigationStatus message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns NavigationStatus
             */
            public static fromObject(object: { [k: string]: any }): qyh.dataplane.NavigationStatus;

            /**
             * Creates a plain object from a NavigationStatus message. Also converts values to other types if specified.
             * @param message NavigationStatus
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: qyh.dataplane.NavigationStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this NavigationStatus to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for NavigationStatus
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace NavigationStatus {

            /** State enum. */
            enum State {
                IDLE = 0,
                NAVIGATING = 1,
                PAUSED = 2,
                SUCCEEDED = 3,
                FAILED = 4,
                CANCELLED = 5
            }
        }

        /** Properties of an ImuData. */
        interface IImuData {

            /** ImuData header */
            header?: (qyh.dataplane.IHeader|null);

            /** ImuData orientation */
            orientation?: (qyh.dataplane.IQuaternion|null);

            /** ImuData angularVelocity */
            angularVelocity?: (qyh.dataplane.IVector3|null);

            /** ImuData linearAcceleration */
            linearAcceleration?: (qyh.dataplane.IVector3|null);
        }

        /** Represents an ImuData. */
        class ImuData implements IImuData {

            /**
             * Constructs a new ImuData.
             * @param [properties] Properties to set
             */
            constructor(properties?: qyh.dataplane.IImuData);

            /** ImuData header. */
            public header?: (qyh.dataplane.IHeader|null);

            /** ImuData orientation. */
            public orientation?: (qyh.dataplane.IQuaternion|null);

            /** ImuData angularVelocity. */
            public angularVelocity?: (qyh.dataplane.IVector3|null);

            /** ImuData linearAcceleration. */
            public linearAcceleration?: (qyh.dataplane.IVector3|null);

            /**
             * Creates a new ImuData instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ImuData instance
             */
            public static create(properties?: qyh.dataplane.IImuData): qyh.dataplane.ImuData;

            /**
             * Encodes the specified ImuData message. Does not implicitly {@link qyh.dataplane.ImuData.verify|verify} messages.
             * @param message ImuData message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: qyh.dataplane.IImuData, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ImuData message, length delimited. Does not implicitly {@link qyh.dataplane.ImuData.verify|verify} messages.
             * @param message ImuData message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: qyh.dataplane.IImuData, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ImuData message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ImuData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qyh.dataplane.ImuData;

            /**
             * Decodes an ImuData message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ImuData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qyh.dataplane.ImuData;

            /**
             * Verifies an ImuData message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an ImuData message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ImuData
             */
            public static fromObject(object: { [k: string]: any }): qyh.dataplane.ImuData;

            /**
             * Creates a plain object from an ImuData message. Also converts values to other types if specified.
             * @param message ImuData
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: qyh.dataplane.ImuData, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ImuData to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ImuData
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of an ActuatorState. */
        interface IActuatorState {

            /** ActuatorState header */
            header?: (qyh.dataplane.IHeader|null);

            /** ActuatorState actuatorId */
            actuatorId?: (string|null);

            /** ActuatorState position */
            position?: (number|null);

            /** ActuatorState velocity */
            velocity?: (number|null);

            /** ActuatorState minLimit */
            minLimit?: (number|null);

            /** ActuatorState maxLimit */
            maxLimit?: (number|null);

            /** ActuatorState inMotion */
            inMotion?: (boolean|null);

            /** ActuatorState inPosition */
            inPosition?: (boolean|null);
        }

        /** Represents an ActuatorState. */
        class ActuatorState implements IActuatorState {

            /**
             * Constructs a new ActuatorState.
             * @param [properties] Properties to set
             */
            constructor(properties?: qyh.dataplane.IActuatorState);

            /** ActuatorState header. */
            public header?: (qyh.dataplane.IHeader|null);

            /** ActuatorState actuatorId. */
            public actuatorId: string;

            /** ActuatorState position. */
            public position: number;

            /** ActuatorState velocity. */
            public velocity: number;

            /** ActuatorState minLimit. */
            public minLimit: number;

            /** ActuatorState maxLimit. */
            public maxLimit: number;

            /** ActuatorState inMotion. */
            public inMotion: boolean;

            /** ActuatorState inPosition. */
            public inPosition: boolean;

            /**
             * Creates a new ActuatorState instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ActuatorState instance
             */
            public static create(properties?: qyh.dataplane.IActuatorState): qyh.dataplane.ActuatorState;

            /**
             * Encodes the specified ActuatorState message. Does not implicitly {@link qyh.dataplane.ActuatorState.verify|verify} messages.
             * @param message ActuatorState message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: qyh.dataplane.IActuatorState, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ActuatorState message, length delimited. Does not implicitly {@link qyh.dataplane.ActuatorState.verify|verify} messages.
             * @param message ActuatorState message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: qyh.dataplane.IActuatorState, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ActuatorState message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ActuatorState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qyh.dataplane.ActuatorState;

            /**
             * Decodes an ActuatorState message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ActuatorState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qyh.dataplane.ActuatorState;

            /**
             * Verifies an ActuatorState message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an ActuatorState message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ActuatorState
             */
            public static fromObject(object: { [k: string]: any }): qyh.dataplane.ActuatorState;

            /**
             * Creates a plain object from an ActuatorState message. Also converts values to other types if specified.
             * @param message ActuatorState
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: qyh.dataplane.ActuatorState, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ActuatorState to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ActuatorState
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** RobotMode enum. */
        enum RobotMode {
            MODE_IDLE = 0,
            MODE_TELEOP = 1,
            MODE_AUTO = 2,
            MODE_MAINTENANCE = 3,
            MODE_ERROR = 4
        }

        /** Properties of a RobotState. */
        interface IRobotState {

            /** RobotState header */
            header?: (qyh.dataplane.IHeader|null);

            /** RobotState mode */
            mode?: (qyh.dataplane.RobotMode|null);

            /** RobotState controlHeld */
            controlHeld?: (boolean|null);

            /** RobotState controlHolder */
            controlHolder?: (string|null);

            /** RobotState arm */
            arm?: (qyh.dataplane.IArmState|null);

            /** RobotState chassis */
            chassis?: (qyh.dataplane.IChassisState|null);

            /** RobotState joints */
            joints?: (qyh.dataplane.IJointState|null);

            /** RobotState lift */
            lift?: (qyh.dataplane.IActuatorState|null);

            /** RobotState waist */
            waist?: (qyh.dataplane.IActuatorState|null);

            /** RobotState headPan */
            headPan?: (qyh.dataplane.IActuatorState|null);

            /** RobotState headTilt */
            headTilt?: (qyh.dataplane.IActuatorState|null);

            /** RobotState leftGripper */
            leftGripper?: (qyh.dataplane.IGripperState|null);

            /** RobotState rightGripper */
            rightGripper?: (qyh.dataplane.IGripperState|null);

            /** RobotState systemReady */
            systemReady?: (boolean|null);

            /** RobotState activeErrors */
            activeErrors?: (string[]|null);

            /** RobotState warnings */
            warnings?: (string[]|null);
        }

        /** Represents a RobotState. */
        class RobotState implements IRobotState {

            /**
             * Constructs a new RobotState.
             * @param [properties] Properties to set
             */
            constructor(properties?: qyh.dataplane.IRobotState);

            /** RobotState header. */
            public header?: (qyh.dataplane.IHeader|null);

            /** RobotState mode. */
            public mode: qyh.dataplane.RobotMode;

            /** RobotState controlHeld. */
            public controlHeld: boolean;

            /** RobotState controlHolder. */
            public controlHolder: string;

            /** RobotState arm. */
            public arm?: (qyh.dataplane.IArmState|null);

            /** RobotState chassis. */
            public chassis?: (qyh.dataplane.IChassisState|null);

            /** RobotState joints. */
            public joints?: (qyh.dataplane.IJointState|null);

            /** RobotState lift. */
            public lift?: (qyh.dataplane.IActuatorState|null);

            /** RobotState waist. */
            public waist?: (qyh.dataplane.IActuatorState|null);

            /** RobotState headPan. */
            public headPan?: (qyh.dataplane.IActuatorState|null);

            /** RobotState headTilt. */
            public headTilt?: (qyh.dataplane.IActuatorState|null);

            /** RobotState leftGripper. */
            public leftGripper?: (qyh.dataplane.IGripperState|null);

            /** RobotState rightGripper. */
            public rightGripper?: (qyh.dataplane.IGripperState|null);

            /** RobotState systemReady. */
            public systemReady: boolean;

            /** RobotState activeErrors. */
            public activeErrors: string[];

            /** RobotState warnings. */
            public warnings: string[];

            /**
             * Creates a new RobotState instance using the specified properties.
             * @param [properties] Properties to set
             * @returns RobotState instance
             */
            public static create(properties?: qyh.dataplane.IRobotState): qyh.dataplane.RobotState;

            /**
             * Encodes the specified RobotState message. Does not implicitly {@link qyh.dataplane.RobotState.verify|verify} messages.
             * @param message RobotState message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: qyh.dataplane.IRobotState, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RobotState message, length delimited. Does not implicitly {@link qyh.dataplane.RobotState.verify|verify} messages.
             * @param message RobotState message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: qyh.dataplane.IRobotState, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RobotState message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RobotState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qyh.dataplane.RobotState;

            /**
             * Decodes a RobotState message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RobotState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qyh.dataplane.RobotState;

            /**
             * Verifies a RobotState message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RobotState message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RobotState
             */
            public static fromObject(object: { [k: string]: any }): qyh.dataplane.RobotState;

            /**
             * Creates a plain object from a RobotState message. Also converts values to other types if specified.
             * @param message RobotState
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: qyh.dataplane.RobotState, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RobotState to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for RobotState
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a VRSystemState. */
        interface IVRSystemState {

            /** VRSystemState header */
            header?: (qyh.dataplane.IHeader|null);

            /** VRSystemState connected */
            connected?: (boolean|null);

            /** VRSystemState headPose */
            headPose?: (qyh.dataplane.IPose|null);

            /** VRSystemState leftControllerActive */
            leftControllerActive?: (boolean|null);

            /** VRSystemState rightControllerActive */
            rightControllerActive?: (boolean|null);

            /** VRSystemState leftClutchEngaged */
            leftClutchEngaged?: (boolean|null);

            /** VRSystemState rightClutchEngaged */
            rightClutchEngaged?: (boolean|null);
        }

        /** Represents a VRSystemState. */
        class VRSystemState implements IVRSystemState {

            /**
             * Constructs a new VRSystemState.
             * @param [properties] Properties to set
             */
            constructor(properties?: qyh.dataplane.IVRSystemState);

            /** VRSystemState header. */
            public header?: (qyh.dataplane.IHeader|null);

            /** VRSystemState connected. */
            public connected: boolean;

            /** VRSystemState headPose. */
            public headPose?: (qyh.dataplane.IPose|null);

            /** VRSystemState leftControllerActive. */
            public leftControllerActive: boolean;

            /** VRSystemState rightControllerActive. */
            public rightControllerActive: boolean;

            /** VRSystemState leftClutchEngaged. */
            public leftClutchEngaged: boolean;

            /** VRSystemState rightClutchEngaged. */
            public rightClutchEngaged: boolean;

            /**
             * Creates a new VRSystemState instance using the specified properties.
             * @param [properties] Properties to set
             * @returns VRSystemState instance
             */
            public static create(properties?: qyh.dataplane.IVRSystemState): qyh.dataplane.VRSystemState;

            /**
             * Encodes the specified VRSystemState message. Does not implicitly {@link qyh.dataplane.VRSystemState.verify|verify} messages.
             * @param message VRSystemState message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: qyh.dataplane.IVRSystemState, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified VRSystemState message, length delimited. Does not implicitly {@link qyh.dataplane.VRSystemState.verify|verify} messages.
             * @param message VRSystemState message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: qyh.dataplane.IVRSystemState, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a VRSystemState message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns VRSystemState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qyh.dataplane.VRSystemState;

            /**
             * Decodes a VRSystemState message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns VRSystemState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qyh.dataplane.VRSystemState;

            /**
             * Verifies a VRSystemState message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a VRSystemState message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns VRSystemState
             */
            public static fromObject(object: { [k: string]: any }): qyh.dataplane.VRSystemState;

            /**
             * Creates a plain object from a VRSystemState message. Also converts values to other types if specified.
             * @param message VRSystemState
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: qyh.dataplane.VRSystemState, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this VRSystemState to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for VRSystemState
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a TaskState. */
        interface ITaskState {

            /** TaskState header */
            header?: (qyh.dataplane.IHeader|null);

            /** TaskState taskId */
            taskId?: (number|Long|null);

            /** TaskState taskName */
            taskName?: (string|null);

            /** TaskState status */
            status?: (qyh.dataplane.TaskState.Status|null);

            /** TaskState currentStep */
            currentStep?: (number|null);

            /** TaskState totalSteps */
            totalSteps?: (number|null);

            /** TaskState progress */
            progress?: (number|null);

            /** TaskState currentAction */
            currentAction?: (string|null);

            /** TaskState errorMessage */
            errorMessage?: (string|null);
        }

        /** Represents a TaskState. */
        class TaskState implements ITaskState {

            /**
             * Constructs a new TaskState.
             * @param [properties] Properties to set
             */
            constructor(properties?: qyh.dataplane.ITaskState);

            /** TaskState header. */
            public header?: (qyh.dataplane.IHeader|null);

            /** TaskState taskId. */
            public taskId: (number|Long);

            /** TaskState taskName. */
            public taskName: string;

            /** TaskState status. */
            public status: qyh.dataplane.TaskState.Status;

            /** TaskState currentStep. */
            public currentStep: number;

            /** TaskState totalSteps. */
            public totalSteps: number;

            /** TaskState progress. */
            public progress: number;

            /** TaskState currentAction. */
            public currentAction: string;

            /** TaskState errorMessage. */
            public errorMessage: string;

            /**
             * Creates a new TaskState instance using the specified properties.
             * @param [properties] Properties to set
             * @returns TaskState instance
             */
            public static create(properties?: qyh.dataplane.ITaskState): qyh.dataplane.TaskState;

            /**
             * Encodes the specified TaskState message. Does not implicitly {@link qyh.dataplane.TaskState.verify|verify} messages.
             * @param message TaskState message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: qyh.dataplane.ITaskState, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified TaskState message, length delimited. Does not implicitly {@link qyh.dataplane.TaskState.verify|verify} messages.
             * @param message TaskState message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: qyh.dataplane.ITaskState, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a TaskState message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns TaskState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qyh.dataplane.TaskState;

            /**
             * Decodes a TaskState message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns TaskState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qyh.dataplane.TaskState;

            /**
             * Verifies a TaskState message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a TaskState message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns TaskState
             */
            public static fromObject(object: { [k: string]: any }): qyh.dataplane.TaskState;

            /**
             * Creates a plain object from a TaskState message. Also converts values to other types if specified.
             * @param message TaskState
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: qyh.dataplane.TaskState, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this TaskState to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for TaskState
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace TaskState {

            /** Status enum. */
            enum Status {
                PENDING = 0,
                RUNNING = 1,
                PAUSED = 2,
                COMPLETED = 3,
                FAILED = 4,
                CANCELLED = 5
            }
        }

        /** ControlType enum. */
        enum ControlType {
            CONTROL_NONE = 0,
            CONTROL_VR_TELEOP = 1,
            CONTROL_GAMEPAD = 2,
            CONTROL_KEYBOARD = 3,
            CONTROL_AUTO = 4
        }

        /** Properties of a VRController. */
        interface IVRController {

            /** VRController active */
            active?: (boolean|null);

            /** VRController pose */
            pose?: (qyh.dataplane.IPose|null);

            /** VRController trigger */
            trigger?: (number|null);

            /** VRController grip */
            grip?: (number|null);

            /** VRController joystick */
            joystick?: (number[]|null);

            /** VRController buttons */
            buttons?: (boolean[]|null);

            /** VRController clutchEngaged */
            clutchEngaged?: (boolean|null);
        }

        /** Represents a VRController. */
        class VRController implements IVRController {

            /**
             * Constructs a new VRController.
             * @param [properties] Properties to set
             */
            constructor(properties?: qyh.dataplane.IVRController);

            /** VRController active. */
            public active: boolean;

            /** VRController pose. */
            public pose?: (qyh.dataplane.IPose|null);

            /** VRController trigger. */
            public trigger: number;

            /** VRController grip. */
            public grip: number;

            /** VRController joystick. */
            public joystick: number[];

            /** VRController buttons. */
            public buttons: boolean[];

            /** VRController clutchEngaged. */
            public clutchEngaged: boolean;

            /**
             * Creates a new VRController instance using the specified properties.
             * @param [properties] Properties to set
             * @returns VRController instance
             */
            public static create(properties?: qyh.dataplane.IVRController): qyh.dataplane.VRController;

            /**
             * Encodes the specified VRController message. Does not implicitly {@link qyh.dataplane.VRController.verify|verify} messages.
             * @param message VRController message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: qyh.dataplane.IVRController, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified VRController message, length delimited. Does not implicitly {@link qyh.dataplane.VRController.verify|verify} messages.
             * @param message VRController message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: qyh.dataplane.IVRController, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a VRController message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns VRController
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qyh.dataplane.VRController;

            /**
             * Decodes a VRController message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns VRController
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qyh.dataplane.VRController;

            /**
             * Verifies a VRController message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a VRController message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns VRController
             */
            public static fromObject(object: { [k: string]: any }): qyh.dataplane.VRController;

            /**
             * Creates a plain object from a VRController message. Also converts values to other types if specified.
             * @param message VRController
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: qyh.dataplane.VRController, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this VRController to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for VRController
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a VRControlIntent. */
        interface IVRControlIntent {

            /** VRControlIntent header */
            header?: (qyh.dataplane.IHeader|null);

            /** VRControlIntent headPose */
            headPose?: (qyh.dataplane.IPose|null);

            /** VRControlIntent leftHand */
            leftHand?: (qyh.dataplane.IVRController|null);

            /** VRControlIntent rightHand */
            rightHand?: (qyh.dataplane.IVRController|null);
        }

        /** Represents a VRControlIntent. */
        class VRControlIntent implements IVRControlIntent {

            /**
             * Constructs a new VRControlIntent.
             * @param [properties] Properties to set
             */
            constructor(properties?: qyh.dataplane.IVRControlIntent);

            /** VRControlIntent header. */
            public header?: (qyh.dataplane.IHeader|null);

            /** VRControlIntent headPose. */
            public headPose?: (qyh.dataplane.IPose|null);

            /** VRControlIntent leftHand. */
            public leftHand?: (qyh.dataplane.IVRController|null);

            /** VRControlIntent rightHand. */
            public rightHand?: (qyh.dataplane.IVRController|null);

            /**
             * Creates a new VRControlIntent instance using the specified properties.
             * @param [properties] Properties to set
             * @returns VRControlIntent instance
             */
            public static create(properties?: qyh.dataplane.IVRControlIntent): qyh.dataplane.VRControlIntent;

            /**
             * Encodes the specified VRControlIntent message. Does not implicitly {@link qyh.dataplane.VRControlIntent.verify|verify} messages.
             * @param message VRControlIntent message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: qyh.dataplane.IVRControlIntent, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified VRControlIntent message, length delimited. Does not implicitly {@link qyh.dataplane.VRControlIntent.verify|verify} messages.
             * @param message VRControlIntent message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: qyh.dataplane.IVRControlIntent, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a VRControlIntent message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns VRControlIntent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qyh.dataplane.VRControlIntent;

            /**
             * Decodes a VRControlIntent message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns VRControlIntent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qyh.dataplane.VRControlIntent;

            /**
             * Verifies a VRControlIntent message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a VRControlIntent message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns VRControlIntent
             */
            public static fromObject(object: { [k: string]: any }): qyh.dataplane.VRControlIntent;

            /**
             * Creates a plain object from a VRControlIntent message. Also converts values to other types if specified.
             * @param message VRControlIntent
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: qyh.dataplane.VRControlIntent, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this VRControlIntent to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for VRControlIntent
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a ChassisVelocity. */
        interface IChassisVelocity {

            /** ChassisVelocity header */
            header?: (qyh.dataplane.IHeader|null);

            /** ChassisVelocity linearX */
            linearX?: (number|null);

            /** ChassisVelocity linearY */
            linearY?: (number|null);

            /** ChassisVelocity angularZ */
            angularZ?: (number|null);
        }

        /** Represents a ChassisVelocity. */
        class ChassisVelocity implements IChassisVelocity {

            /**
             * Constructs a new ChassisVelocity.
             * @param [properties] Properties to set
             */
            constructor(properties?: qyh.dataplane.IChassisVelocity);

            /** ChassisVelocity header. */
            public header?: (qyh.dataplane.IHeader|null);

            /** ChassisVelocity linearX. */
            public linearX: number;

            /** ChassisVelocity linearY. */
            public linearY: number;

            /** ChassisVelocity angularZ. */
            public angularZ: number;

            /**
             * Creates a new ChassisVelocity instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ChassisVelocity instance
             */
            public static create(properties?: qyh.dataplane.IChassisVelocity): qyh.dataplane.ChassisVelocity;

            /**
             * Encodes the specified ChassisVelocity message. Does not implicitly {@link qyh.dataplane.ChassisVelocity.verify|verify} messages.
             * @param message ChassisVelocity message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: qyh.dataplane.IChassisVelocity, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ChassisVelocity message, length delimited. Does not implicitly {@link qyh.dataplane.ChassisVelocity.verify|verify} messages.
             * @param message ChassisVelocity message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: qyh.dataplane.IChassisVelocity, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ChassisVelocity message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ChassisVelocity
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qyh.dataplane.ChassisVelocity;

            /**
             * Decodes a ChassisVelocity message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ChassisVelocity
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qyh.dataplane.ChassisVelocity;

            /**
             * Verifies a ChassisVelocity message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ChassisVelocity message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ChassisVelocity
             */
            public static fromObject(object: { [k: string]: any }): qyh.dataplane.ChassisVelocity;

            /**
             * Creates a plain object from a ChassisVelocity message. Also converts values to other types if specified.
             * @param message ChassisVelocity
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: qyh.dataplane.ChassisVelocity, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ChassisVelocity to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ChassisVelocity
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a NavigationGoal. */
        interface INavigationGoal {

            /** NavigationGoal header */
            header?: (qyh.dataplane.IHeader|null);

            /** NavigationGoal targetPose */
            targetPose?: (qyh.dataplane.IPose|null);

            /** NavigationGoal isLocalizationOnly */
            isLocalizationOnly?: (boolean|null);
        }

        /** Represents a NavigationGoal. */
        class NavigationGoal implements INavigationGoal {

            /**
             * Constructs a new NavigationGoal.
             * @param [properties] Properties to set
             */
            constructor(properties?: qyh.dataplane.INavigationGoal);

            /** NavigationGoal header. */
            public header?: (qyh.dataplane.IHeader|null);

            /** NavigationGoal targetPose. */
            public targetPose?: (qyh.dataplane.IPose|null);

            /** NavigationGoal isLocalizationOnly. */
            public isLocalizationOnly: boolean;

            /**
             * Creates a new NavigationGoal instance using the specified properties.
             * @param [properties] Properties to set
             * @returns NavigationGoal instance
             */
            public static create(properties?: qyh.dataplane.INavigationGoal): qyh.dataplane.NavigationGoal;

            /**
             * Encodes the specified NavigationGoal message. Does not implicitly {@link qyh.dataplane.NavigationGoal.verify|verify} messages.
             * @param message NavigationGoal message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: qyh.dataplane.INavigationGoal, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified NavigationGoal message, length delimited. Does not implicitly {@link qyh.dataplane.NavigationGoal.verify|verify} messages.
             * @param message NavigationGoal message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: qyh.dataplane.INavigationGoal, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a NavigationGoal message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns NavigationGoal
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qyh.dataplane.NavigationGoal;

            /**
             * Decodes a NavigationGoal message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns NavigationGoal
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qyh.dataplane.NavigationGoal;

            /**
             * Verifies a NavigationGoal message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a NavigationGoal message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns NavigationGoal
             */
            public static fromObject(object: { [k: string]: any }): qyh.dataplane.NavigationGoal;

            /**
             * Creates a plain object from a NavigationGoal message. Also converts values to other types if specified.
             * @param message NavigationGoal
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: qyh.dataplane.NavigationGoal, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this NavigationGoal to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for NavigationGoal
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a JointCommand. */
        interface IJointCommand {

            /** JointCommand header */
            header?: (qyh.dataplane.IHeader|null);

            /** JointCommand names */
            names?: (string[]|null);

            /** JointCommand positions */
            positions?: (number[]|null);

            /** JointCommand velocities */
            velocities?: (number[]|null);
        }

        /** Represents a JointCommand. */
        class JointCommand implements IJointCommand {

            /**
             * Constructs a new JointCommand.
             * @param [properties] Properties to set
             */
            constructor(properties?: qyh.dataplane.IJointCommand);

            /** JointCommand header. */
            public header?: (qyh.dataplane.IHeader|null);

            /** JointCommand names. */
            public names: string[];

            /** JointCommand positions. */
            public positions: number[];

            /** JointCommand velocities. */
            public velocities: number[];

            /**
             * Creates a new JointCommand instance using the specified properties.
             * @param [properties] Properties to set
             * @returns JointCommand instance
             */
            public static create(properties?: qyh.dataplane.IJointCommand): qyh.dataplane.JointCommand;

            /**
             * Encodes the specified JointCommand message. Does not implicitly {@link qyh.dataplane.JointCommand.verify|verify} messages.
             * @param message JointCommand message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: qyh.dataplane.IJointCommand, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified JointCommand message, length delimited. Does not implicitly {@link qyh.dataplane.JointCommand.verify|verify} messages.
             * @param message JointCommand message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: qyh.dataplane.IJointCommand, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a JointCommand message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns JointCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qyh.dataplane.JointCommand;

            /**
             * Decodes a JointCommand message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns JointCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qyh.dataplane.JointCommand;

            /**
             * Verifies a JointCommand message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a JointCommand message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns JointCommand
             */
            public static fromObject(object: { [k: string]: any }): qyh.dataplane.JointCommand;

            /**
             * Creates a plain object from a JointCommand message. Also converts values to other types if specified.
             * @param message JointCommand
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: qyh.dataplane.JointCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this JointCommand to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for JointCommand
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of an EndEffectorCommand. */
        interface IEndEffectorCommand {

            /** EndEffectorCommand header */
            header?: (qyh.dataplane.IHeader|null);

            /** EndEffectorCommand armSide */
            armSide?: (string|null);

            /** EndEffectorCommand targetPose */
            targetPose?: (qyh.dataplane.IPose|null);

            /** EndEffectorCommand speedFactor */
            speedFactor?: (number|null);
        }

        /** Represents an EndEffectorCommand. */
        class EndEffectorCommand implements IEndEffectorCommand {

            /**
             * Constructs a new EndEffectorCommand.
             * @param [properties] Properties to set
             */
            constructor(properties?: qyh.dataplane.IEndEffectorCommand);

            /** EndEffectorCommand header. */
            public header?: (qyh.dataplane.IHeader|null);

            /** EndEffectorCommand armSide. */
            public armSide: string;

            /** EndEffectorCommand targetPose. */
            public targetPose?: (qyh.dataplane.IPose|null);

            /** EndEffectorCommand speedFactor. */
            public speedFactor: number;

            /**
             * Creates a new EndEffectorCommand instance using the specified properties.
             * @param [properties] Properties to set
             * @returns EndEffectorCommand instance
             */
            public static create(properties?: qyh.dataplane.IEndEffectorCommand): qyh.dataplane.EndEffectorCommand;

            /**
             * Encodes the specified EndEffectorCommand message. Does not implicitly {@link qyh.dataplane.EndEffectorCommand.verify|verify} messages.
             * @param message EndEffectorCommand message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: qyh.dataplane.IEndEffectorCommand, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified EndEffectorCommand message, length delimited. Does not implicitly {@link qyh.dataplane.EndEffectorCommand.verify|verify} messages.
             * @param message EndEffectorCommand message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: qyh.dataplane.IEndEffectorCommand, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an EndEffectorCommand message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns EndEffectorCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qyh.dataplane.EndEffectorCommand;

            /**
             * Decodes an EndEffectorCommand message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns EndEffectorCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qyh.dataplane.EndEffectorCommand;

            /**
             * Verifies an EndEffectorCommand message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an EndEffectorCommand message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns EndEffectorCommand
             */
            public static fromObject(object: { [k: string]: any }): qyh.dataplane.EndEffectorCommand;

            /**
             * Creates a plain object from an EndEffectorCommand message. Also converts values to other types if specified.
             * @param message EndEffectorCommand
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: qyh.dataplane.EndEffectorCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this EndEffectorCommand to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for EndEffectorCommand
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a GripperCommand. */
        interface IGripperCommand {

            /** GripperCommand header */
            header?: (qyh.dataplane.IHeader|null);

            /** GripperCommand gripperId */
            gripperId?: (string|null);

            /** GripperCommand position */
            position?: (number|null);

            /** GripperCommand force */
            force?: (number|null);
        }

        /** Represents a GripperCommand. */
        class GripperCommand implements IGripperCommand {

            /**
             * Constructs a new GripperCommand.
             * @param [properties] Properties to set
             */
            constructor(properties?: qyh.dataplane.IGripperCommand);

            /** GripperCommand header. */
            public header?: (qyh.dataplane.IHeader|null);

            /** GripperCommand gripperId. */
            public gripperId: string;

            /** GripperCommand position. */
            public position: number;

            /** GripperCommand force. */
            public force: number;

            /**
             * Creates a new GripperCommand instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GripperCommand instance
             */
            public static create(properties?: qyh.dataplane.IGripperCommand): qyh.dataplane.GripperCommand;

            /**
             * Encodes the specified GripperCommand message. Does not implicitly {@link qyh.dataplane.GripperCommand.verify|verify} messages.
             * @param message GripperCommand message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: qyh.dataplane.IGripperCommand, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GripperCommand message, length delimited. Does not implicitly {@link qyh.dataplane.GripperCommand.verify|verify} messages.
             * @param message GripperCommand message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: qyh.dataplane.IGripperCommand, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GripperCommand message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GripperCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qyh.dataplane.GripperCommand;

            /**
             * Decodes a GripperCommand message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GripperCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qyh.dataplane.GripperCommand;

            /**
             * Verifies a GripperCommand message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GripperCommand message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GripperCommand
             */
            public static fromObject(object: { [k: string]: any }): qyh.dataplane.GripperCommand;

            /**
             * Creates a plain object from a GripperCommand message. Also converts values to other types if specified.
             * @param message GripperCommand
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: qyh.dataplane.GripperCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GripperCommand to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for GripperCommand
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a Heartbeat. */
        interface IHeartbeat {

            /** Heartbeat header */
            header?: (qyh.dataplane.IHeader|null);

            /** Heartbeat sessionId */
            sessionId?: (string|null);

            /** Heartbeat controlType */
            controlType?: (qyh.dataplane.ControlType|null);
        }

        /** Represents a Heartbeat. */
        class Heartbeat implements IHeartbeat {

            /**
             * Constructs a new Heartbeat.
             * @param [properties] Properties to set
             */
            constructor(properties?: qyh.dataplane.IHeartbeat);

            /** Heartbeat header. */
            public header?: (qyh.dataplane.IHeader|null);

            /** Heartbeat sessionId. */
            public sessionId: string;

            /** Heartbeat controlType. */
            public controlType: qyh.dataplane.ControlType;

            /**
             * Creates a new Heartbeat instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Heartbeat instance
             */
            public static create(properties?: qyh.dataplane.IHeartbeat): qyh.dataplane.Heartbeat;

            /**
             * Encodes the specified Heartbeat message. Does not implicitly {@link qyh.dataplane.Heartbeat.verify|verify} messages.
             * @param message Heartbeat message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: qyh.dataplane.IHeartbeat, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Heartbeat message, length delimited. Does not implicitly {@link qyh.dataplane.Heartbeat.verify|verify} messages.
             * @param message Heartbeat message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: qyh.dataplane.IHeartbeat, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Heartbeat message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Heartbeat
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qyh.dataplane.Heartbeat;

            /**
             * Decodes a Heartbeat message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Heartbeat
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qyh.dataplane.Heartbeat;

            /**
             * Verifies a Heartbeat message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Heartbeat message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Heartbeat
             */
            public static fromObject(object: { [k: string]: any }): qyh.dataplane.Heartbeat;

            /**
             * Creates a plain object from a Heartbeat message. Also converts values to other types if specified.
             * @param message Heartbeat
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: qyh.dataplane.Heartbeat, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Heartbeat to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Heartbeat
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a SubscribeRequest. */
        interface ISubscribeRequest {

            /** SubscribeRequest header */
            header?: (qyh.dataplane.IHeader|null);

            /** SubscribeRequest topics */
            topics?: (string[]|null);

            /** SubscribeRequest maxRateHz */
            maxRateHz?: (number|null);
        }

        /** Represents a SubscribeRequest. */
        class SubscribeRequest implements ISubscribeRequest {

            /**
             * Constructs a new SubscribeRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: qyh.dataplane.ISubscribeRequest);

            /** SubscribeRequest header. */
            public header?: (qyh.dataplane.IHeader|null);

            /** SubscribeRequest topics. */
            public topics: string[];

            /** SubscribeRequest maxRateHz. */
            public maxRateHz: number;

            /**
             * Creates a new SubscribeRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SubscribeRequest instance
             */
            public static create(properties?: qyh.dataplane.ISubscribeRequest): qyh.dataplane.SubscribeRequest;

            /**
             * Encodes the specified SubscribeRequest message. Does not implicitly {@link qyh.dataplane.SubscribeRequest.verify|verify} messages.
             * @param message SubscribeRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: qyh.dataplane.ISubscribeRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SubscribeRequest message, length delimited. Does not implicitly {@link qyh.dataplane.SubscribeRequest.verify|verify} messages.
             * @param message SubscribeRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: qyh.dataplane.ISubscribeRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SubscribeRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SubscribeRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qyh.dataplane.SubscribeRequest;

            /**
             * Decodes a SubscribeRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SubscribeRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qyh.dataplane.SubscribeRequest;

            /**
             * Verifies a SubscribeRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SubscribeRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SubscribeRequest
             */
            public static fromObject(object: { [k: string]: any }): qyh.dataplane.SubscribeRequest;

            /**
             * Creates a plain object from a SubscribeRequest message. Also converts values to other types if specified.
             * @param message SubscribeRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: qyh.dataplane.SubscribeRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SubscribeRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for SubscribeRequest
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of an UnsubscribeRequest. */
        interface IUnsubscribeRequest {

            /** UnsubscribeRequest header */
            header?: (qyh.dataplane.IHeader|null);

            /** UnsubscribeRequest topics */
            topics?: (string[]|null);
        }

        /** Represents an UnsubscribeRequest. */
        class UnsubscribeRequest implements IUnsubscribeRequest {

            /**
             * Constructs a new UnsubscribeRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: qyh.dataplane.IUnsubscribeRequest);

            /** UnsubscribeRequest header. */
            public header?: (qyh.dataplane.IHeader|null);

            /** UnsubscribeRequest topics. */
            public topics: string[];

            /**
             * Creates a new UnsubscribeRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns UnsubscribeRequest instance
             */
            public static create(properties?: qyh.dataplane.IUnsubscribeRequest): qyh.dataplane.UnsubscribeRequest;

            /**
             * Encodes the specified UnsubscribeRequest message. Does not implicitly {@link qyh.dataplane.UnsubscribeRequest.verify|verify} messages.
             * @param message UnsubscribeRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: qyh.dataplane.IUnsubscribeRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified UnsubscribeRequest message, length delimited. Does not implicitly {@link qyh.dataplane.UnsubscribeRequest.verify|verify} messages.
             * @param message UnsubscribeRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: qyh.dataplane.IUnsubscribeRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an UnsubscribeRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UnsubscribeRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qyh.dataplane.UnsubscribeRequest;

            /**
             * Decodes an UnsubscribeRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns UnsubscribeRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qyh.dataplane.UnsubscribeRequest;

            /**
             * Verifies an UnsubscribeRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an UnsubscribeRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UnsubscribeRequest
             */
            public static fromObject(object: { [k: string]: any }): qyh.dataplane.UnsubscribeRequest;

            /**
             * Creates a plain object from an UnsubscribeRequest message. Also converts values to other types if specified.
             * @param message UnsubscribeRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: qyh.dataplane.UnsubscribeRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this UnsubscribeRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for UnsubscribeRequest
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of an AuthRequest. */
        interface IAuthRequest {

            /** AuthRequest token */
            token?: (string|null);

            /** AuthRequest clientType */
            clientType?: (string|null);

            /** AuthRequest clientVersion */
            clientVersion?: (string|null);
        }

        /** Represents an AuthRequest. */
        class AuthRequest implements IAuthRequest {

            /**
             * Constructs a new AuthRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: qyh.dataplane.IAuthRequest);

            /** AuthRequest token. */
            public token: string;

            /** AuthRequest clientType. */
            public clientType: string;

            /** AuthRequest clientVersion. */
            public clientVersion: string;

            /**
             * Creates a new AuthRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AuthRequest instance
             */
            public static create(properties?: qyh.dataplane.IAuthRequest): qyh.dataplane.AuthRequest;

            /**
             * Encodes the specified AuthRequest message. Does not implicitly {@link qyh.dataplane.AuthRequest.verify|verify} messages.
             * @param message AuthRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: qyh.dataplane.IAuthRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified AuthRequest message, length delimited. Does not implicitly {@link qyh.dataplane.AuthRequest.verify|verify} messages.
             * @param message AuthRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: qyh.dataplane.IAuthRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an AuthRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AuthRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qyh.dataplane.AuthRequest;

            /**
             * Decodes an AuthRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns AuthRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qyh.dataplane.AuthRequest;

            /**
             * Verifies an AuthRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an AuthRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AuthRequest
             */
            public static fromObject(object: { [k: string]: any }): qyh.dataplane.AuthRequest;

            /**
             * Creates a plain object from an AuthRequest message. Also converts values to other types if specified.
             * @param message AuthRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: qyh.dataplane.AuthRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AuthRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for AuthRequest
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of an AuthResponse. */
        interface IAuthResponse {

            /** AuthResponse success */
            success?: (boolean|null);

            /** AuthResponse session */
            session?: (qyh.dataplane.ISessionInfo|null);

            /** AuthResponse error */
            error?: (qyh.dataplane.IError|null);
        }

        /** Represents an AuthResponse. */
        class AuthResponse implements IAuthResponse {

            /**
             * Constructs a new AuthResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: qyh.dataplane.IAuthResponse);

            /** AuthResponse success. */
            public success: boolean;

            /** AuthResponse session. */
            public session?: (qyh.dataplane.ISessionInfo|null);

            /** AuthResponse error. */
            public error?: (qyh.dataplane.IError|null);

            /**
             * Creates a new AuthResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AuthResponse instance
             */
            public static create(properties?: qyh.dataplane.IAuthResponse): qyh.dataplane.AuthResponse;

            /**
             * Encodes the specified AuthResponse message. Does not implicitly {@link qyh.dataplane.AuthResponse.verify|verify} messages.
             * @param message AuthResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: qyh.dataplane.IAuthResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified AuthResponse message, length delimited. Does not implicitly {@link qyh.dataplane.AuthResponse.verify|verify} messages.
             * @param message AuthResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: qyh.dataplane.IAuthResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an AuthResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AuthResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qyh.dataplane.AuthResponse;

            /**
             * Decodes an AuthResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns AuthResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qyh.dataplane.AuthResponse;

            /**
             * Verifies an AuthResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an AuthResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AuthResponse
             */
            public static fromObject(object: { [k: string]: any }): qyh.dataplane.AuthResponse;

            /**
             * Creates a plain object from an AuthResponse message. Also converts values to other types if specified.
             * @param message AuthResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: qyh.dataplane.AuthResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AuthResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for AuthResponse
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** MessageType enum. */
        enum MessageType {
            MSG_UNKNOWN = 0,
            MSG_AUTH_REQUEST = 1,
            MSG_AUTH_RESPONSE = 2,
            MSG_SUBSCRIBE = 16,
            MSG_UNSUBSCRIBE = 17,
            MSG_HEARTBEAT = 32,
            MSG_HEARTBEAT_ACK = 33,
            MSG_VR_CONTROL = 256,
            MSG_CHASSIS_VELOCITY = 257,
            MSG_JOINT_COMMAND = 258,
            MSG_END_EFFECTOR_CMD = 259,
            MSG_GRIPPER_COMMAND = 260,
            MSG_NAVIGATION_GOAL = 261,
            MSG_ROBOT_STATE = 512,
            MSG_JOINT_STATE = 513,
            MSG_ARM_STATE = 514,
            MSG_CHASSIS_STATE = 515,
            MSG_GRIPPER_STATE = 516,
            MSG_VR_SYSTEM_STATE = 517,
            MSG_TASK_STATE = 518,
            MSG_ACTUATOR_STATE = 519,
            MSG_ERROR = 768,
            MSG_MODE_CHANGED = 1024,
            MSG_CONTROL_CHANGED = 1025,
            MSG_EMERGENCY_STOP = 1026
        }

        /** Properties of a WebSocketMessage. */
        interface IWebSocketMessage {

            /** WebSocketMessage type */
            type?: (qyh.dataplane.MessageType|null);

            /** WebSocketMessage sequence */
            sequence?: (number|Long|null);

            /** WebSocketMessage timestamp */
            timestamp?: (qyh.dataplane.ITimestamp|null);

            /** WebSocketMessage authRequest */
            authRequest?: (qyh.dataplane.IAuthRequest|null);

            /** WebSocketMessage authResponse */
            authResponse?: (qyh.dataplane.IAuthResponse|null);

            /** WebSocketMessage subscribe */
            subscribe?: (qyh.dataplane.ISubscribeRequest|null);

            /** WebSocketMessage unsubscribe */
            unsubscribe?: (qyh.dataplane.IUnsubscribeRequest|null);

            /** WebSocketMessage heartbeat */
            heartbeat?: (qyh.dataplane.IHeartbeat|null);

            /** WebSocketMessage vrControl */
            vrControl?: (qyh.dataplane.IVRControlIntent|null);

            /** WebSocketMessage chassisVelocity */
            chassisVelocity?: (qyh.dataplane.IChassisVelocity|null);

            /** WebSocketMessage jointCommand */
            jointCommand?: (qyh.dataplane.IJointCommand|null);

            /** WebSocketMessage endEffectorCmd */
            endEffectorCmd?: (qyh.dataplane.IEndEffectorCommand|null);

            /** WebSocketMessage gripperCommand */
            gripperCommand?: (qyh.dataplane.IGripperCommand|null);

            /** WebSocketMessage navigationGoal */
            navigationGoal?: (qyh.dataplane.INavigationGoal|null);

            /** WebSocketMessage robotState */
            robotState?: (qyh.dataplane.IRobotState|null);

            /** WebSocketMessage jointState */
            jointState?: (qyh.dataplane.IJointState|null);

            /** WebSocketMessage armState */
            armState?: (qyh.dataplane.IArmState|null);

            /** WebSocketMessage chassisState */
            chassisState?: (qyh.dataplane.IChassisState|null);

            /** WebSocketMessage gripperState */
            gripperState?: (qyh.dataplane.IGripperState|null);

            /** WebSocketMessage vrSystemState */
            vrSystemState?: (qyh.dataplane.IVRSystemState|null);

            /** WebSocketMessage taskState */
            taskState?: (qyh.dataplane.ITaskState|null);

            /** WebSocketMessage actuatorState */
            actuatorState?: (qyh.dataplane.IActuatorState|null);

            /** WebSocketMessage error */
            error?: (qyh.dataplane.IError|null);

            /** WebSocketMessage modeChanged */
            modeChanged?: (qyh.dataplane.IModeChangedNotification|null);

            /** WebSocketMessage controlChanged */
            controlChanged?: (qyh.dataplane.IControlChangedNotification|null);

            /** WebSocketMessage emergencyStop */
            emergencyStop?: (qyh.dataplane.IEmergencyStopNotification|null);
        }

        /** Represents a WebSocketMessage. */
        class WebSocketMessage implements IWebSocketMessage {

            /**
             * Constructs a new WebSocketMessage.
             * @param [properties] Properties to set
             */
            constructor(properties?: qyh.dataplane.IWebSocketMessage);

            /** WebSocketMessage type. */
            public type: qyh.dataplane.MessageType;

            /** WebSocketMessage sequence. */
            public sequence: (number|Long);

            /** WebSocketMessage timestamp. */
            public timestamp?: (qyh.dataplane.ITimestamp|null);

            /** WebSocketMessage authRequest. */
            public authRequest?: (qyh.dataplane.IAuthRequest|null);

            /** WebSocketMessage authResponse. */
            public authResponse?: (qyh.dataplane.IAuthResponse|null);

            /** WebSocketMessage subscribe. */
            public subscribe?: (qyh.dataplane.ISubscribeRequest|null);

            /** WebSocketMessage unsubscribe. */
            public unsubscribe?: (qyh.dataplane.IUnsubscribeRequest|null);

            /** WebSocketMessage heartbeat. */
            public heartbeat?: (qyh.dataplane.IHeartbeat|null);

            /** WebSocketMessage vrControl. */
            public vrControl?: (qyh.dataplane.IVRControlIntent|null);

            /** WebSocketMessage chassisVelocity. */
            public chassisVelocity?: (qyh.dataplane.IChassisVelocity|null);

            /** WebSocketMessage jointCommand. */
            public jointCommand?: (qyh.dataplane.IJointCommand|null);

            /** WebSocketMessage endEffectorCmd. */
            public endEffectorCmd?: (qyh.dataplane.IEndEffectorCommand|null);

            /** WebSocketMessage gripperCommand. */
            public gripperCommand?: (qyh.dataplane.IGripperCommand|null);

            /** WebSocketMessage navigationGoal. */
            public navigationGoal?: (qyh.dataplane.INavigationGoal|null);

            /** WebSocketMessage robotState. */
            public robotState?: (qyh.dataplane.IRobotState|null);

            /** WebSocketMessage jointState. */
            public jointState?: (qyh.dataplane.IJointState|null);

            /** WebSocketMessage armState. */
            public armState?: (qyh.dataplane.IArmState|null);

            /** WebSocketMessage chassisState. */
            public chassisState?: (qyh.dataplane.IChassisState|null);

            /** WebSocketMessage gripperState. */
            public gripperState?: (qyh.dataplane.IGripperState|null);

            /** WebSocketMessage vrSystemState. */
            public vrSystemState?: (qyh.dataplane.IVRSystemState|null);

            /** WebSocketMessage taskState. */
            public taskState?: (qyh.dataplane.ITaskState|null);

            /** WebSocketMessage actuatorState. */
            public actuatorState?: (qyh.dataplane.IActuatorState|null);

            /** WebSocketMessage error. */
            public error?: (qyh.dataplane.IError|null);

            /** WebSocketMessage modeChanged. */
            public modeChanged?: (qyh.dataplane.IModeChangedNotification|null);

            /** WebSocketMessage controlChanged. */
            public controlChanged?: (qyh.dataplane.IControlChangedNotification|null);

            /** WebSocketMessage emergencyStop. */
            public emergencyStop?: (qyh.dataplane.IEmergencyStopNotification|null);

            /** WebSocketMessage payload. */
            public payload?: ("authRequest"|"authResponse"|"subscribe"|"unsubscribe"|"heartbeat"|"vrControl"|"chassisVelocity"|"jointCommand"|"endEffectorCmd"|"gripperCommand"|"navigationGoal"|"robotState"|"jointState"|"armState"|"chassisState"|"gripperState"|"vrSystemState"|"taskState"|"actuatorState"|"error"|"modeChanged"|"controlChanged"|"emergencyStop");

            /**
             * Creates a new WebSocketMessage instance using the specified properties.
             * @param [properties] Properties to set
             * @returns WebSocketMessage instance
             */
            public static create(properties?: qyh.dataplane.IWebSocketMessage): qyh.dataplane.WebSocketMessage;

            /**
             * Encodes the specified WebSocketMessage message. Does not implicitly {@link qyh.dataplane.WebSocketMessage.verify|verify} messages.
             * @param message WebSocketMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: qyh.dataplane.IWebSocketMessage, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified WebSocketMessage message, length delimited. Does not implicitly {@link qyh.dataplane.WebSocketMessage.verify|verify} messages.
             * @param message WebSocketMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: qyh.dataplane.IWebSocketMessage, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a WebSocketMessage message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns WebSocketMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qyh.dataplane.WebSocketMessage;

            /**
             * Decodes a WebSocketMessage message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns WebSocketMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qyh.dataplane.WebSocketMessage;

            /**
             * Verifies a WebSocketMessage message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a WebSocketMessage message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns WebSocketMessage
             */
            public static fromObject(object: { [k: string]: any }): qyh.dataplane.WebSocketMessage;

            /**
             * Creates a plain object from a WebSocketMessage message. Also converts values to other types if specified.
             * @param message WebSocketMessage
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: qyh.dataplane.WebSocketMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this WebSocketMessage to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for WebSocketMessage
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a ModeChangedNotification. */
        interface IModeChangedNotification {

            /** ModeChangedNotification header */
            header?: (qyh.dataplane.IHeader|null);

            /** ModeChangedNotification oldMode */
            oldMode?: (qyh.dataplane.RobotMode|null);

            /** ModeChangedNotification newMode */
            newMode?: (qyh.dataplane.RobotMode|null);

            /** ModeChangedNotification reason */
            reason?: (string|null);
        }

        /** Represents a ModeChangedNotification. */
        class ModeChangedNotification implements IModeChangedNotification {

            /**
             * Constructs a new ModeChangedNotification.
             * @param [properties] Properties to set
             */
            constructor(properties?: qyh.dataplane.IModeChangedNotification);

            /** ModeChangedNotification header. */
            public header?: (qyh.dataplane.IHeader|null);

            /** ModeChangedNotification oldMode. */
            public oldMode: qyh.dataplane.RobotMode;

            /** ModeChangedNotification newMode. */
            public newMode: qyh.dataplane.RobotMode;

            /** ModeChangedNotification reason. */
            public reason: string;

            /**
             * Creates a new ModeChangedNotification instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ModeChangedNotification instance
             */
            public static create(properties?: qyh.dataplane.IModeChangedNotification): qyh.dataplane.ModeChangedNotification;

            /**
             * Encodes the specified ModeChangedNotification message. Does not implicitly {@link qyh.dataplane.ModeChangedNotification.verify|verify} messages.
             * @param message ModeChangedNotification message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: qyh.dataplane.IModeChangedNotification, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ModeChangedNotification message, length delimited. Does not implicitly {@link qyh.dataplane.ModeChangedNotification.verify|verify} messages.
             * @param message ModeChangedNotification message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: qyh.dataplane.IModeChangedNotification, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ModeChangedNotification message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ModeChangedNotification
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qyh.dataplane.ModeChangedNotification;

            /**
             * Decodes a ModeChangedNotification message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ModeChangedNotification
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qyh.dataplane.ModeChangedNotification;

            /**
             * Verifies a ModeChangedNotification message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ModeChangedNotification message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ModeChangedNotification
             */
            public static fromObject(object: { [k: string]: any }): qyh.dataplane.ModeChangedNotification;

            /**
             * Creates a plain object from a ModeChangedNotification message. Also converts values to other types if specified.
             * @param message ModeChangedNotification
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: qyh.dataplane.ModeChangedNotification, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ModeChangedNotification to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ModeChangedNotification
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a ControlChangedNotification. */
        interface IControlChangedNotification {

            /** ControlChangedNotification header */
            header?: (qyh.dataplane.IHeader|null);

            /** ControlChangedNotification controlHeld */
            controlHeld?: (boolean|null);

            /** ControlChangedNotification holderUsername */
            holderUsername?: (string|null);

            /** ControlChangedNotification holderUserId */
            holderUserId?: (number|Long|null);

            /** ControlChangedNotification changeReason */
            changeReason?: (string|null);
        }

        /** Represents a ControlChangedNotification. */
        class ControlChangedNotification implements IControlChangedNotification {

            /**
             * Constructs a new ControlChangedNotification.
             * @param [properties] Properties to set
             */
            constructor(properties?: qyh.dataplane.IControlChangedNotification);

            /** ControlChangedNotification header. */
            public header?: (qyh.dataplane.IHeader|null);

            /** ControlChangedNotification controlHeld. */
            public controlHeld: boolean;

            /** ControlChangedNotification holderUsername. */
            public holderUsername: string;

            /** ControlChangedNotification holderUserId. */
            public holderUserId: (number|Long);

            /** ControlChangedNotification changeReason. */
            public changeReason: string;

            /**
             * Creates a new ControlChangedNotification instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ControlChangedNotification instance
             */
            public static create(properties?: qyh.dataplane.IControlChangedNotification): qyh.dataplane.ControlChangedNotification;

            /**
             * Encodes the specified ControlChangedNotification message. Does not implicitly {@link qyh.dataplane.ControlChangedNotification.verify|verify} messages.
             * @param message ControlChangedNotification message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: qyh.dataplane.IControlChangedNotification, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ControlChangedNotification message, length delimited. Does not implicitly {@link qyh.dataplane.ControlChangedNotification.verify|verify} messages.
             * @param message ControlChangedNotification message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: qyh.dataplane.IControlChangedNotification, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ControlChangedNotification message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ControlChangedNotification
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qyh.dataplane.ControlChangedNotification;

            /**
             * Decodes a ControlChangedNotification message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ControlChangedNotification
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qyh.dataplane.ControlChangedNotification;

            /**
             * Verifies a ControlChangedNotification message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ControlChangedNotification message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ControlChangedNotification
             */
            public static fromObject(object: { [k: string]: any }): qyh.dataplane.ControlChangedNotification;

            /**
             * Creates a plain object from a ControlChangedNotification message. Also converts values to other types if specified.
             * @param message ControlChangedNotification
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: qyh.dataplane.ControlChangedNotification, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ControlChangedNotification to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ControlChangedNotification
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of an EmergencyStopNotification. */
        interface IEmergencyStopNotification {

            /** EmergencyStopNotification header */
            header?: (qyh.dataplane.IHeader|null);

            /** EmergencyStopNotification active */
            active?: (boolean|null);

            /** EmergencyStopNotification source */
            source?: (string|null);

            /** EmergencyStopNotification reason */
            reason?: (string|null);
        }

        /** Represents an EmergencyStopNotification. */
        class EmergencyStopNotification implements IEmergencyStopNotification {

            /**
             * Constructs a new EmergencyStopNotification.
             * @param [properties] Properties to set
             */
            constructor(properties?: qyh.dataplane.IEmergencyStopNotification);

            /** EmergencyStopNotification header. */
            public header?: (qyh.dataplane.IHeader|null);

            /** EmergencyStopNotification active. */
            public active: boolean;

            /** EmergencyStopNotification source. */
            public source: string;

            /** EmergencyStopNotification reason. */
            public reason: string;

            /**
             * Creates a new EmergencyStopNotification instance using the specified properties.
             * @param [properties] Properties to set
             * @returns EmergencyStopNotification instance
             */
            public static create(properties?: qyh.dataplane.IEmergencyStopNotification): qyh.dataplane.EmergencyStopNotification;

            /**
             * Encodes the specified EmergencyStopNotification message. Does not implicitly {@link qyh.dataplane.EmergencyStopNotification.verify|verify} messages.
             * @param message EmergencyStopNotification message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: qyh.dataplane.IEmergencyStopNotification, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified EmergencyStopNotification message, length delimited. Does not implicitly {@link qyh.dataplane.EmergencyStopNotification.verify|verify} messages.
             * @param message EmergencyStopNotification message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: qyh.dataplane.IEmergencyStopNotification, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an EmergencyStopNotification message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns EmergencyStopNotification
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qyh.dataplane.EmergencyStopNotification;

            /**
             * Decodes an EmergencyStopNotification message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns EmergencyStopNotification
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qyh.dataplane.EmergencyStopNotification;

            /**
             * Verifies an EmergencyStopNotification message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an EmergencyStopNotification message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns EmergencyStopNotification
             */
            public static fromObject(object: { [k: string]: any }): qyh.dataplane.EmergencyStopNotification;

            /**
             * Creates a plain object from an EmergencyStopNotification message. Also converts values to other types if specified.
             * @param message EmergencyStopNotification
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: qyh.dataplane.EmergencyStopNotification, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this EmergencyStopNotification to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for EmergencyStopNotification
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }
}
