/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your scheama
 */

module.exports = {
  User: {
    pets(user, _, ctx){
      return ctx.models.Pet.findMany();
    }
  },
  Pet: {
    user(pet, _,ctx){
      return ctx.models.User.findOne();
    }
  },
  Query: {
    pets(_, {input}, context) {
      console.dir(input)
      if(input) return context.models.Pet.findMany( input );
      return context.models.Pet.findMany();
    
  },
  pet(_, {input},context) {
    return context.models.Pet.findOne( input)
  }
},
Mutation: {
  pet(_, {input}, context) {
    return context.models.Pet.create(input)
  }
},
}

