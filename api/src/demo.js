const gql = require('graphql-tag');
const { ApolloServer } = require('apollo-server');

const typeDefs = gql`
 union Footwear = Sneaker | Boots
  type User {
    email: String!
    avatar: String!
    shoes: [Shoe]!
  }

  enum Brand {
    NIKE
    ADIDAS
    PUMA
    WOODLAND
  }

  interface Shoe {
    brand: Brand
    size: Int
    user: User
  }

  type Sneaker implements Shoe {
    brand: Brand
    size: Int
    color: String
    user: User
  }

  type Boots implements Shoe {
    brand: Brand
    size: Int
    ankleUp: Boolean
    user: User
  }

  input shoesInput {
    brand: Brand
    size: Int
  }

  type Query {
    me: User!
    shoes(input: shoesInput): [Shoe]!
  }
`;

const USER = {
  email: "vineetpanwar027@gmail.com",
  avatar: "",
  shoes: [],
};

const SHOES = [
  {
    brand: "NIKE",
    size: 24,
    color: "pink",
  },
  {
    brand: "WOODLAND",
    size: 13,
    ankleUp: true,
  },
];

const resolvers = {
  Footwear: {
    __resolveType(shoe) {
      if (shoe.color) {
        return "Sneaker";
      }
      return "Boots";
    },
  },
  Shoe: {
    __resolveType(shoe) {
      if (shoe.color) {
        return "Sneaker";
      }
      return "Boots";
    },
  },
  Sneaker: {
    user(shoe) {
      return USER
    }
  },
  Boots:{
    user(shoe) {
      return USER
    }
  },
  User: {
    shoes(){
      return SHOES
    }
  },
  Query: {
    me() {
      return USER
    },
    shoes() {
      return SHOES;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen(4000).then(curr => console.log('runnning on port 4000'))

