"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var AppError_1 = require("./AppError");
var http_status_codes_1 = require("http-status-codes");
var ErrorHandler = /** @class */ (function () {
    function ErrorHandler() {
    }
    ErrorHandler.prototype.isTrustedError = function (error) {
        if (error instanceof AppError_1.AppError) {
            return error.isOperational;
        }
        return false;
    };
    ErrorHandler.prototype.handleError = function (err, res) {
        if (err instanceof AppError_1.AppError && res) {
            this.handleTrustedError(err, res);
        }
        else {
            this.handleCriticalError(err, res);
        }
    };
    ErrorHandler.prototype.handleTrustedError = function (err, res) {
        res.status(err.httpCode).json({
            message: "error code:".concat(err.httpCode),
        });
    };
    ErrorHandler.prototype.handleCriticalError = function (err, res) {
        if (res) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Internal server error',
            });
        }
        console.log('Server error with: ', err);
        // process.exit(1)
    };
    return ErrorHandler;
}());
exports.errorHandler = new ErrorHandler();
//# sourceMappingURL=ErrorHandler.js.map