from api.database import db, ma

## 実テーブル
class DataA(db.Model): 
    __tablename__ = "data_a"
    
    # row_id int,
    # col_id varchar(3),
    # value_char varchar(100),
    # value_num int,
    # value_date date,
    # info varchar(100)
    file_key      = db.Column(db.String(), primary_key=True) 
    sheet_idx     = db.Column(db.Integer, primary_key=True) 
    sheet_name    = db.Column(db.String(), primary_key=False) 
    row_id        = db.Column(db.Integer, primary_key=True) 
    col_id        = db.Column(db.Integer, primary_key=True) 
    col_key       = db.Column(db.String(), primary_key=False) 
    value_char    = db.Column(db.String(), primary_key=False) 
    value_num     = db.Column(db.Integer, primary_key=False) 
    value_date    = db.Column(db.Date, nullable=False) 
    info          = db.Column(db.String(), primary_key=False) 

class DataASchema(ma.SQLAlchemyAutoSchema):
      class Meta:
            model = DataA
            load_instance = True

