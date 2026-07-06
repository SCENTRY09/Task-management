import psycopg2

try:
    conn = psycopg2.connect(
        host="localhost",
        port=5432,
        user="Shivam",
        password="Shivam",
        dbname="task_db",
    )
    print("✅ Connected successfully!")
    conn.close()

except Exception as e:
    print("❌", e)