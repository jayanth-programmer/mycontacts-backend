const {constants} = require("../constants");
const errorhandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.status(statusCode).json({ title: "Bad Request", 
                    message: err.message, 
                    stackTrace: err.stack,
            });
            break;
        case constants.NOT_FOUND:
            res.status(statusCode).json({ title: "Not Found", 
                    message: err.message,
                    stackTrace: err.stack,
            });
            break;
        case constants.UNAUTHORIZED:
            res.status(statusCode).json({ title: "unauthorized", 
                    message: err.message,
                    stackTrace: err.stack,
            });
            break;
        case constants.FORBIDDEN:
            res.status(statusCode).json({ title: "forbidden", 
                    message: err.message,
                    stackTrace: err.stack,
            });
            break;
        case constants.SERVER_ERROR:
            res.status(statusCode).json({ title: "server error", 
                    message: err.message,
                    stackTrace: err.stack,
            });
            break;
            default:
                console.log("No Error, All Good");
            break;
    }
};
module.exports = errorhandler;