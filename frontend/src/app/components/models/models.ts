export interface Employee{
    id : number;
    firstName : string;
    lastName : string;
    email : string;
    profileUrl : string;
}

export interface ErrorMessage {
    statusCode: number;
    timeStamp: string;
    message: string;
    description: string;
}