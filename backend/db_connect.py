def run_query(db, query, should_fetch):
    print(db, query, should_fetch)
    cursor = db.connection.cursor()
    cursor.execute(query)
    ret = ""
    if (should_fetch):
        columns = [col[0] for col in cursor.description]
        ret = [
            dict(zip(columns, row)) for row in cursor.fetchall()
        ]
    db.connection.commit()
    cursor.close()
    return ret
