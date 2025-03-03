//require and create a variable for prisma to send requests to database
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const updateUsername = async (username, newUsername) => {
  const updatedUsername = await prisma.user_login.update({
    where: { username: username },
    data: {
      username: newUsername,
    },
    select: {
      username: true,
    },
  });

  return updatedUsername;
};

const updateUser = async (userId, first_name, last_name, email, age) => {
  const userIdInt = parseInt(userId, 10);
  const userAgeInt = parseInt(age, 10);

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

  return updateUserDetails;
};

module.exports = {
  updateUsername,
  updateUser,
};
