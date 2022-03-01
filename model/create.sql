CREATE DATABASE uniconsoft;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE prosses_type AS enum ('CREATED', 'IN_PROCESS', 'DONE');

CREATE TABLE roles(
    role_id uuid NOT NULL default uuid_generate_v4() PRIMARY KEY,
    role_name varchar(20) unique not null,
    role_date timestamp with time zone not null default current_timestamp,
    role_status boolean not null default true 
);

CREATE TABLE users(
    user_id uuid NOT NULL default uuid_generate_v4() PRIMARY KEY,
    user_name varchar(30) not null,
    user_username varchar(50) unique not null,
    user_password text not null,
    user_image text default null,
    user_date timestamp with time zone not null default current_timestamp,
    user_status boolean not null default true,
    user_role uuid not null,
    user_ref_admin uuid default null,
    CONSTRAINT fk_user_role
        FOREIGN KEY(user_role)
            REFERENCES roles(role_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_user_ref_admin
        FOREIGN KEY(user_ref_admin)
            REFERENCES users(user_id)
            ON DELETE CASCADE
);


CREATE TABLE organizations(
    org_id uuid NOT NULL default uuid_generate_v4() PRIMARY KEY,
    org_name varchar(100) not null,
    org_image text not null,
    org_date timestamp with time zone not null default current_timestamp,
    org_status boolean not null default true,
    org_admin uuid not null,
    CONSTRAINT fk_org_admin
        FOREIGN KEY(org_admin)
            REFERENCES users(user_id)
            ON DELETE CASCADE
);

CREATE TABLE org_users(
    org_user_id uuid NOT NULL default uuid_generate_v4() PRIMARY KEY,
    org_id uuid not null,
    user_id uuid not null,
    CONSTRAINT fk_org_id
        FOREIGN KEY(org_id)
            REFERENCES organizations(org_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_user_id
        FOREIGN KEY(user_id)
            REFERENCES users(user_id)
            ON DELETE CASCADE
);

CREATE TABLE projects(
    project_id uuid NOT NULL default uuid_generate_v4() PRIMARY KEY,
    project_name text not null,
    project_medias text[] not null,
    project_date timestamp with time zone not null default current_timestamp,
    project_status boolean not null default true,
    project_leader uuid not null,
    project_org uuid not null,
    CONSTRAINT fk_project_leader
        FOREIGN KEY(project_leader)
            REFERENCES users(user_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_project_org
        FOREIGN KEY(project_org)
            REFERENCES organizations(org_id)
            ON DELETE CASCADE
);

CREATE TABLE tasks(
    task_id uuid NOT NULL default uuid_generate_v4() PRIMARY KEY,
    task_name text not null,
    task_time int not null,
    task_date timestamp with time zone not null default current_timestamp,
    task_prosses_date timestamp with time zone default null,
    task_done_date timestamp with time zone default null,
    task_status boolean not null default true,
    task_status_prosses prosses_type default 'CREATED',
    task_project uuid not null,
    task_worker uuid not null,
    task_leader uuid not null,
    CONSTRAINT fk_task_project
        FOREIGN KEY(task_project)
            REFERENCES projects(project_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_task_worker
        FOREIGN KEY(task_worker)
            REFERENCES users(user_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_task_leader
        FOREIGN KEY(task_leader)
            REFERENCES users(user_id)
            ON DELETE CASCADE
);
