import { Migration } from '@mikro-orm/migrations';

export class Migration20220707063926 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "plan_item" alter column "plan_id" type int using ("plan_id"::int);');
    this.addSql('alter table "plan_item" alter column "plan_id" set not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "plan_item" alter column "plan_id" type int using ("plan_id"::int);');
    this.addSql('alter table "plan_item" alter column "plan_id" drop not null;');
  }

}
