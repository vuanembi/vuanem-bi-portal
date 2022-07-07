import { Migration } from '@mikro-orm/migrations';

export class Migration20220707040751 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop table if exists "mikro_orm_migrations" cascade;');

    this.addSql('drop table if exists "typeorm_metadata" cascade;');

    this.addSql('alter table "plan" drop constraint "FK_73add1441bf2a1793d9e114171d";');

    this.addSql('alter table "plan_item" drop constraint "FK_04b7fb4b4048f6fbe4ed1f06a0f";');

    this.addSql('alter table "vendor" alter column "created_at" drop default;');
    this.addSql('alter table "vendor" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "vendor" alter column "updated_at" drop default;');
    this.addSql('alter table "vendor" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');

    this.addSql('alter table "plan" alter column "created_at" drop default;');
    this.addSql('alter table "plan" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "plan" alter column "updated_at" drop default;');
    this.addSql('alter table "plan" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "plan" alter column "vendor_id" type int using ("vendor_id"::int);');
    this.addSql('alter table "plan" alter column "vendor_id" set not null;');
    this.addSql('alter table "plan" alter column "status" drop default;');
    this.addSql('alter table "plan" alter column "status" type text using ("status"::text);');
    this.addSql('alter table "plan" add constraint "plan_status_check" check ("status" in (\'draft\', \'forecasting\', \'forecasted\', \'reviewed\'));');
    this.addSql('alter table "plan" add constraint "plan_vendor_id_foreign" foreign key ("vendor_id") references "vendor" ("id") on update cascade;');

    this.addSql('alter table "plan_item" alter column "created_at" drop default;');
    this.addSql('alter table "plan_item" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "plan_item" alter column "updated_at" drop default;');
    this.addSql('alter table "plan_item" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "plan_item" alter column "start_of_week" type timestamptz(0) using ("start_of_week"::timestamptz(0));');
    this.addSql('alter table "plan_item" alter column "avg_item_discount" type float using ("avg_item_discount"::float);');
    this.addSql('alter table "plan_item" alter column "avg_order_discount" type float using ("avg_order_discount"::float);');
    this.addSql('alter table "plan_item" alter column "discount" type float using ("discount"::float);');
    this.addSql('alter table "plan_item" alter column "plan_id" type int using ("plan_id"::int);');
    this.addSql('alter table "plan_item" alter column "plan_id" set not null;');
    this.addSql('drop index "IDX_564ac28c376d50dba54dc1f3aa";');
    this.addSql('drop index "IDX_5bb2880cff0951dd0f12c8bdc2";');
    this.addSql('drop index "IDX_c97d158b20b1a0744dad58e72d";');
    this.addSql('alter table "plan_item" add constraint "plan_item_plan_id_foreign" foreign key ("plan_id") references "plan" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "mikro_orm_migrations" ("id" serial primary key, "name" varchar null default null, "executed_at" timestamptz null default CURRENT_TIMESTAMP);');

    this.addSql('create table "typeorm_metadata" ("type" varchar not null default null, "database" varchar null default null, "schema" varchar null default null, "table" varchar null default null, "name" varchar null default null, "value" text null default null);');

    this.addSql('alter table "plan" drop constraint if exists "plan_status_check";');

    this.addSql('alter table "plan" drop constraint "plan_vendor_id_foreign";');

    this.addSql('alter table "plan_item" drop constraint "plan_item_plan_id_foreign";');

    this.addSql('alter table "plan" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "plan" alter column "created_at" set default now();');
    this.addSql('alter table "plan" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "plan" alter column "updated_at" set default now();');
    this.addSql('alter table "plan" alter column "status" type plan_status_enum using ("status"::plan_status_enum);');
    this.addSql('alter table "plan" alter column "status" set default \'draft\';');
    this.addSql('alter table "plan" alter column "vendor_id" type int4 using ("vendor_id"::int4);');
    this.addSql('alter table "plan" alter column "vendor_id" drop not null;');
    this.addSql('alter table "plan" add constraint "FK_73add1441bf2a1793d9e114171d" foreign key ("vendor_id") references "vendor" ("id") on update no action on delete no action;');

    this.addSql('alter table "plan_item" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "plan_item" alter column "created_at" set default now();');
    this.addSql('alter table "plan_item" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "plan_item" alter column "updated_at" set default now();');
    this.addSql('alter table "plan_item" alter column "start_of_week" type timestamp using ("start_of_week"::timestamp);');
    this.addSql('alter table "plan_item" alter column "avg_item_discount" type float8 using ("avg_item_discount"::float8);');
    this.addSql('alter table "plan_item" alter column "avg_order_discount" type float8 using ("avg_order_discount"::float8);');
    this.addSql('alter table "plan_item" alter column "discount" type float8 using ("discount"::float8);');
    this.addSql('alter table "plan_item" alter column "plan_id" type int4 using ("plan_id"::int4);');
    this.addSql('alter table "plan_item" alter column "plan_id" drop not null;');
    this.addSql('alter table "plan_item" add constraint "FK_04b7fb4b4048f6fbe4ed1f06a0f" foreign key ("plan_id") references "plan" ("id") on update no action on delete cascade;');
    this.addSql('create index "IDX_564ac28c376d50dba54dc1f3aa" on "plan_item" ("sku");');
    this.addSql('create index "IDX_5bb2880cff0951dd0f12c8bdc2" on "plan_item" ("start_of_week");');
    this.addSql('create index "IDX_c97d158b20b1a0744dad58e72d" on "plan_item" ("region");');

    this.addSql('alter table "vendor" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "vendor" alter column "created_at" set default now();');
    this.addSql('alter table "vendor" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "vendor" alter column "updated_at" set default now();');
  }

}
