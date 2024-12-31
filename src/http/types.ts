export interface PromoterRegisterParams {
    username: string;
    password: string;
}

export interface PromoterRegisterResponse {
    code: number;
    message: string;
    data: {
        id: number;
        username: string;
        token: string;
    };
}
