-- drop table issue_subjects;

CREATE TABLE issue_subjects (
    project_id   character varying(100) not null,
    issue_id     integer not null,
    issue_subject character varying(100) not null,
    start_date    date,
    finished_date    date,
    assigned_to     integer not null,
    status     integer not null,
    updated_on    timestamp,
    customer_id     character varying(100) not null
);



ALTER TABLE issue_subjects DROP CONSTRAINT issue_subjects_prkey;

ALTER TABLE ONLY issue_subjects
    ADD CONSTRAINT issue_subjects_prkey PRIMARY KEY (
       project_id,
       issue_id   
    );



create index idx1_issue_subjects on issue_subjects (project_id, assigned_to);
create index idx2_issue_subjects on issue_subjects (project_id, customer_id);



ALTER TABLE テーブル名 ADD COLUMN カラム名 データ型;


alter table issue_subjects add column enter character varying(10) null;
