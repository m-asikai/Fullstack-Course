// let authors = [
//   {
//     name: "Robert Martin",
//     id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//     born: 1952,
//   },
//   {
//     name: "Martin Fowler",
//     id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//     born: 1963,
//   },
//   {
//     name: "Fyodor Dostoevsky",
//     id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//     born: 1821,
//   },
//   {
//     name: "Joshua Kerievsky", // birthyear not known
//     id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//   },
//   {
//     name: "Sandi Metz", // birthyear not known
//     id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//   },
// ];

// let books = [
//   {
//     title: "Clean Code",
//     published: 2008,
//     author: "Robert Martin",
//     id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//     genres: ["refactoring"],
//   },
//   {
//     title: "Agile software development",
//     published: 2002,
//     author: "Robert Martin",
//     id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//     genres: ["agile", "patterns", "design"],
//   },
//   {
//     title: "Refactoring, edition 2",
//     published: 2018,
//     author: "Martin Fowler",
//     id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//     genres: ["refactoring"],
//   },
//   {
//     title: "Refactoring to patterns",
//     published: 2008,
//     author: "Joshua Kerievsky",
//     id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//     genres: ["refactoring", "patterns"],
//   },
//   {
//     title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
//     published: 2012,
//     author: "Sandi Metz",
//     id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//     genres: ["refactoring", "design"],
//   },
//   {
//     title: "Crime and punishment",
//     published: 1866,
//     author: "Fyodor Dostoevsky",
//     id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//     genres: ["classic", "crime"],
//   },
//   {
//     title: "Demons",
//     published: 1872,
//     author: "Fyodor Dostoevsky",
//     id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//     genres: ["classic", "revolution"],
//   },
// ];

// const authorsBookCount = () => {
//   const modifiedAuthors = [];
//   authors.forEach((author) => {
//     let bookCount = 0;
//     books.forEach((book) => {
//       if (book.author === author.name) {
//         bookCount++;
//       }
//     });
//     modifiedAuthors.push({
//       name: author.name,
//       born: author.born,
//       bookCount,
//     });
//   });
//   return modifiedAuthors;
// };

const { ApolloServer } = require("@apollo/server");
require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const jwt = require("jsonwebtoken");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const express = require("express");
const cors = require("cors");
const http = require("http");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");

const resolvers = require("./resolvers");
const User = require("./userModel");
const typeDefs = require("./schema");
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected");
  })
  .catch((e) => {
    console.log(e.message);
  });

// const typeDefs = `
//   type User {
//     username: String!
//     favoriteGenre: String!
//     id: ID!
//   }

//   type Token {
//     value: String!
//   }

//   type Query {
//     me: User
//   }
//   type Book {
//     title: String!
//     author: Author!
//     published: Int!
//     genres: [String]
//     id: ID!
//   }
//   type Author {
//     name: String
//     born: Int
//     bookCount: Int
//   }
//   type Query {
//     bookCount: Int
//     authorCount: Int
//     allBooks(
//       genre: String
//       author: String
//     ): [Book]
//     allAuthors: [Author]
//   }
//   type Mutation {
//     addBook(
//         title: String!
//         author: String!
//         published: Int!
//         genres: [String]
//     ): Book
//     editAuthor(
//         name: String!
//         setBornTo: Int!
//     ): Author
//   createUser(
//     username: String!
//     favoriteGenre: String!
//   ): User
//   login(
//     username: String!
//     password: String!
//   ): Token
//   }
// `;

// const resolvers = {
//   Query: {
//     bookCount: () => Book.collection.countDocuments(),
//     authorCount: () => Author.collection.countDocuments(),
//     allBooks: async (root, args) => {
//       if (args.genre) {
//         return Book.find({ genres: args.genre });
//       }
//       if (args.author) {
//         const author = await Author.findOne({ name: args.author });
//         return Book.find({ author: author._id });
//       }
//       return Book.find({}).populate("author");
//     },
//     allAuthors: async () => {
//       return Author.find({});
//     },
//     me: (root, args, context) => {
//       return context.currentUser;
//     },
//   },
//   Mutation: {
//     addBook: async (root, args, context) => {
//       const user = context.currentUser;
//       if (!user) {
//         throw new GraphQLError("Unauthorized", {
//           extensions: {
//             message: "Unauthorized",
//           },
//         });
//       }
//       let author = await Author.findOne({ name: args.author });
//       if (!author) {
//         const newAuthor = new Author({
//           name: args.author,
//           born: null,
//         });
//         try {
//           author = await newAuthor.save();
//         } catch (e) {
//           throw new GraphQLError("Saving author failed", {
//             extensions: {
//               error: e,
//             },
//           });
//         }
//       }
//       const book = new Book({
//         title: args.title,
//         published: args.published,
//         author: author._id,
//         genres: args.genres ? args.genres : null,
//       });
//       try {
//         await book.save();
//         return book.populate("author");
//       } catch (e) {
//         throw new GraphQLError("Saving book failed", {
//           extensions: {
//             code: "BAD_INPUT",
//             error: e,
//           },
//         });
//       }
//     },
//     editAuthor: async (root, args, context) => {
//       const user = context.currentUser;
//       if (!user) {
//         throw new GraphQLError("Unauthorized", {
//           extensions: {
//             message: "Unauthorized",
//           },
//         });
//       }
//       const author = await Author.findOne({ name: args.name });
//       try {
//         author.born = args.setBornTo;
//         return author.save();
//       } catch (e) {
//         throw new GraphQLError("Author not found", {
//           extensions: {
//             error: e,
//           },
//         });
//       }
//     },
//     createUser: (root, args) => {
//       const user = new User({
//         username: args.username,
//         favoriteGenre: args.favoriteGenre,
//       });
//       try {
//         return user.save();
//       } catch (e) {
//         throw new GraphQLError("User creation failed", {
//           extensions: {
//             error: e,
//           },
//         });
//       }
//     },
//     login: async (root, args) => {
//       console.log(args);
//       const user = await User.findOne({ username: args.username });
//       if (!user || args.password !== "secret") {
//         throw new GraphQLError("Wrong credentials", {
//           message: "Wrong credentials",
//         });
//       }

//       const userForToken = {
//         username: user.username,
//         id: user._id,
//       };

//       return { value: jwt.sign(userForToken, process.env.SECRET) };
//     },
//   },
// };

const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const serverCleanUp = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanUp.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.startsWith("Bearer ")) {
          const token = jwt.verify(auth.substring(7), process.env.SECRET);
          const currentUser = await User.findById(token.id);
          return { currentUser };
        }
      },
    }),
  );

  const PORT = 4000;

  httpServer.listen(PORT, () => {
    console.log(`Server is now http://localhost:${PORT}`);
  });
};

start();
