import { Migration } from '@mikro-orm/migrations';

export class Migration20220707043620 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "plan_item" drop constraint "plan_item_plan_id_foreign";');

    this.addSql('alter table "plan_item" alter column "plan_id" type int using ("plan_id"::int);');
    this.addSql('alter table "plan_item" alter column "plan_id" drop not null;');
    this.addSql('alter table "plan_item" add constraint "plan_item_plan_id_foreign" foreign key ("plan_id") references "plan" ("id") on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "plan_item" drop constraint "plan_item_plan_id_foreign";');

    this.addSql('alter table "plan_item" alter column "plan_id" type int using ("plan_id"::int);');
    this.addSql('alter table "plan_item" alter column "plan_id" set not null;');
    this.addSql('alter table "plan_item" add constraint "plan_item_plan_id_foreign" foreign key ("plan_id") references "plan" ("id") on update cascade;');
  }

}
