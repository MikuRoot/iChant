import Realm from 'realm';
import {CHANT_SCHEMA, chantNameSchema, chantSchema} from "../database/allSchemas";
import {chants} from "../configs/SampleData";

const databaseOptions = {
  path: 'WePrayApp.realm',
  schema: [chantSchema, chantNameSchema],
  schemaVersion: 0
};

// functions
export const insertChant = chant => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then(realm => {
    realm.write(() => {
      realm.create(chantSchema, chant);
      resolve(chant)
    });
  }).catch((error) => reject(error))
});

export const getChant = chantName => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then(realm => {
    let chants = realm.objects(chantSchema.name);
    let requestedChant = chants.filtered('name CONTAINS "' + chantName + '"');
    resolve(requestedChant);
  }).catch((error) => reject(error))
});

export const getAllChant = () => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then(realm => {
    let chants = realm.objects(CHANT_SCHEMA);
    resolve(chants);
  }).catch((error) => reject(error))
});

export const seedingData = () => new Promise((resolve, reject) => {
  let list = chants;
  Realm.open(databaseOptions).then(realm => {
    realm.write(() => {
      list.map((item) => {
        const chant = realm.create(`${CHANT_SCHEMA}`, { name: item.name, content: item.content });
        resolve(chant)
      })
    })
  }).catch((error) => reject(error))
});
