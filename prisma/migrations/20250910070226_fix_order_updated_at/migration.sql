-- AlterTable
ALTER TABLE "public"."Order" DROP COLUMN "updateAt",
ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- 既存のレコードのupdatedAtを現在時刻に更新（既にDEFAULT値で設定されるので不要ですが、明示的に設定したい場合）
UPDATE "public"."Order" SET "updatedAt" = CURRENT_TIMESTAMP;