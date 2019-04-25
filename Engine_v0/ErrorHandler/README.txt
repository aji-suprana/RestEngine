copy this to nodejs project.

required library to import with "npm install --save [libraryName]"

express //RESTAPI
mongoose //mongodb connection, parsing etc
body-parser //parsing cors error
morgan //debug logging


##########################################################
call userlogin.initialize([param])
param => express Object that is being used in other classes

const app = express();

const userLogin = require('./userlogin/userlogin');
userLogin.initialize(app);