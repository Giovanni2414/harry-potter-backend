/**
 * Interface representing the payload of a JSON Web Token (JWT).
 */
export interface JwtInfoInterface{
    /**
     * User ID associated with the JWT.
     */
    user_id: string,

    /**
     * Username associated with the JWT.
     */
    username: string,

    /**
     * Role associated with the JWT.
     */
    role: string,

    /**
     * Issued At timestamp indicating when the JWT was issued.
     */
    iat: number,

    /**
     * Expiration timestamp indicating when the JWT expires.
     */
    exp: number;
}