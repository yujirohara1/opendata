drop table data_a;

create table data_a (
    file_key varchar(100),
    sheet_name varchar(100),
    row_id int,
    col_id integer,
    col_key varchar(3),
    value_char varchar(100),
    value_num int,
    value_date date,
    info varchar(100)
);


-- select * from data_a;

ALTER TABLE data_a DROP CONSTRAINT data_a_prkey;

ALTER TABLE ONLY data_a
    ADD CONSTRAINT data_a_prkey PRIMARY KEY (
       file_key,
       sheet_name,
       row_id,
       col_id   
    );



-- create index idx1_data_a on data_a (project_id, assigned_to);
-- create index idx2_data_a on data_a (project_id, customer_id);
