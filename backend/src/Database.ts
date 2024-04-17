//Source code generated by AppGPT (www.appgpt.tech)

//Class to create tables and seed new database
import { DataSource } from 'typeorm';
import { DBConfiguration } from './Configuration';
import { SettingsEntity } from './db/Settings.entity';
//autogenerate imports based on resources
import { PlayersEntity } from './db/Players.entity';
import { LevelsEntity } from './db/Levels.entity';
import { ScoresEntity } from './db/Scores.entity';

export class Database {
  static dbConfiguration: DBConfiguration;
  public static ds: DataSource;

  static async Initialize(dbConfiguration: DBConfiguration) {
    Database.dbConfiguration = dbConfiguration;
    let dbConfig: any = dbConfiguration as any;
    //Autogenerate entities array from resource names

    dbConfig.entities = [
      SettingsEntity,
      PlayersEntity,
      LevelsEntity,
      ScoresEntity,
    ];
    Database.ds = new DataSource(dbConfig);
    await Database.ds.initialize();

    //TODO: Drop all tables

    await Database.Seed();
  }
  static async Seed() {
    let data: any = {
      Players: [
        { email: 'email 1', highScore: 1, level: 1, id: 83 },
        { email: 'email 2', highScore: 2, level: 2, id: 66 },
        { email: 'email 3', highScore: 3, level: 3, id: 91 },
        { email: 'email 4', highScore: 4, level: 4, id: 91 },
        { email: 'email 5', highScore: 5, level: 5, id: 95 },
      ],
      Levels: [
        {
          levelNumber: 1,
          difficulty: 'difficulty 1',
          unlockCondition: 'unlockCondition 1',
          powerUps: 'powerUps 1',
          upgradeTo: 'upgradeTo 1',
          id: 50,
        },
        {
          levelNumber: 2,
          difficulty: 'difficulty 2',
          unlockCondition: 'unlockCondition 2',
          powerUps: 'powerUps 2',
          upgradeTo: 'upgradeTo 2',
          id: 43,
        },
        {
          levelNumber: 3,
          difficulty: 'difficulty 3',
          unlockCondition: 'unlockCondition 3',
          powerUps: 'powerUps 3',
          upgradeTo: 'upgradeTo 3',
          id: 18,
        },
        {
          levelNumber: 4,
          difficulty: 'difficulty 4',
          unlockCondition: 'unlockCondition 4',
          powerUps: 'powerUps 4',
          upgradeTo: 'upgradeTo 4',
          id: 78,
        },
        {
          levelNumber: 5,
          difficulty: 'difficulty 5',
          unlockCondition: 'unlockCondition 5',
          powerUps: 'powerUps 5',
          upgradeTo: 'upgradeTo 5',
          id: 94,
        },
      ],
      Scores: [
        {
          playerID: 1,
          score: 1,
          level: 1,
          dateAchieved: '2025-03-14T01:37:37.576Z',
          id: 59,
        },
        {
          playerID: 2,
          score: 2,
          level: 2,
          dateAchieved: '2025-02-23T09:43:46.800Z',
          id: 22,
        },
        {
          playerID: 3,
          score: 3,
          level: 3,
          dateAchieved: '2024-10-28T19:09:52.697Z',
          id: 66,
        },
        {
          playerID: 4,
          score: 4,
          level: 4,
          dateAchieved: '2023-06-05T03:16:14.329Z',
          id: 77,
        },
        {
          playerID: 5,
          score: 5,
          level: 5,
          dateAchieved: '2024-07-04T09:22:05.090Z',
          id: 42,
        },
      ],
    };
    //Autogenerate multiple such calls ie for each resource and its data object
    let isSeeded = await this.IsSeeded();
    //if (!isSeeded) {
    //forcing app recreation
    if (true) {
      console.log('   Seeding database...');
      await this.SeedResource('PlayersEntity', data.Players);
      await this.SeedResource('LevelsEntity', data.Levels);
      await this.SeedResource('ScoresEntity', data.Scores);
      await this.SeedResource('SettingsEntity', {
        settingname: 'isSeeded',
        settingvalue: 'true',
      });
    } else {
      console.log('   Database seeded already!');
    }
  }
  static async IsSeeded() {
    const repo = Database.ds.getRepository('SettingsEntity');
    let rec: any = await repo.findOne({
      select: {
        settingname: true,
        settingvalue: true,
      },
      where: {
        settingname: 'isSeeded',
      },
    });
    if (rec && rec.settingvalue) return true;
    return false;
  }
  static async SeedResource(resourceName: any, resourceData: any) {
    const repo = Database.ds.getRepository(resourceName);
    //await repo.clear();
    console.log('   Seeding table ' + resourceName);
    await repo.upsert(resourceData, ['id']);
  }
}
