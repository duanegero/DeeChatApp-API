//requiring prisma to sen queries to database
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//defining async helper function
const getUserDetails = async (userId) => {
  //converting user Id into a Int
  const userIdInt = parseInt(userId, 10);

  try {
    //variable handle prisma query
    const userInfo = await prisma.user_info.findUnique({
      where: {
        user_id: userIdInt,
      },
      select: {
        first_name: true,
        last_name: true,
        email: true,
        age: true,
        user_login: {
          select: {
            username: true,
          },
        },
      },
    });

    //if nothing returned from log
    if (!userInfo) {
      console.log("No user found.");
    }

    //return query results to use else where
    return userInfo;
  } catch (error) {
    //catch and log any errors if found
    console.error("Error fetching user data from database.", error);
    throw error;
  }
};

const getUserEmail = async (email) => {
  try {
    const userEmail = await prisma.user_info.findUnique({
      where: { email: email },
      select: {
        email: true,
        user_login: {
          select: { username: true },
        },
      },
    });
    if (!userEmail) {
      console.log("No Email address found.");
    }
    return userEmail;
  } catch (error) {
    //catch and log any errors if found
    console.error("Error fetching user data from database.", error);
    throw error;
  }
};

//export function to use in other places
module.exports = {
  getUserDetails,
  getUserEmail,
};
