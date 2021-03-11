

export function Auth(authMethod) {
  return function(target, key, descriptor) {

    const original = descriptor.value

    descriptor.value = function (...args) {

      const scope = args.pop()

      const [req, res, next ] = args

      if(!authMethod(req.scopes, scope)) {
        throw new Error("UNAUTHORIZED")
      }

      const result = original.apply(this, [req, res, next])
      return result

    }
  }
}

export function Scope(scope) {
  return function(target, key, descriptor) {
    if (!key) {
      return class Wrapper extends target {
        scopes = [scope]
        getScopes() {
          return this.scopes
        }
      }
    }

    const original = descriptor.value

    descriptor.value = function (...args) {

      const result = original.apply(this, [...args, `${this.scopes}:${scope}`])
      return result
    }
  }
}
