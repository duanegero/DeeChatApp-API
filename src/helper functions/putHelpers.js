//require and create a variable for prisma to send requests to database
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//defining an async function
const updateUsername = async (username, newUsername) => {
  try {
    //variable to handle prisma query to find username
    const user = await prisma.user_login.findUnique({
      where: { username: username },
    });

    //if no username found throw error
    if (!user) {
      throw new Error(`User ${username} not found. Cannot update username.`);
    }

    //variable to handle prisma query to see if username already in use
    const existingUsername = await prisma.user_login.findUnique({
      where: { username: newUsername },
    });

    //if email already in use return error
    if (existingUsername) {
      return { error: "USERNAME_ALREADY_EXISTS" };
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
    return { error: "An error occurred while updating username." };
  }
};

const updateUser = async (userId, first_name, last_name, age) => {
  //converting both numbers into Ints
  const userIdInt = parseInt(userId, 10);
  const userAgeInt = parseInt(age, 10);

  try {
    //variable to handle prisma query if user exists
    const user = await prisma.user_info.findUnique({
      where: { user_id: userIdInt },
    });

    //if no user found throw new error
    if (!user) {
      throw new Error(`User with ID ${userIdInt} not found.`);
    }

    //variable to handle prisma query that updates users info
    const updateUserDetails = await prisma.user_info.update({
      where: {
        user_id: userIdInt,
      },
      data: {
        first_name: first_name,
        last_name: last_name,
        age: userAgeInt,
        created_at: new Date(),
      },
    });
    //return results to use else where
    return updateUserDetails;
  } catch (error) {
    console.error("Error updating user details.", error.message);
    return { error: "An error occurred while updating user details." };
  }
};

const updateEmail = async (userId, newEmail) => {
  //converting ID to an Int
  const userIdInt = parseInt(userId, 10);
  try {
    //variable to handle prisma check for user
    const user = await prisma.user_info.findUnique({
      where: { user_id: userIdInt },
    });

    //if no user found throw new error
    if (!user) {
      throw new Error(`User ID ${userIdInt} not found. Cannot update email.`);
    }

    //variable to handle check if email is being used by someone else
    const existingEmail = await prisma.user_info.findUnique({
      where: { email: newEmail },
    });

    //if email already in use return error
    if (existingEmail) {
      return { error: "EMAIL_ALREADY_EXISTS" };
    }

    //variable to hande prisma query to update user email
    const updatedEmail = await prisma.user_info.update({
      where: { user_id: userIdInt },
      data: {
        email: newEmail,
      },
      select: { email: true },
    });
    //return to use else where
    return updatedEmail;
  } catch (error) {
    console.error("Error updating email.", error.message);
    return { error: "An error occurred while updating email." };
  }
};

//export functions to use else where
module.exports = {
  updateUsername,
  updateUser,
  updateEmail,
};
