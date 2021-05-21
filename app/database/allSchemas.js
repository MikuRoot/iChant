import Realm from 'realm';

export const CHANT_SCHEMA = "chantSchema";
export const CHANTNAME_SCHEMA = "chantNameSchema";

// define models and their properties
export const chantSchema = {
  name: CHANT_SCHEMA,
  primaryKey: 'name',
  properties: {
    name: { type: 'string' },
    content: { type: 'string' },
  }
};

export const chantNameSchema = {
  name: CHANTNAME_SCHEMA,
  primaryKey: 'name',
  properties: {
    name: { type: 'string', indexed: true },
    image: { type: 'string' }
  }
};


