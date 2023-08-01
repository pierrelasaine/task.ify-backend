\echo 'Delete and recreate db?'
\prompt 'Return for yes or control-C to cancel > ' foo
DROP DATABASE IF EXISTS taskify;
CREATE DATABASE taskify;
\connect taskify;
\i taskify-schema.sql