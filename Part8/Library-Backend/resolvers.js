const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();
const jwt = require("jsonwebtoken");
const { GraphQLError } = require("graphql");

const Author = require("./authorModel");
const Book = require("./bookModel");
const User = require("./userModel");

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.genre) {
        return Book.find({ genres: args.genre });
      }
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        return Book.find({ author: author._id });
      }
      return Book.find({}).populate("author");
    },
    allAuthors: async () => {
      const authors = await Author.aggregate([
        {
          $lookup: {
            from: "books",
            localField: "_id",
            foreignField: "author",
            as: "books",
          },
        },
        {
          $addFields: {
            bookCount: { $size: "$books" },
          },
        },
        {
          $project: {
            books: 0,
          },
        },
      ]);

      return authors;
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const user = context.currentUser;
      if (!user) {
        throw new GraphQLError("Unauthorized", {
          extensions: {
            message: "Unauthorized",
          },
        });
      }
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        const newAuthor = new Author({
          name: args.author,
          born: null,
        });
        try {
          author = await newAuthor.save();
        } catch (e) {
          throw new GraphQLError("Saving author failed", {
            extensions: {
              error: e,
            },
          });
        }
      }
      const book = new Book({
        title: args.title,
        published: args.published,
        author: author._id,
        genres: args.genres ? args.genres : null,
      });

      try {
        await book.save();
      } catch (e) {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_INPUT",
            error: e,
          },
        });
      }

      pubsub.publish("BOOK_ADDED", { bookAdded: book });
      return book.populate("author");
    },
    editAuthor: async (root, args, context) => {
      const user = context.currentUser;
      if (!user) {
        throw new GraphQLError("Unauthorized", {
          extensions: {
            message: "Unauthorized",
          },
        });
      }
      const author = await Author.findOne({ name: args.name });
      try {
        author.born = args.setBornTo;
        return author.save();
      } catch (e) {
        throw new GraphQLError("Author not found", {
          extensions: {
            error: e,
          },
        });
      }
    },
    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });
      try {
        return user.save();
      } catch (e) {
        throw new GraphQLError("User creation failed", {
          extensions: {
            error: e,
          },
        });
      }
    },
    login: async (root, args) => {
      console.log(args);
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "secret") {
        throw new GraphQLError("Wrong credentials", {
          message: "Wrong credentials",
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => {
        return pubsub.asyncIterableIterator("BOOK_ADDED");
      },
    },
  },
};

module.exports = resolvers;
