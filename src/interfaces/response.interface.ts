import IUser from "./user.interface"

export default interface IResponse{
    ok: boolean,
    message: string
    response: any,
    code: number,
    user?: any,
    token?: string
}