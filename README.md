# Adidas-User-Agent-Parser
Node.js / AngularJS to generate UA JSON
# Setup

###Install dependencies
1) `npm install`

2) cd into demo directory, `bower install`


###Run Node Server
1) In root directory, run `node main.js`

###Run HTTP Server
1) Install http-server if you have never done so:
`npm install http-server -g`

2) In another tab, run `http-server` in demo directory. 
* Note: You can also use Brackets' Live Preview option with index.html if you wish. (http://brackets.io/)

###Parsing
1) Copy a User Agent string and click the parse button.
* All results will be stored in the results table. 

###Custom Node Setup (For future projects)
1) Inject UA Parser
* `var uaParser = require('uas-parser');`
2) Create an endpoint in your Node server.
3) Make a post request with the UA string to this endpoint and call the parser
* e.g.: `var parsed = uaParser.parse(uastring);`
4) Handle responses etc. & send the parsed info
* Parsed info is returned as an object
