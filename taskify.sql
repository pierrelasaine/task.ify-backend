\echo 'Delete and recreate db?'
\prompt 'Return for yes or control-C to cancel > ' foo
DROP DATABASE IF EXISTS taskify;
CREATE DATABASE taskify;
\connect taskify;
\i taskify-schema.sql

\echo 'Delete and recreate test db?'
\prompt 'Return for yes or control-C to cancel > ' foo
DROP DATABASE IF EXISTS taskify_test;
CREATE DATABASE taskify_test;
\connect taskify_test;
\i taskify-schema.sql
