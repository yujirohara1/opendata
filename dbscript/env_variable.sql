drop table env_variable;

CREATE TABLE env_variable (
    pid    integer not null,
    key    character varying(100) not null,
    code   character varying(100) not null,
    value  character varying(100) 
);


ALTER TABLE ONLY env_variable
    ADD CONSTRAINT env_variable_prkey PRIMARY KEY (
       pid,
       key   ,
       code 
    );



insert into env_variable values(606,'REDMINE_URL_KEY','0','REDMINE_URL_M');
insert into env_variable values(1,  'REDMINE_URL_KEY','0','REDMINE_URL_S');
