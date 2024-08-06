import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
@Catch()
export class HttpExceptionsFilter implements ExceptionFilter {
    constructor() {}
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        // Default code = 500, msg error = internal server error
        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'SERVER_ERROR';

        if (exception instanceof HttpException) {
            statusCode = exception.getStatus();
            message = this.message(statusCode, exception.getResponse());
        }
        if ( statusCode == 200){
            response.status(statusCode).json({"data":exception.getResponse(), code: statusCode, message: message,"service":"user-service" });
        }else{
            response.status(statusCode).json({"data":'{}', code: statusCode, message: message,"service":"user-service" });
        }

    }
    message(code: HttpStatus, message: any) {
        const errorMessage = message?.message;

        switch (code) {
            case HttpStatus.UNAUTHORIZED:
                if (errorMessage === 'AUTHORIZE_OTP_FAILED' || errorMessage === 'LOGIN_FAILED' || errorMessage === 'PASSWORD_INCORRECT') break;
                message = 'Phiên đăng nhập hết hạn';
                break;
            case HttpStatus.NOT_FOUND:
                message = 'Dữ liêu không hợp lệ hoặc không đúng!';
                break;
            case HttpStatus.INTERNAL_SERVER_ERROR:
                message = message?.message || '';
                break
            case HttpStatus.FORBIDDEN:
                message = 'Bạn không có quyền đăng nhập!';
            case HttpStatus.OK:
                message = 'Thành Công!';
                break;
            default:
                console.log('Error code : ', code, ' | msg error origin : ', message?.message);
                break
        }
        return message;
    }
}
export interface statusOk {
    "data":any,
    "code":200,
    "message":"Thành Công",
    "service":"user-service"
}
