drop table daily_issues;

CREATE TABLE daily_issues (
    project_id   character varying(100) not null,
    measure_date date not null,
    status_id    integer not null,
    number_of_count integer not null
);


ALTER TABLE ONLY daily_issues
    ADD CONSTRAINT daily_issues_prkey PRIMARY KEY (
       project_id   ,
       measure_date ,
       status_id   
    );

