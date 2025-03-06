//require and create a variable for prisma to send requests to database
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//defining an async function
const updateUsername = async (username, newUsername) => {
  try {
    const existingUsername = await prisma.user_login.findUnique({
      where: { username: username },
    });

    if (existingUsername) {
      return { error: "USERNAME_ALREADY_EXISTS" };
    }

    //variable to handle prisma query to find username
    const user = await prisma.user_login.findUnique({
      where: { username: username },
    });

    //if no username found throw error
    if (!user) {
      throw new Error(`User ${username} not found. Cannot update usernaem`);
    }

    //variable to handle prisma query to update username
    const updatedUsername = await prisma.user_login.update({
      where: { username: username },
      data: {
        username: newUsername,
      },
      select: {
        username: true,
      },
    });
    //return variable to use else where
    return updatedUsername;
  } catch (error) {
    //catach if any errors and log
    console.error("Error updating username", error.message);
    throw error;
  }
};

const updateUser = async (userId, first_name, last_name, email, age) => {
  //converting both numbers into Ints
  const userIdInt = parseInt(userId, 10);
  const userAgeInt = parseInt(age, 10);

  //variable to handle prisma query that updates users info
  const updateUserDetails = await prisma.user_info.update({
    where: {
      user_id: userIdInt,
    },
    data: {
      first_name: first_name,
      last_name: last_name,
      email: email,
      age: userAgeInt,
      created_at: new Date(),
    },
  });

  //return results to use else where
  return updateUserDetails;
};

//export functions to use else where
module.exports = {
  updateUsername,
  updateUser,
};
