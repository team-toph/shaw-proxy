CREATE KEYSPACE IF NOT EXISTS imilar WITH replication = {'class': 'NetworkTopologyStrategy', 'replication_factor': 1} ;
DROP TABLE IF EXISTS similar.db;
CREATE TABLE similar.db (id int PRIMARY KEY, name ascii, img ascii, rating bigint, price bigint, good boolean);