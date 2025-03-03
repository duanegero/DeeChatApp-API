-- AlterTable
CREATE SEQUENCE user_login_id_seq;
ALTER TABLE "user_login" ALTER COLUMN "id" SET DEFAULT nextval('user_login_id_seq');
ALTER SEQUENCE user_login_id_seq OWNED BY "user_login"."id";
