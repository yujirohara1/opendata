drop table duty_members;

CREATE TABLE duty_members (
    project_id   character varying(100) not null,
    duty_date    date,
    member_id     integer not null
);


ALTER TABLE ONLY duty_members
    ADD CONSTRAINT duty_members_prkey PRIMARY KEY (
       project_id,
       duty_date,
       member_id   
    );


