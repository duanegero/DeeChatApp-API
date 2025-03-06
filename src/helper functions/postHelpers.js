//import prisma client to connect to data base
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//defining a async helper function with passed in variables
const postNewUser = async (
  first_name,
  last_name,
  email,
  age,
  username,
  password
) => {
  //converting the age in a Int type
  const ageInt = parseInt(age, 10);

  try {
    const existingUser = await prisma.user_info.findFirst({
      where: {
        OR: [{ email }, { user_login: { is: { username: username } } }],
      },
      include: {
        user_login: true,
      },
    });

    //if existing user found
    if (existingUser) {
      // if email already exist return error
      if (existingUser.email === email) {
        return { error: "EMAIL_ALREADY_EXISTS" };
      }

      //if username already exist return error
      if (
        existingUser.user_login &&
        existingUser.user_login?.username === username
      ) {
        return { error: "USERNAME_ALREADY_EXISTS" };
      }
    } else {
      //variable to handle prisma query
      const newUser = await prisma.user_info.create({
        data: {
          first_name: first_name,
          last_name: last_name,
          email: email,
          age: ageInt,
          user_login: {
            create: {
              username: username,
              password: password,
            },
          },
        },
      });

      //log message id successful
      console.log("New user created:", newUser);
      //return result to use else where
      return { message: "New user created", newUser };
    }
  } catch (error) {
    //catch and log if any errors
    console.error("Error creating new user:", error);
    throw new Error("An error occurred while creating new user");
  }
};

const postLoginCredentials = async (username) => {
  const checkUser = await prisma.user_login.findUnique({
    where: {
      username: username,
    },
  });

  return checkUser;
};

//export function to use else where in app
module.exports = {
  postNewUser,
  postLoginCredentials,
};
