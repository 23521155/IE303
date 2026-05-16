import os

try:
    import psycopg2
except ImportError:
    os.system('pip install psycopg2-binary')
    import psycopg2

conn_str = "postgresql://neondb_owner:npg_kFcsqpABNu18@ep-shiny-violet-a1soua7r-pooler.ap-southeast-1.aws.neon.tech:5432/material_db?sslmode=require"

try:
    conn = psycopg2.connect(conn_str)
    cur = conn.cursor()
    
    insert_query = """
    INSERT INTO learning_materials (title, category, image_url, description, file_url, type, created_at, updated_at) 
    VALUES ('Lý thuyết FE', 'FE', 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1080', 'Tài liệu Lý thuyết môn FE. Tổng hợp kiến thức và nội dung ôn tập.', 'https://drive.google.com/drive/u/0/folders/0B0_R9Nx6JrkDOU1pMjRXVnRKR0k?resourcekey=0-Y9bg9TaSbk7kU5HEelPpvw', 'drive', NOW(), NOW());
    """
    
    cur.execute(insert_query)
    conn.commit()
    print("Successfully inserted material into remote Neon DB!")
    
except Exception as e:
    print(f"Error: {e}")
finally:
    if 'conn' in locals():
        cur.close()
        conn.close()
