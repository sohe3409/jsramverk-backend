const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

const UserType = require("./users.js");

const users = require("../src/server.js");

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        user: {
            type: UserType,
            description: 'A single user',
            args: {
                email: { type: GraphQLString }
            },
            resolve: async function(parent, args) {
                let userArray = await users.getDocs();

                return userArray.find(user => user.email === args.email);
            }
        },
        users: {
            type: GraphQLList(UserType),
            description: 'List of all users',
            resolve: async function() {
                return await users.getDocs();
            }
        },
        docs: {
            type: GraphQLList(DType),
            description: 'List of all documents',
            resolve: async function() {
                return await users.getAll();
            }
        }
    })
});

const DType = new GraphQLObjectType({
    name: 'D',
    description: 'This represents a document',
    fields: {
        _id: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLNonNull(GraphQLString) },
        content: { type: GraphQLString },
        allowed_users: { type: GraphQLNonNull(GraphQLList(GraphQLString)) },
    }
});



module.exports = RootQueryType;
