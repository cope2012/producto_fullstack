#!/bin/sh

set -e
# add extensions to databases
psql -d "$POSTGRES_DB" -U "$POSTGRES_USER" -c "CREATE EXTENSION IF NOT EXISTS postgis;"
psql -d "$POSTGRES_DB" -U "$POSTGRES_USER" -c "
CREATE TABLE IF NOT EXISTS store
(
  id serial PRIMARY KEY,
  the_geom geometry,
  cartodb_id int,
  type varchar,
  latitude double precision,
  longitude double precision,
  color varchar
  CONSTRAINT enforce_dims_the_geom CHECK (st_ndims(the_geom) = 2),
  CONSTRAINT enforce_geotype_geom CHECK (geometrytype(the_geom) = 'POINT'::text OR the_geom IS NULL),
  CONSTRAINT enforce_srid_the_geom CHECK (st_srid(the_geom) = 4326)
);
"

psql -d "$POSTGRES_DB" -U "$POSTGRES_USER" -c "
copy store(the_geom, cartodb_id, type, latitude, longitude, color) FROM '/stores.csv' DELIMITERS ',' CSV HEADER;"
