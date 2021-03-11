const { Scope, Auth } = require("./decorators")

function authMethod (userScopes, requiredScopes) {
  console.log(userScopes, requiredScopes)
  return userScopes.includes(requiredScopes)
}

@Scope('import')
class IndexController {

  @Scope('get')
  @Auth(authMethod)
  get(req, res) {
    return 'ok'
  }
}


const controller = new IndexController()

const req = {
  scopes: ['import:get', 'import:save']
}

console.log(controller.get(req, {}))
