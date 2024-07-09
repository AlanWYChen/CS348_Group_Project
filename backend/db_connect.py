from sqlalchemy import text

def run_query(engine, query, should_fetch):
    print(query)
    with engine.connect() as connection:
        result = connection.execute(text(query))
        
        if should_fetch:
            columns = result.keys()
            rows = result.fetchall()
            ret = [dict(zip(columns, row)) for row in rows]
        else:
            ret = None
        
        connection.commit()
    
    return ret
