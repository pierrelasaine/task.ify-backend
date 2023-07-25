\echo 'Delete and recreate db?'
\prompt 'Return for yes or control-C to cancel > ' foo
DROP DATABASE IF EXISTS taskify;
CREATE DATABASE taskify;
\connect taskify;
\i taskify-schema.sql

\echo 'Delete and recreate test db?'
\prompt 'Return for yes or control-C to cancel > ' foo
DROP DATABASE IF EXISTS taskify-test;
CREATE DATABASE taskify-test;
\connect taskify-test;
\i taskify-schema.sql
