//import prisma client to connect to data base
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const deleteUser = async (userId) => {
  //converting id to an INT
  const userIdInt = parseInt(userId);

  //making sure the user ID is in database
  const userToDelete = await prisma.user_info.findUnique({
    where: { user_id: userIdInt },
  });

  //if no ID throw error
  if (!userToDelete) {
    throw new Error("User not found.");
  }

  //delete the user from DB
  await prisma.user_info.delete({
    where: { user_id: userIdInt },
  });

  await prisma.user_login.delete({
    where: {
      id: userIdInt,
    },
  });

  return deleteUser;
};

module.exports = {
  deleteUser,
};
