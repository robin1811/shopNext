CREATE TABLE "two_factor_tokens" (
	"id" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	"email" text NOT NULL,
	"userID" text,
	CONSTRAINT "two_factor_tokens_id_token_pk" PRIMARY KEY("id","token")
);
--> statement-breakpoint
ALTER TABLE "two_factor_tokens" ADD CONSTRAINT "two_factor_tokens_userID_user_id_fk" FOREIGN KEY ("userID") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;