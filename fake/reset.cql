CREATE KEYSPACE IF NOT EXISTS similar WITH replication = {'class': 'NetworkTopologyStrategy'} ;
DROP TABLE IF EXISTS similar.db;
CREATE TABLE similar.db (id int PRIMARY KEY, name ascii, img ascii, rating bigint, price bigint, good boolean);