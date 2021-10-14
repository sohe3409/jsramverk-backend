const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');


const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'This represents a user',
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        docs: { type: new GraphQLList(DocType) }
    })
});

const DocType = new GraphQLObjectType({
  name: 'ProductionCompanies',
  description: 'This represents a document',
  fields: {
      name: { type: GraphQLNonNull(GraphQLString) },
      content: { type: GraphQLString },
      allowed_users: { type: GraphQLNonNull(GraphQLList(GraphQLString)) },
  }
});




module.exports = UserType;
